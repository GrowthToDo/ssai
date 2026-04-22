# SEO Plan 2: Blog Posts + Glossary Content Batch

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce all 34 content pieces (25 blog posts + 8 glossary pages + 1 original data post) in a batch. Posts are written but drip-published according to the cadence in the strategy document.

**Architecture:** All posts are Markdown files in `src/data/post/` with frontmatter matching the schema auto-wired in the blog route (`src/pages/[...blog]/index.astro`). BlogPosting + BreadcrumbList schemas are automatically applied. FAQPage schema is added manually per post via `<SchemaOrg>` in frontmatter or as an MDX component.

**Pre-requisite:** Plan 1 must be complete. Hub pages must exist before posts link back to them.

**Tech Stack:** Markdown/MDX, `docs/seo/blog-post-template.mdx` (template), `.claude/skills/seo-aeo-simplescheduleai.md` (writing skill — load for every post)

---

## How to Write Each Post

**Always load the SEO/GEO skill before writing:**

```
Load skill: .claude/skills/seo-aeo-simplescheduleai.md
```

**Every post must use the template at `docs/seo/blog-post-template.mdx` and follow these rules:**

1. Frontmatter: `publishDate`, `updateDate`, `author: 'Pradeep Pandey'`, `title`, `excerpt` (40–60 words, contains keyword), `category`, `tags`, `metadata.canonical`
2. TL;DR block: 40–80 words, one stat, self-contained
3. H2s phrased as questions matching search queries
4. Content Capsule under each H2: 40–70 word direct answer, then 120–180 word expansion
5. Every stat links to a primary source (CMS, HRSA, TX DSHS, ANA, AONL)
6. "How SimpleScheduleAI Helps" section — natural mention, acknowledges one limitation
7. 3–5 FAQ section
8. Key Takeaways bullet list
9. CTA paragraph linking to `/how-it-works` or `/pilot`
10. Author bio at end (see template)
11. Hub link: every post must contain one internal link back to its parent hub page with keyword anchor text
12. Run `docs/seo/pre-publish-checklist.md` before committing

**For posts with a companion template:** Add the content upgrade CTA block (from skill Part 7.6) after the third H2.

---

## Task 1: Hub 1 Blog Posts — `/nurse-scheduling-software` spokes

### Post 1: nurse-scheduling-software-vs-excel

**File:** `src/data/post/nurse-scheduling-software-vs-excel.md`
**Hub link:** `/nurse-scheduling-software`
**Buyer stage:** Consideration
**Keyword:** nurse scheduling software

- [ ] **Step 1.1: Write the post**

Frontmatter:

```yaml
publishDate: HOLD-FOR-PUBLISH
updateDate: HOLD-FOR-PUBLISH
author: 'Pradeep Pandey'
title: 'Nurse Scheduling Software vs. Excel: When to Make the Switch'
excerpt: >
  Most critical access hospitals start with Excel for nurse scheduling — and stay
  too long. This guide explains the five signs your CAH has outgrown spreadsheets,
  what nurse scheduling software actually does differently, and the real cost of
  waiting to switch.
image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80'
category: Healthcare Operations
tags:
  - nurse-scheduling
  - nurse-scheduling-software
  - critical-access-hospitals
metadata:
  canonical: 'https://simplescheduleai.com/blog/nurse-scheduling-software-vs-excel'
```

Required sections:

- TL;DR: Excel works until it doesn't — the 5 signs your CAH has crossed the threshold + one stat on scheduling time
- H2: "What does nurse scheduling software do that Excel can't?" — capsule + expansion
- H2: "How much time does Excel scheduling actually cost a nurse manager?" — capsule + $26K stat linked to source
- H2: "What are the signs a critical access hospital has outgrown Excel?" — 5 signs with capsule
- H2: "Is nurse scheduling software worth the cost for a 25-bed hospital?" — ROI angle
- Hub link: anchor text "nurse scheduling software for critical access hospitals" → `/nurse-scheduling-software`
- Content upgrade: NO template companion for this post

- [ ] **Step 1.2: Run pre-publish checklist**

Open `docs/seo/pre-publish-checklist.md` and verify every item passes.

- [ ] **Step 1.3: Commit**

```bash
git add src/data/post/nurse-scheduling-software-vs-excel.md
git commit -m "content: add nurse scheduling software vs excel blog post"
```

---

### Posts 2–7: Remaining Hub 1 spokes

Write each post following the same workflow as Post 1 (Steps: Write → Checklist → Commit).

- [ ] **Post 2:** `src/data/post/nurse-schedule-maker.md`
  - Title: "Nurse Schedule Maker: Building Schedules That Reduce Burnout"
  - Keyword: nurse schedule maker | Stage: Awareness
  - Hub link: `/nurse-scheduling-software`
  - Sections: What is a nurse schedule maker / How to build a schedule that distributes burden fairly / What schedule patterns increase burnout risk / Tools available
  - No template companion

- [ ] **Post 3:** `src/data/post/free-nurse-schedule-templates.md`
  - Title: "Free Nurse Schedule Templates: What Works and What Doesn't"
  - Keyword: nurse schedule template | Stage: Awareness
  - Hub link: `/nurse-scheduling-software`
  - **Template companion:** `/resources/nurse-schedule-template` — add content upgrade CTA after 3rd H2
  - Sections: Types of nurse schedule templates / What a good template includes / Limitations of templates vs software / Where to get free templates

- [ ] **Post 4:** `src/data/post/best-nurse-scheduling-software.md`
  - Title: "Best Nurse Scheduling Software for Small Hospitals: 2025 Buyer's Guide"
  - Keyword: best nurse scheduling software | Stage: Consideration
  - Hub link: `/nurse-scheduling-software`
  - Sections: What to look for / Comparison of 4–5 options (honest, include competitors) / Who each is best for / Recommendation for CAHs
  - Include comparison table (AI citation booster, ~33% citation share for comparison content)

- [ ] **Post 5:** `src/data/post/nurse-rostering-vs-scheduling-software.md`
  - Title: "Nurse Rostering Software vs. Scheduling Software: What's the Difference?"
  - Keyword: nurse rostering software | Stage: Awareness
  - Hub link: `/nurse-scheduling-software`
  - Sections: Definitions of rostering vs scheduling / Where the terms overlap / What CAHs actually need / How SimpleScheduleAI handles both

- [ ] **Post 6:** `src/data/post/nursing-scheduling-app-what-to-look-for.md`
  - Title: "Nursing Scheduling App: What to Look for Before You Buy"
  - Keyword: nurse scheduling app | Stage: Consideration
  - Hub link: `/nurse-scheduling-software`
  - Sections: Mobile vs web apps for scheduling / Key features checklist / Red flags in scheduling apps / CAH-specific requirements

- [ ] **Post 7:** `src/data/post/nurse-schedule-generator.md`
  - Title: "Nurse Schedule Generator: How to Automate Your Weekly Roster"
  - Keyword: nurse schedule generator free | Stage: Consideration
  - Hub link: `/nurse-scheduling-software`
  - Link to tool: `/tools/nurse-schedule-generator` (will exist after Plan 3)
  - Sections: What a schedule generator does / Manual vs automated generation / Free tools available / When free isn't enough

---

## Task 2: Hub 2 Blog Posts — `/critical-access-hospital-scheduling` spokes

- [ ] **Post 8:** `src/data/post/fair-nurse-schedule-critical-access-hospital.md`
  - Title: "How to Build a Fair Nurse Schedule at a Critical Access Hospital"
  - Keyword: nurse scheduling | Stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Sections: What makes a schedule "fair" / Common fairness problems in manual scheduling / How to distribute weekends, nights, holidays equitably / How software enforces fairness

- [ ] **Post 9:** `src/data/post/per-diem-nursing-shifts-critical-access-hospitals.md`
  - Title: "Per Diem Nursing Shifts: How CAHs Can Fill Gaps Without Agency Costs"
  - Keyword: per diem nursing shifts | Stage: Consideration
  - Hub link: `/critical-access-hospital-scheduling`
  - **Template companion:** `/resources/per-diem-roster-template` — add content upgrade CTA
  - Sections: What per diem means in CAH context / Building a per diem pool / How to manage per diem availability / Cost comparison: per diem vs agency

- [ ] **Post 10:** `src/data/post/hospital-callout-coverage-ranked-shortlist.md`
  - Title: "Hospital Callout Coverage: Building a Ranked Shortlist That Works"
  - Keyword: nurse scheduling problem | Stage: Decision
  - Hub link: `/critical-access-hospital-scheduling`
  - **Template companion:** `/resources/callout-log-template` — add content upgrade CTA
  - Sections: Why manual phone trees fail / What a ranked shortlist is / How to build one manually / How software automates the process

- [ ] **Post 11:** `src/data/post/texas-nursing-overtime-compliance-cah.md`
  - Title: "Texas Nursing Overtime Compliance: A Guide for CAH Administrators"
  - Keyword: nursing staffing | Stage: Decision
  - Hub link: `/critical-access-hospital-scheduling`
  - **Template companion:** `/resources/texas-nursing-compliance-checklist` — add content upgrade CTA
  - Sections: FLSA overtime rules for nurses / Texas-specific requirements / Common compliance gaps in CAH scheduling / Documentation requirements / How to audit your current practices
  - Sources: CMS (cms.gov), TX DSHS (dshs.texas.gov), FLSA (dol.gov)

- [ ] **Post 12:** `src/data/post/12-hour-hospital-shifts-scheduling.md`
  - Title: "12-Hour Hospital Shifts: Scheduling Challenges and Solutions"
  - Keyword: 12 hour hospital shifts | Stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - **Template companion:** `/resources/shift-rotation-template` — add content upgrade CTA
  - Sections: Why CAHs use 12-hour shifts / Fatigue and burnout risks of 12-hour rotations / How to schedule 12-hour shifts fairly / Overtime risks with 12-hour scheduling

- [ ] **Post 13:** `src/data/post/night-shift-nurse-schedule-coverage.md`
  - Title: "Night Shift Nurse Schedule: How to Ensure Adequate Coverage"
  - Keyword: night shift nurse schedule | Stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Sections: Night shift coverage requirements for CAHs / Why night shift is hardest to fill / Rotating vs permanent night shift / How software ensures night coverage

- [ ] **Post 14:** `src/data/post/nursing-staff-scheduling-best-practices-25-bed.md`
  - Title: "Nursing Staff Scheduling Best Practices for 25-Bed Hospitals"
  - Keyword: nursing staff scheduling | Stage: Decision
  - Hub link: `/critical-access-hospital-scheduling`
  - Sections: 7 scheduling best practices specific to 25-bed hospitals / Common mistakes CAH nurse managers make / How to implement each best practice

- [ ] **Post 15:** `src/data/post/hospital-staffing-software-features-cah.md`
  - Title: "Hospital Staffing Software: The 7 Features CAHs Actually Need"
  - Keyword: hospital staffing software | Stage: Consideration
  - Hub link: `/critical-access-hospital-scheduling`
  - Sections: The 7 features (Excel import, TX compliance, callout shortlist, fairness controls, audit trail, no-IT setup, cost optimization) / Why each matters for CAHs / Features enterprise tools have that CAHs don't need

---

## Task 3: Hub 3 Blog Posts — `/healthcare-staff-scheduling` spokes

- [ ] **Post 16:** `src/data/post/medical-scheduling-software-buyer-guide.md`
  - Title: "Medical Scheduling Software: A Buyer's Guide for Small Hospitals"
  - Keyword: medical scheduling software | Stage: Consideration
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: Types of medical scheduling software / What small hospitals actually need / Evaluation criteria / Total cost of ownership / Red flags

- [ ] **Post 17:** `src/data/post/what-is-clinical-scheduling.md`
  - Title: "What Is Clinical Scheduling and How Does It Differ from Nurse Scheduling?"
  - Keyword: clinical scheduling software | Stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Note: This is also a glossary-style post. 800–1000 words, definitional in first paragraph
  - Sections: Definition of clinical scheduling / Types of clinical scheduling / How it differs from nurse scheduling / Which CAHs need which

- [ ] **Post 18:** `src/data/post/healthcare-workforce-management-cah.md`
  - Title: "Healthcare Workforce Management: Why CAHs Need a Different Approach"
  - Keyword: healthcare workforce management | Stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: What healthcare WFM is / Enterprise WFM vs CAH needs / Why WFM platforms are wrong for CAHs / What the right approach looks like

- [ ] **Post 19:** `src/data/post/hospital-workforce-management-software-cah.md`
  - Title: "Hospital Workforce Management Software: What CAHs Should Know"
  - Keyword: hospital workforce management software | Stage: Consideration
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: What WFM software includes / Cost and complexity of enterprise WFM / When a CAH might need WFM vs just scheduling / Alternatives

- [ ] **Post 20:** `src/data/post/home-health-care-scheduling-vs-hospital.md`
  - Title: "Home Health Care Scheduling: Key Differences from Hospital Scheduling"
  - Keyword: home health care scheduling software | Stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: How home health scheduling differs / Tools designed for home health vs hospital / Why SimpleScheduleAI is for inpatient, not home health (honest positioning)

- [ ] **Post 21:** `src/data/post/staff-scheduling-software-healthcare-vs-generic.md`
  - Title: "Staff Scheduling Software for Healthcare vs. Generic Tools"
  - Keyword: staff scheduling software | Stage: Consideration
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: What generic scheduling tools miss / Healthcare-specific requirements / Side-by-side comparison / Recommendation by hospital type

- [ ] **Post 22:** `src/data/post/nurse-manager-guide-work-scheduling.md`
  - Title: "The Nurse Manager's Guide to Work Scheduling"
  - Keyword: nurse manager | Stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: The nurse manager's scheduling responsibilities / How much time scheduling takes / Building the schedule: step-by-step process / Tools and tips

- [ ] **Post 23:** `src/data/post/nursing-scheduling-software-ai.md`
  - Title: "Nursing Scheduling Software: How AI Is Changing Hospital Rosters"
  - Keyword: nursing scheduling software | Stage: Consideration
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: How AI scheduling works / What AI does better than manual / Limitations of AI scheduling / How SimpleScheduleAI uses AI

- [ ] **Post 24:** `src/data/post/hospital-shift-schedule-reduce-overtime.md`
  - Title: "Hospital Shift Schedule: How to Design One That Reduces Overtime"
  - Keyword: hospital shift schedule | Stage: Decision
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: The three causes of overtime in hospital scheduling / Design principles that reduce overtime / How to audit your current schedule for overtime risk / Software vs manual overtime management

- [ ] **Post 25:** `src/data/post/healthcare-staffing-software-small-hospitals.md`
  - Title: "Healthcare Staffing Software: What Small Hospitals Should Prioritize"
  - Keyword: healthcare staffing software | Stage: Consideration
  - Hub link: `/healthcare-staff-scheduling`
  - Sections: Unique needs of small hospitals / Feature priority list / Evaluation process for small teams / What to avoid

---

## Task 4: 8 Glossary Pages

Glossary pages follow the **Glossary page pattern** from the SEO/GEO skill (Part 7.4): 600–800 words, self-contained definition in first paragraph, definitional H2s, 3-question FAQ, CTA to hub page.

These publish **alongside** blog posts (not separately) — they go in `src/data/post/` with `category: Glossary`.

- [ ] **Post G1:** `src/data/post/what-is-a-critical-access-hospital.md`
  - Title: "What Is a Critical Access Hospital? Definition, Requirements, and Benefits"
  - Keyword: critical access hospital | Buyer stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Definition: CMS designation, ≤25 beds, rural location, at least 35 miles from nearest hospital
  - Source: CMS.gov CAH definition, HRSA Flex Program data
  - FAQ: What qualifies as a CAH? / How many CAHs are in Texas? / What funding do CAHs receive?

- [ ] **Post G2:** `src/data/post/what-is-nurse-rostering.md`
  - Title: "What Is Nurse Rostering? How It Differs from Scheduling"
  - Keyword: nurse rostering | Buyer stage: Awareness
  - Hub link: `/nurse-scheduling-software`
  - Definition: rostering = managing the staff list + assignments; scheduling = building the shift timetable
  - FAQ: Is rostering the same as scheduling? / What software handles both? / How do CAHs manage rostering?

- [ ] **Post G3:** `src/data/post/what-is-per-diem-nursing.md`
  - Title: "What Is Per Diem Nursing? How It Works in Critical Access Hospitals"
  - Keyword: per diem nursing shifts | Buyer stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Definition: per diem = day-by-day, as-needed nursing work; no guaranteed hours; premium pay
  - Source: ANA staffing standards, AONL workforce data
  - FAQ: How does per diem pay work? / How do CAHs build a per diem pool? / Difference from agency nursing?

- [ ] **Post G4:** `src/data/post/what-is-clinical-scheduling-glossary.md`
  - Note: Use slug `what-is-clinical-scheduling-glossary` to avoid collision with Post 17
  - Title: "What Is Clinical Scheduling? A Plain-Language Definition"
  - Keyword: clinical scheduling | Buyer stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Definition: scheduling of clinical (patient-facing) staff in medical settings
  - FAQ: What's the difference between clinical and administrative scheduling? / What tools are used? / Does clinical scheduling include physicians?

- [ ] **Post G5:** `src/data/post/what-is-healthcare-workforce-management.md`
  - Title: "What Is Healthcare Workforce Management?"
  - Keyword: healthcare workforce management | Buyer stage: Awareness
  - Hub link: `/healthcare-staff-scheduling`
  - Definition: the practice of planning, scheduling, tracking, and optimizing clinical staff across a healthcare organization
  - FAQ: Is workforce management the same as scheduling? / What software is used for healthcare WFM? / Do small hospitals need WFM?

- [ ] **Post G6:** `src/data/post/what-is-a-nurse-manager.md`
  - Title: "What Is a Nurse Manager? Role, Responsibilities, and Scheduling Duties"
  - Keyword: nurse manager | Buyer stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Definition: RN with management responsibilities over a nursing unit or department
  - FAQ: What does a nurse manager do all day? / How much time do nurse managers spend on scheduling? / What's the difference between a nurse manager and a charge nurse?

- [ ] **Post G7:** `src/data/post/what-is-hospital-shift-scheduling.md`
  - Title: "What Is Hospital Shift Scheduling? Shift Types and Rotation Patterns"
  - Keyword: hospital shift scheduling | Buyer stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Definition: the process of assigning nursing staff to fixed shift blocks (typically 8hr or 12hr) across a scheduling period
  - FAQ: What are the main types of hospital shifts? / How do 12-hour and 8-hour shifts differ in scheduling? / How do CAHs decide on shift patterns?

- [ ] **Post G8:** `src/data/post/what-is-nursing-overtime.md`
  - Title: "What Is Nursing Overtime? FLSA Rules and CAH Compliance"
  - Keyword: nursing overtime | Buyer stage: Awareness
  - Hub link: `/critical-access-hospital-scheduling`
  - Definition: overtime for nurses = hours worked over 40 in a workweek under FLSA; 1.5x regular rate required
  - Sources: DOL FLSA guidelines (dol.gov), TX Payday Law (twc.texas.gov)
  - FAQ: Does FLSA apply to hospital nurses? / What are the Texas overtime rules? / How do hospitals track nursing overtime?

---

## Task 5: Original Data Post

- [ ] **Post D1:** `src/data/post/cah-nurse-schedule-data-analysis.md`
  - Title: "We Analyzed [N] Nurse Schedules from Texas Critical Access Hospitals — Here's What We Found"
  - Keyword: nurse scheduling critical access hospital | Stage: Awareness → links to Consideration
  - Hub link: `/critical-access-hospital-scheduling`
  - Publish: Month 2–3 (needs some real data from pilot hospitals or synthesized from domain knowledge)
  - Sections:
    - Methodology (how many schedules, what data was analyzed, time period)
    - Finding 1: Average overtime rate by shift type (with actual numbers)
    - Finding 2: Most common callout days/times (day of week, time of day)
    - Finding 3: Schedule fairness patterns (weekend/overnight distribution)
    - Finding 4: Cost impact of scheduling patterns
    - What this means for CAH administrators
  - Note: Fill in `[N]` with actual count before publishing. Even 5–10 pilot schedules qualifies as "data."

---

## Task 6: Batch build verification

- [ ] **Step 6.1: After writing all posts, run a full build**

```bash
npm run build 2>&1 | grep -E "(error|warning|Error)" | head -30
```

Expected: no errors. Common issues:

- MDX syntax errors (unclosed JSX tags, invalid frontmatter YAML)
- Missing image URLs (replace placeholder Unsplash URLs with real images before publishing)
- Canonical URL typos

- [ ] **Step 6.2: Check slug uniqueness**

```bash
ls src/data/post/ | sed 's/\.md$//' | sort | uniq -d
```

Expected: no output (no duplicate slugs).

- [ ] **Step 6.3: Commit all remaining posts**

```bash
git add src/data/post/
git commit -m "content: add 25 blog posts + 8 glossary pages + original data post (unpublished batch)"
```

---

## Task 7: Competitor Complaint Dossier Posts (written Apr 2026)

15 posts derived from the competitor complaint dossier (`docs/content/competitor-complaint-dossier.md`). All files exist in `src/data/post/` with `draft: true`. Publish by flipping `draft: false` on the scheduled date.

**Status: All written and committed as of 2026-04-18.**

### MOFU posts (Consideration stage, 1,500–2,500 words)

| Publish date | File                                                  | Title                                                                                          |
| ------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 2026-05-19   | `hipaa-compliant-nurse-scheduling-software.md`        | Is Your Nurse Scheduling Software HIPAA Compliant?                                             |
| 2026-05-21   | `cms-pbj-reporting-scheduling-software.md`            | CMS Payroll-Based Journal Reporting: What Your Scheduling Software Should Handle Automatically |
| 2026-06-04   | `what-automated-nurse-scheduling-actually-means.md`   | What "Automated Scheduling" Actually Means (and What It Doesn't)                               |
| 2026-06-11   | `vendor-support-decline-nurse-scheduling-software.md` | Why Scheduling Software Vendors Stop Caring After You Sign the Contract                        |
| 2026-06-18   | `hidden-compliance-cost-nurse-scheduling.md`          | The Hidden Compliance Cost in Your Nurse Scheduling Workflow                                   |

### TOFU posts (Awareness stage, 1,000–1,500 words)

| Publish date | File                                                   | Title                                                                                   |
| ------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| 2026-07-07   | `nurse-scheduling-software-small-hospital.md`          | Why Nurse Scheduling Software Built for Mass General Doesn't Work for a 20-Bed Hospital |
| 2026-07-14   | `scheduling-software-vendor-acquisition-support.md`    | What Happens to Your Hospital When Your Scheduling Software Vendor Gets Acquired        |
| 2026-07-21   | `nurse-scheduling-software-reliability-crashes.md`     | What Happens When Your Scheduling Software Crashes Before a Holiday Weekend             |
| 2026-07-28   | `nurse-scheduling-app-login-problems.md`               | Why Your Nurse Scheduling App Keeps Logging You Out                                     |
| 2026-08-04   | `switching-from-excel-to-nurse-scheduling-software.md` | The Real Cost of Switching From Excel to Scheduling Software                            |
| 2026-08-11   | `nurse-manager-scheduling-time-breakdown.md`           | Where the 10 Hours of Nurse Manager Scheduling Time Actually Goes                       |
| 2026-08-18   | `kronos-nurse-scheduling-problems-small-hospitals.md`  | What Nurses Actually Say About Kronos (And Why CAH Administrators Should Know It)       |
| 2026-08-25   | `self-scheduling-manager-workload-trap.md`             | The Self-Scheduling Workload Trap: Why Giving Nurses Control Creates More Work          |
| 2026-09-01   | `nurse-scheduling-software-minimum-employees.md`       | The Nurse Scheduling Software With a 100-Employee Minimum                               |
| 2026-09-08   | `rural-texas-hospital-nurse-scheduling-2026.md`        | What Rural Texas Hospitals Are Actually Using for Nurse Scheduling in 2026              |

### Reprioritization notes (updated 2026-04-18 based on GSC data)

GSC impressions as of mid-April 2026 show:

- `/blog/best-nurse-scheduling-software-2026`: 160 impressions — comparison/buyers-guide format is the highest-performing content type
- `/nurse-scheduling-software`: 75 impressions — this hub needs more spoke posts urgently
- `/healthcare-staff-scheduling`: 66 impressions
- `/blog/ukg-too-complex-small-hospital`: 32 impressions — competitor-specific content is working

**If needing to accelerate any TOFU posts**, move in this priority order:

1. `nurse-scheduling-software-small-hospital` — supports the highest-impression pillar page
2. `kronos-nurse-scheduling-problems-small-hospitals` — UKG competitor content is working
3. `nurse-manager-scheduling-time-breakdown` — supports the $26K administrative burden post (39 impressions)

**For the original Tasks 1–5 posts**, prioritize Task 1 (Hub 1 spokes for `/nurse-scheduling-software`) first, since that pillar is getting 75 impressions and needs topical depth to convert impressions to clicks.

---

## Publishing Sequence

Posts are written in this task but published on the drip cadence from the strategy doc. To hold a post unpublished: set `publishDate` to a future date (Astro will not render future-dated posts if the blog route filters by date). If your blog route doesn't filter, add `draft: true` to frontmatter.

**Publish order (original Tasks 1–5):**

1. Month 1: Posts 8, 12, 22 (Awareness — Hub 2 + Hub 3)
2. Month 2: Posts 5, 18, 13, G1, G2, G3 + original data post
3. Month 3: Posts 1, 6, 16, 20, 23, G4, G5, G6, G7, G8
4. Month 3 (continued): Posts 4, 9, 15, 19, 21, 25 (Consideration)
5. Month 3 (end): Posts 10, 11, 14, 24 (Decision)
6. Remaining: Posts 2, 3, 7, 17 (mixed — fill as needed)
