"""Pixel-watercolor pipeline.
Principles distilled from Curtis et al. 1997 / Lei & Chang 2004 (watercolor):
  region simplification -> wash (no true black, transparency over white paper)
  -> hand tremor (low-freq displacement) -> edge darkening (DoG) -> granulation (paper noise in dark pigment)
and from pixel-art practice: low target resolution, limited palette (median cut),
ordered (Bayer) dithering with small spread, cluster cleanup before quantizing.
"""
import sys, json, numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter, map_coordinates, median_filter

def crop_aspect(im, aspect, anchor=0.5):
    w, h = im.size
    if w / h > aspect:
        nw = int(h * aspect); x0 = int((w - nw) * 0.5); return im.crop((x0, 0, x0 + nw, h))
    nh = int(w / aspect); y0 = int((h - nh) * anchor); return im.crop((0, y0, w, y0 + nh))

def watercolor(im, width=1400, wash=0.78, tremor=3.5, edge=0.7, grain=0.14, seed=1):
    rng = np.random.default_rng(seed)
    im = im.convert("RGB"); im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255.0
    # 1. simplify regions (cluster cleanup): median then gentle bleed
    a = np.stack([median_filter(a[..., c], size=7) for c in range(3)], -1)
    lum0 = a @ np.array([0.299, 0.587, 0.114], np.float32)
    var = gaussian_filter(lum0 ** 2, 6) - gaussian_filter(lum0, 6) ** 2
    flat = np.clip(1 - var / 0.004, 0, 1)[..., None]          # 1 where the region is flat (sky, water)
    soft = np.stack([gaussian_filter(a[..., c], 4.0) for c in range(3)], -1)
    a = a * (1 - flat) + soft * flat                          # wet-in-wet bloom where nothing is happening
    a = np.stack([gaussian_filter(a[..., c], 0.8) for c in range(3)], -1)
    # 2. hand tremor: low-frequency displacement field
    h, w = a.shape[:2]
    def field():
        n = rng.standard_normal((h // 40 + 2, w // 40 + 2)).astype(np.float32)
        n = np.asarray(Image.fromarray(n).resize((w, h), Image.BICUBIC))
        return n / (np.abs(n).max() + 1e-6)
    dy, dx = field() * tremor, field() * tremor
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    a = np.stack([map_coordinates(a[..., c], [yy + dy, xx + dx], order=1, mode="reflect") for c in range(3)], -1)
    # 3. wash: pigment is transparent over white; lift blacks, add a little vibrancy in mids
    a = 1 - (1 - a) * wash
    a = a ** 0.9
    lum = a @ np.array([0.299, 0.587, 0.114], np.float32)
    a = np.clip(a + (a - lum[..., None]) * 0.22, 0, 1)
    paper = np.clip((lum - 0.86) / 0.14, 0, 1)[..., None]     # highlights become reserved paper
    a = a * (1 - paper) + paper * 1.0
    # shadows drift cool (hue shift)
    a[..., 2] = np.clip(a[..., 2] + 0.06 * (1 - lum), 0, 1)
    a[..., 0] = np.clip(a[..., 0] - 0.02 * (1 - lum), 0, 1)
    # 4. edge darkening: pigment pools at region boundaries (DoG)
    lum = a @ np.array([0.299, 0.587, 0.114], np.float32)
    dog = gaussian_filter(lum, 1.4) - gaussian_filter(lum, 4.0)
    e = np.clip(np.abs(dog) * 7.0, 0, 1)
    a = a * (1 - edge * e)[..., None]
    # 5. granulation: paper tooth, stronger where pigment is dense
    g = gaussian_filter(rng.standard_normal((h, w)).astype(np.float32), 0.7)
    g = g / (np.abs(g).max() + 1e-6)
    a = np.clip(a * (1 + grain * g * (1 - lum))[..., None], 0, 1)
    return Image.fromarray((a * 255).astype(np.uint8))

BAYER4 = (np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]], np.float32) / 16.0) - 0.5

def pixelate(im, pw, colors=22, spread=0.055):
    ph = max(1, round(im.height * pw / im.width))
    small = im.resize((pw, ph), Image.BOX)
    q = small.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    pal = np.array(q.getpalette()[: colors * 3], np.float32).reshape(-1, 3) / 255.0
    # drop unused palette entries
    used = np.unique(np.asarray(q)); pal = pal[used]
    arr = np.asarray(small).astype(np.float32) / 255.0
    tile = np.tile(BAYER4, (ph // 4 + 1, pw // 4 + 1))[:ph, :pw]
    arr = np.clip(arr + (tile * spread)[..., None], 0, 1)
    d = ((arr[:, :, None, :] - pal[None, None, :, :]) ** 2).sum(-1)
    idx = d.argmin(-1)
    out = (pal[idx] * 255).astype(np.uint8)
    hexes = ["#%02x%02x%02x" % tuple(int(v * 255) for v in c) for c in pal]
    return Image.fromarray(out), hexes

if __name__ == "__main__":
    src, key, aspect, anchor = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
    widths = [int(x) for x in sys.argv[5].split(",")]
    im = crop_aspect(Image.open(src), aspect, anchor)
    wc = watercolor(im)
    wc.save(f"out/{key}-wc.jpg", quality=86)
    for pw in widths:
        px, hexes = pixelate(wc, pw)
        px.save(f"out/{key}-px{pw}.png")
        px.resize((px.width * 6, px.height * 6), Image.NEAREST).save(f"out/{key}-px{pw}-preview.png")
        json.dump(hexes, open(f"out/{key}-px{pw}.json", "w"))
    print(key, "done", wc.size)
