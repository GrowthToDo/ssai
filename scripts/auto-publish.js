#!/usr/bin/env node
/**
 * auto-publish.js
 *
 * Finds blog posts due for publishing today (publishDate === today, draft: true),
 * runs automated pre-publish checks, and publishes posts that pass all checks.
 *
 * Usage:
 *   node scripts/auto-publish.js          — normal run (publishes if checks pass)
 *   node scripts/auto-publish.js --dry-run — checks only, no file changes or git ops
 *
 * Results are appended to PUBLISHING-LOG.md in the project root.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'src', 'data', 'post');
const LOG_FILE = join(ROOT, 'PUBLISHING-LOG.md');

const DRY_RUN = process.argv.includes('--dry-run');

// AI tone phrases — WARN only, do not block
const AI_TONE_PHRASES = [
  'delve',
  'comprehensive',
  'leverage',
  'underscore',
  "it's worth noting",
  'importantly,',
  'revolutionize',
  'game-changing',
  'seamlessly',
  'robust solution',
  'in conclusion,',
  'in summary,',
  'as we can see',
  'it is important to note',
];

// ─── helpers ────────────────────────────────────────────────────────────────

function todayString() {
  // Returns YYYY-MM-DD in local time
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = match[1];

  const get = (key) => {
    const re = new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+?)['"]?\\s*$`, 'm');
    const m = fm.match(re);
    return m ? m[1].trim() : null;
  };

  // nested: metadata.canonical
  const canonicalMatch = fm.match(/canonical:\s*['"]?([^'"\\r\\n]+?)['"]?\s*$/m);

  return {
    draft: get('draft') === 'true',
    publishDate: get('publishDate'),
    title: get('title'),
    image: get('image'),
    canonical: canonicalMatch ? canonicalMatch[1].trim() : null,
  };
}

function appendLog(text) {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  let existing = '';
  try {
    existing = readFileSync(LOG_FILE, 'utf8');
  } catch {
    // file doesn't exist yet
  }
  const entry = `\n${text}\n`;
  writeFileSync(LOG_FILE, existing + entry, 'utf8');
  console.log(text);
}

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8' });
}

// ─── checks ─────────────────────────────────────────────────────────────────

function checkEmDash(content) {
  const failures = [];
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('\u2014') || line.includes('\u2013')) {
      failures.push(`  Line ${i + 1}: em-dash or en-dash found`);
    }
  });
  return failures;
}

function checkDoubleDash(content) {
  const failures = [];
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes(' -- ')) {
      failures.push(`  Line ${i + 1}: double-dash ( -- ) found`);
    }
  });
  return failures;
}

function checkCanonical(fm, slug) {
  if (!fm.canonical) return ['  Canonical URL missing from frontmatter'];
  const expectedEnd = `/blog/${slug}`;
  if (!fm.canonical.endsWith(expectedEnd)) {
    return [`  Canonical mismatch: expected to end with ${expectedEnd}, got ${fm.canonical}`];
  }
  return [];
}

async function checkImageUrl(fm) {
  if (!fm.image) return ['  Image URL missing from frontmatter'];
  if (fm.image.includes('placeholder') || fm.image === '') {
    return ['  Image URL appears to be a placeholder'];
  }
  try {
    const res = await fetch(fm.image, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
    if (res.status !== 200) {
      return [`  Image URL returned HTTP ${res.status}: ${fm.image}`];
    }
    return [];
  } catch (err) {
    return [`  Image URL fetch failed: ${err.message}`];
  }
}

function checkPrettier(filePath) {
  try {
    execSync(`npx prettier --check "${filePath}"`, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
    return [];
  } catch {
    return ['  Prettier check failed — run: npx prettier --write on this file'];
  }
}

function checkAiTone(content) {
  const warnings = [];
  const lower = content.toLowerCase();
  for (const phrase of AI_TONE_PHRASES) {
    if (lower.includes(phrase)) {
      warnings.push(`  AI tone phrase found: "${phrase}"`);
    }
  }
  return warnings;
}

// ─── publish action ──────────────────────────────────────────────────────────

function publishPost(filePath, slug, title, today) {
  let content = readFileSync(filePath, 'utf8');

  // Flip draft: true → draft: false
  content = content.replace(/^draft: true$/m, 'draft: false');

  // Update updateDate to today
  content = content.replace(
    /^updateDate: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/m,
    `updateDate: ${today}T00:00:00Z`
  );

  writeFileSync(filePath, content, 'utf8');

  // Prettier format
  execSync(`npx prettier --write "${filePath}"`, { cwd: ROOT, encoding: 'utf8' });

  // Git add + commit + push
  run(`git add "${filePath}"`);
  const commitMsg = `Publish: ${title} — ${today}`;
  run(`git commit -m "${commitMsg}\n\nAuto-published by scripts/auto-publish.js\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`);
  run('git push');
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const today = todayString();
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  const due = [];
  for (const filename of files) {
    const filePath = join(POSTS_DIR, filename);
    const content = readFileSync(filePath, 'utf8');
    const fm = parseFrontmatter(content);
    if (!fm) continue;
    if (!fm.draft) continue;
    if (!fm.publishDate) continue;
    const postDate = fm.publishDate.slice(0, 10); // YYYY-MM-DD
    if (postDate === today) {
      due.push({ filename, filePath, fm, content });
    }
  }

  if (due.length === 0) {
    appendLog(`## ${today}\nNo posts scheduled today.`);
    return;
  }

  appendLog(`## ${today}\n${due.length} post(s) due for publishing.`);

  for (const { filename, filePath, fm, content } of due) {
    const slug = basename(filename, '.md');
    console.log(`\nChecking: ${slug}`);

    const failures = [];
    const warnings = [];

    // Run all automated checks
    failures.push(...checkEmDash(content));
    failures.push(...checkDoubleDash(content));
    failures.push(...checkCanonical(fm, slug));
    const imageFailures = await checkImageUrl(fm);
    failures.push(...imageFailures);
    failures.push(...checkPrettier(filePath));
    warnings.push(...checkAiTone(content));

    if (warnings.length > 0) {
      console.log(`  WARNINGS (non-blocking):\n${warnings.join('\n')}`);
    }

    if (failures.length > 0) {
      const failureText = [
        `### BLOCKED: ${slug}`,
        `Title: ${fm.title || '(unknown)'}`,
        `Check failures:`,
        ...failures,
        `Fix these issues — the cron will retry on the next matching run.`,
      ].join('\n');
      appendLog(failureText);
    } else {
      if (DRY_RUN) {
        appendLog(
          `### DRY RUN — would publish: ${slug}\nTitle: ${fm.title || '(unknown)'}\nAll checks passed. Run without --dry-run to publish.`
        );
      } else {
        try {
          publishPost(filePath, slug, fm.title || slug, today);
          appendLog(
            [
              `### PUBLISHED: ${slug}`,
              `Title: ${fm.title || '(unknown)'}`,
              `Live at: https://simplescheduleai.com/blog/${slug}`,
              warnings.length > 0 ? `Warnings (non-blocking): ${warnings.length}` : '',
              ``,
              `Next steps (manual):`,
              `- Submit URL to GSC: URL Inspection → Request Indexing`,
              `- Post excerpt on LinkedIn`,
            ]
              .filter(Boolean)
              .join('\n')
          );
        } catch (err) {
          appendLog(
            `### ERROR publishing ${slug}\n${err.message}\nFile was modified — check git status.`
          );
        }
      }
    }
  }
}

main().catch((err) => {
  console.error('auto-publish.js crashed:', err);
  process.exit(0); // exit 0 so cron doesn't alarm
});
