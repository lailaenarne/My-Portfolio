import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Layers,
  Layout,
  X,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface CaseStudyDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

type DrawerTab = 'architecture' | 'ui' | 'stack';

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>('architecture');

  useEffect(() => {
    setActiveTab('architecture');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-project-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#140F12]/70 backdrop-blur-sm"
          />

          {/* Slide-over Case Study Drawer Panel */}
          <motion.div
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl h-full bg-white dark:bg-[#1A1317] border-l border-[#E5C6D0] dark:border-[#3D2C35] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Sticky Drawer Top Header */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12]">
              <div className="flex items-center gap-2 text-xs text-[#665058] dark:text-[#B59EA7] min-w-0">
                <span className="font-semibold text-[#BE4B72] dark:text-[#F2A7C0] whitespace-nowrap">
                  Case Study Drawer
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{project.courseOrContext}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study drawer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#EAD6DC] dark:border-[#3D2C35] text-[#4D3B42] dark:text-[#E7D4DB] hover:bg-[#FAF0F2] dark:hover:bg-[#2A1D24] transition-colors shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-7">
              {/* Framed Media Container */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FAF0F2] dark:bg-[#241A20]">
                <SafeImage
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Summary */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#665058] dark:text-[#B59EA7]">
                  <span className="font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
                    {project.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.metricsLabel}</span>
                </div>
                <h2
                  id="drawer-project-title"
                  className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
                >
                  {project.title}
                </h2>
                <p className="text-sm md:text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Interactive Drawer Tabs */}
              <div
                role="tablist"
                aria-label="Case study detail sections"
                className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF0F2] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D]"
              >
                {[
                  { id: 'architecture' as const, label: 'Architecture', icon: Layers },
                  { id: 'ui' as const, label: 'UI Highlights', icon: Layout },
                  { id: 'stack' as const, label: 'Stack & Links', icon: Code2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                        active
                          ? 'text-[#1F171A] dark:text-[#F8EFF2]'
                          : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="drawer-tab-bg"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="absolute inset-0 bg-white dark:bg-[#2A1D24] rounded-lg border border-[#E5C6D0] dark:border-[#4E3944] shadow-sm"
                        />
                      )}
                      <Icon className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  {activeTab === 'architecture' && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D]">
                        <h3 className="text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0] mb-1.5">
                          Problem Statement
                        </h3>
                        <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                          {project.problemStatement}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                          System Design &amp; Engineering Notes
                        </h3>
                        <ul className="space-y-3">
                          {project.architectureNotes.map((note) => (
                            <li
                              key={note}
                              className="flex items-start gap-3 p-3.5 rounded-xl border border-[#F4E6EA] dark:border-[#2D2228] bg-white dark:bg-[#1D161A] text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#BE4B72] dark:text-[#F2A7C0] mt-0.5 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ui' && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                        Interface &amp; Ergonomic Highlights
                      </h3>
                      <ul className="space-y-3">
                        {project.uiHighlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12] text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed"
                          >
                            <Layout
                              className="w-4 h-4 text-[#BE4B72] dark:text-[#F2A7C0] mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'stack' && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12]">
                        <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-2">
                          Technologies &amp; Tooling
                        </h3>
                        <p className="text-sm font-mono-code text-[#1F171A] dark:text-[#F8EFF2]">
                          {project.techStack.join(' · ')}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12]">
                        <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-1.5">
                          Measured Outcome
                        </h3>
                        <p className="text-sm font-medium text-[#1F171A] dark:text-[#F8EFF2]">
                          {project.metricsLabel}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sticky Drawer Action Footer */}
            <div className="px-6 py-4 border-t border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#BE4B72] hover:bg-[#A63D61] dark:bg-[#D66389] dark:hover:bg-[#BE4B72] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>GitHub Source</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
