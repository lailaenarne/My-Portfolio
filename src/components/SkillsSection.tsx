import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Braces, Layers } from 'lucide-react';
import {
  PROJECTS,
  ProjectItem,
  SKILL_CATEGORIES,
  SkillCategory,
  SkillNode,
} from '../data/portfolioData';
import { PageId } from './Header';
import {
  CircuitChipIcon,
  CloudDeployIcon,
  DatabaseSchemaIcon,
  LaptopCodeIcon,
  TerminalWindowIcon,
} from './IctIcons';
import { KineticHeadline } from './KineticText';
import { SkillOrb } from './SkillOrb';

interface SkillsSectionProps {
  onNavigate: (pageId: PageId) => void;
  onInspectProject: (project: ProjectItem) => void;
}

const CATEGORY_STYLE: Record<
  SkillCategory['id'],
  {
    icon: typeof LaptopCodeIcon;
    iconBox: string;
    barColor: string;
    selectedBorder: string;
    selectedBg: string;
    textAccent: string;
  }
> = {
  languages: {
    icon: LaptopCodeIcon,
    iconBox:
      'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
    barColor: 'bg-[#BE4B72] dark:bg-[#F2A7C0]',
    selectedBorder: 'border-[#BE4B72] dark:border-[#F2A7C0]',
    selectedBg: 'bg-[#FAF0F2] dark:bg-[#2A1D24]',
    textAccent: 'text-[#BE4B72] dark:text-[#F2A7C0]',
  },
  'frameworks-data': {
    icon: DatabaseSchemaIcon,
    iconBox:
      'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
    barColor: 'bg-[#3D4E81] dark:bg-[#8FA4E8]',
    selectedBorder: 'border-[#3D4E81] dark:border-[#8FA4E8]',
    selectedBg: 'bg-[#EEF2FA] dark:bg-[#1E2438]',
    textAccent: 'text-[#3D4E81] dark:text-[#8FA4E8]',
  },
  'tools-devops': {
    icon: CloudDeployIcon,
    iconBox:
      'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
    barColor: 'bg-[#2F7A70] dark:bg-[#7ED3C6]',
    selectedBorder: 'border-[#2F7A70] dark:border-[#7ED3C6]',
    selectedBg: 'bg-[#EAF6F3] dark:bg-[#192D2A]',
    textAccent: 'text-[#2F7A70] dark:text-[#7ED3C6]',
  },
};

export function SkillsSection({
  onNavigate,
  onInspectProject,
}: SkillsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategoryId, setActiveCategoryId] = useState<
    'all' | SkillCategory['id']
  >('all');

  const allSkills = useMemo(
    () =>
      SKILL_CATEGORIES.flatMap((cat) =>
        cat.skills.map((skill) => ({ ...skill, categoryId: cat.id }))
      ),
    []
  );

  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    SKILL_CATEGORIES[0].skills[0].id
  );

  const visibleCategories = useMemo(() => {
    if (activeCategoryId === 'all') return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.filter((cat) => cat.id === activeCategoryId);
  }, [activeCategoryId]);

  const selectedEntry = useMemo(() => {
    return (
      allSkills.find((skill) => skill.id === selectedSkillId) ?? allSkills[0]
    );
  }, [allSkills, selectedSkillId]);

  const selectedSkill: SkillNode = selectedEntry;
  const selectedTheme = CATEGORY_STYLE[selectedEntry.categoryId];

  const relatedProjects = useMemo(() => {
    return PROJECTS.filter((proj) =>
      selectedSkill.relatedProjectIds.includes(proj.id)
    );
  }, [selectedSkill]);

  const [visibleChars, setVisibleChars] = useState<number>(
    selectedSkill.codeSnippet.length
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleChars(selectedSkill.codeSnippet.length);
      return;
    }
    setVisibleChars(0);
    const total = selectedSkill.codeSnippet.length;
    const interval = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= total) {
          window.clearInterval(interval);
          return total;
        }
        return prev + 3;
      });
    }, 14);
    return () => window.clearInterval(interval);
  }, [selectedSkill.id, selectedSkill.codeSnippet.length, prefersReducedMotion]);

  return (
    <section aria-labelledby="skills-heading" className="py-12 md:py-16">
      <div className="portfolio-container">
        {/* Page Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 mb-10 border-b border-[#EAD6DC] dark:border-[#33262D]">
          <div className="lg:col-span-6 space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8]">
              <CircuitChipIcon className="w-4 h-4" />
              <span>Interactive Capabilities Preview Matrix</span>
            </p>
            <h1
              id="skills-heading"
              className="font-display headline-balance text-3xl md:text-4xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
            >
              <KineticHeadline lines={['Technical Skills &', 'Architecture Matrix']} />
            </h1>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end gap-4">
            <p className="text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
              Move your pointer across the floating 3D skill orbs and click any sphere to inspect implementation patterns, live code examples, and related portfolio builds.
            </p>

            {/* Category Filter Tabs */}
            <div
              role="group"
              aria-label="Filter capability domains"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0F2] dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] rounded-xl self-start"
            >
              {[
                { id: 'all' as const, label: 'All Domains' },
                ...SKILL_CATEGORIES.map((cat) => ({
                  id: cat.id,
                  label: cat.title.split('&')[0].trim(),
                })),
              ].map((tab) => {
                const active = activeCategoryId === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(tab.id);
                      if (tab.id !== 'all') {
                        const firstInCat = SKILL_CATEGORIES.find(
                          (c) => c.id === tab.id
                        )?.skills[0];
                        if (firstInCat) setSelectedSkillId(firstInCat.id);
                      }
                    }}
                    aria-pressed={active}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'text-[#1F171A] dark:text-[#F8EFF2]'
                        : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="skills-domain-tab"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 bg-white dark:bg-[#2E2228] rounded-lg border border-[#E5C6D0] dark:border-[#4E3944] shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Split Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Capability Nodes Matrix */}
          <div className="lg:col-span-7 space-y-6">
            {visibleCategories.map((category) => {
              const catStyle = CATEGORY_STYLE[category.id];
              const CategoryIcon = catStyle.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={
                          prefersReducedMotion ? undefined : { rotate: -6, scale: 1.06 }
                        }
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${catStyle.iconBox}`}
                      >
                        <CategoryIcon className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                          <span className={catStyle.textAccent}>{category.index}.</span>{' '}
                          {category.title}
                        </h2>
                        <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid gap-3 ${
                      category.skills.length === 3
                        ? 'grid-cols-2 sm:grid-cols-3'
                        : 'grid-cols-2 sm:grid-cols-4'
                    }`}
                  >
                    {category.skills.map((skill, skillIdx) => {
                      const isSelected = selectedSkill.id === skill.id;
                      return (
                        <div
                          key={skill.id}
                          className={`rounded-xl border px-2.5 pt-3.5 pb-2.5 flex flex-col items-center justify-center transition-colors duration-150 ${
                            isSelected
                              ? `${catStyle.selectedBg} ${catStyle.selectedBorder} shadow-sm`
                              : 'bg-[#FDF7F8] dark:bg-[#140F12] border-[#EAD6DC] dark:border-[#33262D] hover:border-[#C7D3EA] dark:hover:border-[#5E4750]'
                          }`}
                        >
                          <SkillOrb
                            skill={skill}
                            categoryId={category.id}
                            index={skillIdx}
                            isSelected={isSelected}
                            onSelect={setSelectedSkillId}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Capabilities Preview Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.aside
                key={selectedSkill.id}
                aria-label="Capability live preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl overflow-hidden"
              >
                <div className={`p-6 border-b border-[#EAD6DC] dark:border-[#33262D] ${selectedTheme.selectedBg}`}>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${selectedTheme.textAccent}`}>
                      <TerminalWindowIcon className="w-4 h-4" />
                      <span>Live Capability Preview</span>
                    </span>
                    <span className="text-xs font-mono-code tabular-nums text-[#665058] dark:text-[#B59EA7]">
                      {selectedSkill.proficiencyLabel}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                    {selectedSkill.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#4D3B42] dark:text-[#D5C2C9]">
                    {selectedSkill.context}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-2">
                      <Layers className={`w-3.5 h-3.5 ${selectedTheme.textAccent}`} aria-hidden="true" />
                      <span>Applied Architecture Pattern</span>
                    </h3>
                    <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                      {selectedSkill.architecturePattern}
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-2">
                      <Braces className={`w-3.5 h-3.5 ${selectedTheme.textAccent}`} aria-hidden="true" />
                      <span>Live Code Pattern</span>
                    </h3>
                    <pre className="p-4 rounded-xl bg-[#191A28] dark:bg-[#0F1018] border border-[#2E344D] text-[#EEF2FA] text-xs font-mono-code overflow-x-auto leading-relaxed min-h-[96px]">
                      <code>
                        {selectedSkill.codeSnippet.slice(0, visibleChars)}
                        {!prefersReducedMotion && (
                          <motion.span
                            aria-hidden="true"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                            className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[#7ED3C6]"
                          />
                        )}
                      </code>
                    </pre>
                  </div>

                  <div className="pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228]">
                    <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-3">
                      Applied in Portfolio Projects
                    </h3>
                    <div className="space-y-2">
                      {relatedProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => onInspectProject(project)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] flex items-center justify-between gap-3 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] truncate group-hover:text-[#3D4E81] dark:group-hover:text-[#8FA4E8]">
                              {project.title}
                            </p>
                            <p className="text-[11px] text-[#665058] dark:text-[#B59EA7]">
                              {project.category} · {project.year}
                            </p>
                          </div>
                          <ArrowRight
                            className="w-3.5 h-3.5 text-[#3D4E81] dark:text-[#8FA4E8] shrink-0 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            </AnimatePresence>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8] hover:underline"
              >
                <span>Open full Bento Project Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
