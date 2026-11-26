import { ComponentType } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Download,
  FileText,
  FolderGit2,
  GraduationCap,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { PageId } from './Header';
import {
  CircuitChipIcon,
  DatabaseSchemaIcon,
  GitBranchNodeIcon,
  LaptopCodeIcon,
  NetworkMeshIcon,
  TerminalWindowIcon,
} from './IctIcons';
import { KineticHeadline, KineticRoleTicker } from './KineticText';
import { Interactive3DStudio } from './Interactive3DStudio';
import { LiveIctCanvas } from './LiveIctCanvas';
import { SafeImage } from './SafeImage';
import { TiltCard } from './TiltCard';

interface HeroSectionProps {
  onNavigate: (pageId: PageId) => void;
}

const STAT_THEMES = [
  {
    icon: FolderGit2,
    box: 'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
  },
  {
    icon: Award,
    box: 'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
  },
  {
    icon: ShieldCheck,
    box: 'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
  },
  {
    icon: GraduationCap,
    box: 'bg-[#F5EEF8] dark:bg-[#2A1E30] border-[#D8BEEB] dark:border-[#4A344D] text-[#7A4988] dark:text-[#D5A6E6]',
  },
];

const DIRECTORY_CARDS: {
  id: PageId;
  index: string;
  title: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
  span: string;
  accentText: string;
  accentBox: string;
}[] = [
  {
    id: 'skills',
    index: '01',
    title: 'Interactive Capabilities Matrix',
    detail:
      'Inspect core languages, relational data schemas, and live code previews.',
    icon: CircuitChipIcon,
    span: 'lg:col-span-6',
    accentText: 'text-[#3D4E81] dark:text-[#8FA4E8]',
    accentBox: 'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C]',
  },
  {
    id: 'projects',
    index: '02',
    title: 'Bento Project Gallery',
    detail:
      'Filter 3D-tilt project cards and slide open full engineering case study drawers.',
    icon: LaptopCodeIcon,
    span: 'lg:col-span-6',
    accentText: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    accentBox: 'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35]',
  },
  {
    id: 'capstone',
    index: '03',
    title: 'FaithPoint Capstone & CIT 240',
    detail:
      'Explore our FaithPoint parish analytics capstone, all research papers & system documentation, plus CIT 240 deliverables.',
    icon: GitBranchNodeIcon,
    span: 'lg:col-span-4',
    accentText: 'text-[#2F7A70] dark:text-[#7ED3C6]',
    accentBox: 'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945]',
  },
  {
    id: 'resume',
    index: '04',
    title: 'Curriculum Vitae & Resume',
    detail:
      'View my full academic history, immersion experience, SICT leadership, seminars, references, and downloadable PDF.',
    icon: FileText,
    span: 'lg:col-span-4',
    accentText: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    accentBox: 'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35]',
  },
  {
    id: 'contact',
    index: '05',
    title: 'Direct Contact & Inquiry Form',
    detail:
      'Send an internship or collaboration inquiry with instant client-side validation.',
    icon: Mail,
    span: 'lg:col-span-4',
    accentText: 'text-[#7A4988] dark:text-[#D5A6E6]',
    accentBox: 'bg-[#F5EEF8] dark:bg-[#2A1E30] border-[#D8BEEB] dark:border-[#4A344D]',
  },
];

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="hero-heading" className="pb-16 md:pb-20">
      {/* Framed Hero Band over Unified Ambient Backdrop */}
      <div className="relative overflow-hidden border-b border-[#EAD6DC] dark:border-[#33262D] pt-10 pb-14 md:pt-14 md:pb-16">
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.72, 0.4], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-24 right-10 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(196,209,240,0.28)_0%,rgba(232,137,168,0.18)_45%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(143,164,232,0.14)_0%,rgba(242,167,192,0.08)_50%,transparent_70%)]"
          />
        )}

        <div className="portfolio-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Kinetic Headline, Role Ticker, Bio & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <KineticRoleTicker roles={PROFILE.kineticRoles} />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/85 dark:bg-[#1D161A]/85 border border-[#C7D3EA] dark:border-[#333D5C] text-xs font-medium text-[#3D4E81] dark:text-[#8FA4E8]">
                    <TerminalWindowIcon className="w-3.5 h-3.5" />
                    <span>{PROFILE.location}</span>
                  </span>
                </div>

                <h1
                  id="hero-heading"
                  className="font-display headline-balance text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.05] text-[#1F171A] dark:text-[#F8EFF2]"
                >
                  <KineticHeadline
                    lines={[
                      'Building playful',
                      'web experiences and',
                      'thoughtful software.',
                    ]}
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base md:text-lg leading-relaxed text-[#4D3B42] dark:text-[#D5C2C9] max-w-[65ch]"
                >
                  {PROFILE.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 rounded-2xl bg-white/95 dark:bg-[#1D161A]/95 border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] max-w-[65ch]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DatabaseSchemaIcon className="w-4 h-4 text-[#7A4988] dark:text-[#D5A6E6]" />
                    <h2 className="text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8]">
                      Career Objective · {PROFILE.institution}
                    </h2>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-[#4D3B42] dark:text-[#D5C2C9]">
                    {PROFILE.careerGoal}
                  </p>
                </motion.div>
              </div>

              {/* Action & External Profile Links */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#BE4B72] via-[#984A7F] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore Bento Gallery</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => onNavigate('skills')}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#3D4E81] dark:text-[#8FA4E8] bg-white dark:bg-[#1D161A] border border-[#C7D3EA] dark:border-[#333D5C] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <CircuitChipIcon className="w-4 h-4" />
                  <span>Capabilities Matrix</span>
                </motion.button>

                <a
                  href={PROFILE.resumePdfUrl}
                  download={PROFILE.resumeFileName}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#BE4B72] dark:text-[#F2A7C0] bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>

                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#4D3B42] dark:text-[#D5C2C9] bg-white/85 dark:bg-[#1D161A]/85 border border-[#EAD6DC] dark:border-[#33262D] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 text-[#826872]" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#4D3B42] dark:text-[#D5C2C9] bg-white/85 dark:bg-[#1D161A]/85 border border-[#EAD6DC] dark:border-[#33262D] hover:border-[#2F7A70] dark:hover:border-[#7ED3C6] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-4 h-4 text-[#2F7A70] dark:text-[#7ED3C6]" aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Interactive 3D-Tilt Framed Portrait with Layered Depth Offset */}
            <div className="lg:col-span-5 relative">
              <div
                aria-hidden="true"
                className="hidden sm:block absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-[#C7D3EA] dark:border-[#333D5C] bg-gradient-to-br from-[#EEF2FA]/85 via-[#F5EEF8]/85 to-[#EAF6F3]/85 dark:from-[#1E2438]/75 dark:to-[#192D2A]/75 pointer-events-none"
              />
              <TiltCard
                maxTilt={6}
                className="group h-full rounded-2xl border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] bg-white dark:bg-[#1D161A] p-3 flex flex-col shadow-[0_22px_50px_-24px_rgba(61,78,129,0.28)]"
              >
                <figure className="h-full flex flex-col">
                  <div className="relative flex-1 min-h-[350px] lg:min-h-[430px] rounded-xl overflow-hidden border border-[#EAD6DC] dark:border-[#33262D] bg-gradient-to-b from-[#FAF0F2] via-[#FDF7F8] to-[#EFE5EE] dark:from-[#261B21] dark:via-[#1D161A] dark:to-[#1A1D29]">
                    <SafeImage
                      src={PROFILE.portraitSrc}
                      alt={PROFILE.portraitAlt}
                      fallbackTitle={PROFILE.name}
                      containerClassName="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#FAF0F2] via-[#FDF7F8] to-[#EFE5EE] dark:from-[#261B21] dark:via-[#1D161A] dark:to-[#1A1D29]"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    {/* Subtle Floating ICT Icon Medallions in Rose, Indigo, Sage */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                      {[
                        {
                          Icon: LaptopCodeIcon,
                          cls: 'border-[#E5C6D0] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
                        },
                        {
                          Icon: DatabaseSchemaIcon,
                          cls: 'border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
                        },
                        {
                          Icon: NetworkMeshIcon,
                          cls: 'border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
                        },
                      ].map(({ Icon, cls }, idx) => (
                        <motion.span
                          key={idx}
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { y: [0, idx === 1 ? -4 : 3, 0] }
                          }
                          transition={{
                            repeat: Infinity,
                            duration: 3.4 + idx * 0.5,
                            ease: 'easeInOut',
                          }}
                          className={`w-9 h-9 rounded-xl bg-white/92 dark:bg-[#1D161A]/92 backdrop-blur-sm border flex items-center justify-center shadow-sm ${cls}`}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-[#665058] dark:text-[#B59EA7]">
                    <span className="font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
                      {PROFILE.name}
                    </span>
                    <span className="text-[#3D4E81] dark:text-[#8FA4E8] font-medium">
                      BSIT · WVSU Lambunao Campus
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </div>
          </div>

          {/* Full-Width 4-Column Framed Stat Cards below Hero Split */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PROFILE.highlights.map((metric, idx) => {
              const theme = STAT_THEMES[idx % STAT_THEMES.length];
              const Icon = theme.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.14 + idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white/95 dark:bg-[#1D161A]/95 border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="font-display tabular-nums text-2xl md:text-3xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]">
                      {metric.value}
                    </p>
                    <p className="text-xs text-[#665058] dark:text-[#B59EA7] leading-snug">
                      {metric.label}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${theme.box}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dual-Track Kinetic Typography Marquee Ribbon */}
      <div
        aria-hidden="true"
        className="kinetic-ribbon border-b border-[#EAD6DC] dark:border-[#33262D] bg-[#FAF0F2] dark:bg-[#191216] py-3.5 overflow-hidden space-y-2"
      >
        <div className="animate-marquee-left font-display text-xs md:text-sm font-semibold tracking-wide text-[#4D3B42] dark:text-[#D5C2C9]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 px-3 whitespace-nowrap">
              <span>Semantic HTML5 Architecture</span>
              <span className="text-[#BE4B72] dark:text-[#F2A7C0]">/</span>
              <span>Interactive 3D Bento Showcase</span>
              <span className="text-[#3D4E81] dark:text-[#8FA4E8]">/</span>
              <span>Full-Stack PHP &amp; TypeScript</span>
              <span className="text-[#2F7A70] dark:text-[#7ED3C6]">/</span>
              <span>WCAG 2.1 AA Accessibility</span>
              <span className="text-[#7A4988] dark:text-[#D5A6E6]">/</span>
            </div>
          ))}
        </div>

        <div className="animate-marquee-right text-xs font-mono-code text-[#665058] dark:text-[#A9929B]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 px-3 whitespace-nowrap">
              <span>CIT 240 Deliverables</span>
              <span className="text-[#3D4E81] dark:text-[#8FA4E8]">·</span>
              <span>Relational SQL Modeling</span>
              <span className="text-[#BE4B72] dark:text-[#F2A7C0]">·</span>
              <span>Dockerized Workflows</span>
              <span className="text-[#2F7A70] dark:text-[#7ED3C6]">·</span>
              <span>GitHub Pages CI</span>
              <span className="text-[#7A4988] dark:text-[#D5A6E6]">·</span>
              <span>Pastel &amp; Dark Dual Theme</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 3D WebGL Workstation & Tech Orbit */}
      <div className="portfolio-container mt-12">
        <Interactive3DStudio onNavigate={onNavigate} />
      </div>

      {/* Live Interactive ICT Workflow Canvas */}
      <div className="portfolio-container mt-10">
        <LiveIctCanvas onNavigate={onNavigate} />
      </div>

      {/* Interactive 3D-Tilt Page Explorer Bento Cards */}
      <div className="portfolio-container mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8] mb-1">
              Interactive Directory
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]">
              Explore Portfolio Pages
            </h2>
          </div>
          <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
            Hover cards for 3D perspective · Click to open page
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {DIRECTORY_CARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={item.span}
              >
                <TiltCard
                  maxTilt={5}
                  className="group h-full bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="w-full h-full text-left p-6 md:p-7 flex flex-col justify-between gap-6 rounded-2xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className={`font-editorial text-sm font-medium tabular-nums ${item.accentText}`}>
                          {item.index}.
                        </p>
                        <h3 className="font-display text-xl font-bold text-[#1F171A] dark:text-[#F8EFF2] group-hover:text-[#BE4B72] dark:group-hover:text-[#F2A7C0] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={
                          prefersReducedMotion ? undefined : { rotate: -6, scale: 1.08 }
                        }
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${item.accentBox} ${item.accentText}`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228]">
                      <p className="text-sm text-[#665058] dark:text-[#B59EA7] leading-relaxed max-w-[46ch]">
                        {item.detail}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 ${item.accentText}`}>
                        <span>Open</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </button>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
