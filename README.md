# Little Banyan Stories — Sanatana Dharma values for children (ages 2–10)

A faceless YouTube channel of **slow, calm, parent-endorsable cartoons** that teach discipline,
good habits, kindness and Sanatana Dharma. One episode per day. Designed as a *learning tool*,
not an addictive feed.

| Doc | What it is |
|---|---|
| [docs/01-strategy.md](docs/01-strategy.md) | Positioning, principles, YouTube policy risks, monetization reality |
| [docs/02-curriculum-by-age.md](docs/02-curriculum-by-age.md) | Four age tracks, what each teaches, format specs |
| [docs/03-slow-cartoon-style-guide.md](docs/03-slow-cartoon-style-guide.md) | What "slow" means in numbers (pacing, audio, colour) |
| [docs/04-production-pipeline.md](docs/04-production-pipeline.md) | Faceless production workflow and verified open-source tools |
| [docs/05-resources.md](docs/05-resources.md) | Web pages and GitHub repos to build on |
| [docs/06-content-calendar-30-days.md](docs/06-content-calendar-30-days.md) | Weekly rhythm + first 30 episodes |
| [docs/07-safety-and-review-checklist.md](docs/07-safety-and-review-checklist.md) | Gate every episode must pass before publish |
| [docs/08-launch-and-growth.md](docs/08-launch-and-growth.md) | Channel setup, publishing ops, metrics, 90-day roadmap |
| [templates/](templates) | Episode script template, metadata template |
| [episodes/ep001-*.md](episodes) | First fully written sample episode |

## Build (pipeline/)
```
cd pipeline && npm i
python -m venv .venv && .venv/bin/pip install kokoro-onnx soundfile
# download kokoro-v1.0.onnx + voices-v1.0.bin from github.com/thewh1teagle/kokoro-onnx releases into pipeline/models
.venv/bin/python scripts/voice.py episodes/ep001.json public/ep001.wav
node scripts/render.mjs episodes/ep001.json out/ep001.mp4     # needs Chromium: set CHROMIUM=/path
```
Status: strategy done; EP001 pilot (≈4.7 min, placeholder art, Kokoro voices) rendering. See docs/08 for open decisions.
