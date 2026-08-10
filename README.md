# Agent Swarms for Predictive Asset Testing

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![AI Framework: Antigravity](https://img.shields.io/badge/AI_Framework-Antigravity_CLI-blue.svg)](https://github.com/SlavaWagner)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

> **Predictive Creative Optimization Prior to Google Ads Launch**  
> Test 400 AI Ad Alternatives with an Agent Swarm of 20 Persona Test Customers before spending budget live on Google Ads.

---

## Overview & Purpose

In traditional SEA and Performance Marketing, finding high-converting winning ad creatives requires launching dozens of unverified variants live on Google Ads and burning thousands of Euros in media spend to gather statistical significance.

**Agent Swarms for Predictive Asset Testing** solves this bottleneck:
1. **Mass Pre-production**: Automatically generates up to 400 cardinal AI ad alternatives (RSA & Performance Max Asset Groups) in advance based on your campaign topic and baseline ad copy.
2. **AI Asset Decision Matrix Scoring**: Applies a 6-dimensional asset vectorization (D1–D6) and scores every ad on 5 orthogonal score axes (Conversion, Audience Fit, Sentiment, Hook Interrupt, Tension Curve) to classify them into **Grades A, B, C, and D**.
3. **20-Agent Persona Swarm Testing**: Dynamically generates a swarm of 20 distinct test customer persona agents in **ENGLISH** tailored specifically to the offer, industry, and target audience derived from the ad creative.
4. **Predictive Performance Projections**: Returns qualitative persona statements alongside proportional estimations for **CTR (%)**, **CPC (€)**, **CPM (€)**, and **Cost per Lead (CPL €)**.

> **No Google Ads API Authentication Required!**  
> You can input your campaign topic, target landing page URL, and baseline ad copy directly via CLI. No API credentials or OAuth setup needed.

---

## Architecture & Core Components

```
 [Campaign Theme / Baseline Copy]
               │
               ▼
 ┌───────────────────────────┐
 │ 1. Mass Pre-production    │ ──► Generates 400 Cardinal AI Ad Alternatives
 └─────────────┬─────────────┘     (Asset-Spine & Unconventional Metaphors)
               │
               ▼
 ┌───────────────────────────┐
 │ 2. AI Asset Decision      │ ──► 6-D Vectorization (D1-D6) & 5 Score Axes
 │    Matrix Scoring         │     Classifies Ads into Grades A, B, C, D
 └─────────────┬─────────────┘
               │
               ▼
 ┌───────────────────────────┐
 │ 3. 20-Agent Persona       │ ──► 20 Dynamic Test Customer Sub-Audiences Evaluate Creatives
 │    Swarm Testing          │     Returns Direct Feedback & Projections in English
 └─────────────┬─────────────┘
               │
               ▼
 [Winner Ad Creatives + Projections (CTR, CPC, CPM, CPL) Ready for Launch!]
```

### 1. Mass Pre-production Engine (`PreproductionAgent`)
- **Asset Spine**: Ensures all headline and description assets follow a cohesive story spin and campaign theme.
- **Unconventional Angles & Metaphors**: Utilizes high-converting positioning frames (*Asset Fortress*, *Asymmetrical Leverage*, *Yield Telescope*, *Paradoxical Anchor*, *Silent Accelerator*) while avoiding tired clichés (e.g. "save time", "reduce stress").
- **Strict Character Limit Enforcement**:
  - *Headlines*: Max 30 characters.
  - *Long Headlines (PMax)*: Max 90 characters.
  - *Descriptions*: Max 90 characters.

### 2. AI Asset Decision Matrix (`DecisionMatrix`)
Vectorizes every creative across **6 Input Dimensions**:
- **D1 – Framework**: `PAS` | `AIDA` | `FAB` | `MVP Pivot` | `Big Five` | `DISG`
- **D2 – Angle**: `ROI Proof` | `Risk Reduction` | `Speed` | `Authority` | `Scarcity` | `Status` | `Unconventional Metaphor`
- **D3 – Lifecycle Stage**: `Lead` | `Prospect` | `SAL` | `Opportunity` | `Customer`
- **D4 – Market Sophistication**: `1 (Broad)` | `2 (Aware)` | `3 (Narrow)`
- **D5 – Hook Type**: `Benefit` | `Proof` | `Urgency` | `Paradox` | `Curiosity` | `Uniqueness`
- **D6 – Sentiment**: `-1.0 ... 0 ... +1.0`

Calculates a weighted composite score:
$$\text{weighted\_score} = 0.35 \cdot \text{conversion} + 0.20 \cdot \text{audience} + 0.15 \cdot \text{hook} + 0.15 \cdot \text{tension} + 0.15 \cdot \text{sentiment}$$

Assigns action-oriented grades:
- **Grade A ($\ge 8.0$)**: PMF Candidate – *Scale Up / Increase Budget*
- **Grade B ($6.5 - 7.9$)**: Test-Worthy – *Generate More Variants*
- **Grade C ($5.0 - 6.4$)**: Marginal – *Test Low Budget Only*
- **Grade D ($< 5.0$)**: Noise – *Kill / Archive*

### 3. The 20-Agent Persona Swarm (`AgentSwarm`)
Dynamically generates 20 test customer personas in **ENGLISH** derived directly from the ad copy, offer, branding/industry, and target audience context.

Whether testing B2B SaaS, Real Estate, Financial Services, or E-Commerce, the 20 Persona Agents adapt dynamically to evaluate ad creatives across key sub-audience archetypes:
1. `SWARM-01`: **Early Tech Adopter (m/28)** – Tech-savvy innovation driver seeking modern tech stack.
2. `SWARM-02`: **Skeptical Auditor (m/54)** – Hyper-critical, risk-averse quality controller demanding proof.
3. `SWARM-03`: **First-Time Buyer (f/32)** – Entry-level customer seeking planning security & clear pricing.
4. `SWARM-04`: **ROI-Driven Investor (m/48)** – Yield & cashflow strategist focused on metrics and ROI.
5. `SWARM-05`: **Cautious Conservative (f/42)** – Security-oriented decision maker requiring proven frameworks.
6. `SWARM-06`: **Legacy Asset Manager (m/39)** – Value preserver looking for seamless execution.
7. `SWARM-07`: **Senior Estate Planner (m/67)** – Generational wealth advisor evaluating long-term protection.
8. `SWARM-08`: **Urban Career Executive (f/35)** – Time-constrained senior manager seeking premium service.
9. `SWARM-09`: **Conservative Wealth Protector (m/61)** – Capital protection specialist focused on stability.
10. `SWARM-10`: **ESG & Sustainability Advocate (f/31)** – Sustainability specialist prioritizing future-proofing.
11. `SWARM-11`: **Value & Deal Hunter (m/44)** – Cost-performance optimizer seeking value leverage.
12. `SWARM-12`: **Commercial Portfolio Scaler (m/52)** – Multi-unit B2B investor evaluating enterprise metrics.
13. `SWARM-13`: **Suburban Relocator (f/37)** – Growth seeker looking for lifestyle and operational upgrade.
14. `SWARM-14`: **Downsizer / Best-Ager (f/64)** – Comfort advocate seeking low-maintenance simplicity.
15. `SWARM-15`: **Growth Tech Entrepreneur (m/33)** – Scaling founder seeking asymmetrical leverage.
16. `SWARM-16`: **Multi-Stakeholder Planner (f/45)** – Organizational planner balancing multi-decision-maker needs.
17. `SWARM-17`: **Passive Income Seeker (m/36)** – Hands-off customer seeking stress-free automated yield.
18. `SWARM-18`: **Prestige & Status Buyer (m/46)** – High-end buyer seeking exclusivity & brand prestige.
19. `SWARM-19`: **Value-Add Specialist (m/41)** – Hands-on growth optimizer looking for equity upside.
20. `SWARM-20`: **Institutional Board Director (f/58)** – Regulated governance officer demanding compliance.

---

## Installation & Getting Started

### 1. Install Globally via Antigravity CLI Ecosystem
```bash
npm install -g agent-swarms-predictive-asset-testing
```

### 2. Clone Repository & Run Locally
```bash
git clone https://github.com/SlavaWagner/agent-swarms-predictive-asset-testing.git
cd agent-swarms-predictive-asset-testing
npm install
```

### 3. Run Verification Test Suite
```bash
npm test
```

---

## CLI Usage & Commands

### 1. Mass Pre-production & 20-Agent Swarm Testing
Generate 400 AI ad alternatives, matrix score them, and run predictive testing with the 20-Agent Swarm:
```bash
agent-swarms-predictive-asset-testing preproduce --theme "Real Estate Lead Gen" --count 400
```
Or use the short alias:
```bash
predictive-asset-testing preproduce -t "B2B SaaS Lead Gen" -k pmax -c 400
```

#### Command Options:
- `-t, --theme <topic>`: Campaign focus theme (Default: `"Real Estate & High-Ticket Lead Gen"`)
- `-k, --track <rsa|pmax>`: Campaign track (`rsa` or `pmax`, Default: `rsa`)
- `-c, --count <number>`: Number of ad alternatives to generate (Default: `400`)
- `-u, --url <url>`: Target landing page URL for scraping context
- `-h, --headlines <list...>`: Existing baseline headlines to evaluate against
- `-d, --descriptions <list...>`: Existing baseline descriptions to evaluate against
- `--no-swarm`: Skip 20-Agent Swarm testing phase

### 2. Standalone 20-Agent Swarm Predictive Testing
Test existing or candidate ad copy directly against the 20 sub-audience personas:
```bash
predictive-asset-testing swarm-test --track rsa
```

### 3. Visual Web Dashboard Server
Launch the interactive web dashboard to view visual matrix scoring tables and agent statements:
```bash
predictive-asset-testing dashboard
```
Open your browser at `http://localhost:8080`.

---

## Example Output

```text
=== Mass AI Ad Pre-production & 20-Agent Swarm Testing ===

Campaign Focus Theme:   Real Estate Lead Gen
Track:                  RSA
Target Quantity:        400 AI Ad Alternatives
Landing Page URL:       https://www.slavawagner.de
20-Agent Swarm Testing: ENABLED

[OK] Generated & Vectorized 400 AI Ad Alternatives!

=== AI ASSET DECISION MATRIX SCORING SUMMARY ===
Grade A (PMF Candidates / Scale Up):   231
Grade B (Test-Worthy / More Variants):  169
Grade C (Marginal / Low-Budget):        0
Grade D (Noise / Kill):                0

=== 20-AGENT DYNAMIC PERSONA SWARM (ENGLISH) ===
Derived Industry:       Real Estate & High-Ticket Investments
Derived Offer:          Asset Fortress | Exclusive PAS Strategy
Target Audience:        High-Net-Worth Investors & Property Buyers
Swarm Language:         ENGLISH (Dynamic Personas)

[WINNER] AD ALTERNATIVE TO LAUNCH: PREPROD-RSA-0016
   Matrix Grade & Score: Grade A (8.02/10)
   Swarm Approval Rate:  100% (20/20 Agents Approved)
   Proportional Metrics Projection:
     - Ø CTR:  7.7%
     - Ø CPC:  €2.90
     - Ø CPM:  €35.36
     - Ø CPL:  €70.70

--- Outtake: Top Agent Statements (Sub-Audiences) ---
• [SWARM-01] Early Tech Adopter (m/28) (Score: 7.1/10):
  "Great approach using the MVP Pivot framework. Clear value proposition and understandable call-to-action."
  [CTR: 6.91% | CPC: €2.66 | CPM: €34.15 | CPL: €69.75]
• [SWARM-03] First-Time Buyer (f/32) (Score: 8.5/10):
  "The story spin 'Transformative Appreciation' directly hits my core priority. This messaging stands out clearly from competitors!"
  [CTR: 8.38% | CPC: €2.94 | CPM: €33.45 | CPL: €65.65]

[OK] Report & Asset Catalog saved persistently to:
  storage/runs/preproduction-report-rsa-2026-08-01.json
```

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

*Created with the help of Google Antigravity CLI*
