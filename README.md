# FlowSense — Biosensor Hormone Intelligence

An investor/hackathon demo prototype of the FlowSense system: from inserting the
sensor module into a pad, through the microfluidic wicking process, to a real
AI hormone analysis. Built as a mobile-first React web app with a lab-on-a-chip
diagnostic aesthetic.

## Stack

- **React 18** + **Vite**
- **React Router v6** (HashRouter — works on static hosting)
- **Tailwind CSS** with custom keyframes (orb float, wicking sweep, fills, typing dots)
- **Recharts** (sparklines + chart fills)
- **Lucide React** icons

## Pages

`/` Landing · `/onboarding` 4-step wizard · `/dashboard` · `/wicking` live sensor view ·
`/chat` OvaAI · `/bodymap` interactive symptom map · `/profile` device & settings

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## AI Chat & API key

The `/chat` page (OvaAI) calls the Anthropic API directly from the browser using
model `claude-sonnet-4-6`. Because GitHub Pages is static hosting with no backend:

- The API key is **entered by each visitor** and stored only in their browser
  `localStorage`. It is **never committed to the repo or bundled into the build.**
- Every other page works fully with simulated data and needs no key.

> For production you would proxy the API call through a backend so the key never
> reaches the browser. This demo keeps it client-side intentionally.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds and publishes to Pages on every push to `main`.

1. Create a new repository on GitHub and push this project:
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow runs automatically; the live URL appears under the **Actions** run
   and at **Settings → Pages**.

The build uses a relative base path and HashRouter, so it works at any
`https://<you>.github.io/<repo>/` URL with no further configuration.
