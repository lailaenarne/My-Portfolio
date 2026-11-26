import { ReactNode, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 6,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, { stiffness: 250, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 250, damping: 22 });

  const sheenBackground = useMotionTemplate`radial-gradient(460px circle at ${mouseX}% ${mouseY}%, rgba(232, 137, 168, 0.18), rgba(143, 164, 232, 0.08) 45%, transparent 72%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    mouseX.set(relX * 100);
    mouseY.set(relY * 100);

    rawRotateX.set((0.5 - relY) * maxTilt * 2);
    rawRotateY.set((relX - 0.5) * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              transformPerspective: 1100,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
      }
      className={`relative transition-shadow duration-200 shadow-[0_10px_28px_-18px_rgba(190,75,114,0.18)] dark:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_24px_54px_-18px_rgba(190,75,114,0.28)] dark:hover:shadow-[0_24px_54px_-18px_rgba(242,167,192,0.2)] ${className}`}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: sheenBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10"
        />
      )}
      {children}
    </motion.div>
  );
}
