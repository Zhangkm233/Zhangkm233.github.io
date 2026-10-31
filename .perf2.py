import urllib.request, ssl, sys, time
sys.stdout.reconfigure(encoding="utf-8")
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
H = {"User-Agent":"Mozilla/5.0","Accept-Encoding":"gzip, deflate, br"}
base = "https://zhangboyan.com"
# 检查是否支持 gzip：对比带与不带 Accept-Encoding
for label, hdr in [("无 Accept-Encoding", {}), ("带 gzip/br", {"Accept-Encoding":"gzip, deflate, br"})]:
    h = {"User-Agent":"Mozilla/5.0", **hdr}
    t0=time.time()
    try:
        r = urllib.request.urlopen(urllib.request.Request(base+"/assets/index-DgSTKJvr.css", headers=h), timeout=40, context=ctx)
        d=r.read()
        print(f"{label:<22} {len(d)/1024:>6.1f}K  enc={r.headers.get('Content-Encoding','无')}  {(time.time()-t0)*1000:.0f}ms", flush=True)
    except Exception as e:
        print(f"{label:<22} ERR {type(e).__name__}", flush=True)
print()
# 单独测一张图片
t0=time.time()
try:
    r = urllib.request.urlopen(urllib.request.Request(base+"/images/heartlib_cover.webp", headers={"User-Agent":"Mozilla/5.0"}), timeout=60, context=ctx)
    d=r.read()
    print(f"heartlib_cover.webp    {len(d)/1024:>6.0f}K  {(time.time()-t0)*1000:.0f}ms  cc={r.headers.get('Cache-Control','-')}", flush=True)
except Exception as e:
    print("img ERR", type(e).__name__, flush=True)
