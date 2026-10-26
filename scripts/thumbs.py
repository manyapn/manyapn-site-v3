"""
Tiny inline copies of every image on the site, so each one has something to
show while the real file loads or when it doesn't load at all.

Writes src/data/thumbs-site.json (landscapes, portrait, world map) and
src/data/thumbs-fun.json (the /fun photos) as {key: data url}. Run after
scripts/landscapes.py or scripts/fun-photos.py changes an image.
"""
import base64, io, json, pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = ROOT / "src" / "data"


def thumb(path, width=None, colors=32):
    img = Image.open(path).convert("RGB")
    if width and width < img.width:
        h = max(1, round(img.height * width / img.width))
        img = img.resize((width, h), Image.BOX)
    img = img.quantize(colors)
    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


site = {p.stem: thumb(p, 32) for p in sorted((PUB / "land").glob("*.png"))}
site["manya"] = thumb(PUB / "manya.jpg", 32)
site["world"] = thumb(PUB / "fun" / "world.png")

fun = {}
for p in sorted((PUB / "fun").glob("*.png")):
    if p.stem == "world":
        continue
    w = Image.open(p).width
    fun[p.stem] = thumb(p, max(12, w // 6), 12)

for name, data in (("thumbs-site.json", site), ("thumbs-fun.json", fun)):
    (OUT / name).write_text(json.dumps(data, indent=0) + "\n")
    print(name, len(data), "images,", sum(len(v) for v in data.values()) // 1024, "KB")
