"""Travel photos for /fun. Each one is pixelated straight from the photo (no
watercolor pass), with the same median-cut palette and ordered dither as the
heroes. Tiles on the page are about 220 px wide (wide photos get two columns),
so a photo gets 84 or 168 pixels across, about 2.6 px per block. Clicking a
tile shows the real photo, so each one also gets a <id>.jpg, 720 px on the
long side. Writes public/fun/<id>.png, <id>.jpg and sizes.json.
(public/fun/world.png is separate: scripts/world-map.py.)

usage: python3 scripts/fun-photos.py <dir of converted jpgs>

To add photos: put them in the drive folder, convert any HEICs to jpg, add
the files under a place key below, run
this, then add the ids to src/data/fun.ts.
"""
import sys, os, json
from PIL import Image, ImageOps, ImageEnhance
sys.path.insert(0, os.path.dirname(__file__))
from pixwc import pixelate as quantize

# place key -> source files, in the order they should show
PICKS = {
  "seattle":     ["IMG_4228.jpg", "IMG_2491.jpg", "IMG_2239.jpg", "IMG_3439_Original.JPG", "IMG_5595.jpg", "102_0693.JPG",
                  "story-brunch-plates.jpg", "ig-cafe-flatlay-camera.jpg"],
  "oregon":      ["37052012-ED20-4BCE-89FC-E7879EB4DAD7_Original.JPG", "3E1EF569-8408-4459-9EEB-362570B4AC78_Original.JPG",
                  "ig-sunset-water.jpg", "IMG_5740_Original_Original.JPG", "ig-beach-sunset-1.jpg", "ig-golden-interior.jpg",
                  "ig-bookstore-aisle.jpg"],
  "california":  ["IMG_7242.jpg", "IMG_6879.jpg", "IMG_4639_Original.jpg", "IMG_0244.PNG", "IMG_0238.PNG"],
  "hawaii":      ["IMG_0235.PNG"],
  "canada":      ["IMG_1945.jpg", "IMG_1978.jpg", "IMG_9650.jpg", "IMG_9856.jpg", "IMG_1441.JPG", "ig-montreal-storefront.jpg",
                  "IMG_9729.jpg", "IMG_9788.jpg", "IMG_3931.jpeg", "IMG_1461.JPG"],
  "ithaca":      ["IMG_2976.jpg", "ig-cornell-slope-golden-hour.jpg", "IMG_8445.jpg", "IMG_1231.JPG", "ig-cornell-campus.jpg",
                  "IMG_8894.jpg", "IMG_0085.jpg", "ig-hills-landscape.jpg", "ig-pink-sunset-waves.jpg"],
  "nyc":         ["IMG_9436.jpg", "IMG_2652_Original.JPG", "ig-cafe-shelf.jpg"],
  "pennsylvania": ["IMG_3184.jpg"],
  "durham":      ["IMG_3464_Original.jpg"],
  "atlanta":     ["IMG_1276_Original.JPG"],
  "nashville":   ["cpm35 2024-07-24 000353.326_Original.JPG"],
  "florida":     ["IMG_0240.PNG"],
  "cancun":      ["IMG_0744_Original.jpg", "IMG_0916_Original.jpg"],
  "london":      ["IMG_6222_Original.jpg", "IMG_1026_Original.JPG", "IMG_6076_Original.jpg", "IMG_6082_Original.jpg", "IMG_6326_Original.jpg"],
  "paris":       ["IMG_6428_Original.jpg", "IMG_6436_Original.jpg", "IMG_6639.jpg", "IMG_6413_Original.jpg", "IMG_6629_Original.JPG", "IMG_6525_Original.jpg"],
  "switzerland": ["IMG_6803_Original.jpg", "IMG_6783_Original.jpg", "IMG_6842_Original.jpg"],
  "barcelona":   ["IMG_6936_Original.jpg", "IMG_6955_Original.jpg", "B403209C-85E5-4175-B1CB-2996C798556E_Original.JPG"],
  "italy":       ["IMG_0638.JPG", "IMG_0972.JPG", "IMG_8046.jpg", "ig-lake-como-dress.jpg", "IMG_8010.jpg",
                  "story-bellagio-alley.jpg", "IMG_7890.JPG", "IMG_8160.jpg", "IMG_8625.JPG",
                  "ig-street-sunset.jpg", "IMG_1082.JPG", "IMG_1163.JPG", "ig-venice-canal-flag.jpg", "IMG_1096.JPG",
                  "ig-venice-piazza.jpg", "IMG_0276.PNG", "ig-vintage-map.jpg", "ig-pastry-flatlay.jpg"],
  "india":       ["IMG_6642_Original.jpg", "IMG_6643_Original.jpg", "IMG_0272.PNG"],
}

def pixelate(im):
    w, h = im.size
    im = ImageEnhance.Contrast(im).enhance(1.1)
    pw = 168 if w > h * 1.15 else 84
    px, _ = quantize(im, pw, colors=32, spread=0.04)
    return px

def clear(im, long_side=720):
    w, h = im.size
    s = long_side / max(w, h)
    return im.resize((round(w * s), round(h * s)), Image.LANCZOS)

if __name__ == "__main__":
    src = sys.argv[1]
    out = os.path.join(os.path.dirname(__file__), "..", "public", "fun")
    os.makedirs(out, exist_ok=True)
    sizes = {}
    for place, files in PICKS.items():
        for n, f in enumerate(files, 1):
            pid = f"{place}-{n}"
            im = ImageOps.exif_transpose(Image.open(os.path.join(src, f))).convert("RGB")
            px = pixelate(im)
            px.save(os.path.join(out, pid + ".png"))
            clear(im).save(os.path.join(out, pid + ".jpg"), quality=78)
            sizes[pid] = [px.width, px.height]
    json.dump(sizes, open(os.path.join(out, "sizes.json"), "w"))
    print(len(sizes), "photos")
