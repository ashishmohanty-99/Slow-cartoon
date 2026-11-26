export type CharacterId = "chintu" | "ammatree" | "mother";
export type Bg = "sunrise" | "hut" | "field" | "rain" | "night" | "river";
export type Placed = { id: CharacterId; x: number; y: number; scale?: number; flip?: boolean };
export type Scene = {
  id: string;
  bg: Bg;
  seconds: number; // keep >= 8 for the slow style (see docs/03)
  narration: string;
  caption?: string;
  characters: Placed[];
  camera?: { from: number; to: number }; // zoom scale, slow drift only
  pause?: boolean; // silent "pause & think" beat
};
export type EpisodeProps = {
  id: string;
  title: string;
  fps: number;
  scenes: Scene[];
  audio?: string; // optional mixed narration file in /public
};
