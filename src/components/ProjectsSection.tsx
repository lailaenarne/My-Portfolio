import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, FolderGit2, PanelRightOpen } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';
import {
  CircuitChipIcon,
  LaptopCodeIcon,
  NetworkMeshIcon,
  TerminalWindowIcon,
} from './IctIcons';
import { KineticHeadline } from './KineticText';
import { ProjectMetricsChart } from './ProjectMetricsChart';
import { SafeImage } from './SafeImage';
import { TiltCard } from './TiltCard';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Interactive',
  'Web UI',
  'Showcase',
];

const CATEGORY_THEME: Record<
  ProjectItem['category'],
  {
    icon: typeof LaptopCodeIcon;
    labelText: string;
    iconBox: string;
    buttonBg: string;
  }
> = {
  Interactive: {
    icon: CircuitChipIcon,
    labelText: 'text-[#7A4988] dark:text-[#D5A6E6]',
    iconBox:
      'bg-[#F5EEF8] dark:bg-[#2A1E30] border-[#D8BEEB] dark:border-[#4A344D] text-[#7A4988] dark:text-[#D5A6E6]',
    buttonBg:
      'bg-[#7A4988] hover:bg-[#653B72] dark:bg-[#9E67B0] dark:hover:bg-[#875398]',
  },
  'Web UI': {
    icon: TerminalWindowIcon,
    labelText: 'text-[#3D4E81] dark:text-[#8FA4E8]',
    iconBox:
      'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
    buttonBg:
      'bg-[#3D4E81] hover:bg-[#313F69] dark:bg-[#5E74B8] dark:hover:bg-[#4C61A4]',
  },
  Showcase: {
    icon: NetworkMeshIcon,
    labelText: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    iconBox:
      'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
    buttonBg:
      'bg-[#BE4B72] hover:bg-[#A63D61] dark:bg-[#D66389] dark:hover:bg-[#BE4B72]',
  },
};

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const categoryFilteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) {
      return categoryFilteredProjects;
    }
    return categoryFilteredProjects.filter((project) =>
      project.techStack.includes(selectedTech)
    );
  }, [categoryFilteredProjects, selectedTech]);

  const handleSelectCategory = (category: ProjectCategory) => {
    setSelectedCategory(category);
    setSelectedTech(null);
  };

  return (
    <section aria-labelledby="projects-heading" className="py-12 md:py-16">
      <div className="portfolio-container">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 mb-10 border-b border-[#EAD6DC] dark:border-[#33262D]">
          <div className="space-y-2 max-w-xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
              <TerminalWindowIcon className="w-4 h-4" />
              <span>Interactive Bento Showcase · {filteredProjects.length} Projects</span>
            </p>
            <h1
              id="projects-heading"
              className="font-display headline-balance text-3xl md:text-4xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
            >
              <KineticHeadline lines={['Featured Projects &', 'Case Study Bento']} />
            </h1>
            <p className="text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed pt-1">
              Explore live Netlify deployments, browser games, responsive UI layouts, and creative showcases. Click any card to inspect its case study drawer.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0F2] dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] rounded-xl self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  aria-pressed={active}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-[#1F171A] dark:text-[#F8EFF2]'
                      : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-project-filter"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 bg-white dark:bg-[#2E2228] rounded-lg shadow-sm border border-[#E5C6D0] dark:border-[#4E3944]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Metrics Recharts Bar Chart */}
        <ProjectMetricsChart
          projects={categoryFilteredProjects}
          activeCategory={selectedCategory}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
        />

        {/* Filterable Asymmetric Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center border border-[#EAD6DC] dark:border-[#33262D] rounded-2xl bg-white dark:bg-[#1D161A]">
            <p className="text-sm text-[#665058] dark:text-[#B59EA7]">
              No projects matched this category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const catStyle = CATEGORY_THEME[project.category];
                const Icon = catStyle.icon;
                const gridSpanClass =
                  selectedCategory === 'All' && !selectedTech
                    ? project.bentoSpan === 'wide'
                      ? 'md:col-span-7'
                      : 'md:col-span-5'
                    : 'md:col-span-6';

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.28,
                      delay: Math.min(idx * 0.04, 0.24),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={gridSpanClass}
                  >
                    <TiltCard
                      maxTilt={4.5}
                      className="group h-full bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] rounded-2xl overflow-hidden flex flex-col justify-between"
                    >
                      <article className="h-full flex flex-col justify-between">
                        <div>
                          {/* Framed Media Container */}
                          <div className="p-3 pb-0">
                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              aria-label={`Open ${project.title} case study drawer`}
                              className="relative block w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#EAD6DC] dark:border-[#33262D] bg-[#FAF0F2] dark:bg-[#2A1D24] text-left focus-visible:outline-none"
                            >
                              <SafeImage
                                src={project.imageSrc}
                                alt={project.imageAlt}
                                fallbackTitle={project.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              />
                              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1F171A]/85 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150">
                                <PanelRightOpen className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Open Drawer</span>
                              </span>
                            </button>
                          </div>

                          {/* Card Body */}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-[#665058] dark:text-[#B59EA7]">
                                <span className={`font-semibold ${catStyle.labelText}`}>
                                  {project.category}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="tabular-nums">{project.year}</span>
                                <span aria-hidden="true">·</span>
                                <span>{project.courseOrContext}</span>
                              </div>

                              <motion.div
                                whileHover={
                                  prefersReducedMotion
                                    ? undefined
                                    : { rotate: -6, scale: 1.08 }
                                }
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${catStyle.iconBox}`}
                              >
                                <Icon className="w-5 h-5" />
                              </motion.div>
                            </div>

                            <h2 className="font-display text-xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]">
                              <button
                                type="button"
                                onClick={() => onSelectProject(project)}
                                className="text-left hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors"
                              >
                                {project.title}
                              </button>
                            </h2>

                            <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                              {project.summary}
                            </p>

                            <p className="text-xs font-medium text-[#2F7A70] dark:text-[#7ED3C6]">
                              {project.metricsLabel}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-6 pb-6 pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228] space-y-4">
                          <p className="text-xs font-mono-code text-[#3D4E81] dark:text-[#8FA4E8] leading-relaxed">
                            {project.techStack.join(' · ')}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <motion.button
                              type="button"
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                              onClick={() => onSelectProject(project)}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 ${catStyle.buttonBg}`}
                            >
                              <PanelRightOpen className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Case Study</span>
                            </motion.button>

                            <div className="flex items-center gap-4">
                              <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#2F7A70] dark:hover:text-[#7ED3C6] transition-colors whitespace-nowrap shrink-0"
                              >
                                <span>Live Site</span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>

                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#665058] dark:text-[#B59EA7] hover:text-[#3D4E81] dark:hover:text-[#8FA4E8] transition-colors whitespace-nowrap shrink-0"
                              >
                                <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>GitHub</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
