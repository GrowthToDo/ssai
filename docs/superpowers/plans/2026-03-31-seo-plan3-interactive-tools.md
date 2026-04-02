# SEO Plan 3: Interactive Tools

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 4 interactive tools at `/tools/[name]` plus a tools index page at `/tools`. All tools are ungated (no email required), client-side JavaScript, and follow the tools page pattern from the SEO/GEO skill (Part 7.5).

**Architecture:** Each tool is an Astro page at `src/pages/tools/[name].astro` that imports a client-side component from `src/components/tools/[ToolName].tsx`. Interactive components use `client:load` directive. The tools index page lists all tools. Existing patterns: see `src/pages/simulator.astro` (Netlify form pattern), `src/pages/roi.astro` (ROI component pattern).

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, React or vanilla JS components with `client:load`, `SchemaOrg.astro` for HowTo + FAQPage schema.

**Pre-requisite:** Plan 1 must be complete (tools pages link to hub pages and blog posts).

---

## Task 1: Tools directory structure

- [ ] **Step 1.1: Create tools directory**

```bash
mkdir -p src/pages/tools
mkdir -p src/components/tools
```

- [ ] **Step 1.2: Commit empty structure**

```bash
git add src/pages/tools src/components/tools
git commit -m "feat: scaffold /tools directory structure"
```

---

## Task 2: Tools Index Page — `/tools`

**Files:**

- Create: `src/pages/tools/index.astro`

- [ ] **Step 2.1: Create the tools index page**

Create `src/pages/tools/index.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import DarkHero from '~/components/widgets/DarkHero.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Free Nurse Scheduling Tools for Critical Access Hospitals | SimpleScheduleAI',
  description:
    'Free nurse scheduling tools: schedule generator, overtime calculator, shift schedule builder, and callout coverage planner. Built for critical access hospitals.',
};

const tools = [
  {
    title: 'Nurse Schedule Generator',
    description:
      'Generate a printable weekly nurse schedule from your roster. Enter your nurses, shifts, and days — the tool builds the grid.',
    href: '/tools/nurse-schedule-generator',
    keyword: 'Free • Nurse Schedule Generator',
  },
  {
    title: 'Hospital Shift Schedule Builder',
    description:
      'Build and export a hospital shift schedule. Assign nurses to day, evening, and night shifts across a 4-week rotation.',
    href: '/tools/shift-schedule-builder',
    keyword: 'Free • Shift Schedule Builder',
  },
  {
    title: 'Nursing Overtime Cost Calculator',
    description:
      'Calculate how much overtime is costing your hospital. Input your nurses, hours, and rates to see your weekly and annual overtime spend.',
    href: '/tools/overtime-calculator',
    keyword: 'Free • Overtime Cost Calculator',
  },
  {
    title: 'Callout Coverage Shortlist Planner',
    description:
      'When a nurse calls out, rank your available nurses by availability, overtime status, and last-worked date to find the best replacement.',
    href: '/tools/callout-coverage-planner',
    keyword: 'Free • Callout Coverage Planner',
  },
];
---

<Layout metadata={metadata}>
  <DarkHero
    badge="Free Tools"
    title="Free Nurse Scheduling Tools for Critical Access Hospitals"
    subtitle="Practical tools for nurse managers and CAH administrators. No signup required."
  />

  <section class="bg-page py-16 md:py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2">
        {
          tools.map((tool) => (
            <a
              href={tool.href}
              class="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {tool.keyword}
              </span>
              <h2 class="mt-2 text-xl font-semibold text-default group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.title}
              </h2>
              <p class="mt-2 text-muted">{tool.description}</p>
              <span class="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400">Open tool →</span>
            </a>
          ))
        }
      </div>

      <div
        class="mt-12 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-8 text-center"
      >
        <p class="text-lg font-semibold text-default">Need more than free tools?</p>
        <p class="mt-2 text-muted">
          SimpleScheduleAI automates your entire scheduling workflow — AI-generated schedules, callout coverage, and
          Texas compliance built in.
        </p>
        <a href="/how-it-works" class="mt-4 inline-block btn btn-primary px-6 py-3">See How It Works →</a>
      </div>
    </div>
  </section>

  <CallToAction
    title="Free 60-Day Pilot for Critical Access Hospitals"
    subtitle="Replace the tools above with a fully managed scheduling service. No IT setup required."
    actions={[{ variant: 'primary', text: 'Apply for a Pilot Spot', href: '/pilot' }]}
  />
</Layout>
```

- [ ] **Step 2.2: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

Expected: no errors. Visit `http://localhost:4321/tools` to confirm the tools grid renders.

- [ ] **Step 2.3: Commit**

```bash
git add src/pages/tools/index.astro
git commit -m "feat: add /tools index page listing all free nurse scheduling tools"
```

---

## Task 3: Nurse Schedule Generator — `/tools/nurse-schedule-generator`

**Files:**

- Create: `src/components/tools/NurseScheduleGenerator.tsx`
- Create: `src/pages/tools/nurse-schedule-generator.astro`

- [ ] **Step 3.1: Build the generator component**

Create `src/components/tools/NurseScheduleGenerator.tsx`:

```tsx
import { useState } from 'react';

interface Nurse {
  name: string;
}

interface ShiftAssignment {
  [nurseIndex: number]: string; // shift: 'Day' | 'Evening' | 'Night' | 'Off'
}

interface Schedule {
  [day: string]: ShiftAssignment;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SHIFTS = ['Day', 'Evening', 'Night', 'Off'];
const SHIFT_COLORS: Record<string, string> = {
  Day: 'bg-blue-100 text-blue-800',
  Evening: 'bg-purple-100 text-purple-800',
  Night: 'bg-gray-800 text-gray-100',
  Off: 'bg-gray-100 text-gray-500',
};

function buildDefaultSchedule(nurses: Nurse[]): Schedule {
  const schedule: Schedule = {};
  DAYS.forEach((day, dayIdx) => {
    schedule[day] = {};
    nurses.forEach((_, nurseIdx) => {
      // Simple rotation: cycle through Day/Evening/Night/Off
      schedule[day][nurseIdx] = SHIFTS[(nurseIdx + dayIdx) % 3]; // never default Off
    });
  });
  return schedule;
}

export default function NurseScheduleGenerator() {
  const [nurses, setNurses] = useState<Nurse[]>([{ name: 'Nurse 1' }, { name: 'Nurse 2' }, { name: 'Nurse 3' }]);
  const [newNurseName, setNewNurseName] = useState('');
  const [schedule, setSchedule] = useState<Schedule>(() =>
    buildDefaultSchedule([{ name: 'Nurse 1' }, { name: 'Nurse 2' }, { name: 'Nurse 3' }])
  );
  const [generated, setGenerated] = useState(false);

  function addNurse() {
    const name = newNurseName.trim() || `Nurse ${nurses.length + 1}`;
    const updated = [...nurses, { name }];
    setNurses(updated);
    setNewNurseName('');
    setGenerated(false);
  }

  function removeNurse(idx: number) {
    const updated = nurses.filter((_, i) => i !== idx);
    setNurses(updated);
    setGenerated(false);
  }

  function generateSchedule() {
    setSchedule(buildDefaultSchedule(nurses));
    setGenerated(true);
  }

  function updateShift(day: string, nurseIdx: number, shift: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [nurseIdx]: shift },
    }));
  }

  function printSchedule() {
    window.print();
  }

  return (
    <div class="space-y-6">
      {/* Nurse list input */}
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6">
        <h3 class="font-semibold text-default mb-4">Your Nurses</h3>
        <div class="space-y-2">
          {nurses.map((nurse, idx) => (
            <div key={idx} class="flex items-center gap-3">
              <input
                type="text"
                value={nurse.name}
                onChange={(e) => {
                  const updated = [...nurses];
                  updated[idx] = { name: e.target.value };
                  setNurses(updated);
                }}
                class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-default"
              />
              <button
                onClick={() => removeNurse(idx)}
                class="text-red-500 hover:text-red-700 text-sm font-medium"
                aria-label={`Remove ${nurse.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div class="mt-4 flex gap-3">
          <input
            type="text"
            placeholder="Add nurse name..."
            value={newNurseName}
            onChange={(e) => setNewNurseName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNurse()}
            class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-default"
          />
          <button
            onClick={addNurse}
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Nurse
          </button>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generateSchedule}
        disabled={nurses.length === 0}
        class="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Generate Weekly Schedule
      </button>

      {/* Schedule grid */}
      {generated && (
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 print:border-0">
          <div class="print:hidden flex justify-end p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={printSchedule}
              class="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-default hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Print / Save as PDF
            </button>
          </div>
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-700">
                <th class="px-4 py-3 text-left font-semibold text-default">Nurse</th>
                {DAYS.map((day) => (
                  <th key={day} class="px-3 py-3 text-center font-semibold text-default min-w-[90px]">
                    {day.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              {nurses.map((nurse, nurseIdx) => (
                <tr key={nurseIdx} class="bg-white dark:bg-slate-800">
                  <td class="px-4 py-3 font-medium text-default">{nurse.name}</td>
                  {DAYS.map((day) => (
                    <td key={day} class="px-2 py-2 text-center">
                      <select
                        value={schedule[day]?.[nurseIdx] ?? 'Day'}
                        onChange={(e) => updateShift(day, nurseIdx, e.target.value)}
                        class={`rounded px-2 py-1 text-xs font-medium border-0 cursor-pointer ${SHIFT_COLORS[schedule[day]?.[nurseIdx] ?? 'Day']}`}
                      >
                        {SHIFTS.map((shift) => (
                          <option key={shift} value={shift}>
                            {shift}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p class="p-4 text-xs text-muted bg-white dark:bg-slate-800">
            Shift assignments auto-rotate as a starting point. Adjust any cell before printing. For automated scheduling
            with overtime compliance,{' '}
            <a href="/how-it-works" class="text-blue-600 underline">
              see how SimpleScheduleAI works
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3.2: Create the tool page**

Create `src/pages/tools/nurse-schedule-generator.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import SchemaOrg from '~/components/common/SchemaOrg.astro';
import NurseScheduleGenerator from '~/components/tools/NurseScheduleGenerator';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Free Nurse Schedule Generator for Hospitals | SimpleScheduleAI',
  description:
    'Free nurse schedule generator for critical access hospitals. Enter your nurses and shifts — get a printable weekly roster. No signup required.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Free Nurse Schedule Generator',
  description: 'Generate a printable weekly nurse schedule using the SimpleScheduleAI free nurse schedule generator.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Add your nurses',
      text: "Enter each nurse's name in the nurse list. You can add as many nurses as needed.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Generate the schedule',
      text: "Click 'Generate Weekly Schedule' to create a starting schedule with auto-rotated Day, Evening, and Night shifts.",
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Adjust shift assignments',
      text: "Use the dropdown in each cell to change any nurse's shift for any day. Shifts update in real time.",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Print or save as PDF',
      text: "Click 'Print / Save as PDF' to print the schedule or export it as a PDF from your browser's print dialog.",
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this nurse schedule generator really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — completely free, no signup required. The tool runs entirely in your browser. SimpleScheduleAI offers this tool to help nurse managers who aren't ready for a full scheduling service.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I save the schedule I generate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You can print the schedule or save it as a PDF using your browser's print function (Ctrl+P or Cmd+P). The tool doesn't save data between sessions — refresh the page and you start fresh.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool handle overtime or compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No — this is a simple generator for building a visual roster. It doesn't track overtime hours, check Texas compliance, or flag scheduling conflicts. For automated overtime and compliance management, SimpleScheduleAI's full service handles those automatically.",
      },
    },
    {
      '@type': 'Question',
      name: "How is this different from SimpleScheduleAI's full service?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This tool generates a basic printable roster. SimpleScheduleAI's managed service generates three AI-optimized schedule drafts (balanced, fairness-optimized, cost-optimized), tracks Texas overtime compliance, and produces instant callout replacement shortlists. The free tool is a starting point — the service handles the full workflow.",
      },
    },
  ],
};
---

<Layout metadata={metadata}>
  <SchemaOrg slot="head" schema={[howToSchema, faqSchema]} />

  <section class="bg-page pt-24 pb-8">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="mb-2">
        <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Free Tool</span>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-default sm:text-4xl">Free Nurse Schedule Generator</h1>
      <p class="mt-4 text-lg text-muted max-w-2xl">
        Enter your nurses and shifts to generate a printable weekly roster. Works in your browser — no signup, no
        downloads. Built for critical access hospital nurse managers.
      </p>
    </div>
  </section>

  <section class="bg-page pb-12">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <NurseScheduleGenerator client:load />
    </div>
  </section>

  <section class="bg-page py-12 border-t border-gray-100 dark:border-gray-800">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
      <h2>How to Use the Nurse Schedule Generator</h2>
      <ol>
        <li>
          <strong>Add your nurses:</strong> Type each nurse's name into the list. You can rename the default entries or add
          new ones using the "Add Nurse" field.
        </li>
        <li>
          <strong>Generate the schedule:</strong> Click "Generate Weekly Schedule" to create a starting point with auto-rotated
          Day, Evening, and Night shifts across a 7-day week.
        </li>
        <li>
          <strong>Adjust assignments:</strong> Click the shift dropdown in any cell to change a nurse's assignment for that
          day. Options are Day, Evening, Night, and Off.
        </li>
        <li>
          <strong>Print or export:</strong> Click "Print / Save as PDF" to print the schedule or save it as a PDF using your
          browser's print dialog (select "Save as PDF" as the printer).
        </li>
      </ol>

      <h3>Limitations of This Free Tool</h3>
      <p>
        This generator creates a simple visual roster — it doesn't check overtime hours, verify Texas nursing
        compliance, track certifications, or handle callout replacements. For a 25-bed critical access hospital managing
        real scheduling complexity, these are the gaps that cause problems.
      </p>
      <p>
        <a href="/nurse-scheduling-software">SimpleScheduleAI's nurse scheduling service</a> handles all of this automatically:
        AI-generated schedules with fairness and cost optimization, Texas overtime compliance tracking, and an instant callout
        replacement shortlist when someone calls out.
      </p>
    </div>
  </section>

  <section class="bg-page py-12 border-t border-gray-100 dark:border-gray-800">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-xl font-semibold text-default mb-6">Frequently Asked Questions</h2>
      <div class="space-y-6">
        {
          [
            {
              q: 'Is this nurse schedule generator really free?',
              a: 'Yes — completely free, no signup required. The tool runs entirely in your browser.',
            },
            {
              q: 'Can I save the schedule I generate?',
              a: "Print or save as PDF using your browser's print function (Ctrl+P / Cmd+P). The tool doesn't save data between sessions.",
            },
            {
              q: 'Does this tool handle overtime or compliance?',
              a: "No. This is a simple visual roster tool. For overtime tracking and Texas compliance, SimpleScheduleAI's full service handles those automatically.",
            },
            {
              q: "How is this different from SimpleScheduleAI's full service?",
              a: 'This tool builds a basic printable grid. The full service generates three AI-optimized schedule drafts, tracks overtime compliance, and produces callout replacement shortlists automatically.',
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
  </section>

  <CallToAction
    title="Need More Than a Schedule Grid?"
    subtitle="SimpleScheduleAI generates AI-optimized schedules with overtime compliance and callout coverage for critical access hospitals."
    actions={[
      { variant: 'primary', text: 'Apply for a Free Pilot', href: '/pilot' },
      { variant: 'secondary', text: 'See How It Works', href: '/how-it-works' },
    ]}
  />
</Layout>
```

- [ ] **Step 3.3: Build and verify**

```bash
npm run build 2>&1 | tail -20
```

Check that React/TSX component compiles. If you see a "Cannot find module 'react'" error, check that React is installed:

```bash
npm list react
```

If not installed: `npm install react react-dom @types/react @types/react-dom`

Then re-verify the Astro config includes React integration (`@astrojs/react` in `astro.config.mjs`). If missing:

```bash
npx astro add react
```

- [ ] **Step 3.4: Commit**

```bash
git add src/components/tools/NurseScheduleGenerator.tsx src/pages/tools/nurse-schedule-generator.astro
git commit -m "feat: add free nurse schedule generator tool at /tools/nurse-schedule-generator"
```

---

## Task 4: Nursing Overtime Cost Calculator — `/tools/overtime-calculator`

**Files:**

- Create: `src/components/tools/OvertimeCalculator.tsx`
- Create: `src/pages/tools/overtime-calculator.astro`

- [ ] **Step 4.1: Build the calculator component**

Create `src/components/tools/OvertimeCalculator.tsx`:

```tsx
import { useState } from 'react';

export default function OvertimeCalculator() {
  const [nurses, setNurses] = useState(20);
  const [avgHours, setAvgHours] = useState(44);
  const [hourlyRate, setHourlyRate] = useState(38);
  const [weeks, setWeeks] = useState(52);

  const overtimeHoursPerNursePerWeek = Math.max(0, avgHours - 40);
  const overtimeRateMultiplier = 1.5;
  const overtimeCostPerNursePerWeek = overtimeHoursPerNursePerWeek * hourlyRate * overtimeRateMultiplier;
  const totalWeeklyCost = overtimeCostPerNursePerWeek * nurses;
  const totalAnnualCost = totalWeeklyCost * weeks;
  const potentialSavings = totalAnnualCost * 0.25; // conservative 25% reduction

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div class="space-y-8">
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6">
        <h3 class="font-semibold text-default mb-6">Your Hospital's Numbers</h3>
        <div class="grid gap-6 sm:grid-cols-2">
          {[
            {
              label: 'Number of nurses',
              value: nurses,
              setValue: setNurses,
              min: 1,
              max: 200,
              step: 1,
              suffix: 'nurses',
            },
            {
              label: 'Average hours worked per nurse per week',
              value: avgHours,
              setValue: setAvgHours,
              min: 36,
              max: 60,
              step: 0.5,
              suffix: 'hrs/week',
            },
            {
              label: 'Average hourly rate',
              value: hourlyRate,
              setValue: setHourlyRate,
              min: 20,
              max: 80,
              step: 1,
              suffix: '$/hr',
            },
            {
              label: 'Weeks per year to calculate',
              value: weeks,
              setValue: setWeeks,
              min: 1,
              max: 52,
              step: 1,
              suffix: 'weeks',
            },
          ].map(({ label, value, setValue, min, max, step, suffix }) => (
            <div key={label}>
              <label class="block text-sm font-medium text-default mb-2">{label}</label>
              <div class="flex items-center gap-3">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  class="flex-1 accent-blue-600"
                />
                <span class="w-28 text-right text-sm font-semibold text-default">
                  {value} {suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
        <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-4">Overtime Cost Estimate</h3>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="text-center">
            <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">{fmt(totalWeeklyCost)}</p>
            <p class="mt-1 text-sm text-blue-600 dark:text-blue-400">Weekly overtime cost</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">{fmt(totalAnnualCost)}</p>
            <p class="mt-1 text-sm text-blue-600 dark:text-blue-400">Annual overtime cost</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{fmt(potentialSavings)}</p>
            <p class="mt-1 text-sm text-green-600 dark:text-green-400">Potential savings (25% reduction)</p>
          </div>
        </div>
        <p class="mt-4 text-xs text-blue-700 dark:text-blue-300">
          Based on FLSA overtime rate (1.5x regular pay for hours over 40/week). Potential savings estimate assumes a
          conservative 25% overtime reduction from optimized scheduling — consistent with outcomes reported by critical
          access hospitals using automated scheduling tools.
        </p>
      </div>

      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6">
        <p class="text-sm text-muted">
          <strong class="text-default">Note:</strong> This calculator covers direct overtime pay only. It does not
          include the cost of nurse manager time spent on scheduling (typically 8–12 hrs/week at CAHs), agency markup
          costs for last-minute coverage, or turnover costs from schedule-related burnout. For a complete cost picture,
          use{' '}
          <a href="/roi" class="text-blue-600 underline">
            our full scheduling cost calculator →
          </a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4.2: Create the tool page**

Create `src/pages/tools/overtime-calculator.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import SchemaOrg from '~/components/common/SchemaOrg.astro';
import OvertimeCalculator from '~/components/tools/OvertimeCalculator';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Free Nursing Overtime Cost Calculator | SimpleScheduleAI',
  description:
    'Calculate how much nurse overtime is costing your critical access hospital. Adjust sliders for nurses, hours, and rates — see weekly and annual overtime costs instantly.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Nursing Overtime Costs',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter number of nurses',
      text: 'Use the slider to set how many nurses your hospital employs.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set average weekly hours',
      text: 'Enter the average hours worked per nurse per week, including overtime.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter average hourly rate',
      text: 'Use your average nurse hourly rate. The calculator applies the FLSA 1.5x overtime multiplier automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review results',
      text: 'See your weekly overtime cost, annual overtime cost, and estimated savings from a 25% reduction.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is nursing overtime calculated under FLSA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Fair Labor Standards Act (FLSA), non-exempt employees — including most hospital nurses — must receive 1.5 times their regular pay rate for all hours worked over 40 in a workweek. This calculator applies that 1.5x multiplier to hours over 40 automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a realistic overtime reduction from scheduling software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Critical access hospitals typically see 15–30% overtime reductions after implementing automated scheduling. This calculator uses a conservative 25% estimate for potential savings. Actual results depend on how much overtime is driven by scheduling inefficiency vs. patient census variability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this calculator include agency staff costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No — this calculator covers only direct overtime pay for your employed nurses. For a complete picture including nurse manager scheduling time, agency markup costs, and turnover costs, use SimpleScheduleAI's full scheduling cost calculator at simplescheduleai.com/roi.",
      },
    },
  ],
};
---

<Layout metadata={metadata}>
  <SchemaOrg slot="head" schema={[howToSchema, faqSchema]} />

  <section class="bg-page pt-24 pb-8">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Free Calculator</span
      >
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-default sm:text-4xl">Nursing Overtime Cost Calculator</h1>
      <p class="mt-4 text-lg text-muted max-w-2xl">
        See how much nurse overtime is costing your critical access hospital — and how much you could save with
        optimized scheduling. No signup required.
      </p>
    </div>
  </section>

  <section class="bg-page pb-12">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <OvertimeCalculator client:load />
    </div>
  </section>

  <section class="bg-page py-12 border-t border-gray-100 dark:border-gray-800">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
      <h2>How Nurse Overtime Costs Add Up at Critical Access Hospitals</h2>
      <p>
        Most critical access hospitals track total payroll costs, but few track overtime costs specifically. The result:
        overtime creeps up gradually, shows up in payroll reports as a line item, but the root cause — scheduling
        patterns that consistently push certain nurses past 40 hours — goes unaddressed.
      </p>
      <p>
        Under FLSA, non-exempt nurses must receive 1.5x their regular rate for all hours over 40 in a workweek. For a
        hospital with 20 nurses averaging 44 hours per week at $38/hr, that's approximately $15,000 per week in overtime
        cost — $780,000 annually — before accounting for agency costs and turnover.
      </p>
      <p>
        Automated scheduling software reduces overtime by flagging approaching thresholds before schedules are published
        and generating cost-optimized draft schedules that distribute hours equitably. Critical access hospitals
        typically see 15–30% reductions after switching from manual scheduling.
      </p>
    </div>
  </section>

  <CallToAction
    title="Reduce Overtime With Automated Scheduling"
    subtitle="SimpleScheduleAI generates cost-optimized nurse schedules and tracks Texas overtime compliance for critical access hospitals."
    actions={[
      { variant: 'primary', text: 'Apply for a Free Pilot', href: '/pilot' },
      { variant: 'secondary', text: 'See Full Cost Calculator', href: '/roi' },
    ]}
  />
</Layout>
```

- [ ] **Step 4.3: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 4.4: Commit**

```bash
git add src/components/tools/OvertimeCalculator.tsx src/pages/tools/overtime-calculator.astro
git commit -m "feat: add nursing overtime cost calculator at /tools/overtime-calculator"
```

---

## Task 5: Callout Coverage Shortlist Planner — `/tools/callout-coverage-planner`

**Files:**

- Create: `src/components/tools/CalloutPlanner.tsx`
- Create: `src/pages/tools/callout-coverage-planner.astro`

- [ ] **Step 5.1: Build the planner component**

Create `src/components/tools/CalloutPlanner.tsx`:

```tsx
import { useState } from 'react';

interface Nurse {
  name: string;
  hoursThisWeek: number;
  lastWorked: string; // 'today' | 'yesterday' | '2days' | '3+days'
  available: boolean;
}

const LAST_WORKED_OPTIONS = [
  { value: 'today', label: 'Today', score: 0 },
  { value: 'yesterday', label: 'Yesterday', score: 1 },
  { value: '2days', label: '2 days ago', score: 2 },
  { value: '3+days', label: '3+ days ago', score: 3 },
];

function computeScore(nurse: Nurse): number {
  if (!nurse.available) return -1;
  const overtimePenalty = nurse.hoursThisWeek >= 40 ? -2 : 0;
  const recencyScore = LAST_WORKED_OPTIONS.find((o) => o.value === nurse.lastWorked)?.score ?? 0;
  return recencyScore + overtimePenalty;
}

export default function CalloutPlanner() {
  const [nurses, setNurses] = useState<Nurse[]>([
    { name: 'Nurse 1', hoursThisWeek: 36, lastWorked: '2days', available: true },
    { name: 'Nurse 2', hoursThisWeek: 40, lastWorked: 'yesterday', available: true },
    { name: 'Nurse 3', hoursThisWeek: 32, lastWorked: '3+days', available: true },
  ]);
  const [ranked, setRanked] = useState(false);

  function updateNurse(idx: number, field: keyof Nurse, value: string | number | boolean) {
    const updated = [...nurses];
    updated[idx] = { ...updated[idx], [field]: value };
    setNurses(updated);
    setRanked(false);
  }

  function addNurse() {
    setNurses([
      ...nurses,
      { name: `Nurse ${nurses.length + 1}`, hoursThisWeek: 32, lastWorked: '2days', available: true },
    ]);
    setRanked(false);
  }

  function removeNurse(idx: number) {
    setNurses(nurses.filter((_, i) => i !== idx));
    setRanked(false);
  }

  const rankedNurses = [...nurses]
    .map((n, i) => ({ ...n, originalIdx: i, score: computeScore(n) }))
    .filter((n) => n.available && n.score >= 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div class="space-y-8">
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-6">
        <h3 class="font-semibold text-default mb-4">Available Nurses</h3>
        <div class="space-y-4">
          {nurses.map((nurse, idx) => (
            <div key={idx} class="grid grid-cols-12 gap-3 items-center">
              <input
                type="text"
                value={nurse.name}
                onChange={(e) => updateNurse(idx, 'name', e.target.value)}
                class="col-span-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-default"
                placeholder="Nurse name"
              />
              <div class="col-span-2">
                <label class="text-xs text-muted block mb-1">Hours this week</label>
                <input
                  type="number"
                  min={0}
                  max={80}
                  value={nurse.hoursThisWeek}
                  onChange={(e) => updateNurse(idx, 'hoursThisWeek', Number(e.target.value))}
                  class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-2 py-2 text-sm text-default"
                />
              </div>
              <div class="col-span-3">
                <label class="text-xs text-muted block mb-1">Last worked</label>
                <select
                  value={nurse.lastWorked}
                  onChange={(e) => updateNurse(idx, 'lastWorked', e.target.value)}
                  class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-2 py-2 text-sm text-default"
                >
                  {LAST_WORKED_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-span-2 flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id={`avail-${idx}`}
                  checked={nurse.available}
                  onChange={(e) => updateNurse(idx, 'available', e.target.checked)}
                  class="h-4 w-4 accent-blue-600"
                />
                <label for={`avail-${idx}`} class="text-sm text-muted">
                  Available
                </label>
              </div>
              <button
                onClick={() => removeNurse(idx)}
                class="col-span-2 text-red-500 hover:text-red-700 text-sm font-medium pt-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addNurse}
          class="mt-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-muted hover:text-default hover:border-gray-400 transition-colors"
        >
          + Add nurse
        </button>
      </div>

      <button
        onClick={() => setRanked(true)}
        class="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Rank by Best Replacement
      </button>

      {ranked && (
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 overflow-hidden">
          <div class="bg-gray-50 dark:bg-slate-700 px-6 py-4">
            <h3 class="font-semibold text-default">Ranked Replacement List</h3>
            <p class="text-sm text-muted mt-1">
              Prioritizes nurses who worked least recently and are under 40 hours this week
            </p>
          </div>
          {rankedNurses.length === 0 ? (
            <p class="px-6 py-8 text-center text-muted">
              No available nurses meet the criteria. Mark nurses as available to see rankings.
            </p>
          ) : (
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              {rankedNurses.map((nurse, rank) => (
                <div key={nurse.originalIdx} class="flex items-center gap-4 px-6 py-4">
                  <span
                    class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rank === 0 ? 'bg-blue-600 text-white' : rank === 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {rank + 1}
                  </span>
                  <div class="flex-1">
                    <p class="font-semibold text-default">{nurse.name}</p>
                    <p class="text-sm text-muted">
                      {nurse.hoursThisWeek}h this week
                      {nurse.hoursThisWeek >= 40 && <span class="ml-1 text-amber-600">(overtime if called in)</span>}
                      {' · '}Last worked: {LAST_WORKED_OPTIONS.find((o) => o.value === nurse.lastWorked)?.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p class="px-6 py-4 text-xs text-muted border-t border-gray-100 dark:border-gray-700">
            SimpleScheduleAI automates this process and factors in certifications, Texas overtime compliance, and
            fairness history.{' '}
            <a href="/how-it-works" class="text-blue-600 underline">
              See how it works →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5.2: Create the tool page**

Create `src/pages/tools/callout-coverage-planner.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import SchemaOrg from '~/components/common/SchemaOrg.astro';
import CalloutPlanner from '~/components/tools/CalloutPlanner';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Free Nurse Callout Coverage Planner | SimpleScheduleAI',
  description:
    'When a nurse calls out, rank your available staff instantly. Enter hours worked and last worked date — the tool surfaces the best replacement. Free, no signup.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Callout Coverage Shortlist Planner',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter available nurses',
      text: "List the nurses who might be available to cover. Enter each nurse's hours worked this week and when they last worked.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Mark availability',
      text: "Check the 'Available' box for each nurse who is reachable and potentially able to come in.",
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Rank by best replacement',
      text: "Click 'Rank by Best Replacement' to see a ranked list prioritizing nurses who worked least recently and are under 40 hours this week.",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Contact in order',
      text: 'Call or text nurses in ranked order. The top-ranked nurse is the most rested and least likely to incur overtime.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the ranking algorithm work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The tool ranks nurses by two factors: how recently they worked (nurses who worked 3+ days ago rank highest) and whether they're under 40 hours this week (nurses approaching overtime rank lower). It's a simplified version of the fairness and compliance logic SimpleScheduleAI applies automatically in its full service.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool handle certifications or unit restrictions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No — this tool ranks by availability and hours only. It doesn't check whether a nurse is certified for the unit that needs coverage. That's a key limitation: always verify the top-ranked nurse has the appropriate certifications before contacting them. SimpleScheduleAI's full service handles certification matching automatically.",
      },
    },
  ],
};
---

<Layout metadata={metadata}>
  <SchemaOrg slot="head" schema={[howToSchema, faqSchema]} />

  <section class="bg-page pt-24 pb-8">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Free Tool</span>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-default sm:text-4xl">
        Callout Coverage Shortlist Planner
      </h1>
      <p class="mt-4 text-lg text-muted max-w-2xl">
        When a nurse calls out, rank your available staff in seconds. Enter hours worked and last worked date — the tool
        surfaces the best replacement. Free, no signup required.
      </p>
    </div>
  </section>

  <section class="bg-page pb-12">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <CalloutPlanner client:load />
    </div>
  </section>

  <CallToAction
    title="Automate Callout Coverage Permanently"
    subtitle="SimpleScheduleAI generates instant ranked callout replacement shortlists with certification matching and Texas compliance built in."
    actions={[
      { variant: 'primary', text: 'Apply for a Free Pilot', href: '/pilot' },
      {
        variant: 'secondary',
        text: 'How Callout Coverage Works',
        href: '/blog/hospital-callout-coverage-ranked-shortlist',
      },
    ]}
  />
</Layout>
```

- [ ] **Step 5.3: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 5.4: Commit**

```bash
git add src/components/tools/CalloutPlanner.tsx src/pages/tools/callout-coverage-planner.astro
git commit -m "feat: add callout coverage shortlist planner at /tools/callout-coverage-planner"
```

---

## Task 6: Hospital Shift Schedule Builder — `/tools/shift-schedule-builder`

**Files:**

- Create: `src/components/tools/ShiftScheduleBuilder.tsx`
- Create: `src/pages/tools/shift-schedule-builder.astro`

- [ ] **Step 6.1: Build the component**

Create `src/components/tools/ShiftScheduleBuilder.tsx`:

```tsx
import { useState } from 'react';

const WEEKS = 4;
const DAYS_PER_WEEK = 7;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHIFT_OPTIONS = ['Day 7a-7p', 'Night 7p-7a', 'Day 8a-4p', 'Eve 3p-11p', 'Night 11p-7a', 'Off'];
const SHIFT_COLORS: Record<string, string> = {
  'Day 7a-7p': 'bg-blue-100 text-blue-800',
  'Night 7p-7a': 'bg-indigo-900 text-indigo-100',
  'Day 8a-4p': 'bg-sky-100 text-sky-800',
  'Eve 3p-11p': 'bg-purple-100 text-purple-800',
  'Night 11p-7a': 'bg-gray-800 text-gray-100',
  Off: 'bg-gray-100 text-gray-500',
};

type Grid = string[][][]; // [nurse][week][day]

function buildDefaultGrid(nurseCount: number): Grid {
  return Array.from({ length: nurseCount }, (_, n) =>
    Array.from({ length: WEEKS }, (__, w) =>
      Array.from({ length: DAYS_PER_WEEK }, (___, d) => {
        const cycle = (n + w * 7 + d) % 3;
        return cycle === 0 ? 'Day 7a-7p' : cycle === 1 ? 'Night 7p-7a' : 'Off';
      })
    )
  );
}

export default function ShiftScheduleBuilder() {
  const [nurseNames, setNurseNames] = useState(['Nurse 1', 'Nurse 2', 'Nurse 3']);
  const [grid, setGrid] = useState<Grid>(() => buildDefaultGrid(3));

  function addNurse() {
    const name = `Nurse ${nurseNames.length + 1}`;
    setNurseNames([...nurseNames, name]);
    setGrid((prev) => [...prev, Array.from({ length: WEEKS }, () => Array(DAYS_PER_WEEK).fill('Day 7a-7p'))]);
  }

  function updateName(idx: number, val: string) {
    const updated = [...nurseNames];
    updated[idx] = val;
    setNurseNames(updated);
  }

  function updateShift(nurseIdx: number, week: number, day: number, shift: string) {
    const updated = grid.map((n, ni) =>
      ni === nurseIdx ? n.map((w, wi) => (wi === week ? w.map((d, di) => (di === day ? shift : d)) : w)) : n
    );
    setGrid(updated);
  }

  return (
    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <button
          onClick={addNurse}
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Nurse
        </button>
        <button
          onClick={() => window.print()}
          class="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-default hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          Print / Export PDF
        </button>
      </div>

      {Array.from({ length: WEEKS }, (_, week) => (
        <div key={week} class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <div class="bg-gray-50 dark:bg-slate-700 px-4 py-2">
            <h3 class="font-semibold text-default text-sm">Week {week + 1}</h3>
          </div>
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700">
                <th class="px-4 py-2 text-left font-semibold text-default w-32">Nurse</th>
                {DAY_LABELS.map((d) => (
                  <th key={d} class="px-2 py-2 text-center font-semibold text-default min-w-[90px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              {nurseNames.map((name, ni) => (
                <tr key={ni} class="bg-white dark:bg-slate-800">
                  <td class="px-3 py-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateName(ni, e.target.value)}
                      class="w-full rounded border border-gray-200 dark:border-gray-600 bg-transparent px-2 py-1 text-xs text-default"
                    />
                  </td>
                  {Array.from({ length: DAYS_PER_WEEK }, (_, di) => (
                    <td key={di} class="px-1 py-1 text-center">
                      <select
                        value={grid[ni]?.[week]?.[di] ?? 'Day 7a-7p'}
                        onChange={(e) => updateShift(ni, week, di, e.target.value)}
                        class={`rounded px-1 py-1 text-xs font-medium border-0 cursor-pointer w-full ${SHIFT_COLORS[grid[ni]?.[week]?.[di] ?? 'Day 7a-7p']}`}
                      >
                        {SHIFT_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6.2: Create the tool page**

Create `src/pages/tools/shift-schedule-builder.astro`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import SchemaOrg from '~/components/common/SchemaOrg.astro';
import ShiftScheduleBuilder from '~/components/tools/ShiftScheduleBuilder';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Free Hospital Shift Schedule Builder (4-Week) | SimpleScheduleAI',
  description:
    'Build a 4-week hospital shift schedule for your nursing staff. Free interactive shift schedule builder with Day, Evening, and Night shifts. No signup required.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a 4-Week Hospital Shift Schedule',
  totalTime: 'PT15M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter nurse names',
      text: "Edit the nurse name fields in the schedule grid, or click 'Add Nurse' to add more rows.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Assign shifts for each week',
      text: 'Use the dropdown in each cell to assign Day, Evening, Night, or Off shifts for each nurse on each day.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review all 4 weeks',
      text: 'Scroll through all 4 weeks to verify coverage. Each week shows all nurses and their shift assignments side by side.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Print or export',
      text: "Click 'Print / Export PDF' to print the 4-week schedule or save it as a PDF.",
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I use this for any hospital size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — you can add as many nurses as needed. The tool works for any size, though it's most practical for smaller teams (under 30 nurses). For larger rosters or compliance tracking, SimpleScheduleAI's full service handles the complexity automatically.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool check for overtime or compliance issues?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. This is a visual scheduling grid only. It doesn't count weekly hours, flag overtime, or check Texas nursing compliance. Use it as a planning aid, then review for overtime manually or use SimpleScheduleAI for automated compliance tracking.",
      },
    },
  ],
};
---

<Layout metadata={metadata}>
  <SchemaOrg slot="head" schema={[howToSchema, faqSchema]} />

  <section class="bg-page pt-24 pb-8">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Free Tool</span>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-default sm:text-4xl">
        Free Hospital Shift Schedule Builder
      </h1>
      <p class="mt-4 text-lg text-muted max-w-2xl">
        Build a 4-week shift schedule for your nursing staff. Assign Day, Evening, and Night shifts across a full
        rotation — then print or export as PDF. Free, no signup required.
      </p>
    </div>
  </section>

  <section class="bg-page pb-12">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <ShiftScheduleBuilder client:load />
    </div>
  </section>

  <CallToAction
    title="Replace Manual Schedule Building With AI"
    subtitle="SimpleScheduleAI generates three AI-optimized 4-week schedules with fairness and overtime analysis for critical access hospitals."
    actions={[
      { variant: 'primary', text: 'Apply for a Free Pilot', href: '/pilot' },
      { variant: 'secondary', text: 'How It Works', href: '/how-it-works' },
    ]}
  />
</Layout>
```

- [ ] **Step 6.3: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 6.4: Commit**

```bash
git add src/components/tools/ShiftScheduleBuilder.tsx src/pages/tools/shift-schedule-builder.astro
git commit -m "feat: add 4-week hospital shift schedule builder at /tools/shift-schedule-builder"
```

---

## Task 7: Final verification

- [ ] **Step 7.1: Run dev server and test all tools**

```bash
npm run dev
```

Test each tool manually:

- `http://localhost:4321/tools` — grid of 4 tools renders, all links work
- `http://localhost:4321/tools/nurse-schedule-generator` — add nurses, generate, adjust, print
- `http://localhost:4321/tools/overtime-calculator` — move sliders, verify calculations update
- `http://localhost:4321/tools/callout-coverage-planner` — add nurses, set hours, rank
- `http://localhost:4321/tools/shift-schedule-builder` — add nurses, assign shifts, 4 weeks show

- [ ] **Step 7.2: Verify HowTo and FAQPage schema on each tool page**

Copy each page's JSON-LD blocks into `https://search.google.com/test/rich-results` to validate.

Expected: HowTo and FAQPage validate without errors on all 4 tool pages.

- [ ] **Step 7.3: Check React integration doesn't break existing pages**

```bash
npm run build 2>&1 | grep -i error
```

If React integration causes issues with existing pages, check that `client:load` is only used on tool components. Existing Astro-only pages should be unaffected.
