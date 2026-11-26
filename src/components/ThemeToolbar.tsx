import { motion } from 'motion/react';
import { Moon, Palette } from 'lucide-react';
import { PageId } from './Header';

interface ThemeToolbarProps {
  activePage: PageId;
  theme: 'light' | 'dark';
  onSetTheme: (nextTheme: 'light' | 'dark') => void;
}

const PAGE_LABELS: Record<PageId, string> = {
  about: 'About & Overview',
  skills: 'Capabilities Matrix',
  projects: 'Bento Project Gallery',
  capstone: 'FaithPoint Capstone & CIT 240',
  resume: 'Curriculum Vitae & Resume',
  contact: 'Contact & Inquiry',
};

export function ThemeToolbar({
  activePage,
  theme,
  onSetTheme,
}: ThemeToolbarProps) {
  return (
    <div className="border-b border-[#EAD6DC] dark:border-[#33262D] bg-[#FAF0F2]/80 dark:bg-[#191216]/90 transition-colors duration-200">
      <div className="portfolio-container py-2.5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-medium text-[#665058] dark:text-[#B59EA7] flex items-center gap-2">
          <span>Portfolio</span>
          <span aria-hidden="true" className="text-[#D4B4BF] dark:text-[#4E3944]">
            /
          </span>
          <span className="font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
            {PAGE_LABELS[activePage]}
          </span>
        </p>

        {/* Live Theme Switcher: Pink Pastel & Dark Mode only */}
        <div
          role="group"
          aria-label="Theme mode switcher"
          className="inline-flex items-center p-1 rounded-xl bg-white dark:bg-[#140F12] border border-[#E5C6D0] dark:border-[#3D2C35]"
        >
          <button
            type="button"
            onClick={() => onSetTheme('light')}
            aria-pressed={theme === 'light'}
            className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              theme === 'light'
                ? 'text-white'
                : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
            }`}
          >
            {theme === 'light' && (
              <motion.span
                layoutId="live-theme-thumb"
                aria-hidden="true"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-[#BE4B72]"
              />
            )}
            <Palette className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
            <span className="relative z-10">Pink Pastel</span>
          </button>

          <button
            type="button"
            onClick={() => onSetTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              theme === 'dark'
                ? 'text-[#140F12]'
                : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
            }`}
          >
            {theme === 'dark' && (
              <motion.span
                layoutId="live-theme-thumb"
                aria-hidden="true"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-[#F2A7C0]"
              />
            )}
            <Moon className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
            <span className="relative z-10">Dark</span>
          </button>
        </div>
      </div>
    </div>
  );
}
