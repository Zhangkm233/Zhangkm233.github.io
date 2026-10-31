import urllib.request, ssl, sys, time
sys.stdout.reconfigure(encoding="utf-8")
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
H = {"User-Agent":"Mozilla/5.0","Cache-Control":"no-cache"}
base = "https://zhangboyan.com"
items = [
    ("HTML", "/", 20),
    ("JS 主包", "/assets/index-BfbMc3je.js", 30),
    ("CSS 主包", "/assets/index-DgSTKJvr.css", 30),
    ("字体 OTF", "/fonts/SmileySans-Oblique.otf", 40),
    ("heartlib_cover", "/images/heartlib_cover.webp", 30),
    ("gzhx_cover", "/images/gzhx_cover.webp", 30),
]
for name, path, to in items:
    t0 = time.time()
    try:
        r = urllib.request.urlopen(urllib.request.Request(base+path, headers=H), timeout=to, context=ctx)
        data = r.read()
        dt = (time.time()-t0)*1000
        print(f"{name:<18} {r.status} {len(data)/1024:>7.0f}K {dt:>7.0f}ms  enc={r.headers.get('Content-Encoding','-')} cc={r.headers.get('Cache-Control','-')}", flush=True)
    except Exception as e:
        print(f"{name:<18} ERR {type(e).__name__} after {(time.time()-t0)*1000:.0f}ms", flush=True)
