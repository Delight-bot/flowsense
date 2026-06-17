<p align="center">
  <img src="public/pad.png" alt="FlowSense biosensor pad reads 5 hormones via NFC" width="280" />
</p>

<h1 align="center">FlowSense · Biosensor Hormone Intelligence</h1>

<p align="center">
  <strong>The world's first biosensor feminine pad.</strong><br/>
  Reads 5 hormones passively from menstrual fluid. Syncs to your phone in real time.<br/>
  No blood draw. No appointment. No extra steps.
</p>

<p align="center">
  <a href="https://delignyanhete2023.github.io/thrive-hackathon/">Live Demo</a>
</p>

---

## How it works

```
  Flow Pad™                  NFC sync              FlowSense App
┌─────────────┐              (13.56 MHz)         ┌─────────────────┐
│ Microfluidic│   ──────────────────────────>    │ E2   P4   LH    │
│ sensor strip│                                  │ 142  8.4  6.2   │
│ reads fluid │              < 1 second          │                 │
│ as you wear │                                  │ OvaAI analysis  │
│ the pad     │                                  │ + cycle insights│
└─────────────┘                                  └─────────────────┘
```

Menstrual fluid is shed directly from the endometrium, the most hormonally active tissue
in the body. Hormone concentrations are up to 10x higher than in venous blood, and the
sample is collected passively while the pad is worn. Going to the source means earlier
signals and richer data than any blood draw.

With opt-in anonymous data from our network, FlowSense helps detect PCOS and endometriosis
patterns months before symptoms escalate to a clinic visit.

---

## What the app includes

| Page | What it does |
|---|---|
| `/` | Landing page with live pad visual and hormone readings |
| `/onboarding` | 4-step setup wizard |
| `/dashboard` | Full hormone snapshot, cycle ring, wicking log, AI insight |
| `/wicking` | Live microfluidic strip animation and zone detail |
| `/chat` | OvaAI: real-time hormone Q+A powered by Claude |
| `/bodymap` | Interactive symptom map |
| `/profile` | Device settings and research network opt-in |

---

## Stack

- **React 18** + **Vite**
- **React Router v6** (HashRouter for static hosting)
- **Tailwind CSS** with custom keyframes (orb float, wicking sweep, fill animations)
- **Recharts** for sparklines
- **Lucide React** icons
- **Claude claude-sonnet-4-6** via Anthropic API for OvaAI chat

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

---

## AI Chat and API key

The `/chat` page (OvaAI) calls the Anthropic API directly from the browser using
`claude-sonnet-4-6`. Because GitHub Pages is static hosting with no backend:

- The API key is **entered by each visitor** and stored only in their browser
  `localStorage`. It is **never committed to the repo or bundled into the build.**
- Every other page works fully with simulated data and needs no key.

> For production you would proxy the API call through a backend so the key never
> reaches the browser. This demo keeps it client-side intentionally.

---

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds and publishes to Pages on every push to `main`.

1. Create a new repository on GitHub and push this project:
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. The workflow runs automatically. The live URL appears under the **Actions** run
   and at **Settings > Pages**.

The build uses a relative base path and HashRouter so it works at any
`https://<you>.github.io/<repo>/` URL with no further configuration.
