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
| **Competitor dossier** | **`docs/seo/competitor-dossier.md`** |

## Competitor Data Rule

**Always read `docs/seo/competitor-dossier.md` before any live web fetch for competitor reviews, ratings, or product data.** The dossier contains pre-verified verbatim quotes with confirmed Capterra product IDs and verification dates.

- Quote in dossier + verification date <60 days old → use directly, no web fetch needed
- Quote in dossier + verification date >60 days old → fetch fresh, verify verbatim, update dossier
- Competitor not in dossier → fetch live, add new section to dossier, then use

After adding new verified data from a live fetch, always update the dossier maintenance log before closing the session.

## Rules

- **Blog posts:** Load `.claude/skills/seo-aeo-simplescheduleai.md` before writing/editing.
- **Competitor content:** Load `.claude/skills/competitor-reviews.md` before Key Limitations, reviewer quotes, or feature comparisons. The skill will direct you to the dossier first.
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
