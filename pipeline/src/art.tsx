import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Bg, CharacterId } from "./types";

// Soft nursery palette — mid-saturation, no neon (docs/03).
const SKY: Record<Bg, [string, string]> = {
  sunrise: ["#FFE9B8", "#FFD2A1"], hut: ["#FFF1DA", "#F8DDB8"], field: ["#CFEBFF", "#F3F9E0"],
  rain: ["#BFD0DE", "#DCE6EC"], night: ["#33406B", "#5A5F91"], river: ["#D6F0F5", "#EAF7E2"],
};

export const Background: React.FC<{ bg: Bg }> = ({ bg }) => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 90) * 6; // slow cloud sway
  const [a, b] = SKY[bg];
  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%">
      <defs><linearGradient id={`g${bg}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect width="1920" height="1080" fill={`url(#g${bg})`} />
      {bg === "sunrise" && <circle cx="1500" cy={330 - drift} r="110" fill="#FFC857" opacity=".9" />}
      {bg === "night" && [...Array(14)].map((_, i) => <circle key={i} cx={140 + i * 130} cy={100 + (i * 53) % 260} r="4" fill="#FFF3C4" opacity={0.6 + 0.4 * Math.sin(f / 40 + i)} />)}
      <ellipse cx={420 + drift * 3} cy="220" rx="150" ry="46" fill="#fff" opacity=".7" />
      <ellipse cx={1180 - drift * 3} cy="170" rx="190" ry="52" fill="#fff" opacity=".6" />
      <path d="M0 760 Q480 620 960 740 T1920 700 V1080 H0Z" fill="#B9DE9B" />
      <path d="M0 860 Q600 780 1200 850 T1920 820 V1080 H0Z" fill="#9CCB7E" />
      {bg === "river" && <path d="M0 930 Q480 890 960 930 T1920 920 V1010 H0Z" fill="#8ED0E0" opacity=".85" />}
      {bg === "hut" && (<g><rect x="1280" y="520" width="420" height="300" rx="24" fill="#E7B98A" /><path d="M1250 540 L1490 380 L1730 540Z" fill="#C98A5B" /><rect x="1450" y="650" width="90" height="170" rx="18" fill="#9B6B47" /></g>)}
      {bg === "rain" && [...Array(40)].map((_, i) => { const y = (f * 14 + i * 97) % 1080; return <line key={i} x1={(i * 53) % 1920} y1={y} x2={(i * 53) % 1920 - 10} y2={y + 38} stroke="#8DA7BA" strokeWidth="3" opacity=".5" />; })}
    </svg>
  );
};

const Blink: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const f = useCurrentFrame();
  const closed = f % 120 > 114; // blink every ~5s, gentle
  return closed ? <path d={`M${cx - r} ${cy} Q${cx} ${cy + r * 0.6} ${cx + r} ${cy}`} stroke="#3B2A22" strokeWidth="5" fill="none" strokeLinecap="round" />
    : <g><circle cx={cx} cy={cy} r={r} fill="#3B2A22" /><circle cx={cx + r * 0.35} cy={cy - r * 0.35} r={r * 0.35} fill="#fff" /></g>;
};

const Chintu = () => (
  <g>
    <ellipse cx="0" cy="250" rx="120" ry="18" fill="#000" opacity=".08" />
    <rect x="-60" y="130" width="38" height="120" rx="18" fill="#8FB6D6" />
    <rect x="22" y="130" width="38" height="120" rx="18" fill="#8FB6D6" />
    <ellipse cx="0" cy="90" rx="110" ry="100" fill="#9CC3E2" />
    <ellipse cx="-118" cy="10" rx="62" ry="78" fill="#BBD6EC" />
    <ellipse cx="118" cy="10" rx="62" ry="78" fill="#BBD6EC" />
    <circle cx="0" cy="-30" r="104" fill="#A9CCE8" />
    <path d="M-18 40 Q-10 130 -42 150 Q-26 160 0 140 Q8 90 18 40Z" fill="#9CC3E2" />
    <circle cx="-42" cy="-30" r="0" /><Blink cx={-42} cy={-34} r={11} /><Blink cx={42} cy={-34} r={11} />
    <ellipse cx="-70" cy="6" rx="16" ry="10" fill="#F7B6B6" opacity=".7" /><ellipse cx="70" cy="6" rx="16" ry="10" fill="#F7B6B6" opacity=".7" />
    <path d="M-22 20 Q0 36 22 20" stroke="#3B2A22" strokeWidth="5" fill="none" strokeLinecap="round" />
  </g>
);
const AmmaTree = () => (
  <g>
    <path d="M-70 260 Q-40 80 -60 -20 L60 -20 Q40 80 70 260Z" fill="#9B6B47" />
    <circle cx="0" cy="-90" r="190" fill="#7DBB7A" /><circle cx="-130" cy="-40" r="110" fill="#6FAF6F" /><circle cx="130" cy="-40" r="110" fill="#6FAF6F" />
    <Blink cx={-34} cy={10} r={10} /><Blink cx={34} cy={10} r={10} />
    <path d="M-26 50 Q0 70 26 50" stroke="#3B2A22" strokeWidth="5" fill="none" strokeLinecap="round" />
  </g>
);
const Mother = () => (
  <g>
    <ellipse cx="0" cy="300" rx="140" ry="20" fill="#000" opacity=".08" />
    <ellipse cx="0" cy="130" rx="130" ry="150" fill="#C9A6D8" /><circle cx="0" cy="-60" r="115" fill="#D7B9E6" />
    <ellipse cx="-125" cy="-60" rx="62" ry="80" fill="#E4CEEF" /><ellipse cx="125" cy="-60" rx="62" ry="80" fill="#E4CEEF" />
    <circle cx="0" cy="-130" r="14" fill="#F2A65A" />
    <Blink cx={-42} cy={-64} r={11} /><Blink cx={42} cy={-64} r={11} />
    <path d="M-22 -14 Q0 2 22 -14" stroke="#3B2A22" strokeWidth="5" fill="none" strokeLinecap="round" />
  </g>
);
const ART: Record<CharacterId, React.FC> = { chintu: Chintu, ammatree: AmmaTree, mother: Mother };

export const Character: React.FC<{ id: CharacterId; x: number; y: number; scale?: number; flip?: boolean }> = ({ id, x, y, scale = 1, flip }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breathe = 1 + Math.sin((f / fps) * 1.4) * 0.012; // slow breathing
  const sway = Math.sin((f / fps) * 0.8) * 1.2;
  const C = ART[id];
  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(${x} ${y}) rotate(${sway}) scale(${(flip ? -1 : 1) * scale * breathe} ${scale * breathe})`}><C /></g>
    </svg>
  );
};
