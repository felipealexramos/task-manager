# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (frontend)
- `npx json-server db.json --port 3000` — start the mock REST API (required for the app to work; the frontend hits `http://localhost:3000/tasks`)
- `npm run build` — production build via Vite
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the repo (max-warnings=0 is enforced on staged files via lint-staged + Husky pre-commit)

There is no test runner configured.

## Architecture

Single-page React 19 app (JSX, no TypeScript) bootstrapped with Vite. UI is composed entirely of small functional components under [src/components/](src/components/) and styled with Tailwind CSS using a custom `brand.*` color palette defined in [tailwind.config.js](tailwind.config.js). The Poppins font is bundled in [src/assets/fonts/](src/assets/fonts/) and SVG icons are imported as React components via `vite-plugin-svgr` and re-exported from [src/assets/icons/index.js](src/assets/icons/index.js).

### State and data flow

There is no global store, router, or data-fetching library. State lives in [src/components/Tasks.jsx](src/components/Tasks.jsx), which is the page-level container:

- On mount, `Tasks` fetches `GET http://localhost:3000/tasks` (json-server backed by [db.json](db.json)) into `useState`.
- Tasks are split client-side into `morning` / `afternoon` / `night` buckets by the `time` field and rendered into three `TaskSeparator` sections.
- Status transitions cycle `not_started → in_progress → done → not_started` locally; toast feedback uses `sonner` (configured once in [src/App.jsx](src/App.jsx)).
- Creation flows through [AddTaskDialog.jsx](src/components/AddTaskDialog.jsx), which `POST`s to json-server, then calls `onSubmitSuccess(createdTask)` so the parent appends to its `tasks` state.
- Deletion is performed inside `TaskItem`, which then calls `onDeleteSuccess(taskId)` to remove the entry from parent state. The parent never refetches.

Important: the network layer is inline `fetch` calls against the hardcoded `http://localhost:3000/tasks` base URL. There is no API client abstraction yet — if you add endpoints, follow the same pattern or extract a client.

### Task shape

Each task in `db.json`:

```
{ id: string, title: string, description: string, time: "morning"|"afternoon"|"night", status: "not_started"|"in_progress"|"done" }
```

`AddTaskDialog` does not send an `id`; json-server generates it.

### Dialog rendering

`AddTaskDialog` renders via `createPortal` to `document.body` and short-circuits to `null` when `isOpen` is false — keep this pattern when adding modals so backdrop blur and z-index stacking work.

## Conventions enforced by tooling

ESLint config ([eslint.config.js](eslint.config.js)) enforces:

- Double quotes, no semicolons (`semi: never`, `quotes: double`, Prettier `singleQuote: false`)
- `simple-import-sort` for imports/exports
- `react/prop-types: error` — every component prop must be declared via `prop-types`
- `no-unused-vars` with `varsIgnorePattern: ^[A-Z_]` (PascalCase/UPPER_CASE allowed unused)

Husky + lint-staged ([lintstagedrc.json](lintstagedrc.json)) run `prettier --write` then `eslint --fix --max-warnings=0` on staged `*.js` / `*.jsx` at commit time.
