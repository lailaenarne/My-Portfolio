import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { SkillCategory, SkillNode } from '../data/portfolioData';

interface SkillOrbProps {
  skill: SkillNode;
  categoryId: SkillCategory['id'];
  index: number;
  isSelected: boolean;
  onSelect: (skillId: string) => void;
}

const GADGET_PALETTE: Record<
  SkillCategory['id'],
  {
    bezelSurface: string;
    visorSurface: string;
    accentColor: string;
    accentText: string;
    crownBg: string;
    ledColor: string;
    selectedRing: string;
    shadowTone: string;
    outerShadow: string;
  }
> = {
  languages: {
    bezelSurface:
      'bg-[conic-gradient(from_140deg,#FFF8FA,#E7C8D3,#FDF3F6,#D29FB2,#FFF8FA)] dark:bg-[conic-gradient(from_140deg,#4A3540,#251920,#5A404D,#1C1217,#4A3540)]',
    visorSurface:
      'bg-[radial-gradient(circle_at_35%_28%,#3A222E_0%,#24151D_56%,#140B10_100%)]',
    accentColor: '#F2A7C0',
    accentText: 'text-[#F2A7C0]',
    crownBg:
      'bg-gradient-to-b from-[#F2A7C0] via-[#BE4B72] to-[#7D2B48]',
    ledColor: 'bg-[#F2A7C0] shadow-[0_0_6px_#F2A7C0]',
    selectedRing:
      'ring-2 ring-[#BE4B72] dark:ring-[#F2A7C0] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#BE4B72]/25 dark:bg-[#F2A7C0]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(190,75,114,0.38),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(242,167,192,0.2)]',
  },
  'frameworks-data': {
    bezelSurface:
      'bg-[conic-gradient(from_140deg,#F5F7FD,#C4CEE8,#EFF3FB,#99ABD9,#F5F7FD)] dark:bg-[conic-gradient(from_140deg,#39456E,#1C2238,#465585,#141929,#39456E)]',
    visorSurface:
      'bg-[radial-gradient(circle_at_35%_28%,#242D4C_0%,#181E34_56%,#0E1221_100%)]',
    accentColor: '#8FA4E8',
    accentText: 'text-[#8FA4E8]',
    crownBg:
      'bg-gradient-to-b from-[#B4C4F4] via-[#3D4E81] to-[#243054]',
    ledColor: 'bg-[#8FA4E8] shadow-[0_0_6px_#8FA4E8]',
    selectedRing:
      'ring-2 ring-[#3D4E81] dark:ring-[#8FA4E8] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#3D4E81]/25 dark:bg-[#8FA4E8]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(61,78,129,0.36),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(143,164,232,0.2)]',
  },
  'tools-devops': {
    bezelSurface:
      'bg-[conic-gradient(from_140deg,#F3FBF9,#BBDCD5,#ECF8F5,#86BFB3,#F3FBF9)] dark:bg-[conic-gradient(from_140deg,#2D524C,#162B27,#36645D,#0E1D1B,#2D524C)]',
    visorSurface:
      'bg-[radial-gradient(circle_at_35%_28%,#1B3D38_0%,#122A27_56%,#0A1A18_100%)]',
    accentColor: '#7ED3C6',
    accentText: 'text-[#7ED3C6]',
    crownBg:
      'bg-gradient-to-b from-[#9FE2D7] via-[#2F7A70] to-[#1B4C45]',
    ledColor: 'bg-[#7ED3C6] shadow-[0_0_6px_#7ED3C6]',
    selectedRing:
      'ring-2 ring-[#2F7A70] dark:ring-[#7ED3C6] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#2F7A70]/25 dark:bg-[#7ED3C6]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(47,122,112,0.36),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(126,211,198,0.2)]',
  },
};

export function SkillOrb({
  skill,
  categoryId,
  index,
  isSelected,
  onSelect,
}: SkillOrbProps) {
  const prefersReducedMotion = useReducedMotion();
  const orbRef = useRef<HTMLButtonElement>(null);
  const palette = GADGET_PALETTE[categoryId];

  // Spring-driven pointer physics for 3D gadget tilt + magnetic pull
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawShiftX = useMotionValue(0);
  const rawShiftY = useMotionValue(0);
  const specX = useMotionValue(32);
  const specY = useMotionValue(26);

  const rotateX = useSpring(rawRotateX, { stiffness: 280, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 280, damping: 18 });
  const shiftX = useSpring(rawShiftX, { stiffness: 230, damping: 16 });
  const shiftY = useSpring(rawShiftY, { stiffness: 230, damping: 16 });

  const dynamicSpecular = useMotionTemplate`radial-gradient(circle at ${specX}% ${specY}%, rgba(255,255,255,0.42), transparent 55%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    rawRotateX.set((0.5 - relY) * 20);
    rawRotateY.set((relX - 0.5) * 20);
    rawShiftX.set((relX - 0.5) * 5);
    rawShiftY.set((relY - 0.5) * 5);
    specX.set(relX * 100);
    specY.set(relY * 100);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawShiftX.set(0);
    rawShiftY.set(0);
    specX.set(32);
    specY.set(26);
  };

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (skill.depthPercent / 100) * circumference;

  const bounceDuration = 3.2 + (index % 3) * 0.55;
  const bounceDelay = (index % 4) * 0.26;
  const unitCode = `MOD-${String(index + 1).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Gentle Hovering Bounce Wrapper (tight amplitude to stay inside bay) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                repeat: Infinity,
                duration: bounceDuration,
                delay: bounceDelay,
                ease: 'easeInOut',
              }
        }
      >
        {/* 3D Machined Gadget Orb Button */}
        <motion.button
          ref={orbRef}
          type="button"
          onClick={() => onSelect(skill.id)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-pressed={isSelected}
          aria-label={`${skill.name} gadget orb — ${skill.proficiencyLabel}`}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  transformPerspective: 780,
                  rotateX,
                  rotateY,
                  x: shiftX,
                  y: shiftY,
                  transformStyle: 'preserve-3d',
                }
          }
          className={`group relative w-[108px] h-[108px] sm:w-[114px] sm:h-[114px] rounded-full p-[7px] flex items-center justify-center transition-shadow duration-200 border border-white/85 dark:border-white/15 ${palette.bezelSurface} ${palette.outerShadow} ${
            isSelected ? palette.selectedRing : ''
          }`}
        >
          {/* Side Tactile Digital Crown & Hardware Pins */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-6 rounded-r-md border border-white/60 dark:border-white/20 shadow-sm ${palette.crownBg}`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1.5 top-[22%] w-1.5 h-1.5 rounded-full bg-black/25 dark:bg-white/30"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1.5 bottom-[22%] w-1.5 h-1.5 rounded-full bg-black/25 dark:bg-white/30"
          />

          {/* Machined Dial Degree Tick Marks around Metallic Bezel */}
          <svg
            viewBox="0 0 144 144"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
          >
            <circle
              cx="72"
              cy="72"
              r="67"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="2 7.2"
              className="text-black/20 dark:text-white/25"
            />
          </svg>

          {/* Recessed Glass OLED Visor Lens */}
          <span
            className={`relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center p-2 text-center border border-black/40 shadow-[inset_0_8px_18px_rgba(0,0,0,0.75),inset_0_-2px_6px_rgba(255,255,255,0.12)] ${palette.visorSurface}`}
          >
            {/* Rotating Inner Telemetry Scanner Ring */}
            <motion.svg
              viewBox="0 0 124 124"
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: isSelected ? 360 : 0 }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 16, ease: 'linear' }
              }
              className="pointer-events-none absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] opacity-45"
            >
              <circle
                cx="62"
                cy="62"
                r="57"
                fill="none"
                stroke={palette.accentColor}
                strokeWidth="1.2"
                strokeDasharray="6 6 2 6"
              />
            </motion.svg>

            {/* Segmented Digital Power Gauge Arc */}
            <svg
              viewBox="0 0 124 124"
              aria-hidden="true"
              className="pointer-events-none absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] -rotate-90"
            >
              <circle
                cx="62"
                cy="62"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3.2"
              />
              <motion.circle
                cx="62"
                cy="62"
                r={radius}
                fill="none"
                stroke={palette.accentColor}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={
                  prefersReducedMotion
                    ? { strokeDashoffset: dashOffset }
                    : { strokeDashoffset: circumference }
                }
                animate={{ strokeDashoffset: dashOffset }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </svg>

            {/* Curved Glass Dome Top Reflection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 inset-x-3 h-1/2 rounded-full bg-gradient-to-b from-white/25 via-white/8 to-transparent"
            />

            {/* Mouse-Tracking Dynamic Glint */}
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                style={{ background: dynamicSpecular }}
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            )}

            {/* Elevated Digital Telemetry Readout (3D Pop) */}
            <span
              style={
                prefersReducedMotion
                  ? undefined
                  : { transform: 'translateZ(14px)' }
              }
              className="relative z-10 flex flex-col items-center justify-center gap-0.5 px-1"
            >
              <span className="inline-flex items-center gap-1 font-mono-code text-[8.5px] tracking-wider uppercase text-white/65">
                <span className={`w-1.5 h-1.5 rounded-full ${palette.ledColor}`} />
                <span>{unitCode}</span>
              </span>
              <span className="font-display text-[11px] sm:text-xs font-bold leading-tight text-[#F8EFF2]">
                {skill.name}
              </span>
              <span
                className={`font-mono-code tabular-nums text-[9.5px] font-semibold ${palette.accentText}`}
              >
                {skill.depthPercent}% READY
              </span>
            </span>
          </span>
        </motion.button>
      </motion.div>

      {/* Soft Hover Pad Shadow synced to gadget bounce */}
      <motion.span
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scaleX: [1, 0.86, 1],
                opacity: [0.6, 0.35, 0.6],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                repeat: Infinity,
                duration: bounceDuration,
                delay: bounceDelay,
                ease: 'easeInOut',
              }
        }
        className={`mt-2 w-14 h-2 rounded-full blur-[2.5px] ${palette.shadowTone}`}
      />
    </div>
  );
}
