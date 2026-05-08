---
name: competitor-reviews
description: Fetch live G2/Capterra/App Store reviews for a competitor when writing comparison or alternatives posts. Use instead of relying on a static review snapshot.
---

# Competitor Review Lookup

Use this skill when you need real user complaints, praise, or patterns for a specific competitor (ShiftWizard, QGenda, Aladtec/TCP, NurseGrid, OnShift, UKG/Kronos, Deputy, SmartLinx, Connecteam, Homebase, When I Work).

## When to invoke

- Writing an alternatives post (e.g. `aladtec-alternatives.md`)
- Writing a vs-service comparison post
- Adding Key Limitations section for a competitor tool
- Verifying a reviewer quote before citing it

## What to fetch

Run WebSearch queries in this order. Stop when you have 3–5 usable verbatim quotes with attribution.

```
site:g2.com/products/[competitor-slug]/reviews "[pain point keyword]"
site:capterra.com/reviews/[competitor-slug] "[pain point keyword]"
"[Competitor Name]" reviews site:g2.com nurse OR hospital OR scheduling
```

For mobile/app complaints:
```
"[Competitor Name]" app reviews site:apps.apple.com OR site:play.google.com
```

## What to extract per quote

For each quote you plan to use:
- Verbatim text (no paraphrasing)
- Reviewer name and role (as shown on G2/Capterra)
- Review date
- Source (G2 / Capterra / App Store)

Format:
> "Verbatim quote."
> Name, Role, Date, Source

## C&D rules (enforced post 2026-04-30)

- Only use verbatim quotes — no paraphrasing reviewer sentiment
- No volume language ("consistently", "many reviewers") as a substitute for a quote
- No feature-absence claims without a verified verbatim quote AND a check of the live product page within 30 days
- When no usable quote exists, use neutral framing: "Verify with vendor" or "Not documented on product page"
- Competitor names in neutral context only — no embedded qualitative framing outside of quoted reviewer text

## Pain point themes to search for (by competitor)

| Competitor | High-value search terms |
|---|---|
| Aladtec / TCP | setup complexity, CMS documentation, overtime configuration, credential tracking |
| ShiftWizard | mobile app, loading speed, callout, implementation time |
| QGenda | small hospital, CAH, complex, cost, implementation |
| NurseGrid | app crash, login, mobile, feature |
| OnShift | load time, crashes, support |
| UKG / Kronos | small hospital, complex, IT, cost, configuration |
| Deputy | healthcare compliance, CMS, overtime, hospital |
| SmartLinx | setup, support, integration |

## After fetching

Log what you found:
1. Competitor name
2. Quotes collected (number)
3. Date fetched (today's date — quotes are only valid for 30 days per C&D rules)

If WebSearch returns no usable results for a competitor, do not substitute volume language. Use "Verify with vendor" framing in the post.
