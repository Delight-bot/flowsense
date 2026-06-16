// Simulated hormone readings + supporting demo data for FlowSense.
// No backend; all values hardcoded per the engineering spec.

export const biomarkers = [
  {
    key: 'e2',
    name: 'Estradiol (E2)',
    value: 142,
    unit: 'pg/mL',
    status: 'Normal',
    trend: 8,
    range: '100–400 pg/mL',
    spark: [128, 131, 134, 130, 136, 139, 142],
    color: '#4ADE80',
  },
  {
    key: 'p4',
    name: 'Progesterone (P4)',
    value: 8.4,
    unit: 'ng/mL',
    status: 'Normal',
    trend: 0,
    range: '5–20 ng/mL',
    spark: [8.5, 8.6, 8.4, 8.3, 8.5, 8.4, 8.4],
    color: '#F5C842',
  },
  {
    key: 'lh',
    name: 'LH',
    value: 6.2,
    unit: 'mIU/mL',
    status: 'Watch',
    trend: -12,
    range: '1–18 mIU/mL',
    spark: [7.4, 7.1, 6.9, 6.6, 6.4, 6.3, 6.2],
    color: '#F28AC4',
  },
  {
    key: 'cortisol',
    name: 'Cortisol',
    value: 18.6,
    unit: 'nmol/L',
    status: 'Elevated',
    trend: 22,
    range: 'baseline 14.2',
    spark: [14.2, 14.8, 15.4, 16.1, 17.0, 17.9, 18.6],
    color: '#D4418E',
  },
  {
    key: 'glucose',
    name: 'Glucose Metabolite',
    value: 88,
    unit: 'mg/dL',
    status: 'Normal',
    trend: -3,
    range: '70–99 mg/dL',
    spark: [91, 90, 90, 89, 89, 88, 88],
    color: '#9B2D8E',
  },
]

export const statusColor = {
  Normal: '#4ADE80',
  Watch: '#F5C842',
  Elevated: '#D4418E',
}

export const riskColor = {
  Low: '#4ADE80',
  Moderate: '#F5C842',
  Elevated: '#D4418E',
}

export const cyclePhases = [
  { name: 'Menstrual', days: 5, color: '#D4418E' },
  { name: 'Follicular', days: 8, color: '#9B2D8E' },
  { name: 'Ovulation', days: 3, color: '#F5C842' },
  { name: 'Luteal', days: 12, color: '#F28AC4' },
]

export const cycleHistory = [
  { cycle: 'Oct', e2: 138, p4: 9.1, cortisol: 13.8, flags: 'None' },
  { cycle: 'Nov', e2: 141, p4: 8.6, cortisol: 15.2, flags: 'LH watch' },
  { cycle: 'Dec', e2: 142, p4: 8.4, cortisol: 18.6, flags: 'Cortisol ↑' },
]

export const symptomOptions = [
  'Cramps',
  'Bloating',
  'Acne',
  'Hair thinning',
  'Fatigue',
  'Mood swings',
  'Heavy flow',
  'Irregular cycles',
  'Weight gain',
  'Brain fog',
  'Night sweats',
  'Excess hair growth',
]

export const wickingLog = [
  {
    time: '7:14 AM',
    label: 'Morning sync',
    detail: 'E2 142, P4 8.4, LH 6.2, Cortisol 18.6, Glucose 88',
    flagged: false,
  },
  {
    time: '12:31 PM',
    label: 'Midday sync',
    detail: 'Cortisol ↑ to 22.1 (flagged: stress marker elevated)',
    flagged: true,
  },
  {
    time: '',
    label: 'Next sync pending…',
    detail: '',
    flagged: false,
    pending: true,
  },
]

export const aiInsight = {
  text: "Your cortisol is 22% above your personal baseline today. This is your luteal phase, so progesterone-driven cortisol sensitivity is normal, but this level suggests acute stress compounding. Consider a 15-min walk before lunch, reducing caffeine this afternoon, and 7 to 8 hours of sleep tonight to prevent tomorrow's hormone drop.",
  source: 'OvaAI · Based on your 3-cycle hormone profile',
}

export const stripZones = [
  {
    id: 1,
    name: 'Sample Intake',
    sub: 'Wicking Membrane',
    status: 'Active',
    color: '#D4418E',
    detail:
      'Nitrocellulose lateral flow membrane. Fluid pulled via capillary action, no pump needed. Pore size: 5μm average. Flow rate: ~2μL/min. Sealing: Silicone O-ring gasket (Shore 30A) pressed against the Flow channel by a spring-loaded reader module (0.4N contact force).',
  },
  {
    id: 2,
    name: 'Particle Filter',
    sub: 'Semi-permeable',
    status: 'Complete',
    color: '#F28AC4',
    detail:
      'Particle Filter: 2–5μm semi-permeable membrane. Blocks red blood cells (6–8μm) and large proteins >50kDa. Passes estradiol (MW 272 Da), progesterone (MW 314 Da), LH (MW 28,000 Da, via specialized antibody pre-filter), cortisol (MW 362 Da), glucose (MW 180 Da).',
  },
  {
    id: 3,
    name: 'Conjugate Pad',
    sub: 'Gold nanoparticles',
    status: 'Complete',
    color: '#F5C842',
    detail:
      'Gold nanoparticle (40nm) labeled antibodies. One antibody type per target analyte. On contact with sample, antibodies bind target hormones and carry them toward test lines. Standard competitive lateral flow immunoassay format.',
  },
  {
    id: 4,
    name: 'Reaction Windows',
    sub: '5 Test Lines',
    status: 'Reading',
    color: '#9B2D8E',
    detail:
      'Five immobilized capture antibody lines, one per biomarker. Color intensity inversely proportional to analyte concentration (competitive format: more hormone = lighter line). 5-channel LED array (470nm, 530nm, 560nm, 590nm, 625nm) illuminates each line. Photodiode measures reflectance.',
  },
  {
    id: 5,
    name: 'Absorbent Wick',
    sub: 'Capillary pump',
    status: 'Active',
    color: '#F28AC4',
    detail:
      'Cellulose absorbent pad maintains capillary pressure differential, pulling fluid through all upstream zones at consistent rate. Prevents back-flow. Target total transit time: 4–6 minutes post-saturation.',
  },
]

export const readerSpecs = [
  ['MCU', 'ARM Cortex-M0+ @ 48MHz'],
  ['LED Array', '5× wavelength-matched LEDs (470–625nm)'],
  ['Photodiode', '5-channel silicon photodiode array'],
  ['NFC', 'ISO 15693 @ 13.56MHz · 1-second data transfer'],
  ['Battery', 'LiPo 80mAh · 30-day standby, 120 sync cycles/charge'],
  ['Housing', 'Injection-molded ABS, IP54 rated'],
  ['BOM Cost', '$8.50 target'],
  ['Dimensions', '38mm × 12mm × 4mm'],
]

export const bodyZones = [
  {
    id: 'face',
    label: 'Face',
    cx: 50,
    cy: 9,
    symptom: 'Acne / oiliness',
    risk: 'Moderate',
    connection:
      'Elevated androgens drive sebum overproduction. When testosterone runs high relative to estrogen, oil glands enlarge and pores clog.',
    biomarker: 'Glucose Metabolite 88 mg/dL · LH 6.2 mIU/mL',
  },
  {
    id: 'scalp',
    label: 'Scalp',
    cx: 50,
    cy: 4,
    symptom: 'Hair thinning',
    risk: 'Low',
    connection:
      'DHT sensitivity from testosterone conversion miniaturizes hair follicles. This is the same pathway behind hormonal hair loss.',
    biomarker: 'LH 6.2 mIU/mL (Watch)',
  },
  {
    id: 'neck',
    label: 'Neck / Jaw',
    cx: 50,
    cy: 15,
    symptom: 'Acanthosis Nigricans',
    risk: 'Low',
    connection:
      'Darkened velvety skin at the neck is a surface marker of insulin resistance. It often precedes metabolic shifts by months.',
    biomarker: 'Glucose Metabolite 88 mg/dL (Normal)',
  },
  {
    id: 'chest',
    label: 'Chest',
    cx: 50,
    cy: 26,
    symptom: 'Breast tenderness',
    risk: 'Moderate',
    connection:
      'Progesterone fluctuation in the luteal phase increases fluid retention in breast tissue. Tenderness tracks the P4 curve.',
    biomarker: 'Progesterone 8.4 ng/mL',
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    cx: 50,
    cy: 40,
    symptom: 'Bloating',
    risk: 'Moderate',
    connection:
      'Hormone-driven gut motility changes plus dysbiosis slow digestion. Estrogen and progesterone both modulate the gut–hormone axis.',
    biomarker: 'Estradiol 142 pg/mL',
  },
  {
    id: 'lowerAbdomen',
    label: 'Lower abdomen',
    cx: 50,
    cy: 49,
    symptom: 'Cramps / PMOS zone',
    risk: 'Elevated',
    connection:
      'Prostaglandin excess triggers uterine contractions while the endometrial lining sheds. This is the core PMOS-screening zone.',
    biomarker: 'Cortisol 18.6 nmol/L (Elevated)',
  },
  {
    id: 'lowerBack',
    label: 'Lower back',
    cx: 71,
    cy: 44,
    symptom: 'Cramping (referred)',
    risk: 'Moderate',
    connection:
      'Referred prostaglandin pain radiates from the uterus to the lower back via shared nerve pathways during menstruation.',
    biomarker: 'Cortisol 18.6 nmol/L (Elevated)',
  },
]

export const starterPrompts = [
  'Why is my cortisol elevated today?',
  'What does my E2 level mean right now?',
  'Why do I get cramps every cycle and what helps?',
  'Am I at risk for PMOS based on my readings?',
  'How does the wicking strip actually read my hormones?',
  'What should I eat today for my cycle phase?',
]

export const SYSTEM_PROMPT = `You are OvaAI, the hormone intelligence companion inside FlowSense, the platform behind Flow, the world's first biosensor feminine pad. Flow monitors hormones live, syncing a reading whenever it collects a usable amount of fluid while being worn. You speak like a brilliant endocrinologist who also happens to be the user's most trusted friend.

Current user data (simulated readings from today's Flow sync):
- Estradiol (E2): 142 pg/mL (normal range: 100–400 pg/mL, luteal phase)
- Progesterone (P4): 8.4 ng/mL (normal range: 5–20 ng/mL, luteal phase)
- LH: 6.2 mIU/mL (normal range: 1–18 mIU/mL)
- Cortisol: 18.6 nmol/L (ELEVATED, personal baseline: 14.2, up 22%)
- Glucose metabolite: 88 mg/dL (normal)
- Cycle day: 22 of 28 (luteal phase)
- Symptoms reported: cramps, bloating, fatigue, mood swings

Sensor method: Hybrid optical reader + disposable electrochemical reagent strip.
Readings from menstrual fluid via lateral flow microfluidic wicking membrane.
Data collected passively; the user did not need to do anything beyond wearing the Flow pad.

Guidelines:
- Be warm, specific, and actionable
- Reference the user's actual numbers when relevant
- Connect symptoms to cycle phase and hormone patterns
- Never use the word "diagnose"
- Always suggest consulting a physician for medical decisions
- End every response with one concrete, doable action for today
- Keep responses to 4–6 sentences`
