import type { Pose } from "@/config/mascot";

const SKIN = "#ecc9ad";
const SKIN_EDGE = "#c99f86";
const INK = "#3b2a26";
const HAIR = "#513833";
const PAPER = "#f8f3ef";
const BROWN = "#866554";

const line = { fill: "none", stroke: INK, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const sleeve = { fill: "none", stroke: "var(--accent)", strokeWidth: 10, strokeLinecap: "round" as const };
const fist = { fill: SKIN, stroke: SKIN_EDGE, strokeWidth: 1.5 };

function Eyes({ dx = 0, dy = 0, r = 2.8 }: { dx?: number; dy?: number; r?: number }) {
  return (
    <g fill={INK}>
      <circle cx={51 + dx} cy={58 + dy} r={r} />
      <circle cx={69 + dx} cy={58 + dy} r={r} />
    </g>
  );
}

function Features({ pose }: { pose: Pose }) {
  switch (pose) {
    case "curious":
      return (
        <>
          <Eyes dx={-1.5} dy={-1} />
          <path {...line} d="M46 47Q50.5 43.5 55 46M65 49.5L74 50.5" />
          <circle {...line} cx="61" cy="68.5" r="2.8" />
          <circle {...fist} cx="58" cy="104" r="7" />
          <text x="88" y="36" fill="var(--accent-strong)" fontSize="26" fontWeight="800" fontFamily="sans-serif">
            ?
          </text>
        </>
      );
    case "pointing":
      return (
        <>
          <Eyes dx={-3} />
          <path {...line} d="M46 50.5L55 49.5M65 49.5L74 50.5M51 66Q58 72 66 67" />
          <path {...sleeve} d="M34 106 14 94" />
          <circle {...fist} cx="9" cy="91" r="6" />
        </>
      );
    case "rubEyes":
      return (
        <>
          <path {...line} d="M47 59Q51 56 55 59M65 59Q69 56 73 59M46 51L55 50.5M65 50.5L74 51" />
          <ellipse cx="60" cy="71" rx="4" ry="5" fill={INK} />
          <path {...sleeve} d="M30 116Q34 88 46 70M90 116Q86 88 74 70" />
          <circle {...fist} cx="49" cy="61" r="7.5" />
          <circle {...fist} cx="71" cy="61" r="7.5" />
        </>
      );
    case "squint":
      return (
        <>
          <path {...line} strokeWidth={3} d="M47 58.5H55M65 58.5H73" />
          <path {...line} d="M46 53 55 55M65 55 74 53M53 69Q60 66 67 69" />
          <path {...sleeve} d="M94 116Q92 72 80 46" />
          <rect x="40" y="37" width="44" height="9" rx="4.5" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="1.5" />
          <path {...line} stroke="var(--accent-strong)" d="M14 16 18 20M10 28H15M24 8 25 13" />
        </>
      );
    case "laptop":
      return (
        <>
          <Eyes dy={2.5} r={2.6} />
          <path {...line} d="M46 51L55 50.5M65 50.5L74 51M54 68Q60 71 66 68" />
          <rect x="32" y="86" width="56" height="30" rx="3" fill="#8f8782" />
          <circle cx="60" cy="101" r="3.5" fill="#e9e4e1" />
          <rect x="26" y="113" width="68" height="6" rx="2" fill="#6f6762" />
          <rect x="94" y="97" width="15" height="17" rx="3" fill={PAPER} stroke={BROWN} strokeWidth="1.5" />
          <path d="M109 101q6 0 6 5.5t-6 5.5" fill="none" stroke={BROWN} strokeWidth="1.5" />
          <path d="M98 93q-3-4 0-8M104 93q-3-4 0-8" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "book":
      return (
        <>
          <Eyes r={2.4} />
          <g {...line} strokeWidth={2}>
            <circle cx="51" cy="58" r="7" fill="rgb(255 255 255 / 0.25)" />
            <circle cx="69" cy="58" r="7" fill="rgb(255 255 255 / 0.25)" />
            <path d="M58 58H62M44 57 36 55M76 57 84 55" />
          </g>
          <path {...line} d="M45 47.5 55 47M65 47 75 47.5M54 69H66" />
          <path d="M60 100Q46 94 30 98V119Q46 115 60 120ZM60 100Q74 94 90 98V119Q74 115 60 120Z" fill={PAPER} stroke={BROWN} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M37 104Q46 101 53 104M37 110Q46 107 53 110M67 104Q74 101 83 104" fill="none" stroke={SKIN_EDGE} strokeWidth="1.2" />
        </>
      );
    case "joy":
      return (
        <>
          <path {...line} strokeWidth={2.6} d="M47 59 51 55 55 59M65 59 69 55 73 59M46 48 55 46.5M65 46.5 74 48" />
          <path d="M50 65Q60 80 70 65Z" fill={INK} />
          <path {...sleeve} d="M30 110Q24 86 19 64M90 110Q96 86 101 64" />
          <circle {...fist} cx="18" cy="58" r="6.5" />
          <circle {...fist} cx="102" cy="58" r="6.5" />
          <path {...line} stroke="var(--accent-strong)" d="M10 30H18M14 26V34M104 22H112M108 18V26" />
        </>
      );
    case "sign":
      return (
        <>
          <Eyes r={3.2} dy={-1} />
          <path {...line} d="M46 48.5 55 47.5M65 47.5 74 48.5M50 65Q60 76 70 65" />
          <circle {...fist} cx="34" cy="104" r="6.5" />
          <circle {...fist} cx="86" cy="104" r="6.5" />
        </>
      );
    case "stare":
      return (
        <>
          <g stroke={INK} strokeWidth="1.5" fill="#fff">
            <circle cx="51" cy="58" r="5.5" />
            <circle cx="69" cy="58" r="5.5" />
          </g>
          <Eyes r={2.6} />
          <path {...line} d="M45 50H56M64 50H75M54 69H66" />
        </>
      );
    case "peace":
      return (
        <>
          <circle cx="69" cy="58" r="2.8" fill={INK} />
          <path {...line} d="M47 59Q51 56 55 59M46 50.5 55 49.5M65 48 74 49M52 66Q61 72 69 64" />
          <path {...sleeve} d="M94 116Q100 94 95 82" />
          <path d="M90 73 86 58M97 73 100 58" fill="none" stroke={SKIN} strokeWidth="5" strokeLinecap="round" />
          <circle {...fist} cx="93" cy="77" r="7" />
        </>
      );
    default:
      return (
        <>
          <Eyes />
          <path {...line} d="M46 50.5 55 49.5M65 49.5 74 50.5M52 67Q60 73 68 67" />
        </>
      );
  }
}

export function MascotFace({ pose }: { pose: Pose }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M18 122C20 98 38 88 60 88S100 98 102 122Z" fill="var(--accent)" />
      <rect x="53" y="74" width="14" height="16" rx="4" fill={SKIN} />
      <circle cx="35" cy="58" r="4.5" fill={SKIN} />
      <circle cx="85" cy="58" r="4.5" fill={SKIN} />
      <circle cx="60" cy="56" r="25" fill={SKIN} />
      <path d="M35 54C34 36 46 29 60 29C75 29 86 37 85 54C81 45 73 41 63 42C52 43 43 41 35 54Z" fill={HAIR} />
      <Features pose={pose} />
    </svg>
  );
}
