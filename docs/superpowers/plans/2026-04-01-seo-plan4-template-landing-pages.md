# SEO Plan 4: Downloadable Template Landing Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 5 template landing pages at `/resources/[template-name]`, each gated behind an email capture form. Each template is a lead magnet: email address → download link delivered on a thank-you page. Also create the shared thank-you page and a resources index.

**Architecture:** Landing pages are Astro pages at `src/pages/resources/[name].astro`. Email capture uses Netlify Forms (same pattern as `src/pages/simulator.astro` — `data-netlify="true"`, no backend code needed). After form submission, user is redirected to a shared thank-you page at `/resources/thank-you` that shows a download button. The actual template files (Excel, PDF) live in `public/downloads/`.

**Pre-requisite:** Plan 2 blog posts should be written before this plan executes, since each template landing page links back to its companion blog post. It's fine if the blog posts aren't published yet — the links can exist.

**Tech Stack:** Astro 5, Tailwind CSS, Netlify Forms (no JS required for form submission), `SchemaOrg.astro` for FAQPage schema.

**Deployment note:** Netlify Forms only work when deployed to Netlify. Local dev: forms will show but won't submit. Test form submission after deploying to Netlify staging.

---

## Task 1: Create directory structure and placeholder template files

- [ ] **Step 1.1: Create resources directory and downloads directory**

```bash
mkdir -p src/pages/resources
mkdir -p public/downloads
```

- [ ] **Step 1.2: Create placeholder template files**

These are placeholder files. Replace with real Excel/PDF files before publishing the landing pages.

```bash
# Create placeholder files so the download links don't 404
echo "Replace this with the real Excel file" > "public/downloads/nurse-schedule-template.xlsx"
echo "Replace this with the real Excel file" > "public/downloads/shift-rotation-template.xlsx"
echo "Replace this with the real PDF file" > "public/downloads/texas-nursing-compliance-checklist.pdf"
echo "Replace this with the real Excel file" > "public/downloads/callout-log-template.xlsx"
echo "Replace this with the real Excel file" > "public/downloads/per-diem-roster-template.xlsx"
```

**IMPORTANT:** Before publishing any template landing page, replace the placeholder with the actual Excel/PDF file. The landing page copy describes what's in the template — the file must match that description.

- [ ] **Step 1.3: Commit structure**

```bash
git add src/pages/resources public/downloads
git commit -m "feat: scaffold /resources directory and placeholder template files"
```

---

## Task 2: Shared Thank-You Page — `/resources/thank-you`

**Files:**

- Create: `src/pages/resources/thank-you.astro`

This page is shown after any template form submission. It receives the template name via URL query parameter (`?template=nurse-schedule-template`) and shows the correct download button.

- [ ] **Step 2.1: Create the thank-you page**

Create `src/pages/resources/thank-you.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';

const metadata = {
  title: 'Your Template Is Ready | SimpleScheduleAI',
  description: 'Download your free nurse scheduling template from SimpleScheduleAI.',
};

// Map template slugs to download info
const TEMPLATES: Record<string, { name: string; file: string; ext: string }> = {
  'nurse-schedule-template': {
    name: 'Nurse Weekly Schedule Template',
    file: '/downloads/nurse-schedule-template.xlsx',
    ext: 'Excel (.xlsx)',
  },
  'shift-rotation-template': {
    name: 'Hospital Shift Rotation Template',
    file: '/downloads/shift-rotation-template.xlsx',
    ext: 'Excel (.xlsx)',
  },
  'texas-nursing-compliance-checklist': {
    name: 'Texas Nursing Compliance Checklist',
    file: '/downloads/texas-nursing-compliance-checklist.pdf',
    ext: 'PDF',
  },
  'callout-log-template': {
    name: 'Callout Log & Coverage Tracker',
    file: '/downloads/callout-log-template.xlsx',
    ext: 'Excel (.xlsx)',
  },
  'per-diem-roster-template': {
    name: 'Per Diem Nurse Availability Roster',
    file: '/downloads/per-diem-roster-template.xlsx',
    ext: 'Excel (.xlsx)',
  },
};

// Read template slug from query param at request time
// Astro static: default to generic message if no param
const templateSlug = Astro.url.searchParams.get('template') ?? '';
const template = TEMPLATES[templateSlug];
---

<Layout metadata={metadata}>
  <section class="bg-page min-h-screen pt-32 pb-20">
    <div class="mx-auto max-w-lg px-4 sm:px-6 text-center">
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
      >
        <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-default">Your template is ready</h1>

      {
        template ? (
          <div class="mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
            <p class="font-semibold text-default">{template.name}</p>
            <p class="mt-1 text-sm text-muted">{template.ext}</p>
            <a
              href={template.file}
              download
              class="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download {template.name}
            </a>
          </div>
        ) : (
          <div class="mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-8">
            <p class="text-muted">Check your email — we've sent the download link to your inbox.</p>
          </div>
        )
      }

      <div
        class="mt-10 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-6 text-left"
      >
        <p class="font-semibold text-default">Want more than templates?</p>
        <p class="mt-2 text-sm text-muted">
          SimpleScheduleAI replaces manual scheduling entirely — AI-generated schedules, automated callout coverage, and
          Texas compliance built in. Free 60-day pilot for critical access hospitals.
        </p>
        <a
          href="/pilot"
          class="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply for a Pilot Spot →
        </a>
      </div>

      <div class="mt-8 text-sm text-muted">
        <a href="/resources" class="text-blue-600 dark:text-blue-400 hover:underline">← Back to all templates</a>
      </div>
    </div>
  </section>
</Layout>
```

**Note on static vs SSR:** Astro static sites can't read query params at build time. The `Astro.url.searchParams` approach works with Astro in **server mode** (SSR). If the site is fully static, either:

- Set `output: 'server'` or `output: 'hybrid'` in `astro.config.mjs`, or
- Use a client-side script to read `window.location.search` and populate the download link dynamically.

If SSR is not configured, use this simpler fallback approach: each template landing page redirects to its own unique thank-you page (e.g., `/resources/thank-you/nurse-schedule-template`) — one static thank-you page per template, no query params needed.

Check current output mode:

```bash
grep -n "output" astro.config.mjs
```

If `output` is not set or is `'static'`, use the per-template thank-you approach (see Step 2.2 alternative).

- [ ] **Step 2.2 (alternative for static mode): Create per-template thank-you pages**

If the site is in static mode, skip Step 2.1 and instead create a thank-you page per template. Each is identical except for the template name and download link. Create one for each template:

`src/pages/resources/thank-you-nurse-schedule.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
const metadata = {
  title: 'Download Your Nurse Schedule Template | SimpleScheduleAI',
  description: 'Your free nurse schedule template is ready to download.',
};
---

<Layout metadata={metadata}>
  <section class="bg-page min-h-screen pt-32 pb-20">
    <div class="mx-auto max-w-lg px-4 sm:px-6 text-center">
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
      >
        <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-default">Your template is ready</h1>
      <div
        class="mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-8 shadow-sm"
      >
        <p class="font-semibold text-default">Nurse Weekly Schedule Template</p>
        <p class="mt-1 text-sm text-muted">Excel (.xlsx)</p>
        <a
          href="/downloads/nurse-schedule-template.xlsx"
          download
          class="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
        >
          Download Template
        </a>
      </div>
      <div
        class="mt-10 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-6 text-left"
      >
        <p class="font-semibold text-default">Want more than templates?</p>
        <p class="mt-2 text-sm text-muted">
          SimpleScheduleAI replaces manual scheduling entirely. Free 60-day pilot for critical access hospitals.
        </p>
        <a
          href="/pilot"
          class="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >Apply for a Pilot Spot →</a
        >
      </div>
    </div>
  </section>
</Layout>
```

Repeat this pattern for each of the 5 templates, changing only the `title`, `description`, template name, and `/downloads/[file]` path.

- [ ] **Step 2.3: Commit**

```bash
git add src/pages/resources/thank-you.astro
# or if using per-template pages:
git add src/pages/resources/thank-you-*.astro
git commit -m "feat: add template download thank-you page(s)"
```

---

## Task 3: Resources Index Page — `/resources`

**Files:**

- Create: `src/pages/resources/index.astro`

- [ ] **Step 3.1: Create the resources index**

Create `src/pages/resources/index.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import DarkHero from '~/components/widgets/DarkHero.astro';

const metadata = {
  title: 'Free Nurse Scheduling Templates & Resources | SimpleScheduleAI',
  description:
    'Free nurse scheduling templates for critical access hospitals: weekly schedule template, shift rotation template, Texas compliance checklist, callout log, and per diem roster.',
};

const templates = [
  {
    title: 'Nurse Weekly Schedule Template',
    description:
      'Pre-formatted Excel and Google Sheets template for a 7-day nurse roster. Includes shift columns for Day, Evening, and Night shifts across up to 30 nurses.',
    href: '/resources/nurse-schedule-template',
    format: 'Excel + Google Sheets',
    companion: {
      text: "Free Nurse Schedule Templates: What Works and What Doesn't",
      href: '/blog/free-nurse-schedule-templates',
    },
  },
  {
    title: 'Hospital Shift Rotation Template',
    description:
      'A 4-week rotating shift schedule template for hospital nursing staff. Covers 12-hour Day and Night rotations with a built-in fairness distribution view.',
    href: '/resources/shift-rotation-template',
    format: 'Excel',
    companion: {
      text: '12-Hour Hospital Shifts: Scheduling Challenges and Solutions',
      href: '/blog/12-hour-hospital-shifts-scheduling',
    },
  },
  {
    title: 'Texas Nursing Compliance Checklist',
    description:
      'A printable checklist covering CMS CoP requirements, FLSA overtime documentation, Texas DSHS standards, and audit trail requirements for critical access hospitals.',
    href: '/resources/texas-nursing-compliance-checklist',
    format: 'PDF',
    companion: {
      text: 'Texas Nursing Overtime Compliance: A Guide for CAH Administrators',
      href: '/blog/texas-nursing-overtime-compliance-cah',
    },
  },
  {
    title: 'Callout Log & Coverage Tracker',
    description:
      'Excel tracker for logging nurse callouts, replacement contacts, coverage outcomes, and overtime incurred. Provides documentation for CMS survey compliance.',
    href: '/resources/callout-log-template',
    format: 'Excel',
    companion: {
      text: 'Hospital Callout Coverage: Building a Ranked Shortlist That Works',
      href: '/blog/hospital-callout-coverage-ranked-shortlist',
    },
  },
  {
    title: 'Per Diem Nurse Availability Roster',
    description:
      'Track your per diem nursing pool: availability by day, hours worked this month, certifications, and last-contacted date. Built for critical access hospital nurse managers.',
    href: '/resources/per-diem-roster-template',
    format: 'Excel',
    companion: {
      text: 'Per Diem Nursing Shifts: How CAHs Can Fill Gaps Without Agency Costs',
      href: '/blog/per-diem-nursing-shifts-critical-access-hospitals',
    },
  },
];
---

<Layout metadata={metadata}>
  <DarkHero
    badge="Free Templates"
    title="Free Nurse Scheduling Templates for Critical Access Hospitals"
    subtitle="Download free Excel and PDF templates for nurse scheduling, shift rotation, overtime compliance, and callout coverage tracking. Built for 25-bed hospital operations."
  />

  <section class="bg-page py-16 md:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="space-y-6">
        {
          templates.map((t) => (
            <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    Free • {t.format}
                  </span>
                  <h2 class="mt-1 text-xl font-semibold text-default">{t.title}</h2>
                  <p class="mt-2 text-muted">{t.description}</p>
                  <p class="mt-3 text-sm text-muted">
                    Related guide:{' '}
                    <a href={t.companion.href} class="text-blue-600 dark:text-blue-400 hover:underline">
                      {t.companion.text}
                    </a>
                  </p>
                </div>
                <a
                  href={t.href}
                  class="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Download free →
                </a>
              </div>
            </div>
          ))
        }
      </div>

      <div
        class="mt-12 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-8 text-center"
      >
        <p class="text-lg font-semibold text-default">Templates are a starting point.</p>
        <p class="mt-2 text-muted max-w-xl mx-auto">
          SimpleScheduleAI replaces these manual templates with AI-generated schedules, automated callout coverage, and
          Texas compliance tracking — managed for you.
        </p>
        <a
          href="/pilot"
          class="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
        >
          Apply for a Free Pilot →
        </a>
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 3.2: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 3.3: Commit**

```bash
git add src/pages/resources/index.astro
git commit -m "feat: add /resources index listing all free downloadable templates"
```

---

## Task 4: Template Landing Page — `/resources/nurse-schedule-template`

**Files:**

- Create: `src/pages/resources/nurse-schedule-template.astro`

The Netlify form pattern (from `simulator.astro`): `data-netlify="true"`, hidden `form-name` field, honeypot `bot-field`. On submission, Netlify redirects to the URL specified in the `action` attribute.

- [ ] **Step 4.1: Create the landing page**

Create `src/pages/resources/nurse-schedule-template.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import SchemaOrg from '~/components/common/SchemaOrg.astro';

const metadata = {
  title: 'Free Nurse Weekly Schedule Template (Excel + Google Sheets) | SimpleScheduleAI',
  description:
    'Download a free nurse weekly schedule template for critical access hospitals. Pre-formatted for Day, Evening, and Night shifts. Excel and Google Sheets versions included.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in the nurse schedule template?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The template includes a 7-day weekly roster grid with columns for nurse name, shift type (Day/Evening/Night), shift hours, and notes. It comes in both Excel (.xlsx) and Google Sheets format. It is pre-sized for up to 30 nurses and includes a simple overtime hour counter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this nurse schedule template free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — free to download. Enter your email and the template is delivered immediately. No spam, no obligation. SimpleScheduleAI provides this template for nurse managers who aren't yet using automated scheduling software.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the limitations of a nurse schedule template vs. scheduling software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Templates require manual data entry every scheduling cycle, don't flag overtime automatically, can't handle callout coverage, and don't track compliance. Scheduling software like SimpleScheduleAI automates all of this — the template is a practical starting point, not a long-term solution for a busy critical access hospital.",
      },
    },
  ],
};
---

<Layout metadata={metadata}>
  <SchemaOrg slot="head" schema={[faqSchema]} />

  <section class="bg-page pt-24 pb-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left: Description */}
        <div>
          <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
            >Free Template</span
          >
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-default sm:text-4xl">
            Nurse Weekly Schedule Template
          </h1>
          <p class="mt-4 text-lg text-muted">
            A pre-formatted Excel and Google Sheets template for weekly nurse scheduling at critical access hospitals.
            Covers Day, Evening, and Night shifts for up to 30 nurses.
          </p>

          <ul class="mt-8 space-y-3">
            {
              [
                '7-day roster grid with Day, Evening, Night, and Off shift columns',
                'Pre-sized for up to 30 nurses — add or remove rows as needed',
                'Simple overtime hour counter (flags nurses approaching 40 hrs)',
                'Available in Excel (.xlsx) and Google Sheets',
                'Printable in landscape format for posting on the unit',
              ].map((item) => (
                <li class="flex items-start gap-3">
                  <svg class="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-default">{item}</span>
                </li>
              ))
            }
          </ul>

          <div class="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/50 p-4">
            <p class="text-sm text-muted">
              <strong class="text-default">Related guide:</strong>{' '}
              <a href="/blog/free-nurse-schedule-templates" class="text-blue-600 dark:text-blue-400 hover:underline">
                Free Nurse Schedule Templates: What Works and What Doesn't →
              </a>
            </p>
          </div>
        </div>

        {/* Right: Email capture form */}
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
          <h2 class="text-xl font-semibold text-default">Get the free template</h2>
          <p class="mt-2 text-sm text-muted">Enter your email to download instantly. No spam.</p>

          <form
            name="template-nurse-schedule"
            method="POST"
            action="/resources/thank-you?template=nurse-schedule-template"
            data-netlify="true"
            netlify-honeypot="bot-field"
            class="mt-6 space-y-4"
          >
            <input type="hidden" name="form-name" value="template-nurse-schedule" />
            <div class="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-default">
                Email address <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@hospital.org"
                class="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label for="hospital" class="block text-sm font-medium text-default">
                Hospital name <span class="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="hospital"
                name="hospital"
                type="text"
                placeholder="St. Mary's Critical Access Hospital"
                class="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button type="submit" class="btn btn-primary w-full py-3 text-base font-semibold">
              Download Free Template →
            </button>

            <p class="text-xs text-muted text-center">Free. No obligation. Unsubscribe anytime.</p>
          </form>
        </div>
      </div>

      {/* FAQ */}
      <div class="mt-16">
        <h2 class="text-xl font-semibold text-default mb-6">Questions about this template</h2>
        <div class="space-y-6">
          {
            [
              {
                q: "What's included in the template?",
                a: 'A 7-day roster grid with Day, Evening, Night, and Off columns for up to 30 nurses. Includes a simple overtime hour counter and is printable in landscape format. Available in Excel and Google Sheets.',
              },
              {
                q: 'Is this really free?',
                a: 'Yes — completely free. Enter your email and the template downloads immediately. SimpleScheduleAI provides this for nurse managers who need a practical starting point before moving to automated scheduling.',
              },
              {
                q: 'What are the limits of a template vs. scheduling software?',
                a: "Templates require manual rebuilding every cycle, don't flag overtime automatically, can't handle callout coverage, and don't document compliance. When manual scheduling is consuming 8+ hours per week, it's time for SimpleScheduleAI.",
              },
            ].map(({ q, a }) => (
              <div>
                <p class="font-semibold text-default">{q}</p>
                <p class="mt-1 text-muted">{a}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 4.2: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 4.3: Commit**

```bash
git add src/pages/resources/nurse-schedule-template.astro
git commit -m "feat: add nurse schedule template landing page at /resources/nurse-schedule-template"
```

---

## Task 5: Remaining 4 Template Landing Pages

Each page follows the identical structure as Task 4. Only the content (title, description, bullet points, form name, action URL, FAQ) changes.

- [ ] **Template 2:** `src/pages/resources/shift-rotation-template.astro`

Key differences from Task 4:

- `metadata.title`: `'Free Hospital Shift Rotation Template (4-Week Excel) | SimpleScheduleAI'`
- `metadata.description`: `'Free 4-week hospital shift rotation template for nursing staff. Covers 12-hour Day and Night rotations with fairness tracking. Excel download for critical access hospitals.'`
- H1: `Hospital Shift Rotation Template`
- Description: `A 4-week rotating shift schedule template for hospital nursing staff. Covers 12-hour Day and Night rotations with a built-in fairness distribution view.`
- Bullet points:
  - `4-week rotation grid for Day (7a–7p) and Night (7p–7a) 12-hour shifts`
  - `Fairness summary tab: counts weekend and night shifts per nurse across 4 weeks`
  - `Pre-sized for up to 25 nurses`
  - `Excel (.xlsx) format, printable in landscape`
  - `Color-coded by shift type for at-a-glance readability`
- Form name: `template-shift-rotation`
- Action: `/resources/thank-you?template=shift-rotation-template`
- Related guide: `/blog/12-hour-hospital-shifts-scheduling` → `12-Hour Hospital Shifts: Scheduling Challenges and Solutions`
- FAQ adjustments: focus on 12-hour shift rotation specifics

- [ ] **Template 3:** `src/pages/resources/texas-nursing-compliance-checklist.astro`

Key differences:

- `metadata.title`: `'Free Texas Nursing Compliance Checklist for CAH Administrators | SimpleScheduleAI'`
- `metadata.description`: `'Free printable checklist covering CMS CoP requirements, FLSA overtime documentation, Texas DSHS standards, and audit trail requirements for critical access hospitals.'`
- H1: `Texas Nursing Compliance Checklist`
- Description: `A printable PDF checklist for critical access hospital administrators. Covers CMS Conditions of Participation, FLSA overtime rules, Texas DSHS staffing standards, and scheduling audit trail requirements.`
- Bullet points:
  - `CMS CoP §485.635 staffing requirements — what to document and how`
  - `FLSA overtime checklist: non-exempt nurse classification, time tracking, pay calculations`
  - `Texas DSHS nursing standards applicable to critical access hospitals`
  - `Audit trail checklist: what scheduling records to retain and for how long`
  - `Pre-survey self-assessment section for CMS survey preparation`
- Form name: `template-tx-compliance`
- Action: `/resources/thank-you?template=texas-nursing-compliance-checklist`
- Related guide: `/blog/texas-nursing-overtime-compliance-cah` → `Texas Nursing Overtime Compliance: A Guide for CAH Administrators`
- FAQ: focus on which Texas regulations apply to CAHs, how long to retain records

- [ ] **Template 4:** `src/pages/resources/callout-log-template.astro`

Key differences:

- `metadata.title`: `'Free Nurse Callout Log & Coverage Tracker (Excel) | SimpleScheduleAI'`
- `metadata.description`: `'Free Excel tracker for logging nurse callouts, coverage contacts, and overtime incurred at critical access hospitals. Provides documentation for CMS compliance surveys.'`
- H1: `Callout Log & Coverage Tracker`
- Description: `Log every nurse callout and coverage attempt with this Excel tracker. Documents replacement contacts, coverage outcome, and overtime incurred — creating the audit trail CMS surveyors look for.`
- Bullet points:
  - `Date, time, and unit for each callout event`
  - `Replacement contact log: who was called, in what order, and their response`
  - `Coverage outcome: who covered, shift length, overtime incurred`
  - `Monthly summary tab: callout frequency by nurse, unit, and day of week`
  - `CMS survey-ready format with date and time stamps`
- Form name: `template-callout-log`
- Action: `/resources/thank-you?template=callout-log-template`
- Related guide: `/blog/hospital-callout-coverage-ranked-shortlist` → `Hospital Callout Coverage: Building a Ranked Shortlist That Works`
- FAQ: focus on CMS documentation requirements for callout coverage

- [ ] **Template 5:** `src/pages/resources/per-diem-roster-template.astro`

Key differences:

- `metadata.title`: `'Free Per Diem Nurse Availability Roster Template (Excel) | SimpleScheduleAI'`
- `metadata.description`: `'Free Excel template for tracking your per diem nursing pool at a critical access hospital. Log availability, certifications, hours worked, and last-contacted date.'`
- H1: `Per Diem Nurse Availability Roster`
- Description: `Track your per diem nursing pool with this Excel roster. Log each nurse's availability by day of week, certifications, hours worked this month, and last-contacted date so you know who to call first when coverage is needed.`
- Bullet points:
  - `Per diem nurse directory: name, certifications, contact info`
  - `Weekly availability grid: mark availability by day of week`
  - `Hours tracker: current month hours worked (flags nurses approaching overtime)`
  - `Last-contacted log: date and outcome of last coverage request`
  - `Certification filter: quickly identify nurses certified for specific units`
- Form name: `template-per-diem-roster`
- Action: `/resources/thank-you?template=per-diem-roster-template`
- Related guide: `/blog/per-diem-nursing-shifts-critical-access-hospitals` → `Per Diem Nursing Shifts: How CAHs Can Fill Gaps Without Agency Costs`
- FAQ: focus on building a per diem pool, how many per diem nurses a CAH needs

- [ ] **Step 5.1: Build and verify all 4 pages compile**

```bash
npm run build 2>&1 | grep -E "(error|Error)" | head -20
```

Expected: no errors.

- [ ] **Step 5.2: Commit all template pages**

```bash
git add src/pages/resources/
git commit -m "feat: add 4 remaining template landing pages at /resources/*"
```

---

## Task 6: Add navigation links to resources and tools

The `/resources` and `/tools` index pages need to be discoverable from the main site. Add them to the footer at minimum.

- [ ] **Step 6.1: Find the footer component**

```bash
grep -rl "Privacy" src/components/ src/layouts/ --include="*.astro" | head -5
```

This will locate the footer. Common locations: `src/components/widgets/Footer.astro` or `src/layouts/Layout.astro`.

- [ ] **Step 6.2: Add resources and tools links to footer**

Open the footer file. Find the section that contains links like "Privacy", "Terms", "Contact". Add:

```astro
<a href="/tools">Free Tools</a>
<a href="/resources">Free Templates</a>
```

Place them in the most appropriate nav group (Resources or Product column). Follow the existing link styling exactly — do not introduce new classes.

- [ ] **Step 6.3: Build and verify footer renders**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 6.4: Commit**

```bash
git add -p  # stage only the footer changes
git commit -m "feat: add /tools and /resources links to site footer"
```

---

## Task 7: Final end-to-end verification

- [ ] **Step 7.1: Start dev server and walk through the full download flow**

```bash
npm run dev
```

Test the complete user journey:

1. Go to `http://localhost:4321/resources` — verify all 5 templates listed with correct links
2. Click "Download free →" on the nurse schedule template
3. Verify landing page loads with H1, bullet points, and email form
4. Submit the form with a test email (note: Netlify forms only work after deployment)
5. Verify you land on the thank-you page with the download button

- [ ] **Step 7.2: Check all internal links are consistent**

```bash
# Find all href="/resources/ links to verify they match actual pages
grep -r 'href="/resources/' src/ --include="*.astro" | sort
```

Expected output should show links to exactly these paths (no typos):

- `/resources/nurse-schedule-template`
- `/resources/shift-rotation-template`
- `/resources/texas-nursing-compliance-checklist`
- `/resources/callout-log-template`
- `/resources/per-diem-roster-template`
- `/resources/thank-you`

- [ ] **Step 7.3: Verify schema on template pages**

Template landing pages have FAQPage schema. Confirm it renders in page source:

```bash
npm run build && grep -l "FAQPage" dist/resources/nurse-schedule-template/index.html
```

Expected: file path returned (schema present in built HTML).

- [ ] **Step 7.4: Deploy to Netlify and test form submission**

After deploying to Netlify (via git push to main or Netlify CLI):

```bash
# Check Netlify form is registered
# Go to: Netlify Dashboard → Forms → look for "template-nurse-schedule"
```

Submit the form with a real email. Verify:

- Netlify shows the form submission in the dashboard
- You land on `/resources/thank-you?template=nurse-schedule-template`
- The download button appears and downloads the file from `/downloads/nurse-schedule-template.xlsx`

- [ ] **Step 7.5: Replace placeholder files with real templates**

Before publishing the landing pages publicly, replace each placeholder in `public/downloads/` with the actual Excel/PDF file:

```
public/downloads/nurse-schedule-template.xlsx      ← real Excel file
public/downloads/shift-rotation-template.xlsx      ← real Excel file
public/downloads/texas-nursing-compliance-checklist.pdf  ← real PDF
public/downloads/callout-log-template.xlsx         ← real Excel file
public/downloads/per-diem-roster-template.xlsx     ← real Excel file
```

Commit each real file:

```bash
git add public/downloads/
git commit -m "feat: add real downloadable template files to public/downloads"
```

---

## Summary: What Was Built Across All 4 Plans

| Plan   | Output                                                 | Files                                                                                                                                                                                           |
| ------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan 1 | SEO/GEO skill update + 3 hub pages                     | `.claude/skills/seo-aeo-simplescheduleai.md`, `src/pages/nurse-scheduling-software.astro`, `src/pages/critical-access-hospital-scheduling.astro`, `src/pages/healthcare-staff-scheduling.astro` |
| Plan 2 | 25 blog posts + 8 glossary pages + 1 data post         | 34 files in `src/data/post/`                                                                                                                                                                    |
| Plan 3 | 4 interactive tools + tools index                      | `src/pages/tools/index.astro`, 4 tool pages, 4 React components in `src/components/tools/`                                                                                                      |
| Plan 4 | 5 template landing pages + resources index + thank-you | `src/pages/resources/index.astro`, 5 landing pages, thank-you page(s), placeholder downloads in `public/downloads/`                                                                             |

**Execute in order: Plan 1 → Plan 2 → Plan 3 → Plan 4**
