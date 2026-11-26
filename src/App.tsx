import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { CapstoneSection } from './components/CapstoneSection';
import { CaseStudyDrawer } from './components/CaseStudyDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header, PageId } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { SkillsSection } from './components/SkillsSection';
import { ThemeToolbar } from './components/ThemeToolbar';
import { ProjectItem } from './data/portfolioData';

const VALID_PAGES: PageId[] = ['about', 'skills', 'projects', 'capstone', 'resume', 'contact'];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'about';
  const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'about';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
      if (VALID_PAGES.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetTheme = useCallback((nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
  }, []);

  const handleNavigate = useCallback((pageId: PageId) => {
    setActivePage(pageId);
    if (window.location.hash !== `#${pageId}`) {
      window.history.pushState(null, '', `#${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen flex flex-col bg-[#FDF7F8] text-[#1F171A] dark:bg-[#140F12] dark:text-[#F8EFF2] transition-colors duration-200">
        <AmbientBackdrop />

        <div className="relative z-10 flex-1 flex flex-col">
          <Header activePage={activePage} onNavigate={handleNavigate} />

          <ThemeToolbar
            activePage={activePage}
            theme={theme}
            onSetTheme={handleSetTheme}
          />

          <main id="main-content" className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {activePage === 'about' && (
                  <HeroSection onNavigate={handleNavigate} />
                )}
                {activePage === 'skills' && (
                  <SkillsSection
                    onNavigate={handleNavigate}
                    onInspectProject={setSelectedProject}
                  />
                )}
                {activePage === 'projects' && (
                  <ProjectsSection onSelectProject={setSelectedProject} />
                )}
                {activePage === 'capstone' && (
                  <CapstoneSection onNavigate={handleNavigate} />
                )}
                {activePage === 'resume' && <ResumeSection />}
                {activePage === 'contact' && <ContactSection />}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer activePage={activePage} onNavigate={handleNavigate} />
        </div>

        <CaseStudyDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
