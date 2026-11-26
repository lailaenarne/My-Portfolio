import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  containerClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#FAF0F2] dark:bg-[#1D161A]',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${containerClassName} flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF0F2] via-[#FDF7F8] to-[#F5DCE4] dark:from-[#1D161A] dark:via-[#140F12] dark:to-[#291C23]`}
      >
        <Layers
          className="w-8 h-8 text-[#BE4B72]/60 dark:text-[#F2A7C0]/60 mb-3"
          aria-hidden="true"
        />
        <span className="font-display text-sm font-semibold text-[#4D3B42] dark:text-[#E7D4DB]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
        loading="lazy"
      />
    </div>
  );
}
