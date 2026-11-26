import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface KineticHeadlineProps {
  lines: string[];
  className?: string;
}

export function KineticHeadline({ lines, className = '' }: KineticHeadlineProps) {
  return (
    <span className={`block ${className}`}>
      {lines.map((line, lineIdx) => (
        <span key={line} className="block overflow-hidden py-0.5">
          <motion.span
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.48,
              delay: lineIdx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface KineticRoleTickerProps {
  roles: string[];
}

export function KineticRoleTicker({ roles }: KineticRoleTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border border-[#EAD6DC] dark:border-[#3D2C35] bg-white/80 dark:bg-[#1D161A]/80 overflow-hidden">
      <span className="text-xs font-medium text-[#665058] dark:text-[#B59EA7] whitespace-nowrap">
        Focus
      </span>
      <span aria-hidden="true" className="text-[#D4B4BF] dark:text-[#4E3944]">
        /
      </span>
      <div className="relative h-5 min-w-[195px] sm:min-w-[220px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0] whitespace-nowrap"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
