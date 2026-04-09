---
draft: true
publishDate: 2026-04-09T00:00:00Z
updateDate: 2026-04-09T00:00:00Z
author: 'Pradeep Pandey'
title: 'UKG Is Too Complex for Small Hospitals: What to Use Instead'
excerpt: >
  UKG (formerly Kronos) requires a 6-12 month implementation, dedicated IT and HRIS staff,
  and a $150,000-$500,000 implementation budget. These requirements exist for a reason:
  UKG is built for large health systems. For a 25-bed Critical Access Hospital, those
  requirements represent a system the facility cannot operate. Here is what actually works
  at CAH scale.
image: https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
category: Healthcare Operations
tags:
  - ukg-alternatives
  - kronos-alternatives
  - small-hospital-scheduling
  - critical-access-hospitals
metadata:
  canonical: 'https://simplescheduleai.com/blog/ukg-too-complex-small-hospital'
---

## Key Takeaways

- UKG is a genuinely capable workforce management system. It is designed for large health systems with IT departments, dedicated HRIS staff, and 6-12 month implementation timelines. None of those resources exist at a typical Critical Access Hospital (CAH).
- The problem with UKG at a CAH is not the cost. It is the operational overhead required to use it correctly. Certification constraints drift. Overtime rules miscalculate. CMS documentation requires manual assembly. The nurse manager ends up doing manual verification on top of a system they cannot trust.
- The alternatives built for CAH scale are Aladtec (self-serve, configurable), SmartLinx (mid-market, healthcare-specific), and SimpleScheduleAI (managed service, zero IT required).
- The right framing is not "is UKG too expensive?" It is: "is the complexity proportional to the value your facility will actually extract?" At a 25-bed hospital with 18-25 nursing staff, it almost never is.
- For CAHs currently on UKG through a health system contract, the path off may be constrained by contract terms. Evaluate early termination fees and parallel-run options before switching.

## Table of Contents

- [Why UKG Fails at Small Hospital Scale](#why-ukg-fails-at-small-hospital-scale)
- [What UKG Complexity Looks Like in Practice at a CAH](#what-ukg-complexity-looks-like-in-practice-at-a-cah)
- [The Complexity-to-Value Gap](#the-complexity-to-value-gap)
- [What Works at CAH Scale](#what-works-at-cah-scale)
  - [Aladtec (TCP Scheduling)](#aladtec-tcp-scheduling)
  - [SmartLinx](#smartlinx)
  - [SimpleScheduleAI](#simplescheduleai)
- [Frequently Asked Questions](#frequently-asked-questions)

UKG (formerly Kronos) is the most deployed workforce management system in large hospital networks. If your CAH is affiliated with a regional health system, you may have been included in an enterprise UKG contract and told the system is "already set up." In practice, what that usually means is: the system was configured for the health system's workflows, partially adapted for the CAH's context, and handed to the nurse manager to operate with minimal training.

The result is a tool with enterprise complexity and CAH-scale support.

## Why UKG Fails at Small Hospital Scale

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 290" role="img" aria-label="Four reasons UKG creates problems at a 25-bed Critical Access Hospital">
  <title>Why UKG Fails at CAH Scale: Four Structural Reasons</title>
  <rect width="720" height="290" fill="#f8fafc" rx="10"/>
  <text x="360" y="28" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#0f172a" text-anchor="middle">Four Reasons UKG Creates Problems at a 25-Bed CAH</text>
  <rect x="30" y="48" width="153" height="220" fill="white" rx="8" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="30" y="48" width="153" height="38" fill="#dc2626" rx="8"/>
  <rect x="30" y="78" width="153" height="8" fill="#dc2626"/>
  <text x="107" y="70" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle">IT Requirement</text>
  <text x="107" y="106" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Server config, SSO setup,</text>
  <text x="107" y="120" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">EHR and payroll integration.</text>
  <text x="107" y="144" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">CAHs typically have a</text>
  <text x="107" y="158" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">part-time IT contractor.</text>
  <text x="107" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">Not equipped for this.</text>
  <rect x="193" y="48" width="153" height="220" fill="white" rx="8" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="193" y="48" width="153" height="38" fill="#d97706" rx="8"/>
  <rect x="193" y="78" width="153" height="8" fill="#d97706"/>
  <text x="270" y="70" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle">Implementation Time</text>
  <text x="270" y="106" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">6-12 months from contract</text>
  <text x="270" y="120" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">to first live schedule.</text>
  <text x="270" y="144" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">A CAH in acute scheduling</text>
  <text x="270" y="158" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">distress cannot wait</text>
  <text x="270" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">6 months.</text>
  <rect x="356" y="48" width="153" height="220" fill="white" rx="8" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="356" y="48" width="153" height="38" fill="#7c3aed" rx="8"/>
  <rect x="356" y="78" width="153" height="8" fill="#7c3aed"/>
  <text x="433" y="70" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle">Implementation Cost</text>
  <text x="433" y="106" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">$150,000-$500,000</text>
  <text x="433" y="120" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">before licensing fees.</text>
  <text x="433" y="144" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">ROI works at a 500-bed</text>
  <text x="433" y="158" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">system. Rarely at a</text>
  <text x="433" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">25-bed CAH.</text>
  <rect x="519" y="48" width="171" height="220" fill="white" rx="8" stroke="#fca5a5" stroke-width="1.5"/>
  <rect x="519" y="48" width="171" height="38" fill="#1e40af" rx="8"/>
  <rect x="519" y="78" width="171" height="8" fill="#1e40af"/>
  <text x="605" y="70" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle">Ongoing Overhead</text>
  <text x="605" y="106" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">OT rules, unit requirements,</text>
  <text x="605" y="120" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">cert constraints all require</text>
  <text x="605" y="134" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">ongoing configuration.</text>
  <text x="605" y="158" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">Large hospitals have a</text>
  <text x="605" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">WFM analyst. CAHs</text>
  <text x="605" y="186" font-family="system-ui,sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">have the nurse manager.</text>
</svg>

**The IT requirement.** UKG implementations require server-side configuration, SSO setup, integration with EHR and payroll systems, and ongoing technical maintenance. Expert reviews consistently describe the need for "advanced IT/HRIS expertise" to implement and run correctly. A CAH with a part-time IT contractor and no dedicated HRIS staff is not set up to do this.

**The implementation timeline.** UKG implementations at hospital scale run 6-12 months from contract to first operational schedule. During that period, the facility is either running scheduling manually or paying for a system it cannot yet use.

**The budget.** Implementation costs typically run $150,000-$500,000 before licensing. The ROI calculation that justifies this investment works at a 500-bed system where labor represents tens of millions of dollars annually. At a 25-bed CAH with $400,000-$600,000 in nursing labor, the math rarely works.

**The operational overhead.** Even after a successful implementation, UKG requires ongoing configuration management. Overtime rules, unit staffing requirements, and certification constraints must be kept current. At a large hospital, a workforce management analyst handles this. At a CAH, it falls to the nurse manager on top of her clinical and supervisory responsibilities.

## What UKG Complexity Looks Like in Practice at a CAH

The typical CAH-on-UKG scenario follows a pattern. A regional health system negotiates an enterprise UKG contract. The CAH is affiliated with the system and gets included. Implementation is handled by the system's IT department with limited input from the CAH's nurse manager. The system goes live. The nurse manager is trained on the interface but not on configuration.

Over time:

- Certification constraints that were set up during implementation drift as staff changes occur, because the nurse manager does not know how to update them
- Overtime rules that were configured for the health system's standard workweek do not match the CAH's payroll cycle, causing systematic overtime miscalculation
- Reports built for system-level workforce analytics are not useful for a 15-nurse operation
- The nurse manager spends time navigating UKG's interface to accomplish tasks that should take minutes

The system is nominally operational, but the nurse manager is doing manual verification on top of UKG because she does not trust the output.

## The Complexity-to-Value Gap

The right framing is not "is UKG too expensive?" It is: "is the complexity proportional to the value?"

UKG features that are valuable at large hospital scale:

- Multi-facility workforce analytics across thousands of employees
- Payroll integration with complex shift differential rules
- Predictive staffing models for complex unit coverage patterns
- HR analytics for retention and performance management
- Enterprise-wide credential tracking

UKG features that a 25-bed CAH actually uses:

- Shift scheduling
- Basic overtime tracking
- Some credential fields

The complexity required to access the three features you use is the same as the complexity required to access the twenty you do not. The nurse manager at a CAH manages the full UKG operational burden for a fraction of the feature value.

## What Works at CAH Scale

The scheduling requirements for a CAH are not simple. They are just different from enterprise requirements:

- Proactive overtime tracking before schedules publish (FLSA 8-and-80 rule for healthcare employers)
- Certification-unit matching to prevent uncertified assignments
- CMS §485.635 compliant documentation for CAH survey readiness
- Callout coverage logic that applies clinical credential constraints
- Fast implementation without IT infrastructure

These requirements can be met by purpose-built tools at a fraction of UKG's cost and complexity.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 290" role="img" aria-label="CAH scheduling alternatives comparison: Aladtec, SmartLinx, SimpleScheduleAI vs UKG">
  <title>CAH-Scale Alternatives to UKG: Side-by-Side Comparison</title>
  <rect width="720" height="290" fill="#f8fafc" rx="10"/>
  <text x="360" y="28" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#0f172a" text-anchor="middle">CAH-Scale Alternatives to UKG</text>
  <!-- Headers -->
  <rect x="30" y="45" width="100" height="30" fill="#374151" rx="4"/>
  <text x="80" y="63" font-family="system-ui,sans-serif" font-size="11" fill="white" text-anchor="middle" font-weight="600">Dimension</text>
  <rect x="136" y="45" width="133" height="30" fill="#7c3aed" rx="4"/>
  <text x="203" y="63" font-family="system-ui,sans-serif" font-size="11" fill="white" text-anchor="middle" font-weight="600">Aladtec</text>
  <rect x="275" y="45" width="133" height="30" fill="#ea580c" rx="4"/>
  <text x="342" y="63" font-family="system-ui,sans-serif" font-size="11" fill="white" text-anchor="middle" font-weight="600">SmartLinx</text>
  <rect x="414" y="45" width="133" height="30" fill="#1e40af" rx="4"/>
  <text x="481" y="63" font-family="system-ui,sans-serif" font-size="11" fill="white" text-anchor="middle" font-weight="600">SimpleScheduleAI</text>
  <rect x="553" y="45" width="137" height="30" fill="#374151" rx="4"/>
  <text x="622" y="63" font-family="system-ui,sans-serif" font-size="11" fill="white" text-anchor="middle" font-weight="600">UKG</text>
  <!-- Row 1 -->
  <rect x="30" y="80" width="100" height="32" fill="#f1f5f9" rx="3"/>
  <text x="80" y="100" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="600">Launch time</text>
  <rect x="136" y="80" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="203" y="100" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">2-4 weeks</text>
  <rect x="275" y="80" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="342" y="100" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">3-4 months</text>
  <rect x="414" y="80" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="481" y="100" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">48 hours</text>
  <rect x="553" y="80" width="137" height="32" fill="#fee2e2" rx="3" stroke="#fca5a5" stroke-width="1"/>
  <text x="622" y="100" font-family="system-ui,sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">6-12 months</text>
  <!-- Row 2 -->
  <rect x="30" y="117" width="100" height="32" fill="#f1f5f9" rx="3"/>
  <text x="80" y="137" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="600">IT required</text>
  <rect x="136" y="117" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="203" y="137" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Minimal</text>
  <rect x="275" y="117" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="342" y="137" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Moderate</text>
  <rect x="414" y="117" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="481" y="137" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">None</text>
  <rect x="553" y="117" width="137" height="32" fill="#fee2e2" rx="3" stroke="#fca5a5" stroke-width="1"/>
  <text x="622" y="137" font-family="system-ui,sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">Dedicated IT team</text>
  <!-- Row 3 -->
  <rect x="30" y="154" width="100" height="32" fill="#f1f5f9" rx="3"/>
  <text x="80" y="174" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="600">CMS docs</text>
  <rect x="136" y="154" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="203" y="174" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Manual config</text>
  <rect x="275" y="154" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="342" y="174" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Configurable</text>
  <rect x="414" y="154" width="133" height="32" fill="#dcfce7" rx="3" stroke="#86efac" stroke-width="1"/>
  <text x="481" y="174" font-family="system-ui,sans-serif" font-size="10" fill="#14532d" text-anchor="middle">Auto-generated</text>
  <rect x="553" y="154" width="137" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="622" y="174" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Configurable</text>
  <!-- Row 4 -->
  <rect x="30" y="191" width="100" height="32" fill="#f1f5f9" rx="3"/>
  <text x="80" y="211" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="600">Best for</text>
  <rect x="136" y="191" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="203" y="207" font-family="system-ui,sans-serif" font-size="9" fill="#374151" text-anchor="middle">Multi-dept,</text>
  <text x="203" y="219" font-family="system-ui,sans-serif" font-size="9" fill="#374151" text-anchor="middle">self-serve CAH</text>
  <rect x="275" y="191" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="342" y="207" font-family="system-ui,sans-serif" font-size="9" fill="#374151" text-anchor="middle">Mid-size hospital</text>
  <text x="342" y="219" font-family="system-ui,sans-serif" font-size="9" fill="#374151" text-anchor="middle">with IT support</text>
  <rect x="414" y="191" width="133" height="32" fill="#dcfce7" rx="3" stroke="#86efac" stroke-width="1"/>
  <text x="481" y="207" font-family="system-ui,sans-serif" font-size="9" fill="#14532d" text-anchor="middle">CAH, no IT,</text>
  <text x="481" y="219" font-family="system-ui,sans-serif" font-size="9" fill="#14532d" text-anchor="middle">NM on clinical shifts</text>
  <rect x="553" y="191" width="137" height="32" fill="#fee2e2" rx="3" stroke="#fca5a5" stroke-width="1"/>
  <text x="622" y="207" font-family="system-ui,sans-serif" font-size="9" fill="#991b1b" text-anchor="middle">Large health systems</text>
  <text x="622" y="219" font-family="system-ui,sans-serif" font-size="9" fill="#991b1b" text-anchor="middle">(500+ staff)</text>
  <!-- Row 5 pricing -->
  <rect x="30" y="228" width="100" height="32" fill="#f1f5f9" rx="3"/>
  <text x="80" y="248" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle" font-weight="600">Pricing</text>
  <rect x="136" y="228" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="203" y="248" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Contact for pricing</text>
  <rect x="275" y="228" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="342" y="248" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Contact for pricing</text>
  <rect x="414" y="228" width="133" height="32" fill="white" rx="3" stroke="#e2e8f0" stroke-width="1"/>
  <text x="481" y="248" font-family="system-ui,sans-serif" font-size="10" fill="#374151" text-anchor="middle">Contact for pricing</text>
  <rect x="553" y="228" width="137" height="32" fill="#fee2e2" rx="3" stroke="#fca5a5" stroke-width="1"/>
  <text x="622" y="248" font-family="system-ui,sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">Enterprise pricing</text>
</svg>

### Aladtec (TCP Scheduling)

Aladtec (branded as TCP Scheduling Software by its parent company TCP) is the most widely deployed scheduling platform in critical access hospitals and EMS settings. Setup runs 2-4 weeks with minimal IT involvement.

The trade-off: Aladtec is a self-serve platform. The nurse manager configures and operates it. This is dramatically less complex than UKG, but the operational burden on the nurse manager does not disappear. It is simply smaller. Credential tracking, overtime rule configuration, and CMS documentation require manual setup and maintenance.

Best for: CAHs where the nurse manager or administrator has time to configure and maintain the scheduling system. Not appropriate for a dual-role nurse manager with no scheduling bandwidth.

### SmartLinx

SmartLinx is a workforce management platform designed for mid-size healthcare organizations. It has stronger credential enforcement and compliance logic than Aladtec but requires IT involvement for initial configuration. Implementation runs 3-4 months.

Best for: Hospitals (50-200 beds) with an IT team available to configure and maintain scheduling rules. Not appropriate for a CAH without dedicated IT support.

### SimpleScheduleAI

SimpleScheduleAI is a managed scheduling service built specifically for critical access hospitals. There is no platform to configure or maintain. The nurse manager uploads a staff roster in Excel format, the first schedule is delivered within 48 hours, and ongoing configuration maintenance is handled by the service team.

FLSA 8-and-80 overtime logic, CMS §485.635 documentation, and charge nurse designation enforcement are built-in defaults. The nurse manager reviews and approves schedules. Weekly scheduling time drops to 1-2 hours.

For a CAH coming off UKG, a managed service is typically the fastest path to operational simplicity. There is no implementation project, no configuration learning curve, and no ongoing IT maintenance burden.

[See how SimpleScheduleAI works for critical access hospitals](/how-it-works)

<div class="not-prose my-10 rounded-xl bg-blue-700 px-8 py-8 text-white">
  <h2 class="mb-2 text-2xl font-bold text-white">Ready to Replace UKG with Something That Fits Your CAH?</h2>
  <p class="mb-6 text-blue-100">
    SimpleScheduleAI delivers your first schedule within 48 hours of your staff roster upload. No IT team, no implementation project, no configuration burden. Schedule a free assessment to see what it looks like for your hospital.
  </p>
  <a
    href="/pilot"
    class="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
  >
    Request a Free Scheduling Assessment
  </a>
</div>

## Frequently Asked Questions

**Is UKG actually used by Critical Access Hospitals?**

Yes, some CAHs are on UKG, usually because a regional health system extended an enterprise contract to affiliated facilities. The UKG implementation was handled at the system level, and the CAH uses a subset of features that were configured for the broader system. The result is often a tool that does not fit the CAH's operational reality but that the facility is contractually locked into.

**What does it cost to switch from UKG to a simpler tool?**

The primary cost is contract termination. Most UKG contracts are multi-year with early termination fees. Check your specific contract terms before switching. The operational cost of transitioning (exporting data, configuring a new system) is modest for a CAH because the roster is small. Running parallel for one scheduling cycle reduces risk. A managed service handles most of the transition work from the new system's side.

**Can UKG be simplified for a small hospital?**

The platform can be configured to use a subset of features, but the underlying complexity does not disappear. The interface still reflects an enterprise tool, the support model is still designed for large accounts, and the configuration overhead is still present whenever changes need to be made. Simplifying UKG usage is not the same as using a tool designed for small hospitals.

**What is the minimum viable scheduling tool for a 25-bed CAH?**

At minimum, a 25-bed CAH needs: proactive FLSA 8-and-80 overtime tracking, credential-based shift constraint enforcement, CMS §485.635 documentation, and a callout coverage process that applies clinical constraints. These requirements can be met by Aladtec or SmartLinx with proper configuration, or by SimpleScheduleAI with zero configuration. They cannot be met by generic scheduling tools.

**Does Aladtec handle FLSA 8-and-80 overtime correctly for healthcare employers?**

Aladtec's default overtime threshold is the standard 40-hour workweek. Healthcare employers using the FLSA 8-and-80 rule need to configure the correct threshold in their Aladtec account. If this configuration is not completed, the system will calculate overtime incorrectly for a healthcare employer. SimpleScheduleAI applies the 8-and-80 rule as a default for healthcare configurations.
