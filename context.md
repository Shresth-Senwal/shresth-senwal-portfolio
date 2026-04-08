# Project Context: Shresth Senwal Portfolio

## Project Overview
A premium, modern portfolio website for Shresth Senwal, featuring full-stack projects, hackathon achievements, and a high-performance interactive UI.

## Tech Stack
- **Runtime:** Bun Native
- **Package Manager:** Bun
- **Bundler:** Bun.build (Native)
- **Compiler:** Bun (Native TS/JSX)
- **CSS:** Tailwind CSS (via Tailwind CLI)
- **Frontend Framework:** React
- **Language:** TypeScript
- **Animations:** Framer Motion, GSAP
- **Icons:** Lucide React

## Architecture
### Folders
- `/scripts`: Native Bun scripts for dev and build.
  - `dev.ts`: Bun.serve with Tailwind/Bundler watch mode.
  - `build.ts`: Multi-stage build (Tailwind -> Bun.build -> Asset copy).
- `/src/components`: UI components and sections.
- `/src/assets`: Static styles and icons.
- `/public`: Static public assets and bundled output for dev.
- `/dist`: Production build output.

### Data Flow
- Static content defined within component files or via local JSON/TS files.
- UI state managed via React hooks.

## Feature Status
- [x] Modern interactive UI with glassmorphism (Added Download CV button)
- [x] Internship Certificates (Download buttons for Qapp.ai and Innominds)
- [x] Hackathons Section (SIH 2025, EIBS 2.0 updated)
- [x] Projects Section (AI, Blockchain, Web Dev) - Updated with PolyPact (AI Paralegal Platform)
- [x] Responsive design for mobile and desktop
- [x] Fast scrolling for mobile (swiping hard)
- [x] Hidden scrollbar globally while maintaining scroll functionality
- [x] Ported to Bun Native (Full Runtime, Bundler, Compiler)
- [x] Cleaned up all Vite residual files (vite-env.d.ts, etc.)

## Data Models
- **Hackathon:** `id, title, organizer, achievement, project, description, tech, date, participants, icon, color`
- **Project:** `id, title, description, tech, github, demo`

## API Contracts
- N/A (Client-side only)

## Technical Debt
- Cleanup residual configuration files after Bun migration.
- Optimize image assets for faster loading.
