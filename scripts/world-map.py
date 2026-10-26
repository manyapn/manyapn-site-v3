"""The pixel world map behind /fun: one pixel per degree, longitudes -180..180
and latitudes 75°N..56°S, from Natural Earth's 110m land polygons. Land is
drawn in the page's rust pigment, with a darker ring on the coast.

usage: python3 scripts/world-map.py <ne_110m_land.json>
(the geojson: https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/physical/ne_110m_land.json)
"""
import json, os, sys
from PIL import Image, ImageDraw

TOP, BOT, W, S = 75, -56, 360, 8
H = TOP - BOT
RUST = (162, 74, 62)

gj = json.load(open(sys.argv[1]))
big = Image.new("L", (W * S, H * S), 0)
d = ImageDraw.Draw(big)
proj = lambda lon, lat: ((lon + 180) * S, (TOP - lat) * S)
for ft in gj["features"]:
    g = ft["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        d.polygon([proj(x, y) for x, y in poly[0]], fill=255)
        for hole in poly[1:]:
            d.polygon([proj(x, y) for x, y in hole], fill=0)
# supersampled, then a cell is land when at least ~35% covered so thin coasts and islands survive
cov = big.resize((W, H), Image.BOX)
land = [[cov.getpixel((x, y)) >= 90 for x in range(W)] for y in range(H)]

def coast(x, y):
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < W and 0 <= ny < H and not land[ny][nx]:
            return True
    return False

out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
for y in range(H):
    for x in range(W):
        if land[y][x]:
            out.putpixel((x, y), RUST + (118 if coast(x, y) else 62,))
dest = os.path.join(os.path.dirname(__file__), "..", "public", "fun", "world.png")
out.save(dest)
print("world.png", out.size)
