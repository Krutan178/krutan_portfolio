# AI agent guidelines for krutan.site

Next.js 16 (App Router) portfolio, blog, and shadcn registry website.

**Stack**: TypeScript, React 19, Tailwind CSS v4, shadcn/ui, MDX, Vitest, pnpm (Bun for utility scripts), Vercel

## Project structure

| Directory                              | Purpose                                                            |
| -------------------------------------- | ------------------------------------------------------------------ |
| `src/app/`                             | App Router pages, layouts, API routes (`game/`, `og/`, `vcard/`)    |
| `src/components/`                      | Shared UI components (`kl-mark.tsx`, `kl-wordmark.tsx` are the brand mark) |
| `src/registry/`                        | Registry source (components, hooks, blocks, examples, lib)          |
| `src/features/`                        | Feature modules: `portfolio`, `doc`, `blog`, `block`, `bookmark`, `craft`, `sponsor` |
| `src/config/`                          | Site (`site.ts`), registry (`registry.ts`), JSON-LD config         |
| `src/scripts/`                         | Utility scripts run with Bun (registry build, capture)             |
| `src/hooks/`, `src/lib/`, `src/utils/`, `src/types/` | Hooks, libraries, utilities, shared types             |

**Key files**: `components.json` (shadcn config incl. registry aliases), `src/features/portfolio/data/` (all portfolio content), `src/features/{sponsor,craft}/data.ts` (feature data), `.env.local` (env vars)

## Component registry

Built on shadcn/ui. Registry sources live in `src/registry/` split by type
(`components/`, `hooks/`, `blocks/`, `examples/`, `lib/`, `styles/`, each with
its own `_registry.ts`). The build scripts exist in `src/scripts/` but are not
wired into `package.json` yet, so treat the checked-in generated files as
correct and never hand-edit them:

**NEVER EDIT** auto-generated outputs: `registry.json`, `registry-stats.json`, `src/registry/__index__.tsx`, `public/r/*.json`

## Content system

All content lives in `src/features/doc/content/` as MDX files, split into `blog/` and `components/`. The category is derived from the immediate subfolder name (not declared in frontmatter), so a file's location determines whether it's a blog post or component doc.

- **Data layer**: `src/features/doc/data/documents.ts` (`getAllDocs`, `getDocBySlug`, `getDocsByCategory`)
- **Blog UI**: `src/features/blog/` (rendering only, imports data from `features/doc`)

## Coding guidelines

- TypeScript strict mode; explicit types when necessary
- kebab-case file naming
- Descriptive names; comments only for "why", not "what"
- No emojis in code, comments, or commit messages
- Tailwind CSS v4 syntax; support dark/light modes
- Follow SOLID principles
- Headings in sentence-case (capitalize only the first word and proper nouns), applies to Markdown/MDX docs and prose

## Commands

```bash
pnpm dev                # Dev server
pnpm preview            # Production build + start
pnpm build              # Production build
pnpm test               # Vitest (watch)
pnpm test:run           # Vitest (single run)
pnpm lint               # ESLint (cached)
pnpm lint:fix           # ESLint with --fix
pnpm check-types        # Type checking (tsc --noEmit)
pnpm format:check       # Prettier check
pnpm format:write       # Prettier
```

### Local dev URL

A dev server is usually already running behind `https://krutan.localhost` (see `allowedDevOrigins` in `next.config.ts` and `NEXT_PUBLIC_APP_URL` in `.env.local`). Use that origin to test pages and routes, never `http://localhost:3000` or a raw port. It also makes generated absolute URLs match what the code produces.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
