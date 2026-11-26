import { motion, useReducedMotion } from 'motion/react';

interface BrandLogoProps {
  className?: string;
}

export const BRAND_LOGO_SRC =
  '/assets/aistudio/Laila_Mariel_Enarne_Tech_Monogram_04535ec8.png';

export function BrandLogo({ className = 'w-14 h-10' }: BrandLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#BE4B72] via-[#7A4988] to-[#3D4E81] p-[1.5px] shadow-sm shrink-0 ${className}`}
    >
      <div className="w-full h-full rounded-[10.5px] bg-[#090708] overflow-hidden flex items-center justify-center p-0.5">
        <img
          src={BRAND_LOGO_SRC}
          alt="Laila Mariel Enarne LME logo"
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}
