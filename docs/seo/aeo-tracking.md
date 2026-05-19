# AEO / GEO + Search Measurement Tracking

Phase E artifact. The primary GEO KPI is **AI Share of Voice**: of the target prompts, how many cite `simplescheduleai.com` and how many recommend the product. Re-run this routine monthly and append a new dated block. Do not overwrite the baseline.

## Monthly routine

1. **Multi-index** (after any publish/deploy): `npm run indexnow`; GSC resubmit `sitemap-index.xml` + `sitemap-0.xml` (google-search-console MCP `submit_sitemap`); Bing `submit_feed` `sitemap-index.xml` (bing-webmaster MCP).
2. **GSC performance** (google-search-console MCP): `get_performance_overview` 90d; `get_search_analytics` by `query` and by `page` (row_limit 25). Log totals, top pages, and the outcome checks below.
3. **AI-citation** (dataforseo MCP `ai_optimization_llm_response`, `web_search:true`): run the 5 prompts below on ChatGPT `gpt-5` and Perplexity `sonar-pro`. For each: cited domain? recommended product? competitors surfaced? Approx cost ~$0.15/run.
4. Append results as a new dated section. Update the trend line.

### Standing prompt set

- P1: "What is the best nurse scheduling software for a critical access hospital?"
- P2: "How do small rural hospitals with no IT department manage nurse scheduling?"
- P3: "Best nurse scheduling software for a 25-bed hospital in Texas"
- P4: "How does a managed nurse scheduling service compare to scheduling software for a small rural hospital?"
- P5 (rotate): a competitor-comparison query (e.g. "M7 Health vs SimpleScheduleAI", "Smart Square alternatives for rural hospitals")

### 4–6 week GSC outcome checks (from roadmap Phase E)

- `/blog/best-nurse-scheduling-software-2026` → enters top 10 for "nurse scheduling software" (baseline: page-level avg pos 8.7, query not yet in top 25).
- `/ai-nurse-scheduling` → indexed (baseline: NOT indexed; indexing requested 2026-05-19).
- `/healthcare-staff-scheduling` → impressions trend to 0 (baseline: 1,923 impr, pos 56.8 — 301 confirmed live, GSC not yet reprocessed).
- Hub 1 `/nurse-scheduling-software` → accumulates spoke impressions (baseline: not in top 25 pages).

---

## Baseline — 2026-05-19

### Multi-index actions taken

- GSC: `sitemap-index.xml` + `sitemap-0.xml` resubmitted (status: pending processing). Prior sitemap last downloaded by Google 2026-05-16.
- IndexNow: 38 URLs → HTTP 200 OK.
- Bing: `sitemap-index.xml` feed submitted (site verified).

### GSC performance — 90d (2026-02-18 → 2026-05-19)

- Totals: **8 clicks, 6,803 impressions, CTR 0.12%, avg position 26.3**.
- Trend: impressions climbing ~17/day (mid-Apr) → ~280–310/day (mid-May); avg position improving ~50 → ~18. Clicks still near-zero (page 2–3 + scraper-style long-tail queries dominate).
- Top pages by impressions: `best-nurse-scheduling-software-2026` (1,603 impr, pos 8.7, 3 clicks); `healthcare-staff-scheduling` (1,923 impr, pos 56.8 — retired/301, expected to decay); `shiftwizard-alternatives` (570, pos 6.6); `shiftwizard-vs-managed-service` (511, pos 7.2); `qgenda-alternatives` (405, pos 7.1); `aladtec-alternatives` (360, pos 7.6); `ukg-alternatives-small-hospitals` (273, pos 10.4); pillar `critical-access-hospital-scheduling` (71 impr, pos 7.9, 2 clicks).
- Gaps: `/ai-nurse-scheduling` and `/nurse-scheduling-software` (Hub 1) not in top 25 pages (≈0 impressions). Target head terms ("nurse scheduling software", "critical access hospital scheduling") not yet in top 25 queries.

### AI-citation baseline

| Prompt                 | Engine               | Cited simplescheduleai.com?                                   | Recommended product?                  | Competitors surfaced                             |
| ---------------------- | -------------------- | ------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| P1 best sw for CAH     | ChatGPT gpt-5        | Yes — via `/blog/shiftwizard-alternatives` (listed under TCP) | No                                    | QGenda, UKG, ShiftWizard, TCP (KLAS-led)         |
| P2 rural no-IT         | ChatGPT gpt-5        | No (model did not browse)                                     | No                                    | none (generic spreadsheet answer)                |
| P3 25-bed Texas        | ChatGPT gpt-5        | No                                                            | No                                    | QGenda, Smart Square/symplr, Schedule360         |
| P1 best sw for CAH     | Perplexity sonar-pro | Yes — `/blog`                                                 | **Yes — ranked #1, "strongest fit"**  | Smart Square, QGenda, Homebase, Paycor, ShiftMed |
| P4 managed vs software | Perplexity sonar-pro | Yes — via `/blog/m7-health-vs-simplescheduleai`               | Partial (leans "start with software") | AMN, Homebase, scheduleit                        |

**AI Share of Voice (baseline): 3/5 prompts cited the domain; 1/5 recommended the product.**

Read:

- Perplexity rewards the CAH-specific content — it surfaced the blog and the M7-vs post and named SimpleScheduleAI the top CAH fit. This is the ICP-aligned win.
- ChatGPT (web.run) leans on KLAS / enterprise vendor pages; it cited the domain only through the `shiftwizard-alternatives` blog, never the pillar pages, and recommended enterprise vendors. Pillar pages are not yet cited anywhere.
- Lever implication: blog posts (not pillars) are doing the AEO citation work; the CAH-specific framing is what gets surfaced. ChatGPT visibility tracks Bing index + KLAS authority — keep Bing/IndexNow current and keep earning the CAH-niche framing.
