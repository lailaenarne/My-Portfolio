export type ProjectCategory = 'All' | 'Interactive' | 'Web UI' | 'Showcase';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  courseOrContext: string;
  summary: string;
  problemStatement: string;
  architectureNotes: string[];
  uiHighlights: string[];
  techStack: string[];
  metricsLabel: string;
  imageSrc: string;
  imageAlt: string;
  githubUrl: string;
  liveDemoUrl: string;
  bentoSpan: 'wide' | 'compact';
}

export interface SkillNode {
  id: string;
  name: string;
  context: string;
  proficiencyLabel: string;
  depthPercent: number;
  architecturePattern: string;
  codeSnippet: string;
  relatedProjectIds: string[];
}

export interface SkillCategory {
  id: 'languages' | 'frameworks-data' | 'tools-devops';
  index: string;
  title: string;
  subtitle: string;
  skills: SkillNode[];
}

export interface CapstoneDeliverable {
  id: string;
  index: string;
  title: string;
  context: string;
  role: string;
  outcome: string;
  deliverables: string[];
  checklist: string[];
  repositoryUrl: string;
}

export const PROFILE = {
  name: 'Laila Mariel Enarne',
  shortName: 'Laila Enarne',
  title: 'BS Information Technology Student & Front-End Web Developer',
  institution: 'West Visayas State University - Lambunao Campus · CIT 240 Portfolio',
  location: 'Barangay Tampucao, Lambunao, Iloilo',
  email: 'lailamariel.enarne@wvsu.edu.ph',
  phone: '09565648605',
  githubUrl: 'https://github.com/lailaenarne',
  facebookUrl: 'https://web.facebook.com/khate.lyn.5245',
  portraitSrc: '/assets/aistudio/Port_560225e1.png',
  portraitAlt:
    'Professional studio portrait of Laila Mariel Enarne wearing glasses, a white collared shirt, and a black blazer.',
  resumePdfUrl: '/assets/aistudio/CV_LMEnarne_d72ba67f.pdf',
  resumeFileName: 'Laila_Mariel_Enarne_CV.pdf',
  languages: ['English', 'Filipino', 'Hiligaynon'],
  kineticRoles: [
    'Interactive Browser Apps',
    'Accessible Semantic UI',
    'Responsive CSS Grid Systems',
    'Full-Stack Web Foundations',
  ],
  bio: 'I turn ideas into tactile, personality-driven websites that balance charming visual details with fast, accessible performance. I love sweating the small stuff—from custom iconography and micro-interactions to clean, structured code under the hood.',
  careerGoal:
    'Seeking a 2027 software engineering internship or junior web developer role focused on interactive front-end engineering, accessible user interfaces, and dependable web systems.',
  highlights: [
    { value: '8', label: 'Live Netlify Projects' },
    { value: '3', label: 'Core Portfolio Categories' },
    { value: '99.2', label: 'Avg. Lighthouse Accessibility' },
    { value: '2027', label: 'BSIT Expected Graduation' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Core Languages & Logic',
    subtitle: 'Semantic markup, responsive layouts, and client/server programming',
    skills: [
      {
        id: 'html-core',
        name: 'HTML',
        context: 'Semantic landmarks, accessible forms & WCAG structure',
        proficiencyLabel: 'Core Strength · 95%',
        depthPercent: 95,
        architecturePattern:
          'Landmark-first document structure using <header>, <nav>, <main>, <article>, and explicit form labels across web builds.',
        codeSnippet: `<article aria-labelledby="auth-title">\n  <h2 id="auth-title">Sign Up &amp; Login</h2>\n  <div role="status" aria-live="polite">Validated</div>\n</article>`,
        relatedProjectIds: ['signup-or-login', 'portfolio-passi'],
      },
      {
        id: 'css-grid-flex',
        name: 'CSS, Grid & Flexbox',
        context: 'Mobile-first fluid layouts, multi-span keypads',
        proficiencyLabel: 'Core Strength · 93%',
        depthPercent: 93,
        architecturePattern:
          'Responsive Bento and keypad grids using CSS Grid template columns, Flexbox alignment, and reduced-motion media queries.',
        codeSnippet: `.keypad-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: clamp(0.5rem, 1.5vw, 0.85rem);\n}`,
        relatedProjectIds: ['simple-calculator-layout', 'artistic-expression', 'my-creations'],
      },
      {
        id: 'js-ts',
        name: 'JavaScript & TypeScript',
        context: 'DOM state, game loops, arithmetic engines & type safety',
        proficiencyLabel: 'Daily Driver · 90%',
        depthPercent: 90,
        architecturePattern:
          'Clean state machines and strictly typed components powering chained calculator math, 8x8 chess logic, and 60fps canvas games.',
        codeSnippet: `const stepGameLoop = (dt: number) => {\n  player.vy += GRAVITY * dt;\n  player.y += player.vy * dt;\n  checkPlatformCollisions(player);\n};`,
        relatedProjectIds: ['gemma8-chess', 'neural-jumper', 'calculator-functional-js'],
      },
      {
        id: 'php-core',
        name: 'PHP',
        context: 'Server-side form handlers & PDO database integration',
        proficiencyLabel: 'Coursework · 85%',
        depthPercent: 85,
        architecturePattern:
          'Structured form handlers and parameterized PDO queries supporting user authentication and account registration workflows.',
        codeSnippet: `$stmt = $pdo->prepare(\n  'SELECT id, email, password_hash FROM users WHERE email = :email'\n);\n$stmt->execute(['email' => $email]);`,
        relatedProjectIds: ['signup-or-login'],
      },
    ],
  },
  {
    id: 'frameworks-data',
    index: '02',
    title: 'Database & Web UI',
    subtitle: 'Relational schemas paired with structured front-end presentation',
    skills: [
      {
        id: 'mysql-db',
        name: 'MySQL',
        context: 'Normalized 3NF schemas, indexes & parish record tables',
        proficiencyLabel: 'Core Data · 88%',
        depthPercent: 88,
        architecturePattern:
          'Relational tables and unique indexes backing authentication workflows and FaithPoint collection, sacramental, and mausoleum records.',
        codeSnippet: `CREATE UNIQUE INDEX idx_user_email\n  ON user_accounts (email);`,
        relatedProjectIds: ['signup-or-login'],
      },
      {
        id: 'css-ui',
        name: 'CSS',
        context: 'Custom variables, dual-theme tokens & visual polish',
        proficiencyLabel: 'Core Strength · 92%',
        depthPercent: 92,
        architecturePattern:
          'Custom properties, responsive breakpoints, and tactile hover/focus transitions across Light Pink Pastel and Dark Plum modes.',
        codeSnippet: `:root {\n  --surface: #fdf7f8;\n  --accent: #be4b72;\n}\n@media (max-width: 768px) { .grid { gap: 1rem; } }`,
        relatedProjectIds: ['simple-calculator-layout', 'artistic-expression'],
      },
      {
        id: 'html-ui',
        name: 'HTML',
        context: 'Clean semantic templates, media embeds & SEO metadata',
        proficiencyLabel: 'Daily Driver · 95%',
        depthPercent: 95,
        architecturePattern:
          'Accessible semantic markup integrating OpenGraph tags, responsive figures, and interactive browser canvas containers.',
        codeSnippet: `<section aria-labelledby="gallery-title">\n  <h2 id="gallery-title">Artistic Expression</h2>\n  <figure><img src="art.jpg" alt="Curated visual piece" /></figure>\n</section>`,
        relatedProjectIds: ['artistic-expression', 'my-creations', 'neural-jumper'],
      },
    ],
  },
  {
    id: 'tools-devops',
    index: '03',
    title: 'Version Control & Hosting',
    subtitle: 'Source management, repository collaboration, and live cloud deployment',
    skills: [
      {
        id: 'git-vcs',
        name: 'Git',
        context: 'Branching workflows, incremental commits & diff tracking',
        proficiencyLabel: 'Daily Driver · 92%',
        depthPercent: 92,
        architecturePattern:
          'Structured feature branches and descriptive commit history keeping codebase milestones clean and reversible.',
        codeSnippet: `git checkout -b feat/project-metrics\ngit commit -m "feat: add technology stack bar chart"`,
        relatedProjectIds: ['gemma8-chess', 'portfolio-passi'],
      },
      {
        id: 'github-platform',
        name: 'GitHub',
        context: 'Public repositories, README documentation & GitHub Pages',
        proficiencyLabel: 'Daily Driver · 92%',
        depthPercent: 92,
        architecturePattern:
          'Organized public source repositories paired with comprehensive README.md guides and automated Pages publishing.',
        codeSnippet: `# Push branch and publish static dist/\ngit push -u origin main`,
        relatedProjectIds: ['my-creations', 'portfolio-passi', 'calculator-functional-js'],
      },
      {
        id: 'netlify-hosting',
        name: 'Netlify',
        context: 'Continuous static deployments across 8 live web apps',
        proficiencyLabel: 'Live Production · 94%',
        depthPercent: 94,
        architecturePattern:
          'Zero-downtime static builds hosting interactive browser games, calculators, auth UIs, and creative showcases.',
        codeSnippet: `// Live Netlify deployments\nconst site = "https://gemma8chess.netlify.app/";`,
        relatedProjectIds: ['gemma8-chess', 'neural-jumper', 'my-creations', 'signup-or-login'],
      },
      {
        id: 'vercel-hosting',
        name: 'Vercel',
        context: 'Edge preview deployments & Vite front-end hosting',
        proficiencyLabel: 'Cloud Hosting · 86%',
        depthPercent: 86,
        architecturePattern:
          'Automated git-connected preview URLs and fast edge CDN delivery for modern Vite and TypeScript builds.',
        codeSnippet: `// vercel.json clean SPA rewrite\n{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`,
        relatedProjectIds: ['portfolio-passi', 'artistic-expression'],
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'gemma8-chess',
    title: 'Gemma8Chess Interactive Chess App',
    category: 'Interactive',
    year: '2026',
    courseOrContext: 'Web Game · Deployed on Netlify',
    summary:
      'Browser-based chess application with responsive board rendering, legal move validation, captured pieces tracking, and turn state management.',
    problemStatement:
      'Building a complete 8x8 strategy board in the browser requires crisp coordinate mapping, clean piece movement rules, and intuitive turn feedback across desktop and mobile.',
    architectureNotes: [
      'Modular JavaScript board state representation tracking piece positions, active turn, and move history.',
      'CSS Grid 8x8 square matrix maintaining proportional aspect ratio across desktop and mobile screens.',
      'Instant visual highlighting for selected squares and valid destination moves.',
    ],
    uiHighlights: [
      'Balanced 8x8 interactive chessboard with clear piece contrast.',
      'Responsive side panel displaying captured pieces and move progression.',
      'One-click reset and smooth turn indicator feedback.',
    ],
    techStack: ['HTML5', 'CSS Grid', 'JavaScript', 'Netlify'],
    metricsLabel: 'Live deployed web game · Zero external framework overhead',
    imageSrc: '/src/assets/images/project_gemma8_chess_1795708304295.jpg',
    imageAlt:
      'Laptop displaying the Gemma8Chess interactive browser chess board and move history panel.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://gemma8chess.netlify.app/',
    bentoSpan: 'wide',
  },
  {
    id: 'neural-jumper',
    title: 'Neural Jumper Arcade Game',
    category: 'Interactive',
    year: '2026',
    courseOrContext: 'Canvas & Game Loop · Deployed on Netlify',
    summary:
      'Fast-paced browser platform jumper featuring real-time physics, procedural platform obstacles, collision detection, and live score tracking.',
    problemStatement:
      'Smooth 60fps browser arcade gameplay demands frame-rate-independent movement updates and responsive keyboard/touch controls.',
    architectureNotes: [
      'RequestAnimationFrame game loop updating gravity, jump velocity, and obstacle scrolling smoothly.',
      'Axis-aligned bounding-box collision checks paired with instant game-over and restart state.',
      'Responsive viewport scaling keeping controls accessible on both keyboard and touch screens.',
    ],
    uiHighlights: [
      'Crisp live score HUD with tabular numerals and immediate restart flow.',
      'Responsive jump physics tuned for predictable arcade timing.',
      'Clean visual separation between foreground obstacles and backdrop.',
    ],
    techStack: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'Netlify'],
    metricsLabel: 'Live 60fps browser arcade build · Instant keyboard & touch play',
    imageSrc: '/src/assets/images/project_neural_jumper_1795708303484.jpg',
    imageAlt:
      'Laptop displaying the Neural Jumper 2D platformer browser game with floating platforms and score counter.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://nueral-jumper.netlify.app/',
    bentoSpan: 'compact',
  },
  {
    id: 'my-creations',
    title: 'My Creations Digital Showcase',
    category: 'Showcase',
    year: '2025',
    courseOrContext: 'Creative Directory · Deployed on Netlify',
    summary:
      'Curated personal web creations gallery organizing design experiments, front-end layouts, and interactive builds into a unified showcase.',
    problemStatement:
      'Individual coding exercises and visual prototypes needed a single central directory for quick browsing and presentation.',
    architectureNotes: [
      'Responsive multi-column card grid built with CSS Grid and Flexbox.',
      'Consistent card framing, hover elevation states, and direct demo links.',
      'Lightweight static asset delivery deployed continuously on Netlify.',
    ],
    uiHighlights: [
      'Clean editorial showcase grid with clear visual hierarchy.',
      'Fast static navigation across creative experiments.',
      'Mobile-responsive breakpoints without horizontal overflow.',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    metricsLabel: 'Live showcase directory · Static fast-load architecture',
    imageSrc: '/src/assets/images/project_my_creations_1795708304322.jpg',
    imageAlt:
      'Laptop on a concrete desk displaying the My Creations personal web showcase gallery.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://mycreations.netlify.app/',
    bentoSpan: 'compact',
  },
  {
    id: 'signup-or-login',
    title: 'Sign Up & Login Authentication UI',
    category: 'Web UI',
    year: '2025',
    courseOrContext: 'Form Ergonomics · Deployed on Netlify',
    summary:
      'Clean dual-mode authentication interface featuring smooth switching between Sign Up and Login states, field validation, and password visibility controls.',
    problemStatement:
      'Authentication flows often suffer from cramped inputs, confusing tab switches, and unclear error messages on mobile viewports.',
    architectureNotes: [
      'Semantic form controls with explicit <label> associations and accessible focus states.',
      'Vanilla JavaScript state toggle seamlessly transitioning between registration and login views.',
      'Client-side input checks preventing malformed emails or empty submissions.',
    ],
    uiHighlights: [
      'Dual-mode Sign Up / Login switcher with smooth layout alignment.',
      'Accessible form fields with clear placeholder and validation feedback.',
      'Centered responsive card framing across mobile and desktop screens.',
    ],
    techStack: ['HTML5', 'CSS Flexbox', 'Vanilla JS', 'Netlify'],
    metricsLabel: 'Live interactive auth UI · Semantic accessible form patterns',
    imageSrc: '/src/assets/images/project_signup_login_1795708304260.jpg',
    imageAlt:
      'Desktop monitor displaying the clean Sign Up and Login authentication interface.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://signup-or-login.netlify.app/',
    bentoSpan: 'wide',
  },
  {
    id: 'calculator-functional-js',
    title: 'Functional JavaScript Calculator',
    category: 'Interactive',
    year: '2025',
    courseOrContext: 'DOM State & Logic · Deployed on Netlify',
    summary:
      'Fully functional browser calculator supporting chained arithmetic operations, decimal precision, clear/backspace actions, and keyboard input.',
    problemStatement:
      'Handling consecutive operator presses, floating-point edge cases, and clear/delete states cleanly without eval() security pitfalls.',
    architectureNotes: [
      'Pure JavaScript arithmetic state machine managing current operand, previous operand, and pending operator.',
      'Event-delegated keypad listener paired with keyboard keydown bindings.',
      'Safe division-by-zero handling and formatted display overflow control.',
    ],
    uiHighlights: [
      'Tactile keypad grid with distinct operator and action button states.',
      'High-contrast tabular numeric display for instant readability.',
      'Full keyboard and mouse/touch input parity.',
    ],
    techStack: ['HTML5', 'CSS Grid', 'Vanilla JS', 'Netlify'],
    metricsLabel: 'Live functional web app · Zero-eval arithmetic engine',
    imageSrc: '/src/assets/images/project_calc_functional_1795708305385.jpg',
    imageAlt:
      'Laptop displaying the Functional JavaScript Calculator with numeric display and keypad.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://calculator-functional-js.netlify.app/',
    bentoSpan: 'wide',
  },
  {
    id: 'simple-calculator-layout',
    title: 'Simple Calculator Responsive Layout',
    category: 'Web UI',
    year: '2025',
    courseOrContext: 'CSS Grid Study · Deployed on Netlify',
    summary:
      'Precision CSS Grid and Flexbox layout study crafting a clean, tactile calculator interface with balanced proportions and responsive keypad alignment.',
    problemStatement:
      'Designing multi-row, multi-column keypad buttons (such as wide zero or equals keys) that stay aligned cleanly across screen sizes.',
    architectureNotes: [
      'CSS Grid template columns and explicit grid-column / grid-row spanning for asymmetric keys.',
      'Custom CSS variables governing spacing, button radii, and hover transitions.',
      'Fluid container sizing ensuring comfortable touch targets on mobile devices.',
    ],
    uiHighlights: [
      'Proportional CSS Grid keypad with clean spacing and visual grouping.',
      'Crisp pastel button hierarchy separating digits from operators.',
      'Responsive scaling from narrow mobile viewports to desktop.',
    ],
    techStack: ['HTML5', 'CSS Grid', 'CSS Flexbox', 'Netlify'],
    metricsLabel: 'Live CSS layout benchmark · Responsive multi-span grid',
    imageSrc: '/src/assets/images/project_calc_layout_1795708305892.jpg',
    imageAlt:
      'Tablet on a stand showing the Simple Calculator Responsive Layout built with CSS Grid.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://simplecalculator-layout.netlify.app/',
    bentoSpan: 'compact',
  },
  {
    id: 'artistic-expression',
    title: 'Artistic Expression Visual Gallery',
    category: 'Showcase',
    year: '2025',
    courseOrContext: 'Editorial Web Design · Deployed on Netlify',
    summary:
      'Editorial art and visual expression website pairing expressive serif typography with framed gallery layouts and curated visual storytelling.',
    problemStatement:
      'Presenting artwork and creative essays online without interface chrome overpowering the visual pieces themselves.',
    architectureNotes: [
      'Editorial layout pairing refined display headings with generous whitespace margins.',
      'Responsive framed gallery cards keeping artwork aspect ratios intact.',
      'Clean semantic sectioning (<header>, <main>, <figure>, <footer>) for effortless navigation.',
    ],
    uiHighlights: [
      'Gallery-first framing with balanced typography and neutral surfaces.',
      'Smooth responsive stacking from multi-column desktop grids to mobile.',
      'Curated visual rhythm emphasizing imagery and captions.',
    ],
    techStack: ['HTML5', 'CSS3', 'Responsive Design', 'Netlify'],
    metricsLabel: 'Live editorial showcase · Gallery-first layout discipline',
    imageSrc: '/src/assets/images/project_artistic_expression_1795708305983.jpg',
    imageAlt:
      'Laptop displaying the Artistic Expression digital art gallery and editorial headings.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://artistic-expression.netlify.app/',
    bentoSpan: 'compact',
  },
  {
    id: 'portfolio-passi',
    title: 'Portfolio Passi (Early Edition)',
    category: 'Showcase',
    year: '2025',
    courseOrContext: 'Personal Milestone · Deployed on Netlify',
    summary:
      'Earlier personal web developer portfolio milestone showcasing foundational HTML5 semantic structure, bio introduction, and early project links.',
    problemStatement:
      'Establishing an initial public web presence to document early front-end coursework and share live project links with peers and instructors.',
    architectureNotes: [
      'Single-page semantic HTML5 structure with anchor section navigation.',
      'Custom CSS layout styling for hero introduction, skills overview, and project cards.',
      'Continuous static deployment on Netlify with custom URL routing.',
    ],
    uiHighlights: [
      'Clear personal introduction and direct navigation anchors.',
      'Structured early project showcase cards.',
      'Clean baseline foundation that evolved into the current CIT 240 edition.',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    metricsLabel: 'Live milestone archive · Foundational portfolio build',
    imageSrc: '/src/assets/images/project_portfolio_passi_1795708306212.jpg',
    imageAlt:
      'Laptop on a wooden studio desk displaying the earlier Portfolio Passi personal website.',
    githubUrl: 'https://github.com/lailaenarne',
    liveDemoUrl: 'https://portfolio-passi.netlify.app/',
    bentoSpan: 'wide',
  },
];

export const CAPSTONE_PROJECT = {
  title:
    'FaithPoint: Development of Parish Data Analytics-Based System for Collection, Sacramental, and Mausoleum Records',
  shortTitle: 'FaithPoint Parish Analytics System',
  context: 'BSIT Capstone Project · West Visayas State University - Lambunao Campus',
  role: 'Lead Documentation & Technical Papers Author',
  responsibilitySummary:
    'In charge of authoring, structuring, and finalizing all capstone research papers and official system documentation—covering preliminaries, manuscript chapters, related literature, methodology, entity-relationship specifications, analytics reporting definitions, and complete appendices.',
  modules: [
    {
      title: 'Collection Analytics',
      detail:
        'Documentation and reporting schemas for parish offerings, tithes, fund tracking, and financial analytics trends.',
    },
    {
      title: 'Sacramental Records',
      detail:
        'Workflows, archival record schemas, and certificate issuance specifications for baptism, confirmation, and marriage registries.',
    },
    {
      title: 'Mausoleum Records',
      detail:
        'Lot and niche registry specifications, interment history logs, and occupancy analytics documentation.',
    },
  ],
  paperArtifacts: [
    'Preliminaries & Chapters 1–5 Manuscript',
    'System Architecture, ERD & Data Dictionary',
    'Appendices, Instruments & Defense Papers',
  ],
};

export const CAPSTONE_DELIVERABLES: CapstoneDeliverable[] = [
  {
    id: 'faithpoint-capstone-manuscript',
    index: '01',
    title: 'FaithPoint Capstone Manuscript & Research Papers (Chapters 1–5)',
    context: 'BSIT Capstone · Lead Author',
    role: 'In Charge of All Papers & Documentation',
    outcome:
      'Authored and consolidated the complete academic capstone manuscript for FaithPoint, aligning parish stakeholder needs with data analytics methodology across Collection, Sacramental, and Mausoleum records.',
    deliverables: [
      'Chapters 1–3 Proposal',
      'Literature & Systems Review',
      'Chapters 4–5 Final Paper',
    ],
    checklist: [
      'Written problem statements, significance, and scope for Collection, Sacramental, and Mausoleum analytics',
      'Compiled Review of Related Literature (RRL) and comparative parish management system matrices',
      'Formatted final evaluation results, statistical tables, and panel revision matrices',
    ],
    repositoryUrl: 'https://github.com/lailaenarne',
  },
  {
    id: 'faithpoint-system-specs',
    index: '02',
    title: 'FaithPoint Preliminaries, Appendices & System Documentation',
    context: 'Academic & Technical Papers · Parish Records',
    role: 'Lead Documentation Author',
    outcome:
      'Prepared the full preliminaries, appendices, and technical reference sections—organizing formal front matter, database schemas, and supporting research documentation into a publication-ready manuscript.',
    deliverables: [
      'Preliminaries & Front Matter',
      'ERD & Data Dictionary',
      'Appendices & Research Forms',
    ],
    checklist: [
      'Compiled title page, approval sheets, acknowledgments, abstract, and table of contents preliminaries',
      'Documented normalized schemas, process flowcharts, and data dictionaries for parish records',
      'Organized appendices including evaluation instruments, parish letters, and researcher credentials',
    ],
    repositoryUrl: 'https://github.com/lailaenarne',
  },
  {
    id: 'cit240-semantic-standards',
    index: '03',
    title: 'CIT 240 Web Architecture & Portfolio Documentation',
    context: 'Coursework Deliverable · Live on Netlify',
    role: 'Front-End Engineer & Documenter',
    outcome:
      'Engineered and documented a responsive multi-page portfolio featuring 8 deployed Netlify apps, semantic HTML5 landmarks, and interactive Recharts stack analytics.',
    deliverables: [
      'Semantic Landmark Audit',
      'README & Setup Guide',
      '8 Live Netlify Builds',
    ],
    checklist: [
      'Verified <header>, <nav>, <main>, <section>, <article>, and <footer> hierarchy across breakpoints',
      'Documented repository layout, Recharts metrics, and GitHub Pages deployment steps in README.md',
      'Automated Lighthouse accessibility check >= 98 across Pink Pastel & Dark modes',
    ],
    repositoryUrl: 'https://portfolio-passi.netlify.app/',
  },
];

export const RESUME_DATA = {
  fullName: 'Laila Mariel R. Enarne',
  major: 'BS Information Technology · Major in Software Technology',
  aboutSummary:
    'A motivated and goal-oriented Bachelor of Science in Information Technology student majoring in Software Technology, with a solid academic foundation and a passion for continuous learning and technological innovation. I possess basic knowledge in programming, web development, system analysis, and networking, which has strengthened my skills in software documentation, system design, and academic research. Through advanced technical projects and leadership roles, I have sharpened my problem-solving, organizational, and teamwork abilities. Dedicated to expanding my expertise and contributing effectively to team goals, I bring adaptability, initiative, and a strong sense of responsibility to deliver efficient, professional results as I prepare to enter the IT industry.',
  softSkills: [
    'Problem Solving',
    'Time Management',
    'Leadership',
    'Adaptability and Accessibility',
    'Attention to Detail',
    'Teamwork and Collaboration',
    'Willingness to Learn',
  ],
  workExperience: [
    {
      role: 'Senior High School Student Immersionist',
      organization: 'Lambunao Tourism Office',
      period: '2023',
      description:
        'Supported daily office operations by sorting and filing essential documents. Handled document routing to ensure papers reached the correct personnel and offices.',
    },
  ],
  education: [
    {
      period: '2023 – Present',
      level: 'Tertiary',
      program: 'Bachelor of Science in Information Technology',
      school: 'West Visayas State University – Lambunao Campus',
    },
    {
      period: '2021 – 2023',
      level: 'Secondary',
      program: 'Humanities and Social Science Strand – Academic Track',
      school: 'Lambunao National High School – Senior High School',
    },
    {
      period: '2017 – 2021',
      level: 'Secondary',
      program: 'Major in Information and Communications Technology',
      school: 'Lambunao National High School – Junior High School',
    },
    {
      period: '2011 – 2017',
      level: 'Primary',
      program: 'Primary Education',
      school: 'Tampucao Elementary School',
    },
  ],
  honorsAndAffiliations: [
    {
      title: 'Treasurer, SICT-Student Council (Present)',
      institution: 'West Visayas State University – Lambunao Campus',
    },
    {
      title: 'Volunteer, SICT-Student Council (2025–2026)',
      institution: 'West Visayas State University – Lambunao Campus',
    },
    {
      title: 'With Honor (2023)',
      institution: 'Lambunao National High School – Senior High School',
    },
    {
      title: 'With High Honor (2021)',
      institution: 'Lambunao National High School – Junior High School',
    },
    {
      title: 'SSG President & Consistent Honor Student (2011–2017)',
      institution: 'Tampucao Elementary School',
    },
  ],
  seminarsAndTrainings: [
    {
      organizer: 'SICT / WVSU Lambunao',
      year: '2026',
      title: 'AI and Emerging Technologies',
      summary:
        'A seminar focused on understanding AI and emerging technologies and their role in driving future digital innovation.',
    },
    {
      organizer: 'SICT / WVSU Lambunao',
      year: '2026',
      title: 'Cloud Computing and Data Technologies',
      summary:
        'A seminar focused on understanding cloud computing and data technologies and their application in modern digital infrastructure.',
    },
    {
      organizer: 'DICT, Passi City',
      year: '2026',
      title:
        'Digital Productivity Essentials and Applied AI for Automation and Decision Support',
      summary:
        'A hands-on training focused on mastering digital productivity tools and AI applications to streamline processes and strengthen decision support.',
    },
    {
      organizer: 'Interface Computer College',
      year: '2018',
      title: 'Computer Literacy Training',
      summary:
        'A training session focused on mastering essential computer skills, digital tools, and office applications to enhance daily productivity.',
    },
  ],
  references: [
    {
      name: 'Isauro S. Sindol Jr.',
      role: 'Director, School of Information and Communications Technology',
      phone: '09064120265',
    },
    {
      name: 'Lovelyn F. Castro',
      role: 'Instructor / SICT, WVSU – Lambunao Campus',
      phone: '09106696539',
    },
    {
      name: 'Fritz John B. Luis',
      role: 'Instructor / SICT, WVSU – Lambunao Campus',
      phone: '09482589062',
    },
  ],
};
