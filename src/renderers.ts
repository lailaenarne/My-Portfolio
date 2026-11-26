import {
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_CATEGORIES,
  SkillCategory,
  SkillNode,
} from './data/portfolioData';

export function escapeHtml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const GADGET_PALETTE: Record<
  SkillCategory['id'],
  {
    bezel: string;
    visor: string;
    accentColor: string;
    accentText: string;
    crownBg: string;
    ledColor: string;
    selectedRing: string;
    shadowTone: string;
    outerShadow: string;
    cardIconBox: string;
    cardSelected: string;
    cardTitleAccent: string;
    iconSvg: string;
  }
> = {
  languages: {
    bezel:
      'bg-[conic-gradient(from_140deg,#FFF8FA,#E7C8D3,#FDF3F6,#D29FB2,#FFF8FA)] dark:bg-[conic-gradient(from_140deg,#4A3540,#251920,#5A404D,#1C1217,#4A3540)]',
    visor:
      'bg-[radial-gradient(circle_at_35%_28%,#3A222E_0%,#24151D_56%,#140B10_100%)]',
    accentColor: '#F2A7C0',
    accentText: 'text-[#F2A7C0]',
    crownBg: 'bg-gradient-to-b from-[#F2A7C0] via-[#BE4B72] to-[#7D2B48]',
    ledColor: 'bg-[#F2A7C0] shadow-[0_0_6px_#F2A7C0]',
    selectedRing:
      'ring-2 ring-[#BE4B72] dark:ring-[#F2A7C0] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#BE4B72]/25 dark:bg-[#F2A7C0]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(190,75,114,0.38),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(242,167,192,0.2)]',
    cardIconBox:
      'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
    cardSelected:
      'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#BE4B72] dark:border-[#F2A7C0] shadow-sm',
    cardTitleAccent: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2.5"></rect><path d="M9.5 8.5 7.5 10l2 1.5"></path><path d="m14.5 8.5 2 1.5-2 1.5"></path><path d="M2 18.5h20"></path></svg>',
  },
  'frameworks-data': {
    bezel:
      'bg-[conic-gradient(from_140deg,#F5F7FD,#C4CEE8,#EFF3FB,#99ABD9,#F5F7FD)] dark:bg-[conic-gradient(from_140deg,#39456E,#1C2238,#465585,#141929,#39456E)]',
    visor:
      'bg-[radial-gradient(circle_at_35%_28%,#242D4C_0%,#181E34_56%,#0E1221_100%)]',
    accentColor: '#8FA4E8',
    accentText: 'text-[#8FA4E8]',
    crownBg: 'bg-gradient-to-b from-[#B4C4F4] via-[#3D4E81] to-[#243054]',
    ledColor: 'bg-[#8FA4E8] shadow-[0_0_6px_#8FA4E8]',
    selectedRing:
      'ring-2 ring-[#3D4E81] dark:ring-[#8FA4E8] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#3D4E81]/25 dark:bg-[#8FA4E8]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(61,78,129,0.36),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(143,164,232,0.2)]',
    cardIconBox:
      'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
    cardSelected:
      'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#3D4E81] dark:border-[#8FA4E8] shadow-sm',
    cardTitleAccent: 'text-[#3D4E81] dark:text-[#8FA4E8]',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><ellipse cx="12" cy="6" rx="7.5" ry="3"></ellipse><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"></path><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"></path></svg>',
  },
  'tools-devops': {
    bezel:
      'bg-[conic-gradient(from_140deg,#F3FBF9,#BBDCD5,#ECF8F5,#86BFB3,#F3FBF9)] dark:bg-[conic-gradient(from_140deg,#2D524C,#162B27,#36645D,#0E1D1B,#2D524C)]',
    visor:
      'bg-[radial-gradient(circle_at_35%_28%,#1B3D38_0%,#122A27_56%,#0A1A18_100%)]',
    accentColor: '#7ED3C6',
    accentText: 'text-[#7ED3C6]',
    crownBg: 'bg-gradient-to-b from-[#9FE2D7] via-[#2F7A70] to-[#1B4C45]',
    ledColor: 'bg-[#7ED3C6] shadow-[0_0_6px_#7ED3C6]',
    selectedRing:
      'ring-2 ring-[#2F7A70] dark:ring-[#7ED3C6] ring-offset-4 ring-offset-white dark:ring-offset-[#1D161A]',
    shadowTone: 'bg-[#2F7A70]/25 dark:bg-[#7ED3C6]/20',
    outerShadow:
      'shadow-[0_18px_32px_-12px_rgba(47,122,112,0.36),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.72),inset_0_2px_4px_rgba(126,211,198,0.2)]',
    cardIconBox:
      'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#B8DCD5] dark:border-[#2A4945] text-[#2F7A70] dark:text-[#7ED3C6]',
    cardSelected:
      'bg-[#EAF6F3] dark:bg-[#192D2A] border-[#2F7A70] dark:border-[#7ED3C6] shadow-sm',
    cardTitleAccent: 'text-[#2F7A70] dark:text-[#7ED3C6]',
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .8-7.92A5.5 5.5 0 0 0 7.1 8.5 3.5 3.5 0 0 0 7 18Z"></path><path d="M12 15v-5"></path><path d="m9.5 12.5 2.5-2.5 2.5 2.5"></path></svg>',
  },
};

export function renderSkillsCategoriesHtml(
  activeDomain: 'all' | SkillCategory['id'],
  selectedSkillId: string
): string {
  const categories =
    activeDomain === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeDomain);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return categories
    .map((category) => {
      const palette = GADGET_PALETTE[category.id];
      const colsClass =
        category.skills.length === 3
          ? 'grid-cols-2 sm:grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-4';

      const orbsHtml = category.skills
        .map((skill: SkillNode, skillIdx: number) => {
          const isSelected = skill.id === selectedSkillId;
          const dashOffset =
            circumference - (skill.depthPercent / 100) * circumference;
          const duration = (3.2 + (skillIdx % 3) * 0.55).toFixed(2);
          const delay = ((skillIdx % 4) * 0.26).toFixed(2);
          const unitCode = `MOD-${String(skillIdx + 1).padStart(2, '0')}`;

          return `
            <div class="rounded-xl border px-2.5 pt-3.5 pb-2.5 flex flex-col items-center justify-center transition-colors duration-150 ${
              isSelected
                ? palette.cardSelected
                : 'bg-[#FDF7F8] dark:bg-[#140F12] border-[#EAD6DC] dark:border-[#33262D] hover:border-[#C7D3EA] dark:hover:border-[#5E4750]'
            }">
              <div class="flex flex-col items-center justify-center w-full">
                <div class="animate-orb-bounce" style="--orb-duration:${duration}s; --orb-delay:${delay}s;">
                  <button
                    type="button"
                    data-skill-orb="${escapeHtml(skill.id)}"
                    aria-pressed="${isSelected ? 'true' : 'false'}"
                    aria-label="${escapeHtml(skill.name)} gadget orb — ${escapeHtml(skill.proficiencyLabel)}"
                    class="group relative w-[108px] h-[108px] sm:w-[114px] sm:h-[114px] rounded-full p-[7px] flex items-center justify-center transition-transform duration-150 hover:scale-[1.04] active:scale-[0.96] border border-white/85 dark:border-white/15 ${palette.bezel} ${palette.outerShadow} ${
                      isSelected ? palette.selectedRing : ''
                    }"
                  >
                    <span aria-hidden="true" class="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-6 rounded-r-md border border-white/60 dark:border-white/20 shadow-sm ${palette.crownBg}"></span>
                    <span aria-hidden="true" class="pointer-events-none absolute right-1.5 top-[22%] w-1.5 h-1.5 rounded-full bg-black/25 dark:bg-white/30"></span>
                    <span aria-hidden="true" class="pointer-events-none absolute left-1.5 bottom-[22%] w-1.5 h-1.5 rounded-full bg-black/25 dark:bg-white/30"></span>

                    <svg viewBox="0 0 144 144" aria-hidden="true" class="pointer-events-none absolute inset-0 w-full h-full">
                      <circle cx="72" cy="72" r="67" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="2 7.2" class="text-black/20 dark:text-white/25"></circle>
                    </svg>

                    <span class="relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center p-2 text-center border border-black/40 shadow-[inset_0_8px_18px_rgba(0,0,0,0.75),inset_0_-2px_6px_rgba(255,255,255,0.12)] ${palette.visor}">
                      <svg viewBox="0 0 124 124" aria-hidden="true" class="pointer-events-none absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] opacity-45 ${
                        isSelected ? 'animate-orb-spin' : ''
                      }">
                        <circle cx="62" cy="62" r="57" fill="none" stroke="${palette.accentColor}" stroke-width="1.2" stroke-dasharray="6 6 2 6"></circle>
                      </svg>

                      <svg viewBox="0 0 124 124" aria-hidden="true" class="pointer-events-none absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] -rotate-90">
                        <circle cx="62" cy="62" r="${radius}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.2"></circle>
                        <circle cx="62" cy="62" r="${radius}" fill="none" stroke="${palette.accentColor}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${dashOffset.toFixed(2)}"></circle>
                      </svg>

                      <span aria-hidden="true" class="pointer-events-none absolute -top-2 inset-x-3 h-1/2 rounded-full bg-gradient-to-b from-white/25 via-white/8 to-transparent"></span>
                      <span data-orb-glint aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>

                      <span class="relative z-10 flex flex-col items-center justify-center gap-0.5 px-1">
                        <span class="inline-flex items-center gap-1 font-mono-code text-[8.5px] tracking-wider uppercase text-white/65">
                          <span class="w-1.5 h-1.5 rounded-full ${palette.ledColor}"></span>
                          <span>${unitCode}</span>
                        </span>
                        <span class="font-display text-[11px] sm:text-xs font-bold leading-tight text-[#F8EFF2]">${escapeHtml(skill.name)}</span>
                        <span class="font-mono-code tabular-nums text-[9.5px] font-semibold ${palette.accentText}">${skill.depthPercent}% READY</span>
                      </span>
                    </span>
                  </button>
                </div>
                <span aria-hidden="true" class="animate-orb-shadow mt-2 w-14 h-2 rounded-full blur-[2.5px] ${palette.shadowTone}" style="--orb-duration:${duration}s; --orb-delay:${delay}s;"></span>
              </div>
            </div>
          `;
        })
        .join('');

      return `
        <div class="bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-5 md:p-6">
          <div class="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#F4E6EA] dark:border-[#2D2228]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${palette.cardIconBox}">
                ${palette.iconSvg}
              </div>
              <div>
                <h2 class="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                  <span class="${palette.cardTitleAccent}">${escapeHtml(category.index)}.</span> ${escapeHtml(category.title)}
                </h2>
                <p class="text-xs text-[#665058] dark:text-[#B59EA7]">${escapeHtml(category.subtitle)}</p>
              </div>
            </div>
          </div>
          <div class="grid gap-3 ${colsClass}">
            ${orbsHtml}
          </div>
        </div>
      `;
    })
    .join('');
}

const PROJECT_CAT_STYLES: Record<
  ProjectItem['category'],
  { labelText: string; iconBox: string; buttonBg: string }
> = {
  Interactive: {
    labelText: 'text-[#7A4988] dark:text-[#D5A6E6]',
    iconBox:
      'bg-[#F5EEF8] dark:bg-[#2A1E30] border-[#D8BEEB] dark:border-[#4A344D] text-[#7A4988] dark:text-[#D5A6E6]',
    buttonBg: 'bg-[#7A4988] hover:bg-[#653B72] dark:bg-[#9E67B0] dark:hover:bg-[#875398]',
  },
  'Web UI': {
    labelText: 'text-[#3D4E81] dark:text-[#8FA4E8]',
    iconBox:
      'bg-[#EEF2FA] dark:bg-[#1E2438] border-[#C7D3EA] dark:border-[#333D5C] text-[#3D4E81] dark:text-[#8FA4E8]',
    buttonBg: 'bg-[#3D4E81] hover:bg-[#313F69] dark:bg-[#5E74B8] dark:hover:bg-[#4C61A4]',
  },
  Showcase: {
    labelText: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    iconBox:
      'bg-[#FAF0F2] dark:bg-[#2A1D24] border-[#EAD6DC] dark:border-[#3D2C35] text-[#BE4B72] dark:text-[#F2A7C0]',
    buttonBg: 'bg-[#BE4B72] hover:bg-[#A63D61] dark:bg-[#D66389] dark:hover:bg-[#BE4B72]',
  },
};

const BAR_COLORS = [
  '#BE4B72',
  '#3D4E81',
  '#2F7A70',
  '#7A4988',
  '#A63D61',
  '#5165A1',
];

export function renderProjectMetricsHtml(
  categoryProjects: ProjectItem[],
  activeCategory: ProjectCategory,
  selectedTech: string | null
): string {
  const counts = new Map<string, { count: number; titles: string[] }>();
  for (const project of categoryProjects) {
    for (const tech of Array.from(new Set(project.techStack))) {
      const prev = counts.get(tech);
      if (prev) {
        prev.count += 1;
        prev.titles.push(project.title);
      } else {
        counts.set(tech, { count: 1, titles: [project.title] });
      }
    }
  }

  const total = Math.max(categoryProjects.length, 1);
  const rows = Array.from(counts.entries())
    .map(([tech, info]) => ({
      tech,
      count: info.count,
      pct: Math.round((info.count / total) * 100),
      titles: info.titles,
    }))
    .sort((a, b) => b.count - a.count || a.tech.localeCompare(b.tech));

  const top = rows[0];
  const maxCount = Math.max(...rows.map((r) => r.count), 1);

  const barsHtml = rows
    .map((row, idx) => {
      const color = BAR_COLORS[idx % BAR_COLORS.length];
      const heightPct = Math.max(18, Math.round((row.count / maxCount) * 100));
      const active = selectedTech === row.tech;
      const dimmed = selectedTech !== null && !active;

      return `
        <button
          type="button"
          data-metric-tech="${escapeHtml(row.tech)}"
          aria-pressed="${active ? 'true' : 'false'}"
          title="${escapeHtml(row.tech)}: ${row.count} of ${categoryProjects.length} projects (${row.pct}%)"
          class="group flex flex-col items-center justify-end h-full min-w-[54px] flex-1 focus:outline-none"
        >
          <span class="text-[11px] font-mono-code tabular-nums font-semibold mb-1.5 text-[#4D3B42] dark:text-[#D5C2C9] group-hover:text-[#BE4B72] dark:group-hover:text-[#F2A7C0]">
            ${row.count}
          </span>
          <span class="w-full max-w-[44px] h-[140px] flex items-end justify-center rounded-lg bg-[#FAF0F2]/70 dark:bg-[#140F12]/70 p-1">
            <span
              class="w-full rounded-md transition-all duration-200 group-hover:brightness-110 ${
                active ? 'ring-2 ring-[#1F171A] dark:ring-white' : ''
              }"
              style="height:${heightPct}%; background:${color}; opacity:${dimmed ? '0.32' : '0.92'};"
            ></span>
          </span>
          <span class="mt-2 text-[11px] font-mono-code text-[#4D3B42] dark:text-[#D5C2C9] text-center leading-tight truncate max-w-full">
            ${escapeHtml(row.tech)}
          </span>
        </button>
      `;
    })
    .join('');

  return `
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 mb-5 border-b border-[#F4E6EA] dark:border-[#2D2228]">
      <div class="flex items-start gap-3.5">
        <div class="w-11 h-11 rounded-xl border border-[#C7D3EA] dark:border-[#333D5C] bg-[#EEF2FA] dark:bg-[#1E2438] text-[#3D4E81] dark:text-[#8FA4E8] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-5 h-5" aria-hidden="true"><ellipse cx="12" cy="6" rx="7.5" ry="3"></ellipse><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"></path><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"></path></svg>
        </div>
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2 id="project-metrics-heading" class="font-display text-xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]">
              Project Metrics
            </h2>
            <span class="text-xs font-medium text-[#2F7A70] dark:text-[#7ED3C6]">Stack Analytics</span>
          </div>
          <p class="text-xs sm:text-sm text-[#665058] dark:text-[#B59EA7]">
            Technology stack distribution across <span class="font-medium text-[#1F171A] dark:text-[#F8EFF2]">${categoryProjects.length} ${
              activeCategory === 'All' ? 'deployed projects' : `${escapeHtml(activeCategory)} projects`
            }</span>. Click any bar to filter matching cards below.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-5 sm:gap-6">
        <div class="flex items-center gap-5 text-left">
          <div>
            <p class="text-[11px] font-medium text-[#665058] dark:text-[#B59EA7]">Stack Tags</p>
            <p class="font-display text-lg font-bold tabular-nums text-[#3D4E81] dark:text-[#8FA4E8]">${rows.length}</p>
          </div>
          <div aria-hidden="true" class="h-7 w-px bg-[#EAD6DC] dark:bg-[#33262D]"></div>
          <div>
            <p class="text-[11px] font-medium text-[#665058] dark:text-[#B59EA7]">Most Used</p>
            <p class="font-mono-code text-sm font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">${
              top ? `${escapeHtml(top.tech)} (${top.count})` : '—'
            }</p>
          </div>
        </div>
        ${
          selectedTech
            ? `<button type="button" data-clear-tech-filter class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FAF0F2] dark:bg-[#2A1D24] text-[#BE4B72] dark:text-[#F2A7C0] hover:border-[#BE4B72] transition-colors whitespace-nowrap shrink-0">Clear: ${escapeHtml(selectedTech)}</button>`
            : ''
        }
      </div>
    </div>

    <div class="flex items-end gap-2 sm:gap-3 overflow-x-auto pb-2 pt-2" role="img" aria-label="Technology stack bar chart">
      ${barsHtml}
    </div>
  `;
}

export function renderProjectsGridHtml(
  filteredProjects: ProjectItem[],
  activeCategory: ProjectCategory,
  selectedTech: string | null
): string {
  if (filteredProjects.length === 0) {
    return `
      <div class="md:col-span-12 py-16 text-center border border-[#EAD6DC] dark:border-[#33262D] rounded-2xl bg-white dark:bg-[#1D161A]">
        <p class="text-sm text-[#665058] dark:text-[#B59EA7]">No projects matched this filter.</p>
      </div>
    `;
  }

  return filteredProjects
    .map((project) => {
      const catStyle = PROJECT_CAT_STYLES[project.category];
      const spanClass =
        activeCategory === 'All' && !selectedTech
          ? project.bentoSpan === 'wide'
            ? 'md:col-span-7'
            : 'md:col-span-5'
          : 'md:col-span-6';

      return `
        <div class="${spanClass}">
          <div data-tilt="4.5" class="tilt-card group h-full bg-white dark:bg-[#1D161A] border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_10px_28px_-18px_rgba(190,75,114,0.18)]">
            <div class="tilt-sheen" aria-hidden="true"></div>
            <article class="h-full flex flex-col justify-between">
              <div>
                <div class="p-3 pb-0">
                  <button
                    type="button"
                    data-open-project="${escapeHtml(project.id)}"
                    aria-label="Open ${escapeHtml(project.title)} case study drawer"
                    class="relative block w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#EAD6DC] dark:border-[#33262D] bg-[#FAF0F2] dark:bg-[#2A1D24] text-left"
                  >
                    <img
                      src="${escapeHtml(project.imageSrc)}"
                      alt="${escapeHtml(project.imageAlt)}"
                      loading="lazy"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1F171A]/85 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      Open Drawer
                    </span>
                  </button>
                </div>

                <div class="p-6 space-y-4">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex flex-wrap items-center gap-2 text-xs text-[#665058] dark:text-[#B59EA7]">
                      <span class="font-semibold ${catStyle.labelText}">${escapeHtml(project.category)}</span>
                      <span aria-hidden="true">·</span>
                      <span class="tabular-nums">${escapeHtml(project.year)}</span>
                      <span aria-hidden="true">·</span>
                      <span>${escapeHtml(project.courseOrContext)}</span>
                    </div>
                  </div>

                  <h2 class="font-display text-xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]">
                    <button
                      type="button"
                      data-open-project="${escapeHtml(project.id)}"
                      class="text-left hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors"
                    >
                      ${escapeHtml(project.title)}
                    </button>
                  </h2>

                  <p class="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                    ${escapeHtml(project.summary)}
                  </p>

                  <p class="text-xs font-medium text-[#2F7A70] dark:text-[#7ED3C6]">
                    ${escapeHtml(project.metricsLabel)}
                  </p>
                </div>
              </div>

              <div class="px-6 pb-6 pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228] space-y-4">
                <p class="text-xs font-mono-code text-[#3D4E81] dark:text-[#8FA4E8] leading-relaxed">
                  ${escapeHtml(project.techStack.join(' · '))}
                </p>

                <div class="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    data-open-project="${escapeHtml(project.id)}"
                    class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 ${catStyle.buttonBg}"
                  >
                    <span>Case Study</span>
                  </button>

                  <div class="flex items-center gap-4">
                    <a
                      href="${escapeHtml(project.liveDemoUrl)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] hover:text-[#2F7A70] dark:hover:text-[#7ED3C6] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Live Site ↗</span>
                    </a>
                    <a
                      href="${escapeHtml(project.githubUrl)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 text-xs font-semibold text-[#665058] dark:text-[#B59EA7] hover:text-[#3D4E81] dark:hover:text-[#8FA4E8] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      `;
    })
    .join('');
}

export function renderDrawerTabBody(
  project: ProjectItem,
  tab: 'architecture' | 'ui' | 'stack'
): string {
  if (tab === 'architecture') {
    return `
      <div class="space-y-5">
        <div class="p-4 rounded-xl bg-[#FDF7F8] dark:bg-[#140F12] border border-[#EAD6DC] dark:border-[#33262D]">
          <h3 class="text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0] mb-1.5">Problem Statement</h3>
          <p class="text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">${escapeHtml(project.problemStatement)}</p>
        </div>
        <div class="space-y-3">
          <h3 class="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">System Design &amp; Engineering Notes</h3>
          <ul class="space-y-3">
            ${project.architectureNotes
              .map(
                (note) => `
              <li class="flex items-start gap-3 p-3.5 rounded-xl border border-[#F4E6EA] dark:border-[#2D2228] bg-white dark:bg-[#1D161A] text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
                <span class="text-[#BE4B72] dark:text-[#F2A7C0] font-bold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>${escapeHtml(note)}</span>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }

  if (tab === 'ui') {
    return `
      <div class="space-y-3">
        <h3 class="text-xs font-semibold text-[#665058] dark:text-[#B59EA7]">Interface &amp; Ergonomic Highlights</h3>
        <ul class="space-y-3">
          ${project.uiHighlights
            .map(
              (highlight) => `
            <li class="flex items-start gap-3 p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12] text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
              <span class="text-[#BE4B72] dark:text-[#F2A7C0] font-bold mt-0.5 shrink-0" aria-hidden="true">◆</span>
              <span>${escapeHtml(highlight)}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    `;
  }

  return `
    <div class="space-y-5">
      <div class="p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12]">
        <h3 class="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-2">Technologies &amp; Tooling</h3>
        <p class="text-sm font-mono-code text-[#1F171A] dark:text-[#F8EFF2]">${escapeHtml(project.techStack.join(' · '))}</p>
      </div>
      <div class="p-4 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12]">
        <h3 class="text-xs font-semibold text-[#665058] dark:text-[#B59EA7] mb-1.5">Measured Outcome</h3>
        <p class="text-sm font-medium text-[#1F171A] dark:text-[#F8EFF2]">${escapeHtml(project.metricsLabel)}</p>
      </div>
    </div>
  `;
}

export function getSkillById(skillId: string): {
  skill: SkillNode;
  categoryId: SkillCategory['id'];
} {
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.skills.find((s) => s.id === skillId);
    if (found) return { skill: found, categoryId: cat.id };
  }
  return {
    skill: SKILL_CATEGORIES[0].skills[0],
    categoryId: SKILL_CATEGORIES[0].id,
  };
}

export function getRelatedProjects(skill: SkillNode): ProjectItem[] {
  return PROJECTS.filter((p) => skill.relatedProjectIds.includes(p.id));
}
