export const DINO_INK = '#10233e';
export const DINO_BLUE = '#3d8af7';

export const DINO_STAND_PATH =
  'M56 14H90A6 6 0 0 1 96 20V33A4 4 0 0 1 92 37H73V41H86A2.5 2.5 0 0 1 88.5 43.5V44A2.5 2.5 0 0 1 86 46.5H70V55H79A2.5 2.5 0 0 1 81.5 57.5V62.5A2.2 2.2 0 0 1 77 62.5V59.5H70V70C70 77.5 65.5 83.5 59.5 87C58.5 91 58.5 95 58.5 100H63.5A2.5 2.5 0 0 1 66 102.5V103.5A2.5 2.5 0 0 1 63.5 106H54.5A2.5 2.5 0 0 1 52 103.5V90C52 88 50.5 87 48.5 87C46.5 87 45.5 88.5 44.5 91.5C43.5 94.5 43.5 97 43.5 100H48.5A2.5 2.5 0 0 1 51 102.5V103.5A2.5 2.5 0 0 1 48.5 106H39.5A2.5 2.5 0 0 1 37 103.5V88C37 85 35 83 31.5 81C21.5 75.5 15 66 15 54V45A2.5 2.5 0 0 1 20 44.5C21.5 53 26 58 31.5 58C38 58 45.5 49.5 51 40.5V19A5 5 0 0 1 56 14Z';

export const DINO_WAVE_PATH =
  'M56 14H90A6 6 0 0 1 96 20V33A4 4 0 0 1 92 37H73V41H86A2.5 2.5 0 0 1 88.5 43.5V44A2.5 2.5 0 0 1 86 46.5H70V56H77.5V52.5A2.2 2.2 0 0 1 82 52.5V58A2.5 2.5 0 0 1 79.5 60.5H70V70C70 77.5 65.5 83.5 59.5 87C58.8 90 58.5 92.5 58.5 95H63.5A2.5 2.5 0 0 1 66 97.5V98.5A2.5 2.5 0 0 1 63.5 101H54.5A2.5 2.5 0 0 1 52 98.5V90C52 88 50.5 87 48.5 87C46.5 87 45.5 88.5 44.5 91.5C43.5 94.5 43.5 97 43.5 100H48.5A2.5 2.5 0 0 1 51 102.5V103.5A2.5 2.5 0 0 1 48.5 106H39.5A2.5 2.5 0 0 1 37 103.5V88C37 85 35 83 31.5 81C21.5 75.5 15 66 15 54V45A2.5 2.5 0 0 1 20 44.5C21.5 53 26 58 31.5 58C38 58 45.5 49.5 51 40.5V19A5 5 0 0 1 56 14Z';

export function DinoMark({
  variant = 'stand',
  size = 20,
  className = ''
}: {
  variant?: 'stand' | 'wave';
  size?: number;
  className?: string;
}) {
  const path = variant === 'wave' ? DINO_WAVE_PATH : DINO_STAND_PATH;
  return (
    <svg
      width={size}
      height={size}
      viewBox="8 8 98 104"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} fill={DINO_BLUE} />
      <rect x="61" y="20" width="6.5" height="6.5" rx="1.6" fill="#ffffff" />
    </svg>
  );
}

/**
 * Quiet ink-and-wash vignette for /beliefs: the blue T-Rex beside a true-north compass.
 */
export function DinoCompassVignette() {
  return (
    <svg
      viewBox="0 0 240 132"
      className="w-44 h-auto text-[var(--text-heading)]"
      role="img"
      aria-label="Minimal illustration of a blue dinosaur beside a compass pointing north"
    >
      {/* Horizon line */}
      <path
        d="M12 114 Q 120 109, 228 114"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Subtle sprout */}
      <path
        d="M124 112 C124 103, 124 98, 124 92"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M124 102 C116 101, 113 96, 116 92 C120 92, 124 97, 124 102 Z" fill="#5a9e67" />
      <path d="M124 97 C132 96, 135 90, 131 87 C127 87, 124 92, 124 97 Z" fill="#5a9e67" />
      {/* Editorial Compass */}
      <g transform="translate(178 68)">
        <circle cx="0" cy="-35" r="5" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="29" fill="var(--surface-subtle)" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.6" />
        <circle cx="0" cy="0" r="23" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M0 -20 L5 0 L0 4 L-5 0 Z" fill="#df4b3e" />
        <path d="M0 20 L5 0 L0 -4 L-5 0 Z" fill={DINO_BLUE} opacity="0.88" />
        <circle cx="0" cy="0" r="2.8" fill="var(--bg)" />
      </g>
      {/* Blue Dino (lineless gouache) */}
      <g transform="translate(22 20) scale(0.86)">
        <ellipse cx="51" cy="106" rx="24" ry="3.8" fill="currentColor" opacity="0.12" />
        <path d={DINO_WAVE_PATH} fill={DINO_BLUE} />
        <rect x="61" y="20" width="6.5" height="6.5" rx="1.6" fill="#faf6ec" />
      </g>
    </svg>
  );
}

/**
 * Minimal unplugged-cable dino vignette for the 404 page.
 */
export function DinoOfflineVignette() {
  return (
    <svg
      viewBox="0 0 240 132"
      className="w-48 h-auto text-[var(--text-heading)]"
      role="img"
      aria-label="Minimal illustration of a puzzled blue dinosaur holding an unplugged cable"
    >
      <path
        d="M12 114 H228"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Wall socket */}
      <rect
        x="170"
        y="46"
        width="44"
        height="54"
        rx="8"
        fill="var(--surface-subtle)"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.6"
      />
      <path
        d="M185 65 V76 M199 65 V76"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Loose cable */}
      <path
        d="M98 76 C116 96, 134 106, 160 98"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Dino (lineless) */}
      <g transform="translate(22 18) scale(0.88)">
        <ellipse cx="51" cy="106" rx="24" ry="3.8" fill="currentColor" opacity="0.12" />
        <path d={DINO_STAND_PATH} fill={DINO_BLUE} />
        <circle cx="64.5" cy="23.5" r="4" fill="#faf6ec" />
        <circle cx="65" cy="23.5" r="1.6" fill={DINO_INK} />
        <path
          d="M102 15 C102 9, 112 8, 112 14 C112 18, 107 18, 107 22"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="107" cy="28" r="1.8" fill="currentColor" opacity="0.55" />
      </g>
    </svg>
  );
}
