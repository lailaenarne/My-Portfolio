import { PROFILE } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';
import { NAV_ITEMS, PageId } from './Header';

interface FooterProps {
  activePage: PageId;
  onNavigate: (pageId: PageId) => void;
}

export function Footer({ activePage, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5C6D0] dark:border-[#33262D] bg-white/90 dark:bg-[#140F12]/90 backdrop-blur-sm py-10 transition-colors duration-200">
      <div className="portfolio-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-14 h-10" />
          <div className="space-y-0.5">
            <p className="font-display text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
              {PROFILE.name}
            </p>
            <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
              © {currentYear} {PROFILE.name}. Built with semantic HTML5, responsive CSS, and TypeScript.
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 text-xs font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-colors ${
                  isActive
                    ? 'text-[#BE4B72] dark:text-[#F2A7C0] font-semibold'
                    : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#3D4E81] dark:hover:text-[#8FA4E8]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
