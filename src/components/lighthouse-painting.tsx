import styles from './lighthouse-painting.module.css';

const GRASS_BLADES = [
  { x: 18, base: 282, h: 36, lean: -7, color: '#2b4413', delay: '-0.2s' },
  { x: 46, base: 282, h: 46, lean: 5, color: '#456721', delay: '-1.4s' },
  { x: 78, base: 282, h: 40, lean: -4, color: '#345218', delay: '-2.2s' },
  { x: 116, base: 282, h: 52, lean: 6, color: '#507526', delay: '-0.8s' },
  { x: 162, base: 282, h: 44, lean: -5, color: '#2e4915', delay: '-2.7s' },
  { x: 214, base: 282, h: 54, lean: 7, color: '#456721', delay: '-1.1s' },
  { x: 274, base: 282, h: 48, lean: -4, color: '#345218', delay: '-2.9s' },
  { x: 332, base: 282, h: 58, lean: 6, color: '#507526', delay: '-0.5s' },
  { x: 396, base: 282, h: 50, lean: -6, color: '#2e4915', delay: '-1.7s' },
  { x: 468, base: 282, h: 64, lean: 5, color: '#456721', delay: '-0.4s' },
  { x: 538, base: 282, h: 60, lean: -5, color: '#345218', delay: '-2.4s' },
  { x: 608, base: 282, h: 72, lean: 7, color: '#507526', delay: '-1.2s' },
  { x: 672, base: 282, h: 68, lean: -6, color: '#2e4915', delay: '-2.8s' },
  { x: 734, base: 282, h: 78, lean: 8, color: '#456721', delay: '-0.9s' },
  { x: 804, base: 282, h: 74, lean: -7, color: '#345218', delay: '-1.9s' },
  { x: 868, base: 282, h: 82, lean: 6, color: '#507526', delay: '-0.3s' },
  { x: 924, base: 282, h: 76, lean: -5, color: '#2e4915', delay: '-1.5s' }
] as const;

const COASTAL_LILIES = [
  { x: 148, y: 262, scale: 0.78, delay: '-0.7s' },
  { x: 304, y: 256, scale: 0.9, delay: '-1.9s' },
  { x: 492, y: 248, scale: 0.85, delay: '-2.5s' },
  { x: 636, y: 236, scale: 1.05, delay: '-0.4s' },
  { x: 764, y: 228, scale: 0.95, delay: '-1.4s' },
  { x: 886, y: 234, scale: 1.0, delay: '-2.2s' }
] as const;

const RAILING_POSTS = [682, 695, 709, 724, 739, 754, 769, 783, 796] as const;

/**
 * Twilight gouache lighthouse illustration (periwinkle sky, golden-peach clouds,
 * terracotta & lavender-white beacon, twilight sea, and swaying coastal cliff)
 * built with stacked inline SVG layers, CSS fractalNoise paper grain, and
 * hover-driven sea breeze physics inspired by leerob.com.
 */
export function LighthousePainting() {
  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Animated twilight gouache illustration of a coastal lighthouse guiding across golden-hour clouds and sea"
    >
      {/* Layer 1: Periwinkle-to-golden-peach sunset sky & glowing horizon */}
      <svg
        className={styles.layer}
        viewBox="0 0 960 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="196" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7289e0" />
            <stop offset="46%" stopColor="#93a5ea" />
            <stop offset="76%" stopColor="#f2c987" />
            <stop offset="100%" stopColor="#f8df97" />
          </linearGradient>
          <radialGradient id="lh-sunset" cx="390" cy="192" r="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9447" stopOpacity="0.92" />
            <stop offset="42%" stopColor="#f8c86a" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#f8c86a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="960" height="280" fill="url(#lh-sky)" />
        <ellipse cx="390" cy="192" rx="190" ry="72" fill="url(#lh-sunset)" />

        {/* Subtle horizontal twilight brush streaks */}
        <g stroke="#fde5a6" strokeLinecap="round" opacity="0.42">
          <line x1="60" y1="168" x2="290" y2="168" strokeWidth="6" />
          <line x1="340" y1="176" x2="590" y2="176" strokeWidth="5" />
          <line x1="810" y1="162" x2="948" y2="162" strokeWidth="5" />
        </g>
      </svg>

      {/* Layer 2: Dramatic plum-indigo & peach-gold layered gouache clouds */}
      <svg
        className={styles.layer}
        viewBox="0 0 960 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Back clouds: soft sunlit peach-yellow underbellies */}
        <g className={styles.cloudsBack}>
          <path
            d="M-20 112 C28 96 86 98 134 114 C178 96 248 98 292 118 C346 108 416 112 464 128 L-20 132 Z"
            fill="#f7c97e"
            opacity="0.88"
          />
          <path
            d="M280 144 C338 128 416 130 472 146 C526 132 598 136 648 152 L268 156 Z"
            fill="#fae095"
            opacity="0.86"
          />
          <path
            d="M780 120 C834 104 906 108 976 124 L976 146 L772 144 Z"
            fill="#f6c782"
            opacity="0.85"
          />
        </g>

        {/* Front clouds: rich plum-violet gouache silhouettes with warm undersides */}
        <g className={styles.cloudsFront}>
          {/* Upper left plum cloud */}
          <path
            d="M22 66 C48 42 104 38 144 54 C176 34 242 36 274 58 C306 54 334 68 324 82 L14 82 C6 76 12 68 22 66 Z"
            fill="#5a5687"
          />
          <path
            d="M42 78 C98 70 184 70 296 80 L282 88 C192 84 102 86 38 86 Z"
            fill="#f4b678"
            opacity="0.86"
          />

          {/* Mid-center dramatic twilight cloud bank */}
          <path
            d="M352 94 C382 70 436 68 474 84 C512 64 576 68 606 90 C634 88 656 102 646 114 L340 114 C334 108 340 98 352 94 Z"
            fill="#666296"
          />
          <path
            d="M366 110 C432 102 536 104 634 114 L616 122 C522 118 430 118 358 118 Z"
            fill="#f8cf84"
            opacity="0.9"
          />

          {/* Right edge cloud behind lighthouse */}
          <path
            d="M806 64 C838 44 892 44 926 60 C950 54 972 64 974 78 L796 78 C792 72 798 66 806 64 Z"
            fill="#5e5a8c"
          />
          <path
            d="M814 76 C862 72 918 72 968 78 L968 85 C914 82 858 82 808 82 Z"
            fill="#f3b67a"
            opacity="0.82"
          />
        </g>
      </svg>

      {/* Layer 3: Twilight lavender sea, pink coastal surf & iconic gouache lighthouse */}
      <svg
        className={styles.layer}
        viewBox="0 0 960 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lh-sea" x1="0" y1="190" x2="0" y2="274" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7776a4" />
            <stop offset="55%" stopColor="#9491bc" />
            <stop offset="100%" stopColor="#c4a9c4" />
          </linearGradient>
          <linearGradient id="lh-beam" x1="712" y1="74" x2="180" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff4c4" stopOpacity="0.86" />
            <stop offset="45%" stopColor="#fae095" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fae095" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lh-tower" x1="688" y1="118" x2="796" y2="248" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e2e2f7" />
            <stop offset="65%" stopColor="#cfcfe9" />
            <stop offset="100%" stopColor="#b9b8db" />
          </linearGradient>
        </defs>

        {/* Twilight ocean */}
        <rect x="0" y="190" width="960" height="90" fill="url(#lh-sea)" />

        {/* Sunset reflection & lavender-pink surf */}
        <g className={styles.surf}>
          <ellipse cx="390" cy="194" rx="76" ry="4.5" fill="#ffad61" opacity="0.78" />
          <line x1="120" y1="204" x2="292" y2="204" stroke="#626190" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <line x1="418" y1="209" x2="574" y2="209" stroke="#626190" strokeWidth="2.8" strokeLinecap="round" opacity="0.6" />
          <line x1="220" y1="222" x2="432" y2="222" stroke="#f0c8d3" strokeWidth="4" strokeLinecap="round" opacity="0.72" />
          <line x1="36" y1="234" x2="268" y2="234" stroke="#f4d4dc" strokeWidth="5.5" strokeLinecap="round" opacity="0.82" />
        </g>

        {/* Sweeping warm lighthouse beacon beam */}
        <polygon className={styles.beam} points="722,68 180,14 180,104 722,82" fill="url(#lh-beam)" />

        {/* Lighthouse architecture (positioned on the right third, echoing the reference) */}
        <g>
          {/* Tapered lavender-white tower body */}
          <polygon points="698,118 780,118 800,256 678,256" fill="url(#lh-tower)" />

          {/* Painterly cool periwinkle shadow plane on right side of tower */}
          <path
            d="M744 118 L780 118 L800 256 L752 256 C748 228 756 208 746 184 C738 164 748 142 744 118 Z"
            fill="#9d9dd0"
            opacity="0.74"
          />

          {/* Arched recessed doorway */}
          <path d="M718 244 L718 214 Q739 196 760 214 L760 244 Z" fill="#a8a7d6" />
          <path d="M726 244 L726 218 Q739 207 752 218 L752 244 Z" fill="#3a3860" />

          {/* Gallery deck underside shadow & top rim */}
          <ellipse cx="739" cy="118" rx="64" ry="12" fill="#52507d" />
          <ellipse cx="739" cy="113" rx="62" ry="10" fill="#d5d5f0" />

          {/* Terracotta-crimson lantern base cylinder */}
          <rect x="708" y="84" width="62" height="29" fill="#b9422b" />
          <rect x="742" y="84" width="28" height="29" fill="#922f1d" opacity="0.72" />

          {/* Crisp thin gallery railing */}
          <path d="M679 94 Q739 83 799 94" stroke="#302e52" strokeWidth="1.6" fill="none" />
          <g stroke="#302e52" strokeWidth="1.2" opacity="0.88">
            {RAILING_POSTS.map((x) => (
              <line key={x} x1={x} y1="90" x2={x} y2="112" />
            ))}
          </g>

          {/* Upper cornice ring */}
          <ellipse cx="739" cy="83" rx="46" ry="8" fill="#a83823" />

          {/* Glass lantern housing with warm glowing core */}
          <rect x="712" y="54" width="54" height="28" fill="#7c7399" opacity="0.62" />
          <ellipse className={styles.lanternGlow} cx="736" cy="68" rx="16" ry="11" fill="#fff1ba" />
          {/* Glass vertical mullions */}
          <g stroke="#4a2824" strokeWidth="1.4" opacity="0.8">
            <line x1="712" y1="54" x2="712" y2="82" />
            <line x1="726" y1="54" x2="726" y2="82" />
            <line x1="742" y1="54" x2="742" y2="82" />
            <line x1="756" y1="54" x2="756" y2="82" />
            <line x1="766" y1="54" x2="766" y2="82" />
          </g>

          {/* Terracotta lantern dome & spire */}
          <ellipse cx="739" cy="54" rx="34" ry="6" fill="#94301f" />
          <path d="M708 54 C708 31 770 31 770 54 Z" fill="#bf462e" />
          <path d="M739 33 C756 34 768 42 770 54 L744 54 Z" fill="#922f1d" opacity="0.6" />
          <line x1="739" y1="22" x2="739" y2="34" stroke="#b9422b" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="739" cy="21" r="2.2" fill="#d95c3f" />
        </g>
      </svg>

      {/* Layer 4: Sloped olive-moss coastal headland, swaying grass & yellow wildflowers */}
      <svg
        className={styles.layer}
        viewBox="0 0 960 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lh-cliff" x1="0" y1="210" x2="960" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#466820" />
            <stop offset="55%" stopColor="#3c5c1b" />
            <stop offset="100%" stopColor="#2c4513" />
          </linearGradient>
        </defs>

        {/* Diagonal grassy headland sweeping up toward the lighthouse base */}
        <path d="M-10 264 Q260 248 540 232 T970 202 L970 286 L-10 286 Z" fill="url(#lh-cliff)" />
        <path d="M-10 274 Q320 258 640 240 T970 216 L970 286 L-10 286 Z" fill="#2c4513" opacity="0.58" />

        {/* Wind-blown coastal grass blades */}
        {GRASS_BLADES.map((blade) => (
          <path
            key={blade.x}
            className={styles.sway}
            style={{ animationDelay: blade.delay }}
            d={`M${blade.x} ${blade.base} Q${blade.x + blade.lean * 0.55} ${blade.base - blade.h * 0.55} ${blade.x + blade.lean} ${blade.base - blade.h}`}
            stroke={blade.color}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        ))}

        {/* Iconic butter-yellow coastal lilies nodding in the sea breeze */}
        {COASTAL_LILIES.map((lily) => (
          <g
            key={lily.x}
            className={styles.sway}
            style={{ animationDelay: lily.delay }}
          >
            <g transform={`translate(${lily.x}, ${lily.y}) scale(${lily.scale})`}>
              <path d="M0 24 Q-2 12 0 0" stroke="#314e16" strokeWidth="2" strokeLinecap="round" />
              {/* Three expressive gouache lily petals */}
              <path d="M0 0 C-8 -6 -14 -2 -16 6 C-10 4 -4 3 0 0 Z" fill="#eed673" />
              <path d="M0 0 C2 -10 10 -12 16 -6 C10 -2 5 0 0 0 Z" fill="#f5e189" />
              <path d="M0 0 C6 4 10 10 8 16 C4 11 1 6 0 0 Z" fill="#dec156" />
              <circle cx="0" cy="0" r="2.2" fill="#c79534" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
