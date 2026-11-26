"""Kokoro (open-source, MIT) voices -> per-episode narration track aligned to scene timeline.
Usage:  python scripts/voice.py episodes/ep001.json public/ep001.wav [--model-dir /tmp/kmodel]
        python scripts/voice.py --audition out/audition [--model-dir ...]
"""
import json, sys, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
a = sys.argv[1:]
md = a[a.index("--model-dir")+1] if "--model-dir" in a else "models"
k = Kokoro(f"{md}/kokoro-v1.0.onnx", f"{md}/voices-v1.0.bin")
cast = json.load(open(os.path.join(os.path.dirname(__file__), "..", "voices.json")))
SR = 24000; FADE = 18
def say(spk, text):
    c = cast[spk]; x, sr = k.create(text, voice=c["voice"], speed=c["speed"], lang="en-gb" if c["voice"].startswith("b") else "en-us")
    return x.astype(np.float32)
if a[0] == "--audition":
    os.makedirs(a[1], exist_ok=True)
    line = "Good morning, little friends. Let's take one slow breath together. In... and out."
    for v in ["bf_emma","bf_isabella","bf_lily","af_heart","af_nicole","af_sarah","af_bella","bm_george","bm_lewis","am_michael"]:
        x,_ = k.create(line, voice=v, speed=0.88, lang="en-gb" if v[0]=="b" else "en-us"); sf.write(f"{a[1]}/{v}.wav", x, SR)
    print("auditions in", a[1]); sys.exit()
ep = json.load(open(a[0])); fps = ep["fps"]
total = sum(round(s["seconds"]*fps) - FADE for s in ep["scenes"]) + FADE
track = np.zeros(int(total/fps*SR)+SR, dtype=np.float32); start = 0
for s in ep["scenes"]:
    frames = round(s["seconds"]*fps); cap = int(s["seconds"]*SR); t = int(start/fps*SR) + int(1.0*SR)  # 1 s lead-in
    parts = []
    if s.get("narration") and not s.get("pause"): parts.append(("narrator", s["narration"]))
    parts += [(l["speaker"], l["text"]) for l in s.get("lines", [])]
    used = int(1.0*SR)
    for spk, txt in parts:
        x = say(spk, txt); track[t:t+len(x)] += x; t += len(x) + int(0.8*SR); used += len(x) + int(0.8*SR)
    if used > cap - int(0.5*SR): print(f"WARN {s['id']}: speech {used/SR:.1f}s > scene {s['seconds']}s -> lengthen scene")
    start += frames - FADE
track /= max(1.0, float(np.abs(track).max())/0.8)  # headroom, no harshness
sf.write(a[1], track, SR); print("wrote", a[1], f"{len(track)/SR:.0f}s")
