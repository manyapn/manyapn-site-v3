"""Page heroes: the watercolor pass from pixwc.py, then quantized to a small
palette with ordered dither, 1920 px wide. The page pixelates it further on a
canvas, so the softest thing anyone sees is this palette version, never the
raw painting. Only headers get the painting; other photos stay plain.

usage: python3 scripts/landscapes.py <dir with the source jpgs>
The commons sources come from scripts/fetch-photos.py; montroyal is my photo.
"""
import sys, os
from PIL import Image, ImageOps
sys.path.insert(0, os.path.dirname(__file__))
from pixwc import crop_aspect, watercolor, pixelate

# key: (file, aspect, vertical anchor for the crop, output size)
WIDE = (1920, 872)
HEROES = {
  "rainier":   ("rainier.jpg", 240 / 109, 0.35, WIDE),
  "kerry":     ("kerry.jpg", 240 / 109, 0.0, WIDE),
  "everest":   ("everest.jpg", 240 / 109, 0.5, WIDE),
  "palouse":   ("palouse.jpg", 240 / 109, 0.25, WIDE),
  "diablo":    ("diablo.jpg", 240 / 109, 0.35, WIDE),
  "gorge":     ("gorge.jpg", 240 / 109, 0.0, WIDE),
  "pike":      ("pike.jpg", 3 / 2, 0.0, (1920, 1280)),
  "montroyal": ("IMG_9650.jpg", 240 / 109, 0.5, WIDE),
}

if __name__ == "__main__":
    src = sys.argv[1]
    out = os.path.join(os.path.dirname(__file__), "..", "public", "land")
    for key, (f, aspect, anchor, size) in HEROES.items():
        path = os.path.join(src, f)
        if not os.path.exists(path):
            print("skip", key, "(no source)"); continue
        im = crop_aspect(ImageOps.exif_transpose(Image.open(path)).convert("RGB"), aspect, anchor)
        wc = watercolor(im, width=size[0])
        px, _ = pixelate(wc, size[0])
        px = px.resize(size, Image.NEAREST)
        px.quantize(colors=24, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(os.path.join(out, key + ".png"), optimize=True)
        print(key, size, flush=True)
