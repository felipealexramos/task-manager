# Task Manager

> Um organizador de tarefas single-page construído com React 19, focado em uma arquitetura de dados moderna com TanStack Query e atualizações de UI otimistas via cache.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## ✨ Visão geral

O **Task Manager** é uma aplicação de gerenciamento de tarefas que permite criar, editar, concluir e remover tarefas, organizadas por período do dia (manhã, tarde e noite). A página inicial traz um dashboard com cartões de resumo e um gráfico de distribuição por status.

O projeto foi desenvolvido com ênfase em **boas práticas de arquitetura front-end**: separação clara entre camada de dados (hooks de query/mutation) e camada de apresentação (componentes), cache server-state gerenciado pelo TanStack Query, e validação de formulários com React Hook Form.

> A API é um mock REST servido por [`json-server`](https://github.com/typicode/json-server) a partir do arquivo [db.json](db.json), o que mantém o foco do projeto no front-end sem necessidade de back-end dedicado.

## 🎯 Funcionalidades

- 📋 **CRUD completo de tarefas** — criar, visualizar, editar e excluir
- 🕐 **Organização por período** — tarefas agrupadas em manhã, tarde e noite
- 🔄 **Ciclo de status com um clique** — `não iniciada → em andamento → concluída → não iniciada`
- 📊 **Dashboard** — cartões de resumo (total, não iniciadas, em andamento, concluídas)
- 🥧 **Gráfico de distribuição** — visualização por status com `recharts` (PieChart)
- 🧹 **Limpar todas as tarefas** — ação em massa com diálogo de confirmação
- ✅ **Validação de formulários** — campos obrigatórios e regras com `react-hook-form`
- 🔔 **Feedback ao usuário** — notificações toast com `sonner`
- 🧭 **Roteamento** — navegação entre páginas com `react-router-dom`

## 🛠️ Tecnologias

| Categoria | Stack |
|-----------|-------|
| **Core** | React 19, Vite 6 |
| **Server state** | TanStack Query (React Query) 5 |
| **HTTP** | Axios |
| **Roteamento** | React Router DOM 6 |
| **Formulários** | React Hook Form |
| **Estilização** | Tailwind CSS 3, `tailwind-variants` |
| **Gráficos** | Recharts |
| **Notificações** | Sonner |
| **API mock** | json-server |
| **Qualidade** | ESLint 9, Prettier, Husky, lint-staged |

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20+ e npm

### Passos

```bash
# 1. Clone o repositório
git clone git@github.com:felipealexramos/task-manager.git
cd task-manager

# 2. Instale as dependências
npm install

# 3. Inicie a API mock (json-server) — em um terminal
npx json-server db.json --port 3000

# 4. Inicie o servidor de desenvolvimento (Vite) — em outro terminal
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` e consumirá a API em `http://localhost:3000`.

> ⚠️ **A API mock precisa estar rodando** para a aplicação funcionar — o front-end faz requisições para `http://localhost:3000/tasks`.

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Executa o ESLint em todo o projeto |

## 🏗️ Arquitetura

A aplicação separa **estado de servidor** (gerenciado pelo TanStack Query) da **camada de apresentação** (componentes React puros). Não há um store global — o cache do React Query é a fonte da verdade para os dados de tarefas.

```
┌─────────────────┐     hooks de query/mutation     ┌──────────────┐
│   Componentes   │  ───────────────────────────►   │ TanStack     │
│   (pages /      │                                  │ Query Cache  │
│    components)   │  ◄───────────────────────────   │              │
└─────────────────┘        dados + estados           └──────┬───────┘
                                                            │ axios
                                                      ┌─────▼──────┐
                                                      │ json-server│
                                                      │  (db.json) │
                                                      └────────────┘
```

### Camada de dados

Toda comunicação com a API é encapsulada em **hooks customizados** em [src/hooks/](src/hooks/), que envolvem `useQuery`/`useMutation`:

- **Queries:** `useGetTasks`, `useGetTask`, `useGetTasksSummary`
- **Mutations:** `useAddTask`, `useUpdateTask`, `useDeleteTask`, `useClearTasks`

As mutations atualizam o cache de forma otimista via `setQueryData` (sem refetch) e invalidam apenas as queries de resumo (filtradas por status) via `invalidateQueries` com `predicate`. As chaves de cache são centralizadas em [src/keys/queries.js](src/keys/queries.js) e [src/keys/mutations.js](src/keys/mutations.js), seguindo o padrão de **query key factory**.

O cliente HTTP (`axios`) é configurado uma única vez em [src/lib/axios.js](src/lib/axios.js) com a `baseURL` da API.

### Roteamento

Definido em [src/main.jsx](src/main.jsx) com `createBrowserRouter`:

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | [Home.jsx](src/pages/Home.jsx) | Dashboard com cartões, lista de tarefas e gráfico |
| `/tasks` | [Tasks.jsx](src/pages/Tasks.jsx) | Tarefas agrupadas por período do dia |
| `/task/:id` | [TaskDetails.jsx](src/pages/TaskDetails.jsx) | Edição e exclusão de uma tarefa |
| `*` | — | Página 404 |

### Modelo de dados

Cada tarefa em [db.json](db.json):

```json
{
  "id": "string (uuid)",
  "title": "string",
  "description": "string",
  "time": "morning | afternoon | night",
  "status": "not_started | in_progress | done"
}
```

> O `id` é gerado no cliente com `uuid` no momento da criação.

## 📁 Estrutura do projeto

```
src/
├── assets/          # Fontes (Poppins) e ícones SVG (importados como componentes via vite-plugin-svgr)
├── components/      # Componentes de UI reutilizáveis (Button, Input, Select, TaskItem, etc.)
├── hooks/           # Hooks de dados (queries e mutations do TanStack Query)
├── keys/            # Query/mutation key factories
├── lib/             # Configuração do cliente axios
├── pages/           # Páginas mapeadas às rotas
├── App.jsx          # Layout base (sidebar + tarefas)
└── main.jsx         # Bootstrap: QueryClient, Router e Toaster
```

## 🎨 Design

- **Tipografia:** fonte Poppins (bundled em [src/assets/fonts/](src/assets/fonts/))
- **Paleta:** cores customizadas `brand.*` definidas em [tailwind.config.js](tailwind.config.js) (primária `#00ADB5`)
- **Ícones:** SVGs importados como componentes React via `vite-plugin-svgr`, re-exportados de [src/assets/icons/index.js](src/assets/icons/index.js)

## ✅ Qualidade de código

O projeto aplica padrões consistentes automaticamente:

- **ESLint** ([eslint.config.js](eslint.config.js)) — aspas duplas, sem ponto e vírgula, `simple-import-sort`, `react/prop-types` obrigatório
- **Prettier** com `prettier-plugin-tailwindcss` (ordenação de classes)
- **Husky + lint-staged** — roda `prettier --write` e `eslint --fix --max-warnings=0` nos arquivos staged antes de cada commit

## 📄 Licença

Distribuído sob a licença MIT.

---

<p align="center">
  Desenvolvido por <strong>Felipe Alexandre</strong> ·
  <a href="https://github.com/felipealexramos">GitHub</a>
</p>
