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
- [ ] Any raw HTML `<table>` inside the post has `dark:` Tailwind variants on every bg, text, and border class (table is readable in dark mode — test the post in dark mode before publishing)
- [ ] Table of Contents anchor text matches the H2/H3 heading text exactly (including trailing `?` on question headings)

## Comparison Tables (when comparing competitor products)

- [ ] Table is fully visible on standard viewport with **no horizontal scrollbar**. Use `table-fixed` with explicit per-column `style="width:NN%"` rather than `overflow-x-auto` + `min-width`.
- [ ] Table includes `break-words` class so long product names ("SimpleScheduleAI", "NurseGrid Manager") wrap inside the cell rather than overflowing into adjacent columns.
- [ ] Table uses responsive font sizing: `text-xs sm:text-sm` (xs on mobile, sm on tablet+).
- [ ] Cells use `align-top` for clean alignment when content wraps.
- [ ] **Rating cells follow the standard format**: `G2: X.X/5 (N reviews)<br>Capterra: Y.Y/5 (M reviews)` — labeled, stacked on separate lines via `<br>`. Never use compressed slash-separated formats like `4.3/5 (97) / 4.6/5 (17)` — readers cannot tell which number is which source.
- [ ] **When only one source has data**, show only that source (e.g., `Capterra: 4.5/5 (6 reviews; small sample)`). Never use placeholder text like "Not pulled", "N/A", or "—" in a rating cell.
- [ ] **Small-sample disclosure**: when a vendor has fewer than 20 reviews on a source, append `; small sample` to the cell.
- [ ] **Competitor capability cells**: never assert feature absence as fact ("None", "No", "Not built-in"). Use either the verified state ("Configurable", "Manual export", "Automatic") or `Confirm with vendor` / `Not documented` when the public product page does not explicitly cover it.
- [ ] **SimpleScheduleAI in the table** uses Option C framing: `New service; in active pilot phase` for any rating cell. Never imply a rating we don't yet have.
- [ ] **No editorial verdict columns**: avoid columns like "CAH Fit" or "Compliance" that resolve to "Good / Medium / Low / None" cells with red/green coloring. Use factual descriptors instead (Customer Focus, Setup Time, Pricing, public ratings).
- [ ] **Methodology footnote** appears once below the table or in a single "A Note on Sources" section before FAQ, not repeated in each row.

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
