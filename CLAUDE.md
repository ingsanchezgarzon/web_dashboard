# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A read-only React/TypeScript dashboard that visualizes the "AI Ecosystem" monorepo (this project lives at `web_dashboard/` inside a larger repo of sibling project folders like `01_investment_core/`, `02_pm_tower/`, `03_supply_obs/`, `04_nes_engine/`). It renders those sibling projects as nodes in a Simulate → Analyze → Publish pipeline, grouped by four domains (Finance, Systems/PM, Supply Chain, Applied AI). It does not run or import any of those projects — it only displays curated metadata and baked-in copies of their docs.

## Commands

- `npm run dev` — start Vite dev server (port 5173, see `.claude/launch.json`)
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build
- `node scripts/generate-docs.mjs` — regenerate `src/data/projectDocs.generated.ts` (see below). No test suite exists.

## Architecture

**Data model is the source of truth, UI is a renderer.** Everything the dashboard displays comes from two hand-maintained files:

- `src/data/projectRegistry.ts` — exports `DOMAINS` (the 4 domain definitions with color accents) and `PROJECTS` (every project node: id, domain, step, path relative to repo root, description, stack, status, and a manually-estimated `progress`/`maturityNote`). **This is the file to edit when adding/updating a project card** — everything else derives from it.
- `src/data/projectDocs.generated.ts` — auto-generated; do not hand-edit. It's produced by `scripts/generate-docs.mjs`, which reads each project's real `README.md`/`CLAUDE.md` from its actual folder in the monorepo (paths hardcoded in the `SOURCES` map in that script) and inlines the content (truncated at 6000 chars) so the dashboard can show real docs without a backend. When a project's README changes, or a new project is added to `projectRegistry.ts`, its entry must also be added to `SOURCES` in `generate-docs.mjs` and the script re-run.

**Rendering flow**: `App.tsx` wraps everything in `DomainProvider` (`src/contexts/DomainContext.tsx`), which holds the active domain filter and the currently-selected project (for the drawer), plus a `useProjectsByStep(step, domain)` hook used by each column. Three `StepColumn`s (simulate/analyze/publish) each filter `PROJECTS` by step + active domain and render `NodeCard`s; the analyze column also hosts `GraphCanvas`. Clicking a card sets `selectedProject`, which opens `NodeDrawer` (renders the project's markdown doc via `react-markdown` + `remark-gfm`). `TopNav` controls the domain filter.

**Styling**: Tailwind v4 via `@tailwindcss/postcss` (config-less, uses `src/index.css` + `src/styles/themes.css`). Domain accent colors are defined once in `projectRegistry.ts` (`accent` Tailwind token name + `accentHex` for canvas/inline use) and referenced everywhere else rather than duplicated.
