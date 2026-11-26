import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, renderStill } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
const [,, epFile = "episodes/ep001.json", out = "out/ep001.mp4", mode = "video"] = process.argv;
const props = JSON.parse(fs.readFileSync(epFile, "utf8"));
const browserExecutable = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id: "Episode", inputProps: props, browserExecutable });
fs.mkdirSync(path.dirname(out), { recursive: true });
if (mode === "still") {
  await renderStill({ composition: comp, serveUrl, output: out, inputProps: props, frame: Number(process.env.FRAME ?? 200), browserExecutable });
} else {
  await renderMedia({ composition: comp, serveUrl, codec: "h264", outputLocation: out, inputProps: props, browserExecutable,
    concurrency: 2, onProgress: ({ progress }) => process.stdout.write(`\r${(progress * 100).toFixed(0)}%`) });
}
console.log("\nwrote", out);
