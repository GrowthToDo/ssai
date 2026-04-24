# SimpleScheduleAI — Claude Project Instructions

## Product Context

**SimpleScheduleAI** is an AI-powered nurse scheduling managed service targeting Critical Access Hospitals (CAHs, ≤25 beds) in Texas. The audience is CAH Administrators/CEOs and Nurse Managers/DONs.

Pradeep is building this as a founder. Frame all suggestions from a hospital operations perspective, not a generic tech user perspective.

## Tech Stack

- **Framework:** Astro 5 (static site)
- **Styling:** Tailwind CSS
- **Language:** TypeScript + MDX
- **SEO:** @astrolib/seo, @astrojs/sitemap
- **Deployment:** Netlify (`netlify.toml`) or Vercel (`vercel.json`)

## Key File Locations

| What                  | Where                                        |
| --------------------- | -------------------------------------------- |
| Pages                 | `src/pages/`                                 |
| Blog posts            | `src/data/post/` (Markdown/MDX)              |
| Blog route            | `src/pages/[...blog]/index.astro`            |
| Schema component      | `src/components/common/SchemaOrg.astro`      |
| SEO/AEO skill         | `.claude/skills/seo-aeo-simplescheduleai.md` |
| Blog post template    | `docs/seo/blog-post-template.mdx`            |
| Pre-publish checklist | `docs/seo/pre-publish-checklist.md`          |

## Key Pages

`/`, `/how-it-works`, `/pilot`, `/roi`, `/about`, `/contact`, `/blog`, `/simulator`, `/critical-access-hospital-scheduling`, `/nurse-scheduling-software`

## Schema Architecture

Pages inject page-specific JSON-LD via `<SchemaOrg slot="head" schema={[...]} />` inside `<Layout>`. The slot is forwarded through `PageLayout.astro` → `Layout.astro`. Organization schema is global (hardcoded in `Layout.astro`).

## Rules

- **Blog posts:** Always load the `.claude/skills/seo-aeo-simplescheduleai.md` skill before writing or editing blog posts.
- **No SVG in blog posts:** Never use inline `<svg>` in `.md` post files. Hardcoded SVG fill colors break dark mode and SVG text nodes overflow bars or render as raw concatenated text. Use Tailwind `<div>` bar charts (percentage widths) and `<table>` with `dark:` variants instead.
- **New blog posts** go in `src/data/post/`. Follow `docs/seo/blog-post-template.mdx` for structure.
- **Schema:** Use `SchemaOrg.astro` — never inline JSON-LD manually in page files.
- **Styling:** Tailwind only. No custom CSS unless Tailwind cannot achieve it.
- Do not add comments, docstrings, or type annotations to code you didn't change.
- Do not create helper utilities for one-time operations.
