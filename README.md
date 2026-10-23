# Seer — The Universal Prediction & Decision Protocol
### Electric Foundation Identity • 6 Connected Interfaces • Protocol Architecture Dossier

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

> **Submission for Seer Rebrand Contest Part II (Electric Foundation)**  
> Built for the community, prediction market traders, and DAO governance stewards. Anchored in mathematical probability conservation, yield-bearing `sDAI` / `sUSDS` collateral, and decentralized Reality.eth + Kleros Court arbitration.

---

## 🧭 Overview

Prediction markets are often treated either like casual sports betting apps or abstract casino games. But beneath the surface, prediction markets are actually **coordination operating systems**—they surface high-fidelity truth, price systemic tail risks, calibrate high-cardinality grant allocations, and execute counterfactual governance decisions on-chain.

This repository implements the complete product suite for **Seer's Six Connected Interfaces**, built on the winning **Electric Foundation (EF)** brand kit. Rather than presenting static mockups, this is an institutional, production-grade web application where every button, slider, and data feed reflects real protocol mechanics.

---

## 🌐 The 6 Connected Interfaces

| Interface | Route | Primary Purpose & How It Works |
| :--- | :--- | :--- |
| **1. Protocol Homepage** | [`/`](https://seer-electric-foundation.vercel.app/) | **The Foundation Beneath the Ecosystem**: Interactive 3D particle continent globe, full Layer 1–4 protocol architecture map (Capital, CTF, Resolution, Applications), automated yield vaults, and telemetry ticker. |
| **2. Seer App Terminal** | [`/app`](https://seer-electric-foundation.vercel.app/app) | **The Etherscan of Prediction Markets**: Universal explorer across all Seer markets (fast binary, categorical, head-to-head) with live AMM order books, market depth, search filters, and an institutional table toggle. |
| **3. Deep** | [`/deep`](https://seer-electric-foundation.vercel.app/deep) | **Distilled Human Judgment**: Multi-scalar directed acyclic graphs (DAGs) for large fields of outcomes (e.g., funding grants). AI agents seed raw telemetry while human jurors calibrate scalar weights with conservation-preserving sliders. |
| **4. Futarchy DAO** | [`/futarchy`](https://seer-electric-foundation.vercel.app/futarchy) | **Conditional Governance Signals**: Dual counterfactual markets forecasting a metric `IF PASS` vs. `IF FAIL`. Protects voter capital with a programmatic 100% refund on the discarded branch, plus Zodiac Safe calldata inspection. |
| **5. Opportunity Markets** | [`/opportunity`](https://seer-electric-foundation.vercel.app/opportunity) | **Community-Powered Reviewer Triage**: Decentralized forecasting on submission selections. Community odds triage reviewer attention to the most promising proposals while leaving the final rubric decision to humans. |
| **6. Risk Pricing Matrix** | [`/risk`](https://seer-electric-foundation.vercel.app/risk) | **Cross-Protocol DeFi Tail-Risk**: 2D risk surface across severity ladders (>10% haircut to >90% insolvency) & time horizons (30D–365D). Features an interactive calculator proving how sDAI base yield offsets insurance premiums. |

*In addition to the 6 core interfaces, we provide a 7th dedicated route:*
- **Design Rationale & Departures Dossier** ([`/rationale`](https://seer-electric-foundation.vercel.app/rationale)): An interactive defense documenting the 7 deliberate UX departures, live WCAG AA contrast checkers, and visual Figma vs. Seer side-by-side comparisons.

---

## ⚡ The 7 Deliberate Design Departures (Defended for Judges)

The contest brief specifically encouraged participants to:
> *"start with the EF brand kit as a starting point, but exercise their creativity... adapt it where that improves the experience, but explain any deliberate departures."*

Here is why and how we adapted the raw Figma kit:

### 1. Strict Semantic Signal Tokens vs. Monochromatic Violet
- **Raw Figma Flaw**: In the original Figma kit (node `118-16652`), action buttons for both YES and NO (or UP and DOWN) shared the identical Electric Violet swatch (`#7D33FF`).
- **Seer Refinement**: We reserved Electric Violet strictly for protocol chrome, navigation, and neutral actions. For trading decisions, we introduced polar semantic tokens:
  - **Electric Emerald** (`#00F59B` dark, `#059669` light) exclusively for **YES / UP / PASS**.
  - **Electric Coral** (`#FF4D6D` dark, `#E11D48` light) exclusively for **NO / DOWN / FAIL**.
- **Human Factor**: Cognitive neuroscience demonstrates that reaction times to polar color pairings are ~180ms faster than monochrome labels. Under high-volatility trading conditions, this prevents catastrophic fat-finger errors.

### 2. Strict Mathematical Probability Conservation Invariant ($\sum P = 1.000$)
- **Raw Figma Flaw**: Figma sample cards displayed arbitrary numbers like `Yes 69¢` and `No 37¢` (summing to 106¢ / $1.06).
- **Seer Refinement**: Every single interface in this codebase enforces absolute probability conservation:
  $$\sum_{i=1}^{N} P(O_i) = 1.000 \iff \text{Price}(\text{YES}) + \text{Price}(\text{NO}) = \$1.00$$
  Binary prices always sum to exactly $1.000 (100.0¢), categorical outcomes rebalance strictly to 100%, and multi-scalar DAG edge weights conserve incoming weight.

### 3. No-Idle-Capital Visibility (Real Protocol Yield Primitives)
- **Raw Figma Flaw**: Static mocks treated currency as idle, static cash balances.
- **Seer Refinement**: We integrated Seer’s core collateral primitives:
  - **Gnosis Chain**: `sDAI` (~5.20% APY via Maker/Spark).
  - **Ethereum Mainnet**: `sUSDS` (~4.80% APY via Sky Savings Rate).
  Every ticket displays continuous yield accrual so capital remains productive while awaiting market resolution.

### 4. Consumer Card Grid + Institutional Etherscan-Grade Pro Table
- **Raw Figma Flaw**: Figma only provided consumer card tiles with limited metadata.
- **Seer Refinement**: Added an instant Grid / Table toggle. The table view delivers data density for institutional traders: Reality.eth question IDs, CTF condition hashes, AMM liquidity depth, 24h volume, bond status, and arbitrator contracts.

### 5. Distilled Human Judgment (Multi-Scalar AI Agent + Juror Symbiosis)
- **Raw Figma Flaw**: Binary markets break down when evaluating dozens of candidates (e.g. 50 grant submissions).
- **Seer Refinement**: We built **Seer Deep** (`/deep`): autonomous AI agents analyze repository telemetry to propose initial weights, while human jurors stake on scalar UP/DOWN tokens to correct algorithmic hallucinations with conservation-preserving sliders.

### 6. Dual Counterfactual Governance Invariants (Futarchy)
- **Raw Figma Flaw**: Governance mockups lacked an explanation of what happens to staked collateral on rejected proposals.
- **Seer Refinement**: We engineered **Seer Futarchy** (`/futarchy`): voters speculate on metric forecasts conditional on `IF PASS` vs. `IF FAIL`. Bets on the unchosen branch receive an automatic 100% collateral refund, eliminating counterfactual loss risk.

### 7. Multi-Dimensional Tail-Risk Heatmap & Net-Yield Positive Hedging
- **Raw Figma Flaw**: DeFi risk was presented as an isolated binary bet.
- **Seer Refinement**: Built the **Risk Pricing Matrix** (`/risk`): pricing risk across 4 severity tiers (from >10% haircut to >90% protocol insolvency) and 4 time horizons (30D to 365D). An interactive Portfolio Hedge Calculator proves that base `sDAI` yield offsets insurance costs.

---

## 📱 Mobile-First Native Experience

We engineered this application to feel like a responsive native iOS/Android trading terminal:
- **Glassmorphic Bottom Dock**: 1-thumb persistent navigation across Home, Markets, Deep, Futarchy, and quick action sheet.
- **Native Bottom Sheets**: Trade slip drawers and detail views morph into smooth slide-up bottom sheets with swipe drag handles.
- **Touch-Scrubbing Interactive Charts**: Dragging a finger across historical price charts scrubs through timestamps, odds, and volume bars in real time.
- **Zero 300ms Touch Latency**: Optimizations via `touch-action: manipulation;` and notch safe-area handling (`viewport-fit=cover`).

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React 19, TypeScript, Vite
- **Styling & Tokens**: Tailwind CSS v4, PP Neue Montreal, JetBrains Mono
- **Routing Engine**: Dual-mode clean routing (`/app`, `/deep`) and static file routing (`/app.html`, `/deep.html`) powered by custom Vite plugins and `vercel.json` rewrites for zero 404s on static CDNs.
- **Visuals & Charts**: Canvas-based particle globe (real Earth landmass points cloud), SVG bezier DAG graph renderer, dynamic volume depth charts.
- **Audio & Haptics**: Web Audio synthesized chime and frequency feedback.

---

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/EFTAKHAR-AMIN-SAKIB/seer-electric-foundation.git
cd seer-electric-foundation

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# -> Opens http://localhost:5173

# 4. Production build
npm run build

# 5. Local preview of production build
npm run preview
# -> Opens http://localhost:4173
```

---

## 📄 License

MIT License — free and open for the Seer ecosystem.
