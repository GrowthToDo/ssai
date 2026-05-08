# SimpleScheduleAI — Claude Project Instructions

## Product Context

**SimpleScheduleAI**: AI nurse scheduling managed service for Critical Access Hospitals (CAHs, ≤25 beds), Texas. Audience: CAH Administrators/CEOs & Nurse Managers/DONs.

Founder Pradeep. Frame suggestions: hospital ops perspective, not generic tech.

## Key File Locations

| What | Where |
|---|---|
| Pages | `src/pages/` |
| Blog posts | `src/data/post/` |
| SEO/AEO skill | `.claude/skills/seo-aeo-simplescheduleai.md` |
| Competitor review skill | `.claude/skills/competitor-reviews.md` |
| Dev reference skill | `.claude/skills/project-dev.md` |
| Blog post template | `docs/seo/blog-post-template.mdx` |
| Pre-publish checklist | `docs/seo/pre-publish-checklist.md` |

## Rules

- **Blog posts:** Load `.claude/skills/seo-aeo-simplescheduleai.md` before writing/editing.
- **Competitor content:** Load `.claude/skills/competitor-reviews.md` before Key Limitations, reviewer quotes, or feature comparisons.
- **Code/dev work:** Load `.claude/skills/project-dev.md` for tech stack, pages, schema, coding standards.
- **Checklist execution:** Every checklist item must be verified mechanically — no mental checks, no assumptions. If an item requires external data (web search, file read, live fetch), run that lookup. If blocked or uncertain, ask before skipping or guessing.

## Subagent Strategy

Default: delegate. Main agent = orchestrator. Real work = subagents.

ALWAYS delegate:
- Bash >20 lines output → execute agent
- Multi-file exploration → Explore agent
- MCP calls w/ large payloads → mcp-fetch agent
- Code review → matching review agent
- Build/test/lint → execute agent

Main agent only: read known files, edit, write, compose answer, spawn subagents.
