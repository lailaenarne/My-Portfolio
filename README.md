# Laila Mariel Enarne — Personal Developer Portfolio

An interactive, responsive personal portfolio built to demonstrate semantic HTML5 architecture, mobile-first CSS Grid and Flexbox layouts, dual-theme accessibility, a filterable personal project gallery, and a validated contact form.

## Key Features

- **Semantic HTML5 Landmarks**: Structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, and `<footer>` elements, skip-to-content navigation, and full keyboard focus support.
- **Dedicated Multi-Page Views**: Client-side hash navigation (`#about`, `#skills`, `#projects`, `#capstone`, `#contact`) with smooth page transitions and reduced-motion accessibility.
- **Responsive Multi-Breakpoint Layout**: Adapts cleanly across desktop (`1440px`), tablet, and mobile viewports with a collapsible mobile navigation drawer and fluid typography.
- **Interactive Project Gallery**: Filterable project showcase (`All`, `Full-Stack`, `Systems`, `Open Source`) paired with an interactive case-study inspection modal (`ESC` and backdrop close support).
- **Technical Skills Matrix**: Categorized competencies across Core Languages, Frameworks & Data Persistence, and Tooling & Systems.
- **Open Source & CIT 240 Capstone Showcase**: Highlights coursework deliverables, accessibility primitives, and public dataset schemas.
- **Integrated Contact Form & Pastel Pink Theme**: Client-side validated inquiry form with explicit accessible error feedback, copyable email action, and persistent pastel blush light / plum dark theme toggle.

## Project Structure

```text
├── index.html                   # HTML5 entry point, font links, and OpenGraph metadata
├── README.md                    # Documentation and setup instructions
├── package.json                 # Project scripts and dependencies
└── src/
    ├── main.tsx                 # Application mount
    ├── App.tsx                  # Root layout, scrollspy, theme state, and modal state
    ├── index.css                # Tailwind CSS v4 tokens, responsive container, media queries
    ├── data/
    │   └── portfolioData.ts     # Structured profile, skills, projects, and capstone entries
    ├── assets/
    │   └── images/              # Profile portrait and project showcase photography
    └── components/
        ├── Header.tsx           # Sticky top navigation bar & mobile menu drawer
        ├── HeroSection.tsx      # Split hero, theme switch, profile links, summary strip
        ├── SkillsSection.tsx    # Categorized technical skills matrix
        ├── ProjectsSection.tsx  # Category filter bar and project cards
        ├── ProjectModal.tsx     # Fullscreen project preview & architectural notes modal
        ├── CapstoneSection.tsx  # CIT 240 coursework & open-source deliverables
        ├── ContactSection.tsx   # Validated contact form & direct contact details
        ├── Footer.tsx           # Copyright and anchor links
        └── SafeImage.tsx        # Resilient image wrapper with styled fallback
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server on port `3000`:
   ```bash
   npm run dev
   ```
3. Run TypeScript type checking and production bundle build:
   ```bash
   npm run lint
   npm run build
   ```

## GitHub Pages Deployment

1. Build the static bundle (`dist/`):
   ```bash
   npm run build
   ```
2. If deploying to a project subpath (`https://<username>.github.io/<repo>/`), configure `base: '/<repo>/'` in `vite.config.ts` prior to building.
3. Publish the `dist/` output using GitHub Actions (`actions/deploy-pages`) or push `dist/` to the `gh-pages` branch and enable **Settings → Pages** in your repository.
