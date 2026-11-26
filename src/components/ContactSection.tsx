import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  GitBranchNodeIcon,
  NetworkMeshIcon,
  TerminalWindowIcon,
} from './IctIcons';
import { KineticHeadline } from './KineticText';

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TOPICS = [
  'Internship or Junior Role',
  'CIT 240 Coursework Review',
  'Open Source Collaboration',
  'General Inquiry',
];

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  topic: TOPICS[0],
  message: '',
};

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    name: string;
    topic: string;
    timestamp: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = (state: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (state.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(state.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (state.message.trim().length < 15) {
      nextErrors.message =
        'Please include a brief project or inquiry note (at least 15 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedReceipt({
      name: form.name.trim(),
      topic: form.topic,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    setForm(INITIAL_FORM);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      setCopiedPhone(false);
    }
  };

  return (
    <section aria-labelledby="contact-heading" className="py-12 md:py-16">
      <div className="portfolio-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Framed Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8]">
                <NetworkMeshIcon className="w-4 h-4" />
                <span>Correspondence</span>
              </p>
              <h1
                id="contact-heading"
                className="font-display headline-balance text-3xl md:text-4xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
              >
                <KineticHeadline lines={['Get in Touch &', 'Collaborate']} />
              </h1>
              <p className="text-base text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed max-w-[45ch]">
                Open to 2027 software engineering internships, CIT 240 technical reviews, and open-source web accessibility collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#BE4B72] dark:text-[#F2A7C0]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                    University Email
                  </p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="block text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors break-all"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4D3B42] dark:text-[#E7D4DB] bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] rounded-lg hover:border-[#2F7A70] dark:hover:border-[#7ED3C6] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2F7A70] dark:text-[#7ED3C6]" aria-hidden="true" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5EEF8] dark:bg-[#2A1E30] border border-[#D8BEEB] dark:border-[#4A344D] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#7A4988] dark:text-[#D5A6E6]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                    Mobile Number
                  </p>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="block font-mono-code tabular-nums text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#7A4988] dark:hover:text-[#D5A6E6] transition-colors"
                  >
                    {PROFILE.phone}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy phone number"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4D3B42] dark:text-[#E7D4DB] bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] rounded-lg hover:border-[#7A4988] dark:hover:border-[#D5A6E6] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2F7A70] dark:text-[#7ED3C6]" aria-hidden="true" />
                        <span>Copied Number</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FA] dark:bg-[#1E2438] border border-[#C7D3EA] dark:border-[#333D5C] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#3D4E81] dark:text-[#8FA4E8]" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                    Address &amp; Institution
                  </p>
                  <p className="text-sm font-medium text-[#1F171A] dark:text-[#F8EFF2]">
                    {PROFILE.location}
                  </p>
                  <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                    West Visayas State University - Lambunao Campus
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F3] dark:bg-[#192D2A] border border-[#B8DCD5] dark:border-[#2A4945] flex items-center justify-center shrink-0 text-[#2F7A70] dark:text-[#7ED3C6]">
                  <GitBranchNodeIcon className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                    Social &amp; Developer Profiles
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#3D4E81] dark:hover:text-[#8FA4E8] transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-4 h-4 text-[#3D4E81] dark:text-[#8FA4E8]" aria-hidden="true" />
                    </a>
                    <a
                      href={PROFILE.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#2F7A70] dark:hover:text-[#7ED3C6] transition-colors"
                    >
                      <span>Facebook</span>
                      <ArrowUpRight className="w-4 h-4 text-[#2F7A70] dark:text-[#7ED3C6]" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[#BE4B72] dark:text-[#F2A7C0]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">
                    Curriculum Vitae (PDF)
                  </p>
                  <p className="text-sm font-medium text-[#1F171A] dark:text-[#F8EFF2]">
                    {PROFILE.resumeFileName}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={PROFILE.resumePdfUrl}
                      download={PROFILE.resumeFileName}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#BE4B72] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-lg transition-all whitespace-nowrap shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Download Resume</span>
                    </a>
                    <a
                      href={PROFILE.resumePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D4E81] dark:text-[#8FA4E8] hover:underline"
                    >
                      <span>Preview PDF</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Integrated Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 md:p-8">
              {submittedReceipt ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 space-y-4"
                >
                  <div className="inline-flex items-center gap-2 text-[#2F7A70] dark:text-[#7ED3C6] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Message Prepared Successfully</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                    Thank you, {submittedReceipt.name}.
                  </h2>
                  <p className="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed max-w-[55ch]">
                    Your inquiry regarding{' '}
                    <span className="font-medium text-[#1F171A] dark:text-[#F8EFF2]">
                      {submittedReceipt.topic}
                    </span>{' '}
                    was validated at {submittedReceipt.timestamp}. For direct correspondence, you can also send an email anytime to{' '}
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="underline underline-offset-2 text-[#BE4B72] dark:text-[#F2A7C0]"
                    >
                      {PROFILE.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedReceipt(null)}
                    className="mt-2 inline-flex items-center px-4 py-2.5 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] bg-[#FAF0F2] dark:bg-[#2A1D24] border border-[#EAD6DC] dark:border-[#3D2C35] hover:border-[#3D4E81] rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-[#F4E6EA] dark:border-[#2D2228]">
                    <TerminalWindowIcon className="w-4 h-4 text-[#3D4E81] dark:text-[#8FA4E8]" />
                    <span className="font-display text-sm font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
                      Direct Message Form
                    </span>
                  </div>

                  {/* Interactive Quick Topic Selector */}
                  <div>
                    <span className="block text-xs font-semibold text-[#4D3B42] dark:text-[#E7D4DB] mb-2.5">
                      Inquiry Topic
                    </span>
                    <div
                      role="group"
                      aria-label="Select inquiry topic"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                    >
                      {TOPICS.map((topic) => {
                        const active = form.topic === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setForm({ ...form, topic })}
                            aria-pressed={active}
                            className={`px-3.5 py-2.5 text-left text-xs font-medium rounded-xl border transition-colors ${
                              active
                                ? 'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#3D4E81] dark:border-[#8FA4E8] text-[#3D4E81] dark:text-[#8FA4E8]'
                                : 'bg-[#FDF7F8] dark:bg-[#140F12] border-[#EAD6DC] dark:border-[#33262D] text-[#4D3B42] dark:text-[#D5C2C9] hover:border-[#D3B0BC]'
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#4D3B42] dark:text-[#E7D4DB] mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        placeholder="e.g. Marco Reyes"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FDF7F8] dark:bg-[#140F12] text-[#1F171A] dark:text-[#F8EFF2] border border-[#EAD6DC] dark:border-[#33262D] rounded-xl placeholder:text-[#A38A93] dark:placeholder:text-[#745C66] focus:border-[#3D4E81] dark:focus:border-[#8FA4E8] focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#4D3B42] dark:text-[#E7D4DB] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="you@organization.org"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FDF7F8] dark:bg-[#140F12] text-[#1F171A] dark:text-[#F8EFF2] border border-[#EAD6DC] dark:border-[#33262D] rounded-xl placeholder:text-[#A38A93] dark:placeholder:text-[#745C66] focus:border-[#3D4E81] dark:focus:border-[#8FA4E8] focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-[#4D3B42] dark:text-[#E7D4DB]"
                      >
                        Message
                      </label>
                      <span className="text-[11px] font-mono-code tabular-nums text-[#665058] dark:text-[#B59EA7]">
                        {form.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      placeholder="Share details about your team, project scope, or timeline..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF7F8] dark:bg-[#140F12] text-[#1F171A] dark:text-[#F8EFF2] border border-[#EAD6DC] dark:border-[#33262D] rounded-xl placeholder:text-[#A38A93] dark:placeholder:text-[#745C66] focus:border-[#3D4E81] dark:focus:border-[#8FA4E8] focus:outline-none transition-colors resize-y"
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#F4E6EA] dark:border-[#2D2228]">
                    <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
                      Direct replies sent within 24–48 hours.
                    </p>
                    <motion.button
                      type="submit"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#BE4B72] via-[#984A7F] to-[#3D4E81] hover:from-[#A63D61] hover:to-[#32416E] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
