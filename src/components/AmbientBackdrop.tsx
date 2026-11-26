import { motion, useReducedMotion } from 'motion/react';

type BubbleTone = 'rose' | 'lilac' | 'indigo' | 'sage';

interface FloatingBubble {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  tone: BubbleTone;
}

const BUBBLE_TONE_CLASSES: Record<BubbleTone, string> = {
  rose: 'border-[#E2A9BD]/75 dark:border-[#F2A7C0]/30 bg-gradient-to-br from-white/75 via-[#FBDCE7]/40 to-[#F3B6CC]/25 dark:from-[#F2A7C0]/18 dark:via-[#BE4B72]/10 dark:to-transparent',
  lilac:
    'border-[#D0B8DF]/75 dark:border-[#D5A6E6]/30 bg-gradient-to-br from-white/75 via-[#EFE2F8]/42 to-[#D8BEEB]/25 dark:from-[#D5A6E6]/18 dark:via-[#7A4988]/10 dark:to-transparent',
  indigo:
    'border-[#B9C5E6]/75 dark:border-[#8FA4E8]/30 bg-gradient-to-br from-white/75 via-[#E4EBF9]/42 to-[#C4D1F0]/25 dark:from-[#8FA4E8]/18 dark:via-[#3D4E81]/10 dark:to-transparent',
  sage: 'border-[#B4DBD4]/75 dark:border-[#7ED3C6]/30 bg-gradient-to-br from-white/75 via-[#E1F4F0]/42 to-[#BEE4DD]/25 dark:from-[#7ED3C6]/18 dark:via-[#2F7A70]/10 dark:to-transparent',
};

const BUBBLES: FloatingBubble[] = [
  { id: 1, left: '4%', size: 54, duration: 18, delay: -2, sway: 18, opacity: 0.72, tone: 'rose' },
  { id: 2, left: '9%', size: 22, duration: 13, delay: -7, sway: -12, opacity: 0.65, tone: 'indigo' },
  { id: 3, left: '16%', size: 38, duration: 21, delay: -11, sway: 14, opacity: 0.6, tone: 'lilac' },
  { id: 4, left: '24%', size: 16, duration: 12, delay: -4, sway: -10, opacity: 0.68, tone: 'sage' },
  { id: 5, left: '33%', size: 68, duration: 25, delay: -15, sway: 20, opacity: 0.45, tone: 'rose' },
  { id: 6, left: '44%', size: 26, duration: 15, delay: -9, sway: -14, opacity: 0.56, tone: 'indigo' },
  { id: 7, left: '56%', size: 42, duration: 20, delay: -3, sway: 16, opacity: 0.52, tone: 'lilac' },
  { id: 8, left: '65%', size: 18, duration: 14, delay: -10, sway: -12, opacity: 0.65, tone: 'rose' },
  { id: 9, left: '74%', size: 62, duration: 23, delay: -6, sway: 18, opacity: 0.52, tone: 'sage' },
  { id: 10, left: '82%', size: 30, duration: 16, delay: -12, sway: -16, opacity: 0.62, tone: 'indigo' },
  { id: 11, left: '89%', size: 48, duration: 19, delay: -5, sway: 15, opacity: 0.68, tone: 'lilac' },
  { id: 12, left: '94%', size: 20, duration: 13, delay: -8, sway: -10, opacity: 0.72, tone: 'rose' },
  { id: 13, left: '12%', size: 28, duration: 17, delay: -14, sway: 12, opacity: 0.62, tone: 'sage' },
  { id: 14, left: '91%', size: 74, duration: 26, delay: -18, sway: -18, opacity: 0.48, tone: 'indigo' },
];

export function AmbientBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Architectural Blueprint Grid + Dot Matrix */}
      <div className="absolute inset-0 bg-pastel-blueprint opacity-80 dark:opacity-65" />

      {/* 2. Harmonized Pastel Rose, Lilac, Indigo & Sage Mesh Auras */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 36, -18, 0],
                y: [0, 24, -14, 0],
                scale: [1, 1.06, 0.98, 1],
              }
        }
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        className="absolute -top-36 -left-24 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(244,180,203,0.42)_0%,rgba(244,180,203,0.12)_48%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(190,75,114,0.22)_0%,rgba(190,75,114,0.06)_50%,transparent_72%)]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -32, 20, 0],
                y: [0, -28, 16, 0],
                scale: [1, 0.96, 1.05, 1],
              }
        }
        transition={{ repeat: Infinity, duration: 24, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-32 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(196,209,240,0.42)_0%,rgba(235,196,229,0.18)_46%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(61,78,129,0.22)_0%,rgba(122,73,136,0.08)_48%,transparent_72%)]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 24, -24, 0],
                y: [0, -18, 18, 0],
              }
        }
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        className="absolute -bottom-40 left-1/3 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,rgba(190,228,221,0.38)_0%,rgba(250,206,220,0.14)_50%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(47,122,112,0.16)_0%,rgba(242,167,192,0.04)_50%,transparent_72%)]"
      />

      {/* 3. Large Curved ICT Circuit & Topology Arcs */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-55 dark:opacity-45"
      >
        <path
          id="bg-circuit-top"
          d="M -40 160 C 240 160, 260 60, 520 60 L 820 60 C 980 60, 1080 180, 1280 180 L 1480 180"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="6 6"
          className="text-[#D4B6D9] dark:text-[#4A344D]"
        />
        <path
          id="bg-circuit-bottom"
          d="M -40 740 L 220 740 C 380 740, 440 830, 660 830 L 1060 830 C 1220 830, 1290 660, 1480 660"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-[#C7D3EA] dark:text-[#333D5C]"
        />

        <circle
          cx="120"
          cy="320"
          r="64"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 5"
          className="text-[#DFB6C4] dark:text-[#4A3440]"
        />
        <circle
          cx="1320"
          cy="520"
          r="86"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="text-[#BFCBE6] dark:text-[#333D5C]"
        />
        <circle
          cx="1320"
          cy="520"
          r="54"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#B8DCD5] dark:text-[#2A4945]"
        />

        <circle cx="520" cy="60" r="4" className="fill-[#BE4B72] dark:fill-[#F2A7C0]" />
        <circle cx="1280" cy="180" r="4" className="fill-[#7A4988] dark:fill-[#D5A6E6]" />
        <circle cx="220" cy="740" r="4" className="fill-[#3D4E81] dark:fill-[#8FA4E8]" />
        <circle cx="1060" cy="830" r="4" className="fill-[#2F7A70] dark:fill-[#7ED3C6]" />

        {!prefersReducedMotion && (
          <>
            <circle r="4.5" className="fill-[#BE4B72] dark:fill-[#F2A7C0]">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                path="M -40 160 C 240 160, 260 60, 520 60 L 820 60 C 980 60, 1080 180, 1280 180 L 1480 180"
              />
            </circle>
            <circle r="4" className="fill-[#3D4E81] dark:fill-[#8FA4E8]">
              <animateMotion
                dur="14s"
                repeatCount="indefinite"
                path="M -40 740 L 220 740 C 380 740, 440 830, 660 830 L 1060 830 C 1220 830, 1290 660, 1480 660"
              />
            </circle>
          </>
        )}
      </svg>

      {/* 4. Multi-Hue Translucent Pastel Bubbles */}
      <div className="absolute inset-0">
        {BUBBLES.map((bubble) => (
          <motion.div
            key={bubble.id}
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              bottom: prefersReducedMotion ? `${(bubble.id * 11) % 80}%` : '-90px',
              opacity: prefersReducedMotion ? bubble.opacity * 0.65 : undefined,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: ['0vh', '-115vh'],
                    x: [0, bubble.sway, -bubble.sway * 0.6, 0],
                    opacity: [0, bubble.opacity, bubble.opacity, 0],
                    scale: [0.88, 1, 1.04, 0.94],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: bubble.duration,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
            className={`absolute rounded-full border shadow-[inset_0_2px_8px_rgba(255,255,255,0.68)] dark:shadow-[inset_0_2px_8px_rgba(242,167,192,0.12)] ${BUBBLE_TONE_CLASSES[bubble.tone]}`}
          >
            <span className="absolute top-[18%] left-[20%] w-[24%] h-[24%] rounded-full bg-white/85 dark:bg-[#F8EFF2]/35" />
          </motion.div>
        ))}
      </div>

      {/* 5. Floating Marginal ICT Wireframe Motifs (Desktop Margins Only) */}
      <div className="hidden xl:block">
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute top-44 left-7 w-14 h-14 rounded-2xl border border-[#E5C6D0] dark:border-[#3D2C35] bg-white/55 dark:bg-[#1D161A]/55 backdrop-blur-[2px] flex items-center justify-center font-mono-code text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0]"
        >
          &lt;/&gt;
        </motion.div>

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 12, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
          className="absolute bottom-32 left-10 w-12 h-12 rounded-xl border border-[#C4D1F0] dark:border-[#333D5C] bg-white/55 dark:bg-[#1D161A]/55 backdrop-blur-[2px] flex items-center justify-center font-mono-code text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8]"
        >
          {'{ }'}
        </motion.div>

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], rotate: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 7.8, ease: 'easeInOut' }}
          className="absolute top-64 right-8 w-14 h-14 rounded-2xl border border-[#BEE4DD] dark:border-[#2A4945] bg-white/55 dark:bg-[#1D161A]/55 backdrop-blur-[2px] flex items-center justify-center font-mono-code text-xs font-semibold text-[#2F7A70] dark:text-[#7ED3C6]"
        >
          [ ]
        </motion.div>

        {/* Isometric 3D Wireframe Cube (Bottom Right) */}
        <motion.svg
          viewBox="0 0 64 64"
          fill="none"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, 14, 0], rotate: [0, 14, 0] }
          }
          transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
          className="absolute bottom-24 right-10 w-16 h-16 opacity-65 dark:opacity-45 text-[#7A4988] dark:text-[#D5A6E6]"
        >
          <polygon
            points="32,6 56,19 56,45 32,58 8,45 8,19"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M32 6v26m0 0l24-13m-24 13L8 19m24 13v26"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="3 3"
          />
        </motion.svg>

        {/* Isometric 3D Faceted Prism (Mid Left) */}
        <motion.svg
          viewBox="0 0 64 64"
          fill="none"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -10, 0], rotate: [0, -16, 0] }
          }
          transition={{ repeat: Infinity, duration: 9.5, ease: 'easeInOut' }}
          className="absolute top-[54%] left-6 w-14 h-14 opacity-60 dark:opacity-45 text-[#BE4B72] dark:text-[#F2A7C0]"
        >
          <polygon
            points="32,6 54,32 32,58 10,32"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 32h44M32 6l-8 26 8 26M32 6l8 26-8 26"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </motion.svg>
      </div>
    </div>
  );
}
