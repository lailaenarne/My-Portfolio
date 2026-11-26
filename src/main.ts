import {
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_CATEGORIES,
  SkillCategory,
} from './data/portfolioData';
import {
  escapeHtml,
  getRelatedProjects,
  getSkillById,
  renderDrawerTabBody,
  renderProjectMetricsHtml,
  renderProjectsGridHtml,
  renderSkillsCategoriesHtml,
} from './renderers';
import { CameraPresetId, initInteractive3DStudio } from './studio3d';

type PageId = 'about' | 'skills' | 'projects' | 'capstone' | 'resume' | 'contact';

const VALID_PAGES: PageId[] = [
  'about',
  'skills',
  'projects',
  'capstone',
  'resume',
  'contact',
];

const PAGE_LABELS: Record<PageId, string> = {
  about: 'About & Overview',
  skills: 'Capabilities Matrix',
  projects: 'Bento Project Gallery',
  capstone: 'FaithPoint Capstone & CIT 240',
  resume: 'Curriculum Vitae & Resume',
  contact: 'Contact & Inquiry',
};

const WORKFLOW_DETAILS: Record<
  string,
  { label: string; detail: string; targetPage: PageId; accentClass: string }
> = {
  frontend: {
    label: 'Semantic UI',
    detail:
      'Accessible landmark structure, fluid CSS Grid, and responsive micro-interactions.',
    targetPage: 'skills',
    accentClass: 'text-[#BE4B72] dark:text-[#F2A7C0]',
  },
  backend: {
    label: 'Application Layer',
    detail:
      'Structured server routes, PHP & TypeScript logic, and clean client validation.',
    targetPage: 'projects',
    accentClass: 'text-[#3D4E81] dark:text-[#8FA4E8]',
  },
  database: {
    label: 'Relational Data',
    detail:
      'Normalized 3NF MySQL schemas, unique indexes, and foreign-key integrity.',
    targetPage: 'skills',
    accentClass: 'text-[#7A4988] dark:text-[#D5A6E6]',
  },
  deploy: {
    label: 'Git & Hosting',
    detail:
      'Structured Git commits, organized GitHub repositories, and live Netlify & Vercel deployments.',
    targetPage: 'capstone',
    accentClass: 'text-[#2F7A70] dark:text-[#7ED3C6]',
  },
};

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function attachTiltListeners(root: ParentNode = document): void {
  if (prefersReducedMotion) return;

  root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';
    const maxTilt = Number(card.dataset.tilt || '5');
    const sheen = card.querySelector<HTMLElement>('.tilt-sheen');

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      const rx = ((0.5 - relY) * maxTilt * 2).toFixed(2);
      const ry = ((relX - 0.5) * maxTilt * 2).toFixed(2);
      card.style.transform = `perspective(1100px) translateY(-3px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (sheen) {
        sheen.style.background = `radial-gradient(460px circle at ${(relX * 100).toFixed(1)}% ${(relY * 100).toFixed(1)}%, rgba(232, 137, 168, 0.18), rgba(143, 164, 232, 0.08) 45%, transparent 72%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function attachOrbPointerPhysics(root: ParentNode): void {
  if (prefersReducedMotion) return;

  root.querySelectorAll<HTMLButtonElement>('[data-skill-orb]').forEach((orb) => {
    if (orb.dataset.orbBound === 'true') return;
    orb.dataset.orbBound = 'true';
    const glint = orb.querySelector<HTMLElement>('[data-orb-glint]');

    orb.addEventListener('mousemove', (event) => {
      const rect = orb.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      const rx = ((0.5 - relY) * 20).toFixed(2);
      const ry = ((relX - 0.5) * 20).toFixed(2);
      const sx = ((relX - 0.5) * 5).toFixed(2);
      const sy = ((relY - 0.5) * 5).toFixed(2);
      orb.style.transform = `perspective(780px) translate3d(${sx}px, ${sy}px, 0) scale(1.04) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (glint) {
        glint.style.background = `radial-gradient(circle at ${(relX * 100).toFixed(1)}% ${(relY * 100).toFixed(1)}%, rgba(255,255,255,0.42), transparent 55%)`;
      }
    });

    orb.addEventListener('mouseleave', () => {
      orb.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher
  const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-set]');
  const applyTheme = (mode: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    try {
      localStorage.setItem('portfolio-theme', mode);
    } catch {
      // Ignore storage errors
    }

    themeButtons.forEach((btn) => {
      const isActive = btn.dataset.themeSet === mode;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) {
        btn.className =
          mode === 'light'
            ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 bg-[#BE4B72] text-white shadow-sm'
            : 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 bg-[#F2A7C0] text-[#140F12] shadow-sm';
      } else {
        btn.className =
          'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-white';
      }
    });
  };

  const initialTheme: 'light' | 'dark' = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
  applyTheme(initialTheme);
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.themeSet === 'dark' ? 'dark' : 'light';
      applyTheme(next);
    });
  });

  // 2. Navigation & Page Switching
  const pages = document.querySelectorAll<HTMLElement>('[data-page]');
  const navLinks = document.querySelectorAll<HTMLElement>('[data-nav-page]');
  const breadcrumbLabel = document.getElementById('toolbar-page-label');
  const mobileDrawer = document.getElementById('mobile-navigation-drawer');
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileToggleBtn) return;
    mobileDrawer.classList.add('hidden');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
  };

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isHidden = mobileDrawer.classList.contains('hidden');
      mobileDrawer.classList.toggle('hidden', !isHidden);
      mobileToggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
  }

  let activePage: PageId = 'about';
  let bentoObserver: IntersectionObserver | null = null;

  const observeBentoCards = (root: ParentNode | null) => {
    bentoObserver?.disconnect();
    bentoObserver = null;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-bento-card]')).filter(
      (el) => !el.classList.contains('is-visible')
    );
    if (cards.length === 0) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }

    bentoObserver = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rectA = a.boundingClientRect;
            const rectB = b.boundingClientRect;
            if (Math.abs(rectA.top - rectB.top) > 12) return rectA.top - rectB.top;
            return rectA.left - rectB.left;
          });

        if (intersecting.length === 0) return;

        requestAnimationFrame(() => {
          intersecting.forEach((entry, batchIdx) => {
            const card = entry.target as HTMLElement;
            card.style.setProperty('--bento-delay', `${batchIdx * 90}ms`);
            card.classList.add('is-visible');
            bentoObserver?.unobserve(card);
          });
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    cards.forEach((card) => bentoObserver?.observe(card));
  };

  const showPage = (pageId: PageId, updateHistory = true) => {
    activePage = pageId;
    pages.forEach((sec) => {
      const match = sec.dataset.page === pageId;
      sec.classList.toggle('hidden', !match);
      if (match) {
        sec.classList.remove('animate-page-in');
        void sec.offsetWidth;
        sec.classList.add('animate-page-in');
      }
    });
    if (pageId === 'projects') {
      requestAnimationFrame(() => {
        observeBentoCards(document.getElementById('projects-grid'));
      });
    }

    navLinks.forEach((el) => {
      const target = el.dataset.navPage;
      const isCurrent = target === pageId;
      if (el.tagName === 'A') {
        if (isCurrent) {
          el.setAttribute('aria-current', 'page');
        } else {
          el.removeAttribute('aria-current');
        }
      }
      if (el.dataset.navStyle === 'desktop') {
        el.className = isCurrent
          ? 'relative py-2 text-sm whitespace-nowrap shrink-0 text-[#1F171A] dark:text-[#F8EFF2] font-semibold border-b-2 border-[#BE4B72] dark:border-[#F2A7C0] transition-colors'
          : 'relative py-2 text-sm font-medium whitespace-nowrap shrink-0 text-[#665058] dark:text-[#B59EA7] hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] border-b-2 border-transparent transition-colors';
      } else if (el.dataset.navStyle === 'mobile') {
        el.className = isCurrent
          ? 'px-3.5 py-3 text-base rounded-xl bg-[#FAF0F2] dark:bg-[#2A1D24] text-[#BE4B72] dark:text-[#F2A7C0] font-semibold'
          : 'px-3.5 py-3 text-base font-medium rounded-xl text-[#4D3B42] dark:text-[#D5C2C9] hover:bg-[#FAF0F2] dark:hover:bg-[#23191F]';
      } else if (el.dataset.navStyle === 'footer') {
        el.className = isCurrent
          ? 'text-[#BE4B72] dark:text-[#F2A7C0] font-semibold transition-colors'
          : 'text-[#665058] dark:text-[#B59EA7] hover:text-[#BE4B72] dark:hover:text-[#F2A7C0] transition-colors';
      }
    });

    if (breadcrumbLabel) {
      breadcrumbLabel.textContent = PAGE_LABELS[pageId];
    }

    if (updateHistory && window.location.hash !== `#${pageId}`) {
      window.history.pushState(null, '', `#${pageId}`);
    }
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  navLinks.forEach((el) => {
    el.addEventListener('click', (event) => {
      const page = el.dataset.navPage as PageId | undefined;
      if (page && VALID_PAGES.includes(page)) {
        event.preventDefault();
        showPage(page);
      }
    });
  });

  const getHashPage = (): PageId => {
    const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
    return VALID_PAGES.includes(hash) ? hash : 'about';
  };
  showPage(getHashPage(), false);

  window.addEventListener('hashchange', () => {
    const hashPage = getHashPage();
    if (hashPage !== activePage) {
      showPage(hashPage, false);
    }
  });

  // 3. Kinetic Role Ticker
  const roleTickerEl = document.getElementById('hero-role-ticker');
  if (roleTickerEl && PROFILE.kineticRoles.length > 0) {
    let roleIdx = 0;
    roleTickerEl.textContent = PROFILE.kineticRoles[0];
    if (!prefersReducedMotion) {
      window.setInterval(() => {
        roleIdx = (roleIdx + 1) % PROFILE.kineticRoles.length;
        roleTickerEl.textContent = PROFILE.kineticRoles[roleIdx];
      }, 2800);
    }
  }

  // 4. Interactive 3D Studio
  const studioMount = document.getElementById('studio-3d-mount');
  const studioFallback = document.getElementById('studio-3d-fallback');
  const studioCtrl = studioMount
    ? initInteractive3DStudio(studioMount, studioFallback)
    : null;

  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-3d-preset]');
  const explodeInput = document.getElementById('studio-explode-slider') as HTMLInputElement | null;
  const explodeValueEl = document.getElementById('studio-explode-value');
  const spinToggleBtn = document.getElementById('studio-spin-toggle');
  const reset3dBtn = document.getElementById('studio-3d-reset');
  const toggleDockBtn = document.getElementById('studio-dock-toggle');
  const dockPanel = document.getElementById('studio-dock-panel');

  let isSpinning = !prefersReducedMotion;

  const updatePresetButtons = (selected: CameraPresetId) => {
    presetBtns.forEach((btn) => {
      const active = btn.getAttribute('data-3d-preset') === selected;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = active
        ? 'px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 bg-[#BE4B72] dark:bg-[#F2A7C0] text-white dark:text-[#140F12] border-transparent shadow-sm'
        : 'px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 bg-[#FAF0F2] dark:bg-[#140F12] text-[#4D3B42] dark:text-[#D5C2C9] border-[#EAD6DC] dark:border-[#33262D] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8]';
    });
  };

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn.getAttribute('data-3d-preset') || 'showcase') as CameraPresetId;
      updatePresetButtons(id);
      studioCtrl?.setPreset(id);
    });
  });

  if (explodeInput) {
    explodeInput.addEventListener('input', () => {
      const val = Number(explodeInput.value);
      if (explodeValueEl) explodeValueEl.textContent = `${val}%`;
      studioCtrl?.setExplode(val);
    });
  }

  if (spinToggleBtn) {
    const syncSpinBtn = () => {
      spinToggleBtn.setAttribute('aria-pressed', isSpinning ? 'true' : 'false');
      spinToggleBtn.textContent = isSpinning ? 'Pause Spin' : 'Orbit Spin';
    };
    syncSpinBtn();
    spinToggleBtn.addEventListener('click', () => {
      isSpinning = !isSpinning;
      studioCtrl?.setAutoSpin(isSpinning);
      syncSpinBtn();
    });
  }

  if (reset3dBtn) {
    reset3dBtn.addEventListener('click', () => {
      if (explodeInput) explodeInput.value = '15';
      if (explodeValueEl) explodeValueEl.textContent = '15%';
      studioCtrl?.setExplode(15);
      updatePresetButtons('showcase');
      studioCtrl?.setPreset('showcase');
    });
  }

  if (toggleDockBtn && dockPanel) {
    toggleDockBtn.addEventListener('click', () => {
      const hidden = dockPanel.classList.toggle('hidden');
      toggleDockBtn.setAttribute('aria-expanded', hidden ? 'false' : 'true');
      toggleDockBtn.textContent = hidden ? 'Show 3D Controls' : 'Hide Controls';
    });
  }

  // 5. Interactive ICT Workflow Nodes
  const workflowBtns = document.querySelectorAll<HTMLButtonElement>('[data-workflow-node]');
  const workflowDetailText = document.getElementById('workflow-detail-text');
  const workflowTargetBtn = document.getElementById('workflow-target-btn');
  let activeWorkflowId = 'frontend';

  const syncWorkflow = () => {
    const info = WORKFLOW_DETAILS[activeWorkflowId] ?? WORKFLOW_DETAILS.frontend;
    workflowBtns.forEach((btn) => {
      const active = btn.dataset.workflowNode === activeWorkflowId;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.dataset.active = active ? 'true' : 'false';
      btn.classList.toggle('ring-2', active);
      btn.classList.toggle('ring-[#BE4B72]', active);
      btn.classList.toggle('dark:ring-[#F2A7C0]', active);
      btn.classList.toggle('bg-[#FAF0F2]', active);
      btn.classList.toggle('dark:bg-[#24181F]', active);
      btn.classList.toggle('bg-[#FDF7F8]', !active);
      btn.classList.toggle('dark:bg-[#140F12]', !active);
    });
    if (workflowDetailText) {
      workflowDetailText.innerHTML = `<span class="font-semibold ${info.accentClass}">${escapeHtml(info.label)}:</span> ${escapeHtml(info.detail)}`;
    }
    if (workflowTargetBtn) {
      workflowTargetBtn.dataset.navPage = info.targetPage;
      workflowTargetBtn.textContent = `Explore in ${info.targetPage} →`;
      workflowTargetBtn.className = `inline-flex items-center gap-1.5 text-xs font-semibold hover:underline whitespace-nowrap shrink-0 ${info.accentClass}`;
    }
  };

  workflowBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeWorkflowId = btn.dataset.workflowNode || 'frontend';
      syncWorkflow();
    });
  });
  syncWorkflow();

  // 6. Case Study Drawer
  const drawerEl = document.getElementById('case-study-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtns = document.querySelectorAll<HTMLElement>('[data-close-drawer]');
  const drawerContextEl = document.getElementById('drawer-project-context');
  const drawerImgEl = document.getElementById('drawer-project-image') as HTMLImageElement | null;
  const drawerMetaEl = document.getElementById('drawer-project-meta');
  const drawerTitleEl = document.getElementById('drawer-project-title');
  const drawerSummaryEl = document.getElementById('drawer-project-summary');
  const drawerBodyEl = document.getElementById('drawer-tab-body');
  const drawerLiveLink = document.getElementById('drawer-live-link') as HTMLAnchorElement | null;
  const drawerGithubLink = document.getElementById('drawer-github-link') as HTMLAnchorElement | null;
  const drawerTabBtns = document.querySelectorAll<HTMLButtonElement>('[data-drawer-tab]');

  let activeDrawerProject: ProjectItem | null = null;
  let activeDrawerTab: 'architecture' | 'ui' | 'stack' = 'architecture';

  const renderDrawerContent = () => {
    if (!activeDrawerProject) return;
    drawerTabBtns.forEach((btn) => {
      const active = btn.dataset.drawerTab === activeDrawerTab;
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.className = active
        ? 'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-[#2A1D24] border border-[#E5C6D0] dark:border-[#4E3944] text-[#1F171A] dark:text-[#F8EFF2] shadow-sm whitespace-nowrap'
        : 'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2] whitespace-nowrap';
    });
    if (drawerBodyEl) {
      drawerBodyEl.innerHTML = renderDrawerTabBody(activeDrawerProject, activeDrawerTab);
    }
  };

  const openCaseStudyDrawer = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (!found || !drawerEl) return;
    activeDrawerProject = found;
    activeDrawerTab = 'architecture';

    if (drawerContextEl) drawerContextEl.textContent = found.courseOrContext;
    if (drawerImgEl) {
      drawerImgEl.src = found.imageSrc;
      drawerImgEl.alt = found.imageAlt;
    }
    if (drawerMetaEl) {
      drawerMetaEl.innerHTML = `<span class="font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">${escapeHtml(found.category)}</span> <span aria-hidden="true">·</span> <span class="tabular-nums">${escapeHtml(found.year)}</span> <span aria-hidden="true">·</span> <span>${escapeHtml(found.metricsLabel)}</span>`;
    }
    if (drawerTitleEl) drawerTitleEl.textContent = found.title;
    if (drawerSummaryEl) drawerSummaryEl.textContent = found.summary;
    if (drawerLiveLink) drawerLiveLink.href = found.liveDemoUrl;
    if (drawerGithubLink) drawerGithubLink.href = found.githubUrl;

    renderDrawerContent();
    drawerEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudyDrawer = () => {
    if (!drawerEl) return;
    drawerEl.classList.add('hidden');
    document.body.style.overflow = '';
    activeDrawerProject = null;
  };

  drawerTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeDrawerTab = (btn.dataset.drawerTab || 'architecture') as 'architecture' | 'ui' | 'stack';
      renderDrawerContent();
    });
  });

  drawerBackdrop?.addEventListener('click', closeCaseStudyDrawer);
  drawerCloseBtns.forEach((btn) => btn.addEventListener('click', closeCaseStudyDrawer));

  // 7. Skills Matrix & Gadget Orbs
  const skillsContainer = document.getElementById('skills-categories-container');
  const domainBtns = document.querySelectorAll<HTMLButtonElement>('[data-skill-domain]');
  const inspectorHeader = document.getElementById('skill-inspector-header');
  const inspectorProficiency = document.getElementById('skill-inspector-proficiency');
  const inspectorTitle = document.getElementById('skill-inspector-title');
  const inspectorContext = document.getElementById('skill-inspector-context');
  const inspectorPattern = document.getElementById('skill-inspector-pattern');
  const inspectorCode = document.getElementById('skill-inspector-code');
  const inspectorProjects = document.getElementById('skill-inspector-projects');

  let activeSkillDomain: 'all' | SkillCategory['id'] = 'all';
  let selectedSkillId = SKILL_CATEGORIES[0].skills[0].id;
  let snippetTimer: number | null = null;

  const HEADER_BG: Record<SkillCategory['id'], string> = {
    languages: 'bg-[#FAF0F2] dark:bg-[#251820]',
    'frameworks-data': 'bg-[#EEF2FA] dark:bg-[#191F30]',
    'tools-devops': 'bg-[#EAF6F3] dark:bg-[#152522]',
  };

  const updateSkillInspector = () => {
    const { skill, categoryId } = getSkillById(selectedSkillId);
    if (inspectorHeader) {
      inspectorHeader.className = `p-6 border-b border-[#EAD6DC] dark:border-[#33262D] ${HEADER_BG[categoryId]}`;
    }
    if (inspectorProficiency) inspectorProficiency.textContent = skill.proficiencyLabel;
    if (inspectorTitle) inspectorTitle.textContent = skill.name;
    if (inspectorContext) inspectorContext.textContent = skill.context;
    if (inspectorPattern) inspectorPattern.textContent = skill.architecturePattern;

    if (inspectorCode) {
      if (snippetTimer) window.clearInterval(snippetTimer);
      if (prefersReducedMotion) {
        inspectorCode.textContent = skill.codeSnippet;
      } else {
        let chars = 0;
        const full = skill.codeSnippet;
        inspectorCode.textContent = '';
        snippetTimer = window.setInterval(() => {
          chars += 3;
          if (chars >= full.length) {
            inspectorCode.textContent = full;
            if (snippetTimer) window.clearInterval(snippetTimer);
            snippetTimer = null;
          } else {
            inspectorCode.textContent = full.slice(0, chars);
          }
        }, 14);
      }
    }

    if (inspectorProjects) {
      const related = getRelatedProjects(skill);
      inspectorProjects.innerHTML = related
        .map(
          (project) => `
          <button
            type="button"
            data-open-project="${escapeHtml(project.id)}"
            class="w-full text-left px-3.5 py-2.5 rounded-xl border border-[#EAD6DC] dark:border-[#33262D] bg-[#FDF7F8] dark:bg-[#140F12] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] flex items-center justify-between gap-3 transition-colors group"
          >
            <div class="min-w-0">
              <p class="text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2] truncate group-hover:text-[#BE4B72] dark:group-hover:text-[#F2A7C0]">${escapeHtml(project.title)}</p>
              <p class="text-[11px] text-[#665058] dark:text-[#B59EA7]">${escapeHtml(project.category)} · ${escapeHtml(project.year)}</p>
            </div>
            <span class="text-xs text-[#3D4E81] dark:text-[#8FA4E8] shrink-0" aria-hidden="true">→</span>
          </button>`
        )
        .join('');

      inspectorProjects
        .querySelectorAll<HTMLButtonElement>('[data-open-project]')
        .forEach((btn) => {
          btn.addEventListener('click', () => {
            if (btn.dataset.openProject) openCaseStudyDrawer(btn.dataset.openProject);
          });
        });
    }
  };

  const renderSkillsMatrix = () => {
    domainBtns.forEach((btn) => {
      const active = btn.dataset.skillDomain === activeSkillDomain;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = active
        ? 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-[#2A1D24] text-[#1F171A] dark:text-[#F8EFF2] shadow-sm whitespace-nowrap shrink-0'
        : 'px-3 py-1.5 text-xs font-medium rounded-lg text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-white whitespace-nowrap shrink-0';
    });

    if (skillsContainer) {
      skillsContainer.innerHTML = renderSkillsCategoriesHtml(
        activeSkillDomain,
        selectedSkillId
      );
      attachOrbPointerPhysics(skillsContainer);
      skillsContainer
        .querySelectorAll<HTMLButtonElement>('[data-skill-orb]')
        .forEach((orb) => {
          orb.addEventListener('click', () => {
            const nextId = orb.dataset.skillOrb;
            if (nextId) {
              selectedSkillId = nextId;
              renderSkillsMatrix();
              updateSkillInspector();
            }
          });
        });
    }
  };

  domainBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dom = (btn.dataset.skillDomain || 'all') as 'all' | SkillCategory['id'];
      activeSkillDomain = dom;
      if (dom !== 'all') {
        const first = SKILL_CATEGORIES.find((c) => c.id === dom)?.skills[0];
        if (first) selectedSkillId = first.id;
      }
      renderSkillsMatrix();
      updateSkillInspector();
    });
  });

  renderSkillsMatrix();
  updateSkillInspector();

  // 8. Projects Gallery, Metrics Chart & Category Filter
  const projectsCountBadge = document.getElementById('projects-count-label');
  const projectCatBtns = document.querySelectorAll<HTMLButtonElement>('[data-project-cat]');
  const metricsContainer = document.getElementById('projects-metrics-chart');
  const projectsGrid = document.getElementById('projects-grid');

  let activeProjectCategory: ProjectCategory = 'All';
  let selectedTechFilter: string | null = null;

  const renderProjectsView = () => {
    const categoryProjects =
      activeProjectCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeProjectCategory);

    const filteredProjects = selectedTechFilter
      ? categoryProjects.filter((p) => p.techStack.includes(selectedTechFilter!))
      : categoryProjects;

    if (projectsCountBadge) {
      projectsCountBadge.textContent = `Interactive Bento Showcase · ${filteredProjects.length} Projects`;
    }

    projectCatBtns.forEach((btn) => {
      const active = btn.dataset.projectCat === activeProjectCategory;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = active
        ? 'px-3.5 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-[#2A1D24] text-[#1F171A] dark:text-[#F8EFF2] shadow-sm whitespace-nowrap shrink-0'
        : 'px-3.5 py-2 text-xs font-medium rounded-lg text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-white whitespace-nowrap shrink-0';
    });

    if (metricsContainer) {
      metricsContainer.innerHTML = renderProjectMetricsHtml(
        categoryProjects,
        activeProjectCategory,
        selectedTechFilter
      );

      const chartStage = document.getElementById('metrics-chart-stage');
      const tooltipEl = document.getElementById('metrics-hover-tooltip');
      const mttTech = document.getElementById('mtt-tech');
      const mttRatio = document.getElementById('mtt-ratio');
      const mttProjects = document.getElementById('mtt-projects');

      const showBarTooltip = (barBtn: HTMLButtonElement) => {
        if (!chartStage || !tooltipEl || !mttTech || !mttRatio || !mttProjects) {
          return;
        }
        const tech = barBtn.dataset.metricTech || '';
        const count = barBtn.dataset.metricCount || '0';
        const total = barBtn.dataset.metricTotal || '0';
        const pct = barBtn.dataset.metricPct || '0';
        let titles: string[] = [];
        try {
          titles = JSON.parse(barBtn.dataset.metricTitles || '[]');
        } catch {
          titles = [];
        }

        mttTech.textContent = tech;
        mttRatio.textContent = `${count} / ${total} (${pct}%)`;
        mttProjects.innerHTML = titles
          .map((t) => `<li class="truncate">· ${escapeHtml(t)}</li>`)
          .join('');

        tooltipEl.classList.remove('hidden');

        const stageRect = chartStage.getBoundingClientRect();
        const btnRect = barBtn.getBoundingClientRect();
        const tipWidth = tooltipEl.offsetWidth || 260;

        // Place beside the hovered bar; flip left if near right edge
        const preferredLeft = btnRect.right - stageRect.left + 8;
        const maxLeft = Math.max(8, stageRect.width - tipWidth - 8);
        const leftPos =
          preferredLeft + tipWidth <= stageRect.width - 8
            ? preferredLeft
            : Math.max(8, btnRect.left - stageRect.left - tipWidth - 8);

        tooltipEl.style.left = `${Math.min(leftPos, maxLeft)}px`;
        tooltipEl.style.top = '12px';
      };

      const hideBarTooltip = () => {
        tooltipEl?.classList.add('hidden');
      };

      metricsContainer
        .querySelectorAll<HTMLButtonElement>('[data-metric-tech]')
        .forEach((barBtn) => {
          barBtn.addEventListener('mouseenter', () => showBarTooltip(barBtn));
          barBtn.addEventListener('focus', () => showBarTooltip(barBtn));
          barBtn.addEventListener('mouseleave', hideBarTooltip);
          barBtn.addEventListener('blur', hideBarTooltip);
          barBtn.addEventListener('click', () => {
            const tech = barBtn.dataset.metricTech || null;
            selectedTechFilter = selectedTechFilter === tech ? null : tech;
            renderProjectsView();
          });
        });

      chartStage?.addEventListener('mouseleave', hideBarTooltip);

      metricsContainer
        .querySelector<HTMLButtonElement>('[data-clear-tech-filter]')
        ?.addEventListener('click', () => {
          selectedTechFilter = null;
          renderProjectsView();
        });
    }

    if (projectsGrid) {
      projectsGrid.innerHTML = renderProjectsGridHtml(
        filteredProjects,
        activeProjectCategory,
        selectedTechFilter
      );
      attachTiltListeners(projectsGrid);
      requestAnimationFrame(() => {
        observeBentoCards(projectsGrid);
      });
      projectsGrid
        .querySelectorAll<HTMLButtonElement>('[data-open-project]')
        .forEach((btn) => {
          btn.addEventListener('click', () => {
            if (btn.dataset.openProject) openCaseStudyDrawer(btn.dataset.openProject);
          });
        });
    }
  };

  projectCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeProjectCategory = (btn.dataset.projectCat || 'All') as ProjectCategory;
      selectedTechFilter = null;
      renderProjectsView();
    });
  });

  renderProjectsView();

  // 9. Capstone Checklist Accordions
  document.querySelectorAll<HTMLButtonElement>('[data-checklist-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.checklistToggle;
      const panel = targetId ? document.getElementById(targetId) : null;
      if (!panel) return;
      const expanded = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', expanded);
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      const labelSpan = btn.querySelector('[data-checklist-label]');
      if (labelSpan) {
        labelSpan.textContent = expanded ? 'Verification Checklist' : 'Hide Checklist';
      }
      const chevron = btn.querySelector('[data-checklist-chevron]');
      chevron?.classList.toggle('rotate-180', !expanded);
    });
  });

  // 10. Resume Interactive / PDF Toggle
  const resumeModeBtns = document.querySelectorAll<HTMLButtonElement>('[data-resume-view]');
  const resumeInteractivePanel = document.getElementById('resume-structured-view');
  const resumePdfPanel = document.getElementById('resume-pdf-view');

  resumeModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.resumeView === 'pdf' ? 'pdf' : 'structured';
      resumeInteractivePanel?.classList.toggle('hidden', mode !== 'structured');
      resumePdfPanel?.classList.toggle('hidden', mode !== 'pdf');
      resumeModeBtns.forEach((b) => {
        const active = b.dataset.resumeView === mode;
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
        b.className = active
          ? 'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-[#2A1D24] text-[#1F171A] dark:text-[#F8EFF2] shadow-sm whitespace-nowrap shrink-0'
          : 'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-white whitespace-nowrap shrink-0';
      });
    });
  });

  // 11. Contact Copy Buttons & Form Validation
  const copyEmailBtn = document.getElementById('copy-email-btn');
  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      copyEmailBtn.textContent = '✓ Copied to Clipboard';
      window.setTimeout(() => {
        copyEmailBtn.textContent = 'Copy Address';
      }, 2200);
    } catch {
      // Clipboard blocked
    }
  });

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  copyPhoneBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.phone);
      copyPhoneBtn.textContent = '✓ Copied Number';
      window.setTimeout(() => {
        copyPhoneBtn.textContent = 'Copy Number';
      }, 2200);
    } catch {
      // Clipboard blocked
    }
  });

  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const contactReceipt = document.getElementById('contact-receipt');
  const receiptSummary = document.getElementById('contact-receipt-summary');
  const receiptResetBtn = document.getElementById('contact-receipt-reset');
  const topicBtns = document.querySelectorAll<HTMLButtonElement>('[data-contact-topic]');
  const topicInput = document.getElementById('contact-topic-input') as HTMLInputElement | null;
  const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
  const msgInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
  const msgCount = document.getElementById('contact-msg-count');

  topicBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.dataset.contactTopic || 'Internship or Junior Role';
      if (topicInput) topicInput.value = topic;
      topicBtns.forEach((b) => {
        const active = b.dataset.contactTopic === topic;
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
        b.className = active
          ? 'px-3.5 py-2.5 text-left text-xs font-medium rounded-xl border transition-colors bg-[#EEF2FA] dark:bg-[#1E2438] border-[#3D4E81] dark:border-[#8FA4E8] text-[#3D4E81] dark:text-[#8FA4E8]'
          : 'px-3.5 py-2.5 text-left text-xs font-medium rounded-xl border transition-colors bg-[#FDF7F8] dark:bg-[#140F12] border-[#EAD6DC] dark:border-[#33262D] text-[#4D3B42] dark:text-[#D5C2C9] hover:border-[#D3B0BC]';
      });
    });
  });

  msgInput?.addEventListener('input', () => {
    if (msgCount) msgCount.textContent = `${msgInput.value.length} chars`;
    document.getElementById('contact-message-error')?.classList.add('hidden');
  });
  nameInput?.addEventListener('input', () =>
    document.getElementById('contact-name-error')?.classList.add('hidden')
  );
  emailInput?.addEventListener('input', () =>
    document.getElementById('contact-email-error')?.classList.add('hidden')
  );

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameVal = nameInput?.value.trim() || '';
    const emailVal = emailInput?.value.trim() || '';
    const msgVal = msgInput?.value.trim() || '';
    const topicVal = topicInput?.value || 'Internship or Junior Role';

    const nameErr = document.getElementById('contact-name-error');
    const emailErr = document.getElementById('contact-email-error');
    const msgErr = document.getElementById('contact-message-error');

    let valid = true;
    if (nameVal.length < 2) {
      nameErr?.classList.remove('hidden');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailErr?.classList.remove('hidden');
      valid = false;
    }
    if (msgVal.length < 15) {
      msgErr?.classList.remove('hidden');
      valid = false;
    }

    if (!valid) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (receiptSummary) {
      receiptSummary.textContent = `Thank you, ${nameVal}. Your inquiry regarding "${topicVal}" was validated at ${timestamp}.`;
    }
    contactForm.classList.add('hidden');
    contactReceipt?.classList.remove('hidden');
    contactForm.reset();
    if (msgCount) msgCount.textContent = '0 chars';
  });

  receiptResetBtn?.addEventListener('click', () => {
    contactReceipt?.classList.add('hidden');
    contactForm?.classList.remove('hidden');
  });

  // 12. Global Escape key & Initial Tilt binding
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
      closeCaseStudyDrawer();
    }
  });

  attachTiltListeners(document);
});
