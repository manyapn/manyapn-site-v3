import json, sys, urllib.request, urllib.parse, re, html, time, os
UA = {"User-Agent": "manyapn-site-build/1.0 (personal site; contact via github.com/manyapn)"}
def api(params):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60))
picks = {
 "rainier":  "File:Paradise Wildflowers (53046019806).jpg",
 "seattle":  "File:Seattle 4.jpg",
 "kerry":    "File:Seattle Space Needle UW Kerry Park.jpg",
 "everest":  "File:Mount Everest, Himalayas.jpg",
 "everest2": "File:Sunset view of Everest.jpg",
 "hoh":      "File:Hoh Rainforest, mossy log tree NPS Photo (16680304244).jpg",
 "palouse":  "File:PalouseFromSteptoeButteMay2023-1.jpg",
 "pike":     "File:Public Market sign at Pike Place Market, 2017.jpg",
 "diablo":   "File:Davis Peak seen from Diablo Lake Overlook in the North Cascades.jpg",
 "diablo2":  "File:Diablo Lake in summer.jpg",
 "gorge":    "File:Ithaca - Cascadilla Gorge Trail.jpg",
}
credits = json.load(open('photos/credits.json')) if os.path.exists('photos/credits.json') else {}
for key, title in picks.items():
    if os.path.exists(f'photos/{key}.jpg') and os.path.getsize(f'photos/{key}.jpg')>50000:
        print('skip', key); continue
    time.sleep(4)
    for attempt in range(4):
        try:
            r = api({"action":"query","titles":title,"prop":"imageinfo","iiprop":"url|size|extmetadata","iiurlwidth":1600,"format":"json"}); break
        except Exception as e:
            print("retry", key, e); time.sleep(15*(attempt+1))
    p = next(iter(r["query"]["pages"].values()))
    ii = p["imageinfo"][0]; md = ii["extmetadata"]
    strip = lambda s: html.unescape(re.sub("<[^>]+>", "", s)).strip()
    credits[key] = {
        "title": title.replace("File:",""),
        "artist": strip(md.get("Artist",{}).get("value","")),
        "license": md.get("LicenseShortName",{}).get("value",""),
        "licenseUrl": md.get("LicenseUrl",{}).get("value",""),
        "page": ii["descriptionurl"],
        "size": f'{ii["width"]}x{ii["height"]}',
    }
    url = ii.get("thumburl") or ii["url"]
    data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
    open(f"photos/{key}.jpg","wb").write(data)
    print(key, len(data)//1024, "KB", credits[key]["license"], "|", credits[key]["artist"][:50])
json.dump(credits, open("photos/credits.json","w"), indent=2)
