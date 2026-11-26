import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background, Character } from "./art";
import type { EpisodeProps, Scene } from "./types";

const FADE = 18; // frames of gentle cross-dissolve

const SceneView: React.FC<{ scene: Scene; frames: number }> = ({ scene, frames }) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, FADE, frames - FADE, frames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cam = scene.camera ?? { from: 1.0, to: 1.04 };
  const z = interpolate(f, [0, frames], [cam.from, cam.to]); // slow drift (<= ~3%/s by construction)
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ transform: `scale(${z})` }}>
        <Background bg={scene.bg} />
        {scene.characters.map((c, i) => <Character key={i} {...c} />)}
      </AbsoluteFill>
      {scene.caption && (
        <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, textAlign: "center", fontFamily: "Georgia, serif", fontSize: scene.pause ? 64 : 54, color: "#4A3426" }}>
          <span style={{ background: "rgba(255,248,235,.88)", padding: "14px 36px", borderRadius: 36 }}>{scene.caption}</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Episode: React.FC<EpisodeProps> = ({ scenes, audio, title }) => {
  const { fps } = useVideoConfig();
  let start = 0;
  return (
    <AbsoluteFill style={{ background: "#FFF4E0" }}>
      {scenes.map((s) => {
        const frames = Math.round(s.seconds * fps);
        const el = <Sequence key={s.id} from={start} durationInFrames={frames}><SceneView scene={s} frames={frames} /></Sequence>;
        start += frames - FADE; // overlap = dissolve
        return el;
      })}
      {audio && <Audio src={staticFile(audio)} />}
    </AbsoluteFill>
  );
};

export const totalFrames = (scenes: Scene[], fps: number) =>
  scenes.reduce((n, s) => n + Math.round(s.seconds * fps) - FADE, FADE);
