---
name: update-registry
description: Re-survey the AI Ecosystem monorepo for new/changed/removed sibling projects and sync src/data/projectRegistry.ts + regenerate projectDocs.generated.ts. Use when the user asks to update, refresh, or sync the web dashboard's project list after changing files elsewhere in the monorepo.
---

# Update project registry

Keeps `web_dashboard/src/data/projectRegistry.ts` (and the generated docs baked
from real READMEs) in sync with what actually exists in the sibling project
folders of the AI Ecosystem monorepo. Run this whenever projects have been
added, renamed, restructured, or removed outside `web_dashboard/`.

## Steps

1. **List current registry state.** Read `src/data/projectRegistry.ts` and
   note every existing `id` + `path`.

2. **Survey the monorepo.** The repo root is one level up from
   `web_dashboard/`. List the contents of each domain's `01_simulate`,
   `02_analyze`/`02_Analyse`, `03_publish` folders (paths vary in casing —
   check what's actually on disk, don't assume). Compare against the paths
   already in the registry to find:
   - **New folders** not yet represented.
   - **Renamed/moved folders** whose registry `path` no longer exists on disk.
   - **Removed folders** whose registry entry now points nowhere.

3. **Classify each new/changed folder.** For anything unfamiliar, check:
   - Does it contain real code/config (package.json, requirements.txt,
     pyproject.toml, src/, etc.), or is it just generated output/notes/data?
     Skip pure output or notes folders (e.g. archives of generated content,
     empty placeholder dirs) — they aren't dashboard-worthy.
   - Read its `README.md` or `CLAUDE.md` (check exact filename/casing) to
     write a 1-2 sentence Spanish description matching the tone of existing
     entries in `projectRegistry.ts`.
   - Infer the tech stack from actual files present.
   - Judge `status` (active/prototype/planned) and a `progress` (0-100)
     estimate from real signals: tests, working entry points, generated
     outputs, docs completeness — not guesses. Write a one-line
     `maturityNote` justifying the number.
   - Assign `domain` (finance/systems/supply_chain/applied_ai) and `step`
     (simulate/analyze/publish) based on which numbered top-level folder and
     sub-stage it lives in.
   - If unsure whether something belongs on the dashboard at all (e.g. a
     purely strategic/business-notes folder with no code), treat it like the
     existing precedent: skip business-strategy-only folders and
     research-notes-only folders that have no executable project.

4. **Edit `src/data/projectRegistry.ts` by hand** — add new `ProjectNode`
   entries, fix `path` on renamed ones, remove entries for deleted projects.
   Follow the existing formatting/ordering (grouped by domain, simulate →
   analyze → publish within each domain).

5. **Update `scripts/generate-docs.mjs`** — add/remove/fix entries in the
   `SOURCES` map to match every change made in step 4 (same `id`, correct
   `path`, correct doc filename candidates in priority order).

6. **Regenerate docs**: run `node scripts/generate-docs.mjs` from
   `web_dashboard/`.

7. **Verify**: run `npx tsc -b` to confirm no type errors. If a dev server is
   already running, spot-check the new/changed cards render correctly
   (correct column, description, stack, progress bar) rather than assuming.

8. **Summarize** what was added/changed/removed in a short list — don't just
   say "done."
