# Pre-Publish Checklist — SimpleScheduleAI Blog & Pages

Run this before publishing any new page or blog post. Every item must be ✅.

## Content

- [ ] Unique title tag (50–60 chars) containing primary keyword
- [ ] Unique meta description (140–160 chars) with benefit + audience signal
- [ ] One H1 per page containing primary keyword
- [ ] Primary keyword appears in first 100 words of body text
- [ ] All H2/H3 headings phrased as questions
- [ ] Every H2/H3 has a 40–70 word direct answer capsule immediately below it
- [ ] Sections are 120–180 words for maximum ChatGPT citation probability
- [ ] One stat or data point per 150–200 words
- [ ] Every stat/regulatory claim hyperlinks to a primary source (CMS, HRSA, Texas DSHS, ANA)
- [ ] FAQ section present (product/landing/blog pages) — minimum 3 Q&As
- [ ] Author byline with real name, credentials, and LinkedIn link (NOT "SimpleScheduleAI Team")
- [ ] Internal link to pillar page (`/how-it-works` or `/critical-access-hospital-scheduling`) with keyword anchor text
- [ ] CTA at end linking to `/pilot` or `/how-it-works`

## Images

- [ ] Featured image is **verified to load** — open the Unsplash URL in a browser and confirm it returns an actual photo, not a 404
- [ ] Featured image is **relevant to the post topic** — no generic stock photos that could belong to any post (no beaches, hotel rooms, concerts, dev laptops, circuit boards, or abstract tech imagery for nurse scheduling content)
- [ ] Featured image ID is **unique** — not duplicated in any other live post or draft (run the duplicate check script before publishing)
- [ ] Image URL uses **no quotes** in YAML frontmatter: `image: https://...` not `image: 'https://...'`
- [ ] All images have descriptive alt text (not empty, not keyword-stuffed)
- [ ] All images are WebP or AVIF format
- [ ] Hero/featured image is compressed (< 200KB ideally)

## Schema & Technical

- [ ] FAQPage JSON-LD schema added for FAQ sections
- [ ] BlogPosting schema present on blog posts (datePublished + dateModified set)
- [ ] BreadcrumbList schema present on all inner pages
- [ ] `dateModified` in BlogPosting schema reflects today's actual publish/update date
- [ ] Canonical tag points to the correct final URL
- [ ] Page added to `public/sitemap.xml` (or will auto-generate on build)
- [ ] Schema validated at https://search.google.com/test/rich-results ✅

## AEO / GEO

- [ ] `public/llms.txt` updated if this adds a new feature, page, or pricing change
- [ ] `public/robots.txt` still allows all AI crawlers (no accidental blocks added)
- [ ] No PHI-capturing forms or HIPAA-violating tracking code introduced
- [ ] Build passes locally: `npm run build` completes without errors

## After Publishing

- [ ] Submit URL to Google Search Console → URL Inspection → Request Indexing
- [ ] Query the page's target keyword in Perplexity and ChatGPT to baseline AI visibility
- [ ] Add to AEO tracking spreadsheet (monthly check schedule)
- [ ] Post excerpt + link on LinkedIn company page
- [ ] Update AI Share of Voice tracking if this targets a monitored query
