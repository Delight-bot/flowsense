# FlowSense — Engineering Prototype App
### Lovable Prompt: Full-Stack Diagnostic Platform with Microfluidic Simulation Layer

---

## 🎯 What We're Building

A **React web app** that simulates the full FlowSense system — from a user inserting the sensor module into their pad, through the microfluidic wicking process, to receiving a real AI hormone analysis. This is an **investor/hackathon demo prototype** that makes the engineering tangible and interactive.

The app should feel like a **lab-on-a-chip diagnostic dashboard** — clinical precision meets consumer warmth.

---

## 🎨 Design System

**Color Palette:**
```
Background:     #0F1B1A  (deep forest black)
Card fill:      #142520
Card alt:       #1E3830
Teal accent:    #1D5C52
Sage mid:       #3D8C7A
Mint highlight: #5EC4A8
Gold metric:    #F0B429
Rose alert:     #E8587A
Blush soft:     #F4A0B0
Muted text:     #8CB8AE
White:          #FFFFFF
Success green:  #4ADE80
```

**UI Style:** Dark glass-morphism. `border-radius: 12–16px`. Glow shadows: `box-shadow: 0 0 20px rgba(94,196,168,0.2)`. Lucide React icons throughout. Mobile-first (375px min-width), responsive to desktop. No borders — use tinted fills and glow rings for depth.

**Typography:** System sans-serif. `font-weight: 700` for headers, `400` for body. Metric numbers always gold and large.

---

## 📱 Pages & Routes

### `/` — Landing
Full-screen hero on dark background:
- Animated floating orbs (CSS `@keyframes` float, blurred green/teal circles, 8s loop)
- Headline: **"She already wears it. Now it works for her."**
- Subline: "FlowSense — the world's first biosensor feminine pad. Reads 5 hormones. Delivers 3 therapeutics. Talks to your doctor."
- CTA button (mint, glowing): **"Try the Demo"** → `/onboarding`
- Secondary link: **"How it Works"** → smooth scroll to engineering section below fold

**Engineering section (below fold):**
Three horizontal cards showing the system layers:
1. **Wicking Membrane** — "Capillary action moves fluid from pad to sensor. No pump. No power. Same tech as COVID tests."
2. **Hybrid Sensor** — "Disposable electrochemical strip performs chemistry. Reusable optical reader measures color change. Electronics never touch fluid."
3. **AI Engine** — "5 hormone readings. 3 cycles of data. PMOS and endometriosis risk scored before your next period."

---

### `/onboarding` — Setup Wizard (4 steps)

**Step 1 — Welcome**
- Name input field
- Age range selector (chips): `<18` / `18–24` / `25–34` / `35–44` / `45+`
- Cycle regularity (chips): `Regular` / `Irregular` / `Unknown / Just started tracking`
- Progress bar: 25%

**Step 2 — Symptoms**
Symptom checklist with icons (Lucide). Show as tappable grid of pill-shaped tags:
`Cramps` `Bloating` `Acne` `Hair thinning` `Fatigue` `Mood swings` `Heavy flow` `Irregular cycles` `Weight gain` `Brain fog` `Night sweats` `Excess hair growth`
- User selects any that apply. Selected = mint border + teal background.
- Progress bar: 50%

**Step 3 — Goals**
Large tappable cards (2×2 grid):
- 🔬 **Understand my hormones** — "Get a monthly hormone panel without a blood draw"
- 🌱 **Reduce symptoms** — "Cramp relief, skin improvement, energy support"
- 👶 **Fertility support** — "Ovulation detection and cycle optimization"
- ❤️ **Prevent disease** — "Early PMOS and endometriosis detection"
- Progress bar: 75%

**Step 4 — Sensor Setup (Simulated)**
Full-screen animation of the FlowSense system:

Show a **visual cross-section diagram** of the pad + sensor using SVG or CSS:
- Animated wicking line traveling left-to-right through zones:
  - Zone labels appear sequentially: `Sample Intake` → `Particle Filter` → `Conjugate Pad` → `Reaction Zones` → `Optical Reader`
  - Each zone lights up with a subtle glow as the "fluid front" passes through
  - Animation duration: 6 seconds, triggered on page load
- Color-coded zones: mint (intake), blush (filter), gold (conjugate), sage (reaction), gold (reader)
- Below the animation: dashed vertical line separating "WET ZONE — Disposable" (left) from "DRY ZONE — Reusable" (right)
- Status text updates: "Wicking initiated..." → "Filtering..." → "Reagents activating..." → "Reading zones..." → "Complete ✓"

Two buttons:
- **"Connect My FlowSense"** (primary, mint glow) — plays the animation then proceeds
- **"Demo Mode"** (secondary, outlined) — skips straight to dashboard with sample data

Progress bar: 100%

---

### `/dashboard` — Home

**Header card:** `Good morning, [Name]. Day 3 of your cycle. Luteal phase ends in 5 days.`

**Sensor Status Strip** (horizontal pill bar):
- 🟢 `FlowSense Pad™ — Connected` | `Last sync: 7:14 AM` | `Reader battery: 94%`
- If not connected: 🟡 `Insert reader module to sync`

**Hormone Snapshot** — 5 metric cards in horizontal scroll row. Each card:
```
[Icon]  Biomarker Name
[Large gold number + unit]
[Trend arrow + % change vs last cycle]
[Status badge: Normal / Watch / Elevated]
[7-day sparkline mini chart — recharts]
```

Biomarkers and simulated values:
| Biomarker | Value | Unit | Status | Trend |
|---|---|---|---|---|
| Estradiol (E2) | 142 | pg/mL | Normal | ↑ 8% |
| Progesterone (P4) | 8.4 | ng/mL | Normal | → 0% |
| LH | 6.2 | mIU/mL | Watch | ↓ 12% |
| Cortisol | 18.6 | nmol/L | Elevated | ↑ 22% |
| Glucose Metabolite | 88 | mg/dL | Normal | ↓ 3% |

Status badge colors: `Normal` = green, `Watch` = gold, `Elevated` = rose.

**Cycle Phase Ring** (full-width card):
SVG donut chart (4 segments: Menstrual / Follicular / Ovulation / Luteal). Active segment glows. Center text: `Day 22 · Luteal Phase`. Below: `Ovulation predicted: Day 6 next cycle`.

**Wicking Activity Log** (today's readings timeline):
Vertical timeline showing today's pad syncs:
- `7:14 AM — Morning sync: E2 142, P4 8.4, LH 6.2, Cortisol 18.6, Glucose 88`
- `12:31 PM — Midday sync: Cortisol ↑ to 22.1 (flagged — stress marker elevated)`
- `[Next sync pending...]`

**AI Insight Card** (gold glow border):
Text: `"Your cortisol is 22% above your personal baseline today. This is your luteal phase — progesterone-driven cortisol sensitivity is normal, but this level suggests acute stress compounding. Consider: a 15-min walk before lunch, reducing caffeine this afternoon, and 7–8h sleep tonight to prevent tomorrow's hormone drop."`
Source: `OvaAI · Based on your 3-cycle hormone profile`

**Quick Log buttons** (3 tappable chips):
`😴 Log sleep quality` | `🍽 Log last meal` | `💊 Medication taken`
Each tap adds to a streak counter shown as a flame + number.

**Bottom Nav:** Home · Wicking · AI Chat · Body Map · Profile

---

### `/wicking` — Live Sensor & Microfluidic View

This is the engineering showcase page. It makes the invisible science visible.

**Top section: Current Strip Status**
Animated cross-section of the reagent strip (SVG):
- 5 zones rendered as color-coded rectangles
- Fluid saturation shown as an animated fill level (height animation, CSS)
- Each zone shows its current reading status: `Saturated ✓` / `Reacting...` / `Pending`

**Zone Detail Cards** (5 cards, tap to expand):

**Zone 1 — Sample Intake (Wicking Membrane)**
- Status: `Active`
- Detail: "Nitrocellulose lateral flow membrane. Fluid pulled via capillary action — no pump needed. Pore size: 5μm average. Flow rate: ~2μL/min. Sealing: Silicone O-ring gasket (Shore 30A) pressed against pad channel by spring-loaded reader module (0.4N contact force)."
- Visual: animated fluid wave moving right

**Zone 2 — Particle Filter**
- Status: `Complete ✓`
- Detail: "2–5μm semi-permeable membrane. Blocks: red blood cells (6–8μm), large proteins >50kDa. Passes: estradiol (MW 272 Da), progesterone (MW 314 Da), LH (MW 28,000 Da — small enough via specialized antibody pre-filter), cortisol (MW 362 Da), glucose (MW 180 Da)."
- Visual: dots passing through / blocked at membrane line

**Zone 3 — Conjugate Pad**
- Status: `Complete ✓`
- Detail: "Gold nanoparticle (40nm) labeled antibodies. One antibody type per target analyte. On contact with sample, antibodies bind target hormones and carry them toward test lines. Standard competitive lateral flow immunoassay format."
- Visual: gold particle animation moving right

**Zone 4 — Reaction Windows (5 Test Lines)**
- Status: `Reading...`
- Detail: "5 immobilized capture antibody lines — one per biomarker. Color intensity inversely proportional to analyte concentration (competitive format: more hormone = lighter line). 5-channel LED array (470nm, 530nm, 560nm, 590nm, 625nm) illuminates each line. Photodiode measures reflectance."
- Visual: 5 color bars with intensity levels matching current readings

**Zone 5 — Absorbent Wick**
- Status: `Active`
- Detail: "Cellulose absorbent pad maintains capillary pressure differential, pulling fluid through all upstream zones at consistent rate. Prevents back-flow. Target total transit time: 4–6 minutes post-saturation."

**Bottom section: Reader Module Specs**
Horizontal spec card:
```
MCU:          ARM Cortex-M0+ @ 48MHz
LED Array:    5× wavelength-matched LEDs (470–625nm)
Photodiode:   5-channel silicon photodiode array
NFC:          ISO 15693 @ 13.56MHz — 1-second data transfer
Battery:      LiPo 80mAh — 30-day standby, 120 sync cycles/charge
Housing:      Injection-molded ABS, IP54 rated
BOM Cost:     $8.50 target
Dimensions:   38mm × 12mm × 4mm
```

---

### `/chat` — AI Hormone Coach

Full-screen chat. AI persona: **OvaAI** — warm, clinical, evidence-based. Never diagnoses. Always empowers.

**System prompt injected to Claude API:**
```
You are OvaAI, the hormone intelligence companion inside FlowSense — the world's first biosensor feminine pad platform. You speak like a brilliant endocrinologist who also happens to be the user's most trusted friend.

Current user data (simulated readings from today's pad sync):
- Estradiol (E2): 142 pg/mL (normal range: 100–400 pg/mL, luteal phase)  
- Progesterone (P4): 8.4 ng/mL (normal range: 5–20 ng/mL, luteal phase)
- LH: 6.2 mIU/mL (normal range: 1–18 mIU/mL)
- Cortisol: 18.6 nmol/L (ELEVATED — personal baseline: 14.2, up 22%)
- Glucose metabolite: 88 mg/dL (normal)
- Cycle day: 22 of 28 (luteal phase)
- Symptoms reported: cramps, bloating, fatigue, mood swings

Sensor method: Hybrid optical reader + disposable electrochemical reagent strip. 
Readings from menstrual fluid via lateral flow microfluidic wicking membrane.
Data collected passively — user did not need to do anything beyond wearing the pad.

Guidelines:
- Be warm, specific, and actionable
- Reference the user's actual numbers when relevant
- Connect symptoms to cycle phase and hormone patterns
- Never use the word "diagnose"
- Always suggest consulting a physician for medical decisions
- End every response with one concrete, doable action for today
- Keep responses to 4–6 sentences
```

**Starter chip prompts (shown before first message):**
- "Why is my cortisol elevated today?"
- "What does my E2 level mean right now?"
- "Why do I get cramps every cycle and what helps?"
- "Am I at risk for PMOS based on my readings?"
- "How does the wicking strip actually read my hormones?"
- "What should I eat today for my cycle phase?"

**API call:** `https://api.anthropic.com/v1/messages` — model `claude-sonnet-4-6` — max_tokens 1000.

Handle multi-turn: append each message + response to a `messages` array in React state and include in every API call.

Typing indicator: three animated dots (CSS pulse) while awaiting response.

---

### `/bodymap` — Interactive Symptom Body Map

SVG female body silhouette (front view, outline only, elegant line art style — draw with SVG path).

**Tappable hotspot zones** (invisible circles over SVG, absolute positioned):

| Zone | SVG Position | Symptom | Connection |
|---|---|---|---|
| Face | Top center | Acne / oiliness | Elevated androgens → sebum overproduction |
| Scalp | Top | Hair thinning | DHT sensitivity from testosterone conversion |
| Neck/jaw | Center top | Acanthosis Nigricans | Insulin resistance skin marker |
| Chest | Upper center | Breast tenderness | Progesterone fluctuation |
| Abdomen | Center | Bloating | Hormone-driven gut motility changes + dysbiosis |
| Lower abdomen | Lower center | Cramps / PMOS zone | Prostaglandin excess + endometrial lining |
| Lower back | (back indicator) | Cramping | Referred prostaglandin pain |

Each tap opens a **bottom drawer** (slides up, dark card):
- Symptom name + current FlowSense risk badge (Low / Moderate / Elevated)
- 2-sentence explanation of the hormone-to-symptom connection
- Current relevant biomarker reading from today's sync
- "Ask OvaAI about this" button → opens `/chat` with pre-filled question

**Microfluidics connection note** (bottom of page, collapsible):
"FlowSense detects these symptoms' root hormonal causes from menstrual fluid — passively, using the same lateral flow wicking technology as rapid COVID tests. The pad does the science. You get the answers."

---

### `/profile` — Settings & Device

**Reader Module Card** (top, glow border):
```
[Animated green pulse dot]  FlowSense Reader v1.0
Connected via NFC            Battery: 94%
Last sync: Today 7:14 AM     Total syncs: 47
Strips used: 12              Next pad due: ~2 days
```

**Strip Inventory** (visual):
Row of 10 pad icons. 8 filled (used/remaining), 2 gray (empty). "Reorder in 6 days" warning if <3 remaining.

**My Hormone History** (compact table):
Last 3 cycle summaries:
| Cycle | E2 avg | P4 avg | Cortisol avg | Flags |
|---|---|---|---|---|
| Oct | 138 | 9.1 | 13.8 | None |
| Nov | 141 | 8.6 | 15.2 | LH watch |
| Dec | 142 | 8.4 | 18.6 | Cortisol ↑ |

**Physician Sharing toggle:** "Share monthly hormone report with my OB-GYN" (toggle on/off, EHR note: "HL7 FHIR compatible").

**Settings list:**
- Notification preferences (cycle reminders / anomaly alerts)
- Personalized pad SKU: `Standard Formula` (change → 4 options: Standard / High-Magnesium / Anti-Inflammatory / Fertility Support)
- Data privacy & HIPAA disclosure
- Subscription: `FlowSense Pro · $18/mo · Next billing Dec 28`
- Logout

---

## 🔌 Technical Requirements

- **Framework:** React with functional components + hooks
- **Routing:** React Router v6 — routes: `/` `/onboarding` `/dashboard` `/wicking` `/chat` `/bodymap` `/profile`
- **Styling:** Tailwind CSS only (utility classes only, no custom CSS files)
- **Charts:** Recharts — sparklines (LineChart), cycle phase ring (custom SVG donut), strip zone fills
- **Icons:** Lucide React throughout
- **Animations:** Tailwind `animate-pulse`, `animate-bounce` + custom CSS keyframes for wicking flow, orb float
- **State:** `useState` + `useContext` for user profile, hormone readings, chat history, symptom logs
- **AI API:** `fetch` to `https://api.anthropic.com/v1/messages` from `/chat` page only
- **No backend** — all hormone data hardcoded/simulated; only external call is Claude API
- **Mobile-first**, responsive to 1280px desktop

---

## 🧪 Engineering Accuracy Notes (for investor demo credibility)

When building the `/wicking` page and onboarding animation, use these real specifications:

- **Lateral flow membrane:** Nitrocellulose, 90–180 second flow time per 4cm strip
- **Pore sizes:** Particle filter 2–5μm (blocks RBCs at 6–8μm)
- **Gold nanoparticle conjugate:** 40nm diameter, antibody-coated, standard IVD supply chain
- **LED wavelengths:** 470nm (blue — glucose), 530nm (green — E2), 560nm (yellow-green — P4), 590nm (yellow — cortisol), 625nm (red — LH)
- **NFC standard:** ISO 15693 — used in hospital wristbands and lab tracking
- **Spring contact force:** 0.4N (equivalent to a light finger tap — comfortable, reliable)
- **O-ring material:** Silicone Shore 30A — medical grade, body-safe

These details make the demo feel like a real product, not a concept.

---

## ✅ MVP Success Criteria

- [ ] Landing page has animated orbs and scrollable engineering section
- [ ] Onboarding 4-step wizard completes with wicking animation on step 4
- [ ] Dashboard shows all 5 hormone metric cards with sparklines + cycle ring
- [ ] Wicking page shows 5 animated strip zones with expandable detail cards
- [ ] Chat connects to Claude API with full hormone context in system prompt
- [ ] Body map has ≥5 tappable zones with symptom drawers
- [ ] Profile shows reader module status + hormone history table
- [ ] Dark theme consistent across all pages
- [ ] Fully functional at 375px mobile viewport. use this color palet instead: Color Palette:
* Background: #1A0A2E (deep violet-black)
* Cards/panels: #2D1545
* Primary accent: #9B2D8E (orchid)
* Secondary accent: #D4418E (rose)
* Blush highlight: #F28AC4
* Gold metric: #F5C842
* Success/positive: #4ADE80
* Text primary: #FFFFFF
* Text muted: #C4A7E7
Typography: System UI sans-serif. Bold 700 headers. Regular body. No decorative serifs.
UI Style: Dark glass-morphism. Rounded cards (border-radius 16px). Subtle glow shadows (box-shadow: 0 0 24px rgba(155, 45, 142, 0.3)). Gradient orb backgrounds as ambient decoration. Mobile-first responsive layout. No accent stripes or borders — use tint fills and glow shadows for depth.
Icons: Use Lucide icons throughout. use this color n design, but the prompt is exactly this one