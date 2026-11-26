import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  FolderGit2,
} from 'lucide-react';
import { CAPSTONE_DELIVERABLES, CAPSTONE_PROJECT } from '../data/portfolioData';
import { PageId } from './Header';
import {
  CloudDeployIcon,
  DatabaseSchemaIcon,
  GitBranchNodeIcon,
  LaptopCodeIcon,
} from './IctIcons';
import { KineticHeadline } from './KineticText';

interface CapstoneSectionProps {
  onNavigate: (pageId: PageId) => void;
}

const DELIVERABLE_STYLES = [
  {
    icon: LaptopCodeIcon,
    box: 'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
    text: 'text-[#BE4B72] dark:text-[#F2A7C0]',
  },
  {
    icon: DatabaseSchemaIcon,
    box: 'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
    text: 'text-[#3D4E81] dark:text-[#8FA4E8]',
  },
  {
    icon: GitBranchNodeIcon,
    box: 'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
    text: 'text-[#2F7A70] dark:text-[#7ED3C6]',
  },
];

const MODULE_ACCENTS = [
  'border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FAF0F2]/75 dark:bg-[#2A1D24]/60 text-[#BE4B72] dark:text-[#F2A7C0]',
  'border-[#C7D3EA] dark:border-[#333D5C] bg-[#EEF2FA]/75 dark:bg-[#1E2438]/60 text-[#3D4E81] dark:text-[#8FA4E8]',
  'border-[#B8DCD5] dark:border-[#2A4945] bg-[#EAF6F3]/75 dark:bg-[#192D2A]/60 text-[#2F7A70] dark:text-[#7ED3C6]',
];

export function CapstoneSection({ onNavigate }: CapstoneSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(
    CAPSTONE_DELIVERABLES[0].id
  );

  return (
    <section aria-labelledby="capstone-heading" className="py-12 md:py-16">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 mb-10 border-b border-[#EAD6DC] dark:border-[#33262D]">
          <div className="lg:col-span-6 space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F7A70] dark:text-[#7ED3C6]">
              <GitBranchNodeIcon className="w-4 h-4" />
              <span>BSIT Capstone &amp; CIT 240 Documentation</span>
            </p>
            <h1
              id="capstone-heading"
              className="font-display headline-balance text-3xl md:text-4xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
            >
              <KineticHeadline lines={['FaithPoint Capstone &', 'Technical Papers']} />
            </h1>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed max-w-[65ch]">
              Serving as Lead Documentation &amp; Technical Papers Author for our FaithPoint parish analytics capstone—responsible for every manuscript chapter, system specification, and technical document alongside CIT 240 coursework.
            </p>
          </div>
        </div>

        {/* Featured FaithPoint Capstone Banner */}
        <motion.article
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>{CAPSTONE_PROJECT.context}</span>
                </span>
                <span aria-hidden="true" className="text-[#D4B4BF] dark:text-[#4E3944]">
                  ·
                </span>
                <span className="font-semibold text-[#3D4E81] dark:text-[#8FA4E8]">
                  {CAPSTONE_PROJECT.role}
                </span>
              </div>

              <h2 className="font-display headline-balance text-2xl md:text-[1.75rem] font-bold tracking-tight leading-snug text-[#1F171A] dark:text-[#F8EFF2]">
                {CAPSTONE_PROJECT.title}
              </h2>

              <p className="text-sm md:text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                {CAPSTONE_PROJECT.responsibilitySummary}
              </p>

              <p className="text-xs font-mono-code text-[#3D4E81] dark:text-[#8FA4E8] pt-1">
                {CAPSTONE_PROJECT.paperArtifacts.join(' · ')}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              {CAPSTONE_PROJECT.modules.map((mod, idx) => (
                <div
                  key={mod.title}
                  className={`rounded-xl border p-4 ${MODULE_ACCENTS[idx % MODULE_ACCENTS.length]}`}
                >
                  <h3 className="font-display text-sm font-bold mb-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                    {mod.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Expandable Capstone & Coursework Deliverables */}
        <div className="space-y-5">
          {CAPSTONE_DELIVERABLES.map((item, idx) => {
            const style = DELIVERABLE_STYLES[idx % DELIVERABLE_STYLES.length];
            const Icon = style.icon;
            const isExpanded = expandedId === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl overflow-hidden"
              >
                <div className="p-6 md:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 flex items-start gap-4">
                    <motion.div
                      whileHover={
                        prefersReducedMotion ? undefined : { rotate: -6, scale: 1.08 }
                      }
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${style.box}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <div className="space-y-1.5">
                      <p className={`font-editorial text-xs font-medium tabular-nums ${style.text}`}>
                        Deliverable {item.index}
                      </p>
                      <h2 className="font-display text-lg md:text-xl font-bold text-[#1F171A] dark:text-[#F8EFF2] leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        {item.context} · {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-2.5">
                    <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                      {item.outcome}
                    </p>
                    <p className="text-xs font-mono-code text-[#3D4E81] dark:text-[#8FA4E8]">
                      {item.deliverables.join(' · ')}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex flex-wrap lg:flex-col lg:items-end gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      onClick={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{isExpanded ? 'Hide Checklist' : 'Verification Checklist'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </motion.button>

                    <a
                      href={item.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold hover:underline whitespace-nowrap shrink-0 ${style.text}`}
                    >
                      <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>View Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Expandable Verification Checklist */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="px-6 pb-6 md:px-7 md:pb-7 pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228] bg-[#FDF7F8] dark:bg-[#140F12]/60"
                    >
                      <h3 className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-3">
                        Verified Engineering &amp; Documentation Milestones
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {item.checklist.map((step) => (
                          <li
                            key={step}
                            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white dark:bg-[#1D161A] border border-[#EAD6DC] dark:border-[#33262D] text-xs text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-[#2F7A70] dark:text-[#7ED3C6] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-10 bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-11 h-11 rounded-xl bg-[#EAF6F3] dark:bg-[#192D2A] border border-[#B8DCD5] dark:border-[#2A4945] flex items-center justify-center shrink-0 text-[#2F7A70] dark:text-[#7ED3C6]">
              <CloudDeployIcon className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-display text-lg font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                Capstone Paperwork &amp; Technical Documentation Standards
              </h2>
              <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                From the complete FaithPoint manuscript and data dictionary to CIT 240 repository READMEs, every document is versioned, peer-reviewed, and structured for clear academic and engineering handoff.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#BE4B72] via-[#984A7F] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-xl transition-all whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>Discuss Capstone Work</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
