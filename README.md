# AI Architecture Ecosystem — Interactive Hub

A live, browsable map of a personal monorepo spanning finance simulation, project-management analytics, supply chain modeling, and applied AI/multi-agent research. This dashboard *is* the portfolio: instead of a static list of repos, it renders every project as a node in the pipeline that actually produced it.
![Uploading Gemini_Generated_Image_aj5vlhaj5vlhaj5v.png…]()

```
┌──────────────────────────────────────────────────────────────────────────┐
│  AI ARCHITECTURE ECOSYSTEM — Interactive Hub              CONFIG/DEPLOY  │
│  [ALL] [FINANCE] [SYSTEMS/PM] [SUPPLY CHAIN] [APPLIED AI]                 │
├───────────────────┬────────────────────────────┬─────────────────────────┤
│  01_SIMULATE       │  02_ANALYZE                │  03_PUBLISH             │
│                    │                             │                        │
│  ┌──────────────┐  │  ●───●─●──────●──────●──●  │  ┌──────────────────┐  │
│  │ Investing    │  │      (dependency graph      │  │ Finance Content  │  │
│  │ Game  [55%]  │  │       across domains)       │  │ Pipeline  [80%]  │  │
│  └──────────────┘  │                             │  └──────────────────┘  │
│  ┌──────────────┐  │  ┌───────────────────────┐  │  ┌──────────────────┐  │
│  │ Money Game   │  │  │ Ledger Engine [5%]    │  │  │ Historias [30%]  │  │
│  │      [70%]   │  │  └───────────────────────┘  │  └──────────────────┘  │
│  └──────────────┘  │  ┌───────────────────────┐  │                        │
│       ⋮            │  │ PM Maturity Engine    │  │        ⋮               │
│                    │  │              [85%]    │  │                        │
└───────────────────┴────────────────────────────┴─────────────────────────┘
              click any card → drawer with the project's real README/CLAUDE.md
```

## The idea

Every project in the ecosystem is classified along two axes:

- **Domain** — which problem space it belongs to: `FINANCE`, `SYSTEMS / PM`, `SUPPLY CHAIN`, `APPLIED AI`. Each domain has its own accent color, used consistently across cards, chips, and the graph.
- **Pipeline stage** — where it sits in the `01_SIMULATE → 02_ANALYZE → 03_PUBLISH` flow that runs through every domain: raw simulators and games feed analytical engines, which feed content/publishing pipelines.

The top nav filters the whole board by domain. Each project renders as a card with its name, live status (`ACTIVE` / `PROTOTYPE` / `PLANNED`), stack, and a maturity bar with a one-line justification (not a vibe — derived from real signals like test suites, working demos, and doc completeness). Clicking a card opens a drawer rendering that project's *actual* `README.md`/`CLAUDE.md`, pulled verbatim from its folder in the monorepo.

## Architecture

This is a static, backend-less React app — no API, no database. The entire dashboard is a rendering layer over two data files:

- **`src/data/projectRegistry.ts`** — the source of truth. Exports `DOMAINS` (the four domain definitions + accent colors) and `PROJECTS` (every node: id, domain, pipeline step, path relative to the monorepo root, description, stack, status, progress %, and maturity note). Adding or updating a project means editing this file.
- **`src/data/projectDocs.generated.ts`** — auto-generated, never hand-edited. Produced by `scripts/generate-docs.mjs`, which walks each project's real folder in the monorepo, reads its `README.md`/`CLAUDE.md`, and inlines the content (truncated at 6000 chars) so the drawer can show genuine documentation with no server round-trip.

```
projectRegistry.ts ──┐
                      ├──> DomainContext (filter + selected project state)
generate-docs.mjs ────┘         │
       │                        ├──> StepColumn × 3 (simulate / analyze / publish)
       ▼                        │       └──> NodeCard (per project)
projectDocs.generated.ts        │
       │                        └──> GraphCanvas (cross-domain dependency view)
       └───────────────────> NodeDrawer (renders the real README via react-markdown)
```

`App.tsx` wraps the page in `DomainProvider`, which holds the active domain filter and the currently selected project. Three `StepColumn`s filter `PROJECTS` by pipeline step + active domain and render `NodeCard`s; the analyze column also hosts `GraphCanvas`, a dependency visualization across domains. Selecting a card opens `NodeDrawer`, which renders the project's real doc via `react-markdown` + `remark-gfm`.

## Stack

React 19 · TypeScript · Vite · Tailwind v4 (config-less, via `@tailwindcss/postcss`) · react-markdown/remark-gfm · oxlint.

## Commands

```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # typecheck (tsc -b) + production build
npm run lint     # oxlint
npm run preview  # preview the production build

node scripts/generate-docs.mjs   # re-bake project docs after editing a source README
```

## Keeping it in sync

When a sibling project's README changes, or a new project is added:

1. Add/update its entry in `PROJECTS` in `src/data/projectRegistry.ts`.
2. Add/update its entry in the `SOURCES` map in `scripts/generate-docs.mjs`.
3. Re-run `node scripts/generate-docs.mjs` to refresh `projectDocs.generated.ts`.
