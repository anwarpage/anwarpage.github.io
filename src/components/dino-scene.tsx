'use client';

import { useState } from 'react';
import { DINO_WAVE_PATH } from '@/components/dino-mark';
import styles from './dino-scene.module.css';

/**
 * Lineless Editorial Gouache / Mid-Century Risograph frontispiece illustration.
 * Depicts Anwar's blue T-Rex mascot in a sunlit Kalimantan meadow overlooking
 * a calm river and geometric skyline — zero thick black outlines, layered warm
 * gouache foliage, painterly sky strokes, and subtle breeze motion on hover.
 */
export function DinoScene() {
  const [breezeLocked, setBreezeLocked] = useState(false);

  return (
    <div
      className={styles.plate}
      data-breeze={breezeLocked ? 'active' : 'idle'}
      onClick={() => setBreezeLocked((prev) => !prev)}
      role="img"
      aria-label="Lineless editorial gouache illustration of Anwar's blue T-Rex mascot in a breezy meadow with colorful foliage, golden reeds, calm river, and distant geometric skyline."
    >
      <svg
        className={`${styles.canvas} ${styles.swayRoot}`}
        viewBox="0 0 960 380"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gouache-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-top)" />
            <stop offset="58%" stopColor="var(--sky-mid)" />
            <stop offset="100%" stopColor="var(--sky-bot)" />
          </linearGradient>
        </defs>

        {/* 1. Gouache sky wash + diagonal dry-brush strokes */}
        <rect x="0" y="0" width="960" height="270" fill="url(#gouache-sky)" />
        <g stroke="var(--sky-stroke)" strokeLinecap="round" fill="none">
          <path d="M-20 74 Q 180 42, 390 12" strokeWidth="14" />
          <path d="M120 112 Q 340 76, 560 44" strokeWidth="9" />
          <path d="M460 124 Q 680 86, 940 50" strokeWidth="12" />
          <path d="M620 42 Q 790 18, 980 -8" strokeWidth="10" />
          <path d="M20 156 Q 220 126, 420 102" strokeWidth="6" />
        </g>

        {/* Stars (only visible in dark mode) */}
        <g style={{ opacity: 'var(--star-opacity)' }}>
          <circle cx="92" cy="42" r="1.6" fill="#faf4dc" className={styles.starTwinkle} />
          <circle cx="242" cy="28" r="1.3" fill="#faf4dc" />
          <circle cx="418" cy="48" r="1.7" fill="#faf4dc" className={styles.starTwinkle} />
          <circle cx="614" cy="30" r="1.4" fill="#faf4dc" />
          <circle cx="808" cy="54" r="1.6" fill="#faf4dc" className={styles.starTwinkle} />
          <circle cx="894" cy="26" r="1.2" fill="#faf4dc" />
        </g>

        {/* 2. Sculptural cream gouache clouds */}
        <g className={styles.clouds}>
          <path
            d="M-30 88 C-10 44, 58 26, 114 44 C144 12, 224 14, 256 48 C294 42, 336 62, 332 94 Z"
            fill="var(--cloud)"
          />
          <path
            d="M668 92 C682 40, 748 16, 804 34 C842 6, 920 14, 960 48 L985 98 Z"
            fill="var(--cloud)"
          />
        </g>
        <g className={styles.cloudsSlow}>
          <path
            d="M368 134 C382 98, 434 84, 476 98 C506 72, 572 74, 598 106 C628 104, 654 118, 650 138 Z"
            fill="var(--cloud)"
            opacity="0.92"
          />
        </g>

        {/* 3. Lineless geometric skyline (mid-century architectural blocks) */}
        <g>
          {/* Far left navy tower */}
          <rect x="64" y="102" width="54" height="122" fill="var(--bldg-navy)" />
          <g fill="var(--sky-bot)" opacity="0.55">
            {[114, 128, 142, 156, 170, 184].map((y) => (
              <rect key={`nl-${y}`} x="74" y={y} width="34" height="4" />
            ))}
          </g>

          {/* Cream low-rise */}
          <rect x="130" y="156" width="66" height="68" fill="var(--bldg-cream)" />
          <g fill="var(--bldg-navy)" opacity="0.65">
            {[142, 154, 166, 178].map((x) => (
              <g key={`cr-${x}`}>
                <rect x={x} y="168" width="6" height="7" />
                <rect x={x} y="182" width="6" height="7" />
              </g>
            ))}
          </g>

          {/* Ochre stepped tower */}
          <rect x="212" y="128" width="48" height="96" fill="var(--bldg-ochre)" />
          <polygon points="212,128 236,104 260,128" fill="var(--bldg-navy)" />
          <g fill="var(--bldg-navy)" opacity="0.6">
            {[140, 154, 168, 182].map((y) => (
              <rect key={`oc-${y}`} x="222" y={y} width="28" height="5" />
            ))}
          </g>

          {/* Teal modernist tower */}
          <rect x="526" y="112" width="52" height="114" fill="var(--bldg-teal)" />
          <g fill="var(--bldg-cream)" opacity="0.35">
            <rect x="536" y="122" width="4" height="86" />
            <rect x="546" y="122" width="4" height="86" />
            <rect x="556" y="122" width="4" height="86" />
            <rect x="566" y="122" width="4" height="86" />
          </g>

          {/* Coral block */}
          <rect x="592" y="154" width="64" height="72" fill="var(--bldg-coral)" />
          <g fill="var(--bldg-cream)" opacity="0.72">
            {[164, 176, 188, 200].map((y) => (
              <rect key={`co-${y}`} x="602" y={y} width="44" height="4" />
            ))}
          </g>

          {/* Tall sky-blue striped tower */}
          <path d="M674 226 L684 82 Q 704 68, 724 82 L734 226 Z" fill="var(--bldg-sky)" />
          <g fill="var(--cloud)" opacity="0.65">
            {[94, 108, 122, 136, 150, 164, 178, 192].map((y) => (
              <rect key={`sk-${y}`} x="684" y={y} width="40" height="4" />
            ))}
          </g>

          {/* Rightmost warm cream & gold tower */}
          <rect x="756" y="138" width="58" height="88" fill="var(--bldg-cream)" />
          <g fill="var(--bldg-sky)" opacity="0.75">
            {[148, 160, 172, 184].map((y) => (
              <rect key={`rt-${y}`} x="766" y={y} width="38" height="5" />
            ))}
          </g>

          <rect x="832" y="108" width="56" height="118" fill="var(--bldg-ochre)" />
          <polygon points="832,108 860,86 888,108" fill="var(--bldg-navy)" />
          <g fill="var(--bldg-navy)" opacity="0.7">
            {[120, 134, 148, 162, 176].map((y) => (
              <g key={`go-${y}`}>
                <rect x="844" y={y} width="7" height="7" />
                <rect x="857" y={y} width="7" height="7" />
                <rect x="870" y={y} width="7" height="7" />
              </g>
            ))}
          </g>
        </g>

        {/* 4. Calm gouache river band */}
        <path
          d="M-10 218 Q 260 202, 520 216 T 970 204 L970 278 L-10 278 Z"
          fill="var(--water)"
        />
        <g className={styles.waterShimmer} stroke="var(--water-glint)" strokeLinecap="round">
          <line x1="88" y1="236" x2="210" y2="233" strokeWidth="3" />
          <line x1="420" y1="242" x2="560" y2="238" strokeWidth="3.2" />
          <line x1="690" y1="232" x2="835" y2="228" strokeWidth="2.8" />
        </g>

        {/* 5. Layered lineless gouache foliage band (coral, pink, gold, olive, deep green) */}
        <g>
          {/* Left bank cluster */}
          <g className={styles.bush}>
            <path d="M-10 264 C10 214, 72 212, 92 264 Z" fill="var(--bush-deep)" />
            <path d="M58 268 C78 220, 144 218, 166 268 Z" fill="var(--bush-pink)" />
            <path d="M100 264 L112 232 M112 264 L126 236" stroke="#d9728b" strokeWidth="2" strokeLinecap="round" />
            <path d="M138 270 C158 226, 218 226, 236 270 Z" fill="var(--bush-gold)" />
            <path d="M180 266 L188 238 M192 266 L202 242" stroke="#c89223" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Center-left small cream house with coral roof */}
          <g transform="translate(232 232)">
            <rect x="0" y="14" width="44" height="28" fill="var(--bldg-cream)" />
            <polygon points="-4,14 22,-4 48,14" fill="var(--bush-coral)" />
            <rect x="10" y="22" width="7" height="9" fill="var(--bldg-navy)" />
            <rect x="27" y="22" width="7" height="9" fill="var(--bldg-navy)" />
          </g>

          {/* Center & right foliage */}
          <g className={styles.bushAlt}>
            <path d="M272 272 C292 230, 352 230, 370 272 Z" fill="var(--bush-olive)" />
            <path d="M472 272 C492 222, 560 220, 582 272 Z" fill="var(--bush-coral)" />
            <path d="M518 268 L526 236 M532 268 L544 240" stroke="#b33429" strokeWidth="2" strokeLinecap="round" />
            <path d="M558 274 C580 226, 650 224, 672 274 Z" fill="var(--bush-olive)" />
          </g>

          <g className={styles.bush}>
            <path d="M648 272 C668 218, 742 216, 766 272 Z" fill="var(--bush-pink)" />
            <path d="M744 272 C764 224, 830 224, 850 272 Z" fill="var(--bush-gold)" />
            <path d="M826 272 C850 212, 926 208, 970 272 Z" fill="var(--bush-deep)" />
          </g>
        </g>

        {/* 6. Foreground rolling green meadow with painterly stripes + golden wheat hill */}
        <path
          d="M-10 278 Q 220 246, 520 290 T 970 270 L970 390 L-10 390 Z"
          fill="var(--meadow-base)"
        />
        <g stroke="var(--meadow-stripe)" strokeWidth="2.6" strokeLinecap="round" opacity="0.72" fill="none">
          <path d="M-10 296 Q 210 268, 490 310" />
          <path d="M-10 316 Q 220 288, 510 330" />
          <path d="M-10 336 Q 230 310, 530 352" />
          <path d="M-10 356 Q 240 332, 540 374" />
        </g>

        {/* Warm golden wheat slope on right */}
        <path
          d="M446 390 Q 670 292, 970 256 L970 390 Z"
          fill="var(--wheat-field)"
        />

        {/* 7. Anwar's Iconic Blue T-Rex — rendered in clean lineless gouache */}
        <g transform="translate(332 168) scale(1.66)">
          {/* Soft ground shadow */}
          <ellipse cx="52" cy="106" rx="30" ry="5.5" fill="var(--meadow-stripe)" opacity="0.48" />
          <g className={styles.dino}>
            {/* Main lineless cobalt body */}
            <path d={DINO_WAVE_PATH} fill="var(--dino-main)" />
            {/* Subtle gouache shading along lower tail & belly */}
            <path
              d="M20 56 C24 68, 34 76, 44 82 C49 85, 58 84, 64 78 C60 83, 52 87, 44 86 C32 84, 21 72, 18 58 Z"
              fill="var(--dino-shade)"
              opacity="0.42"
            />
            {/* Crisp cream eye */}
            <g className={styles.dinoEye}>
              <rect x="61" y="20" width="6.8" height="6.8" rx="1.8" fill="var(--dino-eye)" />
            </g>
          </g>
          {/* Warm ochre spark beside the dino's raised hand */}
          <path
            className={styles.dinoSpark}
            d="M104 26 L106.2 31.8 L112 34 L106.2 36.2 L104 42 L101.8 36.2 L96 34 L101.8 31.8 Z"
            fill="var(--bush-gold)"
          />
        </g>

        {/* 8. Swaying golden wheat stalks & foreground meadow tufts */}
        <g stroke="var(--wheat-stalk)" strokeWidth="2.4" strokeLinecap="round" fill="none">
          {[540, 584, 628, 676, 724, 770, 818, 866, 914].map((x, idx) => {
            const baseY = 382 - idx * 7;
            const cls = idx % 2 === 0 ? styles.wheat : styles.wheatAlt;
            return (
              <g key={x} className={cls}>
                <path d={`M ${x} ${baseY} Q ${x + 5} ${baseY - 28}, ${x + 10} ${baseY - 52}`} />
                <path d={`M ${x + 6} ${baseY - 34} L ${x - 2} ${baseY - 46}`} />
                <path d={`M ${x + 8} ${baseY - 26} L ${x + 16} ${baseY - 38}`} />
                <circle cx={x + 10} cy={baseY - 54} r="2.6" fill="var(--bush-coral)" stroke="none" />
              </g>
            );
          })}
        </g>

        {/* Soft foreground grass blades on left */}
        <g stroke="var(--bush-deep)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M58 378 Q 52 350, 44 338" className={styles.wheat} />
          <path d="M72 380 Q 78 352, 86 340" className={styles.wheatAlt} />
          <path d="M188 380 Q 182 354, 174 342" className={styles.wheatAlt} />
          <path d="M202 382 Q 208 356, 218 346" className={styles.wheat} />
        </g>
      </svg>
    </div>
  );
}
