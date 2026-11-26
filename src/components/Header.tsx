import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

export type PageId = 'about' | 'skills' | 'projects' | 'capstone' | 'resume' | 'contact';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (pageId: PageId) => void;
}

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'capstone', label: 'Capstone' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#140F12]/90 backdrop-blur-md border-b border-[#E5C6D0] dark:border-[#33262D] transition-colors duration-200">
      {/* Subtle Top Multi-Hue Editorial Accent Line */}
      <div
        aria-hidden="true"
        className="h-[2.5px] w-full bg-gradient-to-r from-[#BE4B72] via-[#7A4988] to-[#3D4E81] dark:from-[#F2A7C0] dark:via-[#D5A6E6] dark:to-[#8FA4E8]"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#BE4B72] focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="portfolio-container h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Custom Brand Logo + Full Name (Single-line Brand Zone) */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
          className="inline-flex items-center gap-2.5 sm:gap-3 font-display text-base sm:text-lg font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2] whitespace-nowrap shrink-0 hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors"
        >
          <BrandLogo className="w-14 h-10" />
          <span>{PROFILE.name}</span>
        </a>

        {/* Zone 2: 6 concise single-line page navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-5 lg:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#1F171A] dark:text-white font-semibold'
                    : 'text-[#5E4B52] dark:text-[#C7B2BA] hover:text-[#BE4B72] dark:hover:text-[#F2A7C0]'
                }`}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="active-nav-underline"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute left-0 right-0 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#BE4B72] via-[#7A4988] to-[#3D4E81] dark:from-[#F2A7C0] dark:via-[#D5A6E6] dark:to-[#8FA4E8]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-[#D99BB0] dark:bg-[#7A4988] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action on desktop, mobile menu button on small screens */}
        <div className="flex items-center shrink-0">
          <motion.a
            href="#contact"
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#BE4B72] via-[#984A7F] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] text-[#1F171A] dark:text-[#F8EFF2] hover:bg-[#FAF0F2] dark:hover:bg-[#1D161A] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[66px] inset-x-0 bg-[#FDF7F8] dark:bg-[#140F12] border-b border-[#EAD6DC] dark:border-[#33262D] shadow-lg"
          >
            <nav
              aria-label="Mobile navigation"
              className="portfolio-container py-4 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3.5 py-3 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#F9E6EC] dark:bg-[#2A1D24] text-[#BE4B72] dark:text-[#F2A7C0] font-semibold'
                        : 'text-[#4D3B42] dark:text-[#D5C2C9] hover:bg-[#FAF0F2] dark:hover:bg-[#1D161A]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#BE4B72] to-[#3D4E81] rounded-xl transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
