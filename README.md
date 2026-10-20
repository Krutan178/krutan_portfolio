# krutan_portfolio

Personal portfolio of **Krutan Lakeshri** — Software Developer & Full Stack Engineer. Live at [krutan.site](https://krutan.site).

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4, shadcn/ui
- MDX content system (blog + component docs)
- Vitest for tests
- Deployed on Vercel

## Features

- Portfolio with experiences, projects, education, tech stack, and GitHub contributions
- Light/dark themes, PWA support, vCard download
- SEO: JSON-LD schema, sitemap, robots, dynamic OG images, RSS feed
- AI-ready: `/llms.txt`, markdown negotiation (`index.md`, per-page `.md` endpoints)
- Interactive 3D isometric KL monogram, game route, and shadcn-style component registry

## Development

```bash
pnpm install
pnpm dev
```

A dev server is served behind `https://krutan.localhost` (see `allowedDevOrigins` in `next.config.ts` and `NEXT_PUBLIC_APP_URL` in `.env.local`). All commands: `pnpm build`, `pnpm lint`, `pnpm test:run`, `pnpm check-types`, `pnpm format:write`.

## Credits

This project is based on the open-source [chanhdai.com](https://github.com/ncdai/chanhdai.com) portfolio template (MIT), rebranded and heavily customized.

## License

Released under the [MIT license](./LICENSE).
