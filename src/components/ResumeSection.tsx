import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Award,
  Briefcase,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';
import { PROFILE, RESUME_DATA } from '../data/portfolioData';
import { KineticHeadline } from './KineticText';
import { SafeImage } from './SafeImage';
import { TiltCard } from './TiltCard';

type ResumeViewMode = 'structured' | 'pdf';

const EDU_LEVEL_STYLES: Record<string, string> = {
  Tertiary:
    'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#E5C6D0] dark:border-[#4D323E] text-[#BE4B72] dark:text-[#F2A7C0]',
  Secondary:
    'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
  Primary:
    'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
};

export function ResumeSection() {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<ResumeViewMode>('structured');

  return (
    <section aria-labelledby="resume-heading" className="py-12 md:py-16">
      <div className="portfolio-container">
        {/* Top Editorial Header & Download Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 mb-10 border-b border-[#EAD6DC] dark:border-[#33262D]">
          <div className="space-y-2 max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Curriculum Vitae · Software Technology</span>
            </p>
            <h1
              id="resume-heading"
              className="font-display headline-balance text-3xl md:text-4xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
            >
              <KineticHeadline lines={['Curriculum Vitae &', 'Academic Resume']} />
            </h1>
            <p className="text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed pt-1">
              Inspect my complete BSIT academic track, immersion experience, student council leadership, seminars, and faculty references—or download the official PDF copy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <div
              role="group"
              aria-label="Resume view mode"
              className="inline-flex items-center p-1 bg-[#FAF0F2] dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] rounded-xl"
            >
              <button
                type="button"
                onClick={() => setViewMode('structured')}
                aria-pressed={viewMode === 'structured'}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'structured'
                    ? 'text-[#1F171A] dark:text-[#F8EFF2]'
                    : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
                }`}
              >
                {viewMode === 'structured' && (
                  <motion.span
                    layoutId="resume-view-tab"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-white dark:bg-[#2E2228] rounded-lg shadow-sm border border-[#E5C6D0] dark:border-[#4E3944]"
                  />
                )}
                <LayoutGrid className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                <span className="relative z-10">Interactive View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                aria-pressed={viewMode === 'pdf'}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'pdf'
                    ? 'text-[#1F171A] dark:text-[#F8EFF2]'
                    : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2]'
                }`}
              >
                {viewMode === 'pdf' && (
                  <motion.span
                    layoutId="resume-view-tab"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-white dark:bg-[#2E2228] rounded-lg shadow-sm border border-[#E5C6D0] dark:border-[#4E3944]"
                  />
                )}
                <FileText className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                <span className="relative z-10">Original PDF</span>
              </button>
            </div>

            <a
              href={PROFILE.resumePdfUrl}
              download={PROFILE.resumeFileName}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#BE4B72] via-[#984A7F] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download CV (PDF)</span>
            </a>

            <a
              href={PROFILE.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8] bg-white dark:bg-[#1D161A] border border-[#C7D3EA] dark:border-[#333D5C] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open PDF</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {viewMode === 'pdf' ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-4 md:p-6 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] flex items-center justify-center text-[#BE4B72] dark:text-[#F2A7C0]">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                    {PROFILE.resumeFileName}
                  </p>
                  <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                    Official 1-Page Curriculum Vitae · Embedded PDF Viewer
                  </p>
                </div>
              </div>
              <a
                href={PROFILE.resumePdfUrl}
                download={PROFILE.resumeFileName}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#BE4B72] dark:text-[#F2A7C0]" aria-hidden="true" />
                <span>Save Copy</span>
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#EAD6DC] dark:border-[#33262D] bg-[#FAF0F2] dark:bg-[#140F12]">
              <iframe
                src={`${PROFILE.resumePdfUrl}#view=FitH`}
                title="Laila Mariel R. Enarne Curriculum Vitae PDF"
                className="w-full h-[760px]"
              />
            </div>

            <p className="text-xs text-[#665058] dark:text-[#B59EA7] text-center">
              If the embedded PDF preview does not load in your browser,{' '}
              <a
                href={PROFILE.resumePdfUrl}
                download={PROFILE.resumeFileName}
                className="font-semibold text-[#BE4B72] dark:text-[#F2A7C0] underline underline-offset-2"
              >
                download the PDF directly
              </a>{' '}
              or switch back to the Interactive View.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Top CV Summary Banner */}
            <TiltCard
              maxTilt={3.5}
              className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-3 flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FAF0F2] dark:bg-[#2A1D24] shrink-0">
                    <SafeImage
                      src={PROFILE.portraitSrc}
                      alt={PROFILE.portraitAlt}
                      fallbackTitle={RESUME_DATA.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-display text-xl font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                      {RESUME_DATA.fullName}
                    </h2>
                    <p className="text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8]">
                      {RESUME_DATA.major}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0] mb-1.5">
                      About Me
                    </p>
                    <p className="text-sm leading-relaxed text-[#4D3B42] dark:text-[#D5C2C9]">
                      {RESUME_DATA.aboutSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-2 border-t border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="flex items-center gap-2 text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
                      <MapPin className="w-3.5 h-3.5 text-[#3D4E81] dark:text-[#8FA4E8] shrink-0" aria-hidden="true" />
                      <span className="truncate" title={PROFILE.location}>
                        {PROFILE.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
                      <Phone className="w-3.5 h-3.5 text-[#7A4988] dark:text-[#D5A6E6] shrink-0" aria-hidden="true" />
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className="font-mono-code tabular-nums hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
                      <Mail className="w-3.5 h-3.5 text-[#BE4B72] dark:text-[#F2A7C0] shrink-0" aria-hidden="true" />
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="truncate hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors"
                        title={PROFILE.email}
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
                      <Globe className="w-3.5 h-3.5 text-[#2F7A70] dark:text-[#7ED3C6] shrink-0" aria-hidden="true" />
                      <span>{PROFILE.languages.join(' · ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Main 2-Column CV Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Soft Skills, Honors & Affiliations, References */}
              <div className="lg:col-span-5 space-y-6">
                {/* Soft & Professional Skills */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] flex items-center justify-center text-[#BE4B72] dark:text-[#F2A7C0]">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Core Strengths &amp; Soft Skills
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        Interpersonal &amp; team workflow competencies
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
                    {RESUME_DATA.softSkills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3.5 py-2.5 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] text-xs font-medium text-[#1F171A] dark:text-[#F8EFF2]"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </article>

                {/* Honors & Affiliations */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#F5EEF8] dark:bg-[#2A1E30] border border-[#D8BEEB] dark:border-[#4A344D] flex items-center justify-center text-[#7A4988] dark:text-[#D5A6E6]">
                      <Award className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Honors &amp; Affiliations
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        Student governance &amp; academic distinctions
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {RESUME_DATA.honorsAndAffiliations.map((item) => (
                      <li
                        key={item.title}
                        className="p-3.5 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] space-y-1"
                      >
                        <p className="text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                          {item.institution}
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* Character References */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF6F3] dark:bg-[#192D2A] border border-[#B8DCD5] dark:border-[#2A4945] flex items-center justify-center text-[#2F7A70] dark:text-[#7ED3C6]">
                      <Users className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Character References
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        School of Information and Communications Technology
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {RESUME_DATA.references.map((ref) => (
                      <div
                        key={ref.name}
                        className="p-3.5 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] space-y-1"
                      >
                        <p className="font-display text-sm font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                          {ref.name}
                        </p>
                        <p className="text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
                          {ref.role}
                        </p>
                        <a
                          href={`tel:${ref.phone}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono-code tabular-nums text-[#2F7A70] dark:text-[#7ED3C6] hover:underline pt-0.5"
                        >
                          <Phone className="w-3 h-3" aria-hidden="true" />
                          <span>{ref.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              {/* Right Column: Work Experience, Education, Seminars & Trainings */}
              <div className="lg:col-span-7 space-y-6">
                {/* Work Experience */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF2FA] dark:bg-[#1E2438] border border-[#C7D3EA] dark:border-[#333D5C] flex items-center justify-center text-[#3D4E81] dark:text-[#8FA4E8]">
                      <Briefcase className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Work Experience
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        Office immersion &amp; document management
                      </p>
                    </div>
                  </div>

                  {RESUME_DATA.workExperience.map((exp) => (
                    <div
                      key={exp.role}
                      className="p-4 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                          {exp.role}
                        </h3>
                        <span className="px-2.5 py-1 text-[11px] font-mono-code font-semibold rounded-lg bg-[#EEF2FA] dark:bg-[#1E2438] border border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
                        {exp.organization}
                      </p>
                      <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </article>

                {/* Education */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] flex items-center justify-center text-[#BE4B72] dark:text-[#F2A7C0]">
                      <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Education
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        Academic progression from 2011 to Present
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {RESUME_DATA.education.map((edu) => (
                      <div
                        key={`${edu.period}-${edu.school}`}
                        className="p-4 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <h3 className="font-display text-sm md:text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                            {edu.program}
                          </h3>
                          <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                            {edu.school}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <span
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${
                              EDU_LEVEL_STYLES[edu.level] ?? EDU_LEVEL_STYLES.Secondary
                            }`}
                          >
                            {edu.level}
                          </span>
                          <span className="text-xs font-mono-code tabular-nums text-[#4D3B42] dark:text-[#D5C2C9]">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Seminars and Trainings */}
                <article className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF6F3] dark:bg-[#192D2A] border border-[#B8DCD5] dark:border-[#2A4945] flex items-center justify-center text-[#2F7A70] dark:text-[#7ED3C6]">
                      <FileText className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                        Seminars &amp; Trainings
                      </h2>
                      <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                        AI, Cloud Computing, DICT Automation &amp; Productivity
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {RESUME_DATA.seminarsAndTrainings.map((seminar) => (
                      <div
                        key={`${seminar.year}-${seminar.title}`}
                        className="p-4 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D] space-y-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#2F7A70] dark:text-[#7ED3C6]">
                            {seminar.organizer}
                          </span>
                          <span className="px-2 py-0.5 text-[11px] font-mono-code tabular-nums rounded-md bg-white dark:bg-[#1D161A] border border-[#EAD6DC] dark:border-[#33262D] text-[#665058] dark:text-[#B59EA7]">
                            {seminar.year}
                          </span>
                        </div>
                        <h3 className="font-display text-sm md:text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                          {seminar.title}
                        </h3>
                        <p className="text-xs text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                          {seminar.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
