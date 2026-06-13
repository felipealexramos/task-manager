# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (frontend, on `http://localhost:5173`)
- `npx json-server db.json --port 3000` — start the mock REST API (required for the app to work; the frontend hits `http://localhost:3000/tasks`)
- `npm run build` — production build via Vite
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the repo (max-warnings=0 is enforced on staged files via lint-staged + Husky pre-commit)

There is no test runner configured.

## Architecture

Single-page React 19 app (JSX, no TypeScript) bootstrapped with Vite. Routing, server-state caching, and toasts are wired up in [src/main.jsx](src/main.jsx); UI is composed of small functional components under [src/components/](src/components/) and styled with Tailwind CSS using a custom `brand.*` color palette defined in [tailwind.config.js](tailwind.config.js). The Poppins font is bundled in [src/assets/fonts/](src/assets/fonts/) and SVG icons are imported as React components via `vite-plugin-svgr` and re-exported from [src/assets/icons/index.js](src/assets/icons/index.js).

### Routing

Routes are defined with `createBrowserRouter` in [src/main.jsx](src/main.jsx):

| Route | Page | Purpose |
|-------|------|---------|
| `/` | [pages/Home.jsx](src/pages/Home.jsx) | Dashboard: summary cards, task list, status pie chart |
| `/tasks` | [pages/Tasks.jsx](src/pages/Tasks.jsx) | Tasks grouped by time of day |
| `/task/:id` | [pages/TaskDetails.jsx](src/pages/TaskDetails.jsx) | Edit/delete a single task |
| `*` | inline | 404 |

> Note: [src/App.jsx](src/App.jsx) (Sidebar + Tasks) is **not** mounted by the router — `/tasks` renders `pages/Tasks.jsx`, which composes the same `Sidebar` + `Tasks` components directly. `App.jsx` is legacy/unused by the live routes.

### State and data flow

There is **no global store**. Server state is owned entirely by **TanStack Query (React Query)** — the query cache is the source of truth for task data. The `QueryClient` is provided in [src/main.jsx](src/main.jsx).

All network access is encapsulated in custom hooks under [src/hooks/](src/hooks/), each wrapping `useQuery`/`useMutation`:

- **Queries:** `use-get-tasks` (all), `use-get-task` (one by id), `use-get-tasks-summary` (derives per-status counts client-side from the `use-get-tasks` list — no extra requests, so counts and list always agree)
- **Mutations:** `use-add-task`, `use-update-task`, `use-delete-task`, `use-clear-tasks`

The HTTP client is a single `axios` instance with the API `baseURL`, configured in [src/lib/axios.js](src/lib/axios.js). **Do not** use inline `fetch` or hardcode the base URL in components — go through a hook + `api` instance.

### Cache update conventions (important)

The `["tasks"]` list is the **single source of truth** — dashboard counts and the status chart are derived from it client-side (see `use-get-tasks-summary`), not from separate filtered queries. This guarantees the list and the counts can never disagree.

Mutations update that one cache **optimistically without refetching**:

- `onMutate`/`onSuccess` call `queryClient.setQueryData(taskQueryKeys.getAll(), ...)` to add/replace/remove the task in the `["tasks"]` list (and `getOneById` for the single-task cache).
- `onError` rolls back from the snapshot captured in `onMutate`.

When adding a new mutation, follow this same pattern (mutate the `["tasks"]` cache directly). Do **not** reintroduce per-status server queries for counts — derive them from the list instead.

### Query/mutation keys

Cache keys are centralized as factories — never inline key arrays in hooks:

- [src/keys/queries.js](src/keys/queries.js): `taskQueryKeys.getAll()`, `getOneById(id)`
- [src/keys/mutations.js](src/keys/mutations.js): `taskMutationKeys.add()`, `update(id)`, `delete(id)`, `clearAll()`

### Forms

Forms use **react-hook-form** ([AddTaskDialog.jsx](src/components/AddTaskDialog.jsx), [pages/TaskDetails.jsx](src/pages/TaskDetails.jsx)) with `register` + `handleSubmit`, inline `validate` rules, and `errors.<field>?.message` surfaced through the shared `Input`/`Select` components' `errorMessage` prop. `TaskDetails` seeds the form from the fetched task via `reset(task)` in an effect.

### Task shape

Each task in [db.json](db.json):

```
{ id: string, title: string, description: string, time: "morning"|"afternoon"|"night", status: "not_started"|"in_progress"|"done" }
```

`AddTaskDialog` generates the `id` client-side with `uuid` (`v4()`) before POSTing. Status cycles `not_started → in_progress → done → not_started`, driven by `use-update-task` from the checkbox in [TaskItem.jsx](src/components/TaskItem.jsx).

### Dialog rendering

`AddTaskDialog` renders via `createPortal` to `document.body` and short-circuits to `null` when `isOpen` is false — keep this pattern when adding modals so backdrop blur and z-index stacking work. `ConfirmDialog` (used by [Header.jsx](src/components/Header.jsx) for "Limpar Tarefas") is the reusable confirmation modal.

### Feedback

Toasts use `sonner` — the `Toaster` is mounted once in [src/main.jsx](src/main.jsx); call `toast.success`/`toast.error` from mutation `onSuccess`/`onError` callbacks.

## Conventions enforced by tooling

ESLint config ([eslint.config.js](eslint.config.js)) enforces:

- Double quotes, no semicolons (`semi: never`, `quotes: double`, Prettier `singleQuote: false`)
- `simple-import-sort` for imports/exports
- `react/prop-types: error` — every component prop must be declared via `prop-types`
- `no-unused-vars` with `varsIgnorePattern: ^[A-Z_]` (PascalCase/UPPER_CASE allowed unused)

Husky + lint-staged ([lintstagedrc.json](lintstagedrc.json)) run `prettier --write` then `eslint --fix --max-warnings=0` on staged `*.js` / `*.jsx` at commit time.
