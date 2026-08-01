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
3. **20-Agent Persona Swarm Testing**: Deploys a swarm of 20 distinct test customer persona agents across diverse sub-audiences (e.g. *Early Adopter*, *Bedenkenträger*, *Erstkäufer*, *Kapitalanleger*, *Erben*, etc.) to evaluate ad creatives prior to launch.
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
 │ 3. 20-Agent Persona       │ ──► 20 Test Customer Sub-Audiences Evaluate Creatives
 │    Swarm Testing          │     Returns O-Ton Feedback & Projections
 └─────────────┬─────────────┘
               │
               ▼
 [Winner Ad Creatives + Projections (CTR, CPC, CPM, CPL) Ready for Launch!]
```

### 1. Mass Pre-production Engine (`PreproductionAgent`)
- **Asset Spine**: Ensures all headline and description assets follow a cohesive story spin and campaign theme.
- **Unconventional Angles & Metaphors**: Utilizes high-converting positioning frames (*Asset-Festung*, *Asymmetrischer Hebel*, *Rendite-Teleskop*, *Paradoxer Anker*, *Der Lautlose Beschleuniger*) while avoiding tired clichés (e.g. "Zeit sparen", "Stress sparen").
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
- **Grade A ($\ge 8.0$)**: PMF-Kandidat – *Skalieren / Budget hoch*
- **Grade B ($6.5 - 7.9$)**: Testwürdig – *Mehr Varianten erzeugen*
- **Grade C ($5.0 - 6.4$)**: Grenzwertig – *Nur Low-Budget testen*
- **Grade D ($< 5.0$)**: Noise – *Kill / archivieren*

### 3. The 20-Agent Persona Swarm (`AgentSwarm`)
Deploys 20 test customer agents with distinct demographic & psychographic profiles:
1. `SWARM-01`: **Early Tech Adopter (m/28)** – Tech-affine innovation driver.
2. `SWARM-02`: **Skeptischer Bedenkenträger (m/54)** – Hyper-critical, risk-averse auditor.
3. `SWARM-03`: **Erstkäufer & Junge Familie (f/32)** – Family security & budget transparency.
4. `SWARM-04`: **Klassischer Kapitalanleger (m/48)** – Cashflow, yield & ROI focused.
5. `SWARM-05`: **Vorsichtige Bausparerin (f/42)** – Solid protection & stability seeker.
6. `SWARM-06`: **Immobilien-Erbe (m/39)** – Value preservation & hassle-free management.
7. `SWARM-07`: **Vermögensvererber (m/67)** – Estate planning & tax-optimized transfer.
8. `SWARM-08`: **Urban Career Professional (f/35)** – Premium service & time optimization.
9. `SWARM-09`: **Konservativer Vermögensschützer (m/61)** – Asset security & inflation defense.
10. `SWARM-10`: **ESG & Sustainability Fan (f/31)** – Eco-efficiency & ESG compliance.
11. `SWARM-11`: **Schnäppchen- & Value-Jäger (m/44)** – Price-performance arbitrage.
12. `SWARM-12`: **Gewerbe- & Portfoliokäufer (m/52)** – Multi-unit B2B scaling.
13. `SWARM-13`: **Suburban Relocator (f/37)** – Space & lifestyle upgrade.
14. `SWARM-14`: **Downsizer / Best-Ager (f/64)** – Accessibility & low maintenance.
15. `SWARM-15`: **Tech Entrepreneur (m/33)** – Automation & asymmetrical leverage.
16. `SWARM-16`: **Mehrgenerationen-Planerin (f/45)** – Family cohesion & flexibility.
17. `SWARM-17`: **Passives-Einkommen-Seeker (m/36)** – Hands-off yield management.
18. `SWARM-18`: **Luxus- & Prestige-Käufer (m/46)** – Exclusivity & architectural status.
19. `SWARM-19`: **Value-Add Renovator (m/41)** – Value appreciation potential.
20. `SWARM-20`: **Institutioneller Anleger (f/58)** – Governance & low risk.

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
agent-swarms-predictive-asset-testing preproduce --theme "Immobilien Lead-Gen" --count 400
```
Or use the short alias:
```bash
predictive-asset-testing preproduce -t "B2B SaaS Lead-Gen" -k pmax -c 400
```

#### Command Options:
- `-t, --theme <topic>`: Campaign focus theme (Default: `"Immobilien & High-Price Lead Gen"`)
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

Campaign Focus Theme:   Immobilien Lead-Gen
Track:                  RSA
Target Quantity:        400 AI Ad Alternatives
Landing Page URL:       https://www.slavawagner.de
20-Agent Swarm Testing: ENABLED

[OK] Generated & Vectorized 400 AI Ad Alternatives!

=== AI ASSET DECISION MATRIX SCORING SUMMARY ===
Grade A (PMF-Kandidaten / Skalieren):   231
Grade B (Testwürdig / Mehr Varianten):  169
Grade C (Grenzwertig / Low-Budget):     0
Grade D (Noise / Kill):                0

=== 20-AGENT PERSONA SWARM STATEMENT & PREDICTIVE METRICS ===
[WINNER] AD ALTERNATIVE TO LAUNCH: PREPROD-RSA-0016
   Matrix Grade & Score: Grade A (8.02/10)
   Swarm Approval Rate:  100% (20/20 Agents Approved)
   Proportionale Metriken-Prognose (Hochrechnung):
     - Ø CTR:  7.7%
     - Ø CPC:  €2.90
     - Ø CPM:  €35.36
     - Ø CPL:  €70.70

--- Outtake: Top Agent Statements (Sub-Audiences) ---
• [SWARM-01] Early Tech Adopter (m/28) (Score: 7.1/10):
  "Guter Ansatz mit dem Framework MVP Pivot. Klare Argumentation und verständlicher Call-to-Action."
  [CTR: 6.91% | CPC: €2.66 | CPM: €34.15 | CPL: €69.75]
• [SWARM-03] Erstkäufer & Junge Familie (f/32) (Score: 8.5/10):
  "Der Story-Spin 'Transformative Aufwertung' holt mich genau an meinem Schmerzpunkt ab. Diese Ansprache hebt sich deutlich von der Konkurrenz ab!"
  [CTR: 8.38% | CPC: €2.94 | CPM: €33.45 | CPL: €65.65]

[OK] Report & Asset Catalog saved persistently to:
  storage/runs/preproduction-report-rsa-2026-08-01.json
```

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

*Created with the help of Google Antigravity CLI*
