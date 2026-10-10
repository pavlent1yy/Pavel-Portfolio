import type { Text } from "@/content/types";
import { HandNote } from "./HandNote";
import styles from "./Landscape.module.css";

const stars = Array.from({ length: 46 }, (_, i) => {
  const x = (i * 337.7 + 91) % 1600;
  const y = 18 + ((i * 151.3) % 250);
  const r = i % 5 === 0 ? 1.8 : 1.1;
  return { x, y, r };
});

const commits = [
  [1100, 386],
  [1100, 326],
  [1100, 266],
  [1070, 332],
  [1070, 300],
  [1130, 306],
  [1130, 280],
];

export function Landscape({ note }: { note: Text }) {
  return (
    <div className={styles.landscape}>
      <svg
        className={styles.svg}
        viewBox="0 -70 1600 630"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--sky-horizon)", stopOpacity: 0 }} />
            <stop offset="0.6" style={{ stopColor: "var(--sky-horizon)", stopOpacity: 1 }} />
          </linearGradient>
          <mask id="crescent">
            <circle cx="1040" cy="190" r="46" fill="#fff" />
            <circle cx="1062" cy="176" r="40" fill="#000" />
          </mask>
        </defs>

        <rect width="1600" height="560" fill="url(#sky)" />

        <g className={styles.stars}>
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>

        <g className={styles.sun}>
          <circle cx="1040" cy="190" r="130" fill="var(--sun-halo)" />
          <circle cx="1040" cy="190" r="92" fill="var(--sun-halo)" />
          <circle cx="1040" cy="190" r="58" fill="var(--sun)" />
        </g>
        <g className={styles.moon}>
          <circle cx="1040" cy="190" r="78" fill="var(--sun-halo)" />
          <circle cx="1040" cy="190" r="46" fill="var(--sun)" mask="url(#crescent)" />
        </g>

        <g className={styles.clouds}>
          <circle cx="280" cy="150" r="20" />
          <circle cx="310" cy="138" r="28" />
          <circle cx="342" cy="152" r="18" />
          <rect x="262" y="148" width="96" height="22" rx="11" />
          <circle cx="1360" cy="112" r="18" />
          <circle cx="1388" cy="100" r="24" />
          <circle cx="1414" cy="114" r="16" />
          <rect x="1344" y="110" width="86" height="20" rx="10" />
          <circle cx="610" cy="94" r="12" />
          <circle cx="628" cy="86" r="16" />
          <circle cx="646" cy="96" r="10" />
          <rect x="598" y="92" width="56" height="14" rx="7" />
        </g>

        <g className={styles.birds}>
          <path d="M864 146q7-7 14 0q7-7 14 0" />
          <path d="M902 126q5-5 10 0q5-5 10 0" />
          <path d="M930 152q4-4 8 0q4-4 8 0" />
        </g>

        <g fill="var(--far)">
          <path d="M0 334C200 322 400 326 600 330S1000 318 1200 324S1500 320 1600 326V560H0Z" />
          <path d="M120 334 150 270H262L290 334Z" />
          <path d="M380 334 398 296H466L486 334Z" />
          <path d="M1240 330 1268 248H1410L1442 330Z" />
          <path d="M1470 330 1488 288H1556L1578 330Z" />
        </g>

        <path
          fill="var(--mid)"
          d="M0 372C160 340 300 345 430 360S650 350 780 345S1000 362 1120 360S1330 330 1450 335S1570 350 1600 352V560H0Z"
        />

        <g className={styles.tower}>
          <path d="M762 346 776 214M798 346 784 214M776 214H784M766 310H794M770 270H790M773 238H787M766 310 790 270M794 310 770 270M770 270 787 238M790 270 773 238" />
          <path className={styles.waves} d="M766 196A20 20 0 0 1 794 196M757 184A33 33 0 0 1 803 184M748 172A46 46 0 0 1 812 172" />
          <circle className={styles.led} cx="780" cy="208" r="4.5" />
        </g>

        <path
          fill="var(--near)"
          d="M0 430C140 410 260 400 380 412S600 445 760 440S980 404 1100 402S1320 430 1460 432S1570 425 1600 422V560H0Z"
        />

        <g className={styles.wires}>
          <path d="M450 420V360M440 366H460M620 438V384M611 390H629" />
          <path className={styles.cable} d="M332 372Q395 392 442 366Q535 404 612 390Q700 386 776 292" />
        </g>

        <g>
          <path d="M264 364 301 336 338 364Z" fill="var(--ink-strong)" />
          <rect x="270" y="362" width="62" height="46" fill="var(--ink)" />
          <rect x="279" y="371" width="44" height="7" rx="2" fill="var(--ink-strong)" />
          <rect x="279" y="383" width="44" height="7" rx="2" fill="var(--ink-strong)" />
          <rect x="279" y="395" width="44" height="7" rx="2" fill="var(--ink-strong)" />
          <g className={styles.led}>
            <circle cx="316" cy="374.5" r="2" />
            <circle cx="309" cy="374.5" r="2" />
            <circle cx="316" cy="386.5" r="2" />
            <circle cx="316" cy="398.5" r="2" />
            <circle cx="302" cy="398.5" r="2" />
          </g>
        </g>

        <g>
          <g fill="var(--canopy)">
            <circle cx="1100" cy="300" r="50" />
            <circle cx="1064" cy="324" r="34" />
            <circle cx="1138" cy="320" r="38" />
            <circle cx="1100" cy="262" r="36" />
          </g>
          <g className={styles.branches}>
            <path d="M1100 404V262" />
            <path d="M1100 372C1100 352 1070 352 1070 332V300C1070 286 1100 290 1100 276" />
            <path d="M1100 346C1100 326 1130 326 1130 306V280" />
          </g>
          <g className={styles.commits}>
            {commits.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />
            ))}
          </g>
        </g>

        <g className={styles.person}>
          <circle cx="1086" cy="362" r="8.5" />
          <path d="M1080 403 1081 379Q1083 371 1090 372L1095 379 1094 403Z" />
          <path className={styles.limb} d="M1084 401 1061 391 1046 404" />
          <path className={styles.arm} d="M1086 381 1069 391" />
          <path className={styles.laptopBase} d="M1078 395 1059 389" />
          <path className={styles.screen} d="M1061 389 1054 370" />
        </g>

        <path
          fill="var(--bg)"
          d="M0 500C220 480 420 470 620 488S980 506 1180 492S1500 478 1600 486V560H0Z"
        />

        <foreignObject x="820" y="250" width="230" height="110">
          <HandNote text={note} arrow="down-right" animated className={styles.note} />
        </foreignObject>
      </svg>
    </div>
  );
}
