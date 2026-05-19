# Directory NAP Consistency Audit

Listings already created by founder. The open work is **not** creating listings, it is making sure every live listing describes the business **byte-identically**. Drift across Capterra/G2/Crunchbase silently weakens the entity signal. This file is the single source of truth to check each listing against.

---

## Canonical block (the truth — every listing must match this)

```
Business name:   SimpleScheduleAI
Website:         https://simplescheduleai.com
Contact email:   hello@simplescheduleai.com
Category:        Nurse scheduling software / Healthcare staff scheduling (managed service)
Founder:         Pradeep Pandey, Co-founder
Founder profile: https://simplescheduleai.com/about/pradeep-pandey
Founder LinkedIn: https://www.linkedin.com/in/pradeep-pandeyji/
Company LinkedIn: https://www.linkedin.com/company/simplescheduleai
Location/market: Texas, United States. Serves Critical Access Hospitals (25 or fewer beds).
One-liner:       AI nurse scheduling delivered as a managed service for Critical
                 Access Hospitals in Texas. No IT team required. Free 60-day pilot.
Long description (<=300 chars):
  SimpleScheduleAI is a managed AI nurse scheduling service built for Critical
  Access Hospitals with 25 or fewer beds. It cuts the 8 to 12 weekly hours nurse
  managers spend on schedules and callouts, with Texas overtime compliance and a
  full audit trail. No IT integration. Free 60-day pilot.
```

---

## Audit pass (per existing listing)

For each live listing, confirm these match the block above. Note any mismatch and fix it on the platform, then tick.

| Listing               | Name | Website | Category | Description | Founder linked | Drift found? → fix |
| --------------------- | ---- | ------- | -------- | ----------- | -------------- | ------------------ |
| Capterra              | [ ]  | [ ]     | [ ]      | [ ]         | n/a            |                    |
| G2                    | [ ]  | [ ]     | [ ]      | [ ]         | n/a            |                    |
| Software Advice       | [ ]  | [ ]     | [ ]      | [ ]         | n/a            |                    |
| GetApp                | [ ]  | [ ]     | [ ]      | [ ]         | n/a            |                    |
| Crunchbase            | [ ]  | [ ]     | n/a      | [ ]         | [ ]            |                    |
| LinkedIn company page | [ ]  | [ ]     | [ ]      | [ ]         | n/a            |                    |
| Product Hunt          | [ ]  | [ ]     | n/a      | [ ]         | [ ]            |                    |

Most common drift: shortened/auto-truncated descriptions, a different category label, missing the "Critical Access Hospitals / 25 or fewer beds" qualifier, or website with/without trailing slash. Fix to match the block exactly.

Optional: paste the live profile URLs into the tracker and an automated fetch-and-diff against this block can be run to produce an exact per-field punch list.
