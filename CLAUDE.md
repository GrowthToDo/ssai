# SimpleScheduleAI — Claude Project Instructions

## Product Context

**SimpleScheduleAI** is an AI-powered nurse scheduling managed service targeting Critical Access Hospitals (CAHs, ≤25 beds) in Texas. The audience is CAH Administrators/CEOs and Nurse Managers/DONs.

Pradeep is building this as a founder. Frame all suggestions from a hospital operations perspective, not a generic tech user perspective.

## Key File Locations

| What                    | Where                                        |
| ----------------------- | -------------------------------------------- |
| Pages                   | `src/pages/`                                 |
| Blog posts              | `src/data/post/` (Markdown/MDX)              |
| SEO/AEO skill           | `.claude/skills/seo-aeo-simplescheduleai.md` |
| Competitor review skill | `.claude/skills/competitor-reviews.md`       |
| Dev reference skill     | `.claude/skills/project-dev.md`              |
| Blog post template      | `docs/seo/blog-post-template.mdx`            |
| Pre-publish checklist   | `docs/seo/pre-publish-checklist.md`          |

## Rules

- **Blog posts:** Always load `.claude/skills/seo-aeo-simplescheduleai.md` before writing or editing blog posts.
- **Competitor content:** Load `.claude/skills/competitor-reviews.md` before writing any section with competitor Key Limitations, reviewer quotes, or feature comparisons.
- **Code and dev work:** Load `.claude/skills/project-dev.md` for tech stack, key pages, schema architecture, and coding standards.
