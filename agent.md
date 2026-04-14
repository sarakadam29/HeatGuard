# 🌡️ HeatGuard — Personalized Urban Heat Risk & Safety Planner
### Product Description Report (agent.md)
> Full-stack specification for UI/UX design, frontend, backend, algorithms, and API contracts.
> Intended for: Stitch (UI design) → Figma (visual layout) → Antigravity (code generation)

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [User Personas](#2-user-personas)
3. [Information Architecture](#3-information-architecture)
4. [UI/UX Design Specification](#4-uiux-design-specification)
   - 4.1 Design System (Tokens)
   - 4.2 Screen-by-Screen Layout
   - 4.3 Component Library
   - 4.4 Responsive Behavior
   - 4.5 Interaction & Animation
5. [Frontend Architecture](#5-frontend-architecture)
6. [Backend Architecture](#6-backend-architecture)
7. [Core Algorithm — Heat Risk Engine](#7-core-algorithm--heat-risk-engine)
8. [API Contract](#8-api-contract)
9. [Data Models & Schemas](#9-data-models--schemas)
10. [Weather Data Strategy (API + Fallback)](#10-weather-data-strategy-api--fallback)
11. [State Management & Data Flow](#11-state-management--data-flow)
12. [Error Handling & Edge Cases](#12-error-handling--edge-cases)
13. [File & Folder Structure](#13-file--folder-structure)
14. [Constraints & Validation Rules](#14-constraints--validation-rules)

---

## 1. Product Overview

**Product Name:** HeatGuard
**Tagline:** *Know before you go. Stay safe in the heat.*

HeatGuard is a single-page web application that evaluates urban heat risk based on real-time (or mock) weather data combined with user-specific inputs — activity type, exposure duration, personal health factors — and returns a classified risk level with a human-readable safety dashboard.

### Core Value Proposition
Generic weather apps show temperature. HeatGuard tells you **what that temperature means for YOU**, right now, for the exact activity you're planning.

### Feature Summary

| Feature | Description |
|---|---|
| Heat Risk Calculation | Combines temperature + humidity into a Heat Index, mapped to a risk score |
| Multi-Factor Evaluation | Activity type, duration, time of day, personal health factors |
| Time Window Analysis | Scans a 24-hour period to mark safe vs. unsafe hour slots |
| Recommendation Engine | Outputs actionable, personalized safety guidance |
| Weather Data Strategy | Live API call with automatic fallback to mock dataset |
| Risk Classification | Four levels: Low · Moderate · High · Extreme |

---

## 2. User Personas

### Persona A — The Morning Jogger (Primary)
- **Name:** Arjun, 28, Mumbai
- **Goal:** Knows when it's safe to run outdoors during summer
- **Pain Point:** Regular weather apps give temperature but no activity-specific advice
- **Usage Pattern:** Opens app before leaving home, checks the next 4 hours

### Persona B — The Outdoor Worker (Secondary)
- **Name:** Meera, 42, construction site supervisor
- **Goal:** Schedule outdoor shifts around heat risk windows
- **Pain Point:** Responsible for team safety, needs a risk breakdown, not just a number
- **Usage Pattern:** Checks at the start of each working day for the full day's windows

### Persona C — The Cautious Parent (Tertiary)
- **Name:** Rahul, 35, parent of young children
- **Goal:** Know if it's safe to take kids to the park
- **Pain Point:** Children and elderly are more heat-sensitive; generic advice doesn't apply
- **Usage Pattern:** Occasional usage on hot days

---

## 3. Information Architecture

```
HeatGuard App
├── Landing / Input Screen
│   ├── Weather Input Panel
│   │   ├── City / Location selector
│   │   ├── Temperature input (°C)  [auto-filled from API if available]
│   │   └── Humidity input (%)      [auto-filled from API if available]
│   └── User Profile Panel
│       ├── Activity Type selector
│       ├── Exposure Duration selector
│       ├── Age Group selector
│       └── Health Conditions toggle (optional)
│
├── Dashboard / Results Screen
│   ├── Hero Risk Card (current risk level + score)
│   ├── Risk Explanation Panel (why this classification)
│   ├── 24-Hour Time Window Strip
│   │   ├── Safe slots  (green)
│   │   ├── Moderate    (yellow)
│   │   ├── High        (orange)
│   │   └── Extreme     (red)
│   ├── Recommendations Panel
│   │   ├── Primary Action
│   │   └── Supporting Tips (list)
│   └── Re-evaluate / Back Button
│
└── Footer
    ├── Data source indicator (Live API / Mock data)
    └── Disclaimer
```

---

## 4. UI/UX Design Specification

### 4.1 Design System (Tokens)

#### Color Palette

```
-- Risk Colors --
--color-low:       #22C55E   /* green-500  */
--color-moderate:  #EAB308   /* yellow-500 */
--color-high:      #F97316   /* orange-500 */
--color-extreme:   #EF4444   /* red-500    */

-- Backgrounds --
--color-bg-primary:    #0F172A   /* slate-900 — main app background */
--color-bg-card:       #1E293B   /* slate-800 — card surfaces */
--color-bg-input:      #334155   /* slate-700 — input fields */
--color-bg-hover:      #475569   /* slate-600 — hover state */

-- Text --
--color-text-primary:  #F1F5F9   /* slate-100 */
--color-text-secondary:#94A3B8   /* slate-400 */
--color-text-muted:    #64748B   /* slate-500 */

-- Borders --
--color-border:        #334155   /* slate-700 */
--color-border-focus:  #38BDF8   /* sky-400   */

-- Status Badges --
--badge-low-bg:       rgba(34,197,94,0.15)
--badge-moderate-bg:  rgba(234,179,8,0.15)
--badge-high-bg:      rgba(249,115,22,0.15)
--badge-extreme-bg:   rgba(239,68,68,0.15)
```

#### Typography

```
Font Family:   Inter (primary), system-ui (fallback)
Base Size:     16px

Scale:
  --text-xs:   12px / 1.5
  --text-sm:   14px / 1.5
  --text-base: 16px / 1.6
  --text-lg:   18px / 1.5
  --text-xl:   20px / 1.4
  --text-2xl:  24px / 1.3
  --text-3xl:  30px / 1.2
  --text-4xl:  36px / 1.1

Weights:
  Regular: 400
  Medium:  500
  SemiBold:600
  Bold:    700
```

#### Spacing Scale (8px grid)

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
```

#### Border Radius

```
--radius-sm:   6px
--radius-md:   10px
--radius-lg:   16px
--radius-xl:   24px
--radius-full: 9999px
```

#### Shadows

```
--shadow-card:  0 4px 24px rgba(0,0,0,0.35)
--shadow-input: 0 0 0 2px var(--color-border-focus)   /* focus ring */
--shadow-risk:  0 8px 32px rgba(COLOR, 0.3)           /* risk-color glow */
```

---

### 4.2 Screen-by-Screen Layout

---

#### SCREEN 1 — Input Screen

**Layout:** Single-column centered, max-width 680px, full viewport height, scrollable.

```
┌─────────────────────────────────────────────────┐
│  🌡️ HeatGuard          [Data: Live API ✓]        │  ← Header (h-14, sticky)
├─────────────────────────────────────────────────┤
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  📍 WEATHER CONDITIONS                  │   │  ← Card 1
│   │  ─────────────────────────────────────  │   │
│   │  City / Location                        │   │
│   │  [  Mumbai, Maharashtra      ▼  ]       │   │
│   │                                         │   │
│   │  Temperature (°C)    Humidity (%)       │   │
│   │  [    38     ↑↓ ]    [   72    ↑↓ ]    │   │
│   │                                         │   │
│   │  Current Time (24h)                     │   │
│   │  [    14     ↑↓ ]   (auto-detected)     │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  🏃 YOUR ACTIVITY                       │   │  ← Card 2
│   │  ─────────────────────────────────────  │   │
│   │  Activity Type                          │   │
│   │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │   │
│   │  │ 🚶   │ │ 🏃   │ │ 🚴   │ │ ⚽   │  │   │
│   │  │Walk  │ │Run   │ │Cycle │ │Sport │  │   │
│   │  └──────┘ └──────┘ └──────┘ └──────┘  │   │
│   │  ┌──────┐ ┌──────┐                     │   │
│   │  │ 🏋️   │ │ 🌳   │                     │   │
│   │  │Work  │ │Hike  │                     │   │
│   │  └──────┘ └──────┘                     │   │
│   │                                         │   │
│   │  Exposure Duration                      │   │
│   │  ◉ < 30 min   ○ 30–60 min   ○ > 60 min │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  👤 PERSONAL FACTORS  (Optional)  [▾]   │   │  ← Card 3, collapsible
│   │  ─────────────────────────────────────  │   │
│   │  Age Group                              │   │
│   │  ○ Child (<12)  ◉ Adult  ○ Senior (60+) │   │
│   │                                         │   │
│   │  Health Conditions                      │   │
│   │  ☐ Heart condition   ☐ Diabetes         │   │
│   │  ☐ Respiratory       ☐ Pregnant         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│       [ 🌡️  CALCULATE MY HEAT RISK  →  ]        │  ← CTA Button (full-width)
│                                                 │
└─────────────────────────────────────────────────┘
```

**Component States:**
- Weather inputs auto-populate from API response on page load; show a subtle loading shimmer during fetch
- If API fails, show a small amber banner: `⚠ Using mock weather data` just below the header
- Activity type cards: default = unselected (slate-800 bg), selected = colored border + subtle bg tint matching risk accent
- CTA button: disabled (slate-600, not-allowed cursor) until Activity Type is selected; enabled state = gradient bg matching risk level color

---

#### SCREEN 2 — Results / Dashboard Screen

**Layout:** Single-column, max-width 720px, centered, scrollable.

```
┌─────────────────────────────────────────────────┐
│  ← Back    🌡️ HeatGuard        [Recalculate ↺]   │  ← Header
├─────────────────────────────────────────────────┤
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │                                         │   │
│   │          🟠 HIGH RISK                   │   │  ← Hero Risk Card
│   │           Score: 72 / 100               │   │    (border-color = risk color)
│   │                                         │   │    (bg glow = risk color at 20% opacity)
│   │  38°C · 72% humidity · Running · 30min  │   │
│   │  Mumbai · 2:00 PM · Adult               │   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  📋 WHY THIS RISK LEVEL                 │   │  ← Explanation Card
│   │  ─────────────────────────────────────  │   │
│   │  • Heat Index: 45°C (feels like)        │   │
│   │  • High-intensity activity adds 6 pts   │   │
│   │  • Peak sun hour (2 PM) adds 8 pts      │   │
│   │  • Humidity above 65% adds 5 pts        │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  ⏰ SAFE TIME WINDOWS — TODAY            │   │  ← 24h Strip Card
│   │  ─────────────────────────────────────  │   │
│   │  Hour  0  1  2  3  4  5  6  7  8  9...  │   │
│   │       🟢 🟢 🟢 🟢 🟢 🟢 🟡 🟡 🟠 🔴...  │   │
│   │                                         │   │
│   │  🟢 Low (0-5h)   Recommended now ✓      │   │
│   │  🟡 Moderate (6-8h)                     │   │
│   │  🟠 High (9-18h)  ← You are here        │   │
│   │  🔴 Extreme (none today)                │   │
│   │                                         │   │
│   │  Best windows: 5:00 AM – 7:00 AM        │   │
│   │               7:00 PM – 9:00 PM         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  💡 SAFETY RECOMMENDATIONS              │   │  ← Recommendations Card
│   │  ─────────────────────────────────────  │   │
│   │  ⚠️  Avoid this activity at this time   │   │  ← Primary action (bold)
│   │                                         │   │
│   │  ✓ Reschedule to before 7 AM            │   │
│   │  ✓ Drink 500ml water 30min before       │   │
│   │  ✓ Wear light, breathable clothing      │   │
│   │  ✓ Use SPF 50+ sunscreen                │   │
│   │  ✓ Take breaks every 10 minutes         │   │
│   │  ✓ Carry oral rehydration salts         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 4.3 Component Library

#### `<RiskBadge level="high" />`
- Pill-shaped badge
- Background: `--badge-{level}-bg`
- Text: risk-level color
- Border: 1px solid risk-level color at 40% opacity
- Font: 12px semibold uppercase
- Icon: color dot on left

#### `<RiskScoreGauge score={72} level="high" />`
- Circular arc gauge (SVG, 140px diameter)
- Track: slate-700
- Fill arc: risk-level color, animated fill on mount (0 → score, 600ms ease-out)
- Center: large score number + "/100" below it

#### `<ActivityCard type="running" selected={true} />`
- 72×80px card
- Emoji icon (28px) centered
- Label (11px, medium) below
- Unselected: bg slate-800, border slate-700
- Selected: border 2px risk-accent color, bg tinted

#### `<TimeWindowStrip data={hourlyData} />`
- Horizontal scrollable row of 24 squares
- Each square: 32×32px, colored by risk level
- Current hour: outlined with white 2px border
- On hover: tooltip shows `"14:00 — High Risk (score: 72)"`

#### `<RecommendationItem text="..." type="warning|tip|action" />`
- Row with leading icon (⚠️ / ✓ / →)
- Icon color matches type
- Text: text-base, text-primary
- Subtle bottom border (slate-700)

#### `<DataSourceBanner source="live|mock" />`
- Small banner at top
- Live: `🟢 Live weather data` (green dot)
- Mock: `🟡 Demo mode — mock weather data` (amber dot)
- Font: text-xs, text-secondary

#### `<InputField label="" value="" unit="" />`
- Dark bg (slate-700)
- Label: text-xs, text-secondary, uppercase tracking-wide
- Value: text-xl, text-primary
- Unit (°C / %): text-sm, text-muted, right-aligned
- Up/down arrows for increment
- Focus ring: sky-400 glow

---

### 4.4 Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Mobile (`< 640px`) | Full-width cards, stacked; activity cards 2×3 grid; 24h strip scrolls horizontally |
| Tablet (`640–1024px`) | Centered 640px container; activity cards 3×2 grid |
| Desktop (`> 1024px`) | Centered 720px container; Input screen may show 2-column layout (weather + user) |

---

### 4.5 Interaction & Animation

| Interaction | Behavior |
|---|---|
| Page load | Fade-in (opacity 0→1, 300ms); weather fields populate with slide-up from below |
| Activity card select | Scale 1→0.96→1.02→1 (100ms), border color transition 200ms |
| CTA button hover | Slight brightness increase + box-shadow expansion |
| Screen transition (Input → Results) | Slide right out + slide in from right, 350ms ease |
| Risk score gauge | Arc draws from 0 to final value, 600ms ease-out, with counter tick-up |
| Time strip | Hourly squares animate in left to right, 20ms stagger per cell |
| Recommendation items | Staggered fade+translate-up, 40ms per item |
| API loading state | Skeleton shimmer on weather inputs; spinner on CTA button |

---

## 5. Frontend Architecture

### Technology Stack

```
Framework:       React 18 (with Vite)
Language:        TypeScript
Styling:         Tailwind CSS + CSS Variables (design tokens)
State Mgmt:      Zustand (lightweight global store)
HTTP Client:     Axios
Animations:      Framer Motion
Icons:           Lucide React
Forms:           React Hook Form + Zod validation
Charts/SVG:      Custom SVG components (no charting lib needed)
```

### Key Pages / Routes

```
/          → Input Screen (default)
/results   → Dashboard Screen (redirect here after calculation)
```

### Component Tree

```
<App>
  <DataSourceBanner />
  <Header />
  <Router>
    <Route path="/" element={<InputScreen />}>
      <WeatherPanel />
        <LocationSelector />
        <NumericInput name="temperature" />
        <NumericInput name="humidity" />
        <NumericInput name="currentHour" />
      <ActivityPanel />
        <ActivityCard /> × 6
        <DurationSelector />
      <PersonalFactorsPanel collapsible />
        <AgeGroupSelector />
        <HealthConditionsChecklist />
      <CalculateButton />
    </Route>
    <Route path="/results" element={<ResultsScreen />}>
      <HeroRiskCard />
        <RiskBadge />
        <RiskScoreGauge />
        <InputSummary />
      <ExplanationCard />
      <TimeWindowCard />
        <TimeWindowStrip />
        <BestWindowsSummary />
      <RecommendationsCard />
        <RecommendationItem /> × n
      <ActionButtons />
    </Route>
  </Router>
  <Footer />
</App>
```

### Zustand Store Shape

```typescript
interface HeatGuardStore {
  // Weather
  weatherSource: 'live' | 'mock';
  weatherData: WeatherData | null;
  hourlyForecast: HourlyEntry[];

  // User Input
  userInput: UserInput;

  // Results
  riskResult: RiskResult | null;

  // UI
  isLoading: boolean;
  error: string | null;

  // Actions
  setWeatherData: (data: WeatherData) => void;
  setUserInput: (input: Partial<UserInput>) => void;
  calculate: () => void;
  reset: () => void;
}
```

---

## 6. Backend Architecture

### Technology Stack

```
Runtime:     Node.js 20
Framework:   Express.js
Language:    TypeScript
Validation:  Zod
HTTP Client: Axios (for weather API calls)
CORS:        cors middleware
Env Config:  dotenv
```

### Endpoints Summary

```
GET  /api/weather?city={city}     → Fetch current weather (live or mock)
POST /api/calculate               → Run heat risk calculation
GET  /api/mock/hourly             → Return 24-hour mock forecast
GET  /health                      → Health check
```

### Middleware Stack

```
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(rateLimiter)        // 60 req/min per IP
app.use(inputValidator)     // Zod schema validation
app.use(errorHandler)       // Catch-all error formatter
```

---

## 7. Core Algorithm — Heat Risk Engine

### Step 1: Heat Index Calculation (Steadman formula, simplified)

```
Input: temperature T (°C), humidity H (%)

Convert T to Fahrenheit:
  Tf = (T × 9/5) + 32

Steadman Heat Index (°F):
  HI = -42.379
     + 2.04901523 × Tf
     + 10.14333127 × H
     − 0.22475541 × Tf × H
     − 0.00683783 × Tf²
     − 0.05391554 × H²
     + 0.00122874 × Tf² × H
     + 0.00085282 × Tf × H²
     − 0.00000199 × Tf² × H²

Convert back to Celsius:
  HeatIndex_C = (HI - 32) × 5/9
```

### Step 2: Base Risk Score

```
Base Risk Score (0–100) from Heat Index:

  HeatIndex_C  |  Base Score
  < 27°C       |  0–20    (Low)
  27–32°C      |  20–40   (Moderate)
  32–41°C      |  40–65   (High)
  41–54°C      |  65–85   (Very High)
  > 54°C       |  85–100  (Extreme)

Formula:
  if HI_C < 27:
    base = (HI_C / 27) × 20
  elif HI_C < 32:
    base = 20 + ((HI_C - 27) / 5) × 20
  elif HI_C < 41:
    base = 40 + ((HI_C - 32) / 9) × 25
  elif HI_C < 54:
    base = 65 + ((HI_C - 41) / 13) × 20
  else:
    base = 85 + min((HI_C - 54) / 10 × 15, 15)
```

### Step 3: Activity Modifier

```
Activity Type     | MET Value | Score Modifier
Walking           | 3.5       | +0
Running           | 8.0       | +6
Cycling           | 6.0       | +4
Sports            | 7.0       | +5
Outdoor Labor     | 5.0       | +3
Hiking            | 6.5       | +5
```

### Step 4: Duration Modifier

```
Duration          | Score Modifier
< 30 minutes      | +0
30–60 minutes     | +5
> 60 minutes      | +10
```

### Step 5: Time-of-Day Modifier

```
Hour (24h)        | Modifier
00:00 – 05:59     | -5   (coolest)
06:00 – 08:59     | +0   (morning)
09:00 – 10:59     | +4
11:00 – 14:59     | +10  (peak heat)
15:00 – 16:59     | +8
17:00 – 18:59     | +4
19:00 – 23:59     | +0
```

### Step 6: Personal Risk Modifier

```
Age Group         | Modifier
Child (< 12)      | +8
Adult (12–59)     | +0
Senior (60+)      | +10

Health Conditions (cumulative, max +15):
Heart condition   | +6
Diabetes          | +4
Respiratory       | +5
Pregnant          | +7
```

### Step 7: Final Score & Classification

```
finalScore = clamp(base + activityMod + durationMod + timeMod + personalMod, 0, 100)

Classification:
  0–25   → LOW      🟢  Safe to proceed
  26–50  → MODERATE 🟡  Proceed with caution
  51–75  → HIGH     🟠  Avoid or significantly modify
  76–100 → EXTREME  🔴  Do not proceed
```

### Step 8: Time Window Analysis (24-hour)

For each hour h in 0..23:
1. Use hourly temperature T[h] and humidity H[h] from forecast data
2. Apply time-of-day modifier for hour h
3. Keep all other modifiers (activity, duration, personal) constant
4. Compute finalScore[h]
5. Classify each hour
6. Identify contiguous blocks of "Low" and "Moderate" hours as recommended windows

```
Output:
  hourlyRisk: Array<{ hour: number, score: number, level: RiskLevel }>
  safeWindows: Array<{ start: number, end: number, level: 'low' | 'moderate' }>
  bestWindow: { start: number, end: number }   // longest safe contiguous block
```

### Step 9: Recommendation Generation

Rules engine (ordered by priority):

```typescript
const recommendations = [];

if (level === 'extreme') {
  recommendations.push({ type: 'warning', text: 'Do NOT perform this activity outdoors today.' });
} else if (level === 'high') {
  recommendations.push({ type: 'warning', text: 'Avoid this activity at this time of day.' });
} else if (level === 'moderate') {
  recommendations.push({ type: 'action', text: 'Proceed with caution and monitor symptoms.' });
} else {
  recommendations.push({ type: 'action', text: 'Conditions are safe. Enjoy your activity!' });
}

if (bestWindow) {
  recommendations.push({ type: 'tip', text: `Best window today: ${bestWindow.start}:00 – ${bestWindow.end}:00` });
}

// Always-on tips
if (score > 40) recommendations.push({ type: 'tip', text: 'Drink at least 500ml of water before starting.' });
if (score > 50) recommendations.push({ type: 'tip', text: 'Take a break every 10–15 minutes in shade.' });
if (score > 60) recommendations.push({ type: 'tip', text: 'Wear light-colored, loose-fitting clothing.' });
if (score > 70) recommendations.push({ type: 'tip', text: 'Have oral rehydration salts available.' });
if (age === 'senior' || age === 'child') {
  recommendations.push({ type: 'tip', text: 'Extra caution required for your age group.' });
}
if (healthConditions.includes('heart')) {
  recommendations.push({ type: 'warning', text: 'Consult your doctor before outdoor exertion in heat.' });
}
```

---

## 8. API Contract

### `GET /api/weather?city={city}`

**Request:**
```
Query Params:
  city: string (e.g. "Mumbai")
```

**Success Response (200):**
```json
{
  "source": "live",
  "city": "Mumbai",
  "temperature": 38,
  "humidity": 72,
  "currentHour": 14,
  "description": "Hazy sunshine",
  "hourlyForecast": [
    { "hour": 0, "temperature": 28, "humidity": 80 },
    { "hour": 1, "temperature": 27, "humidity": 81 },
    ...
    { "hour": 23, "temperature": 30, "humidity": 76 }
  ]
}
```

**Fallback Response (200, API unavailable):**
```json
{
  "source": "mock",
  "city": "Mumbai",
  "temperature": 36,
  "humidity": 70,
  "currentHour": 14,
  "description": "Mock data — API unavailable",
  "hourlyForecast": [ ... ]
}
```

---

### `POST /api/calculate`

**Request Body:**
```json
{
  "temperature": 38,
  "humidity": 72,
  "currentHour": 14,
  "activityType": "running",
  "duration": "30-60",
  "ageGroup": "adult",
  "healthConditions": ["heart"],
  "hourlyForecast": [
    { "hour": 0, "temperature": 28, "humidity": 80 },
    ...
  ]
}
```

**Success Response (200):**
```json
{
  "score": 72,
  "level": "high",
  "heatIndex": 45.2,
  "scoreBreakdown": {
    "base": 52,
    "activityModifier": 6,
    "durationModifier": 5,
    "timeModifier": 10,
    "personalModifier": 6,
    "total": 79
  },
  "explanations": [
    "Heat Index of 45.2°C indicates dangerously high apparent temperature",
    "High-intensity activity (running) adds significant metabolic heat",
    "Peak sun hour (2 PM) is the hottest part of the day",
    "Heart condition increases heat sensitivity"
  ],
  "hourlyRisk": [
    { "hour": 0, "score": 18, "level": "low" },
    { "hour": 1, "score": 16, "level": "low" },
    ...
    { "hour": 14, "score": 79, "level": "high" }
  ],
  "safeWindows": [
    { "start": 0, "end": 6, "level": "low" },
    { "start": 19, "end": 22, "level": "moderate" }
  ],
  "bestWindow": { "start": 5, "end": 7 },
  "recommendations": [
    { "type": "warning", "text": "Avoid this activity at this time of day." },
    { "type": "tip", "text": "Best window today: 5:00 – 7:00" },
    { "type": "tip", "text": "Drink at least 500ml of water before starting." },
    { "type": "tip", "text": "Take a break every 10–15 minutes in shade." },
    { "type": "tip", "text": "Wear light-colored, loose-fitting clothing." },
    { "type": "warning", "text": "Consult your doctor before outdoor exertion in heat." }
  ]
}
```

**Validation Error (400):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input",
  "details": [
    { "field": "temperature", "message": "Must be between 20 and 50" }
  ]
}
```

---

## 9. Data Models & Schemas

### TypeScript Types

```typescript
type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

type ActivityType = 'walking' | 'running' | 'cycling' | 'sports' | 'labor' | 'hiking';

type DurationCategory = '<30' | '30-60' | '>60';

type AgeGroup = 'child' | 'adult' | 'senior';

type HealthCondition = 'heart' | 'diabetes' | 'respiratory' | 'pregnant';

interface HourlyEntry {
  hour: number;          // 0–23
  temperature: number;   // °C
  humidity: number;      // %
}

interface UserInput {
  temperature: number;
  humidity: number;
  currentHour: number;
  activityType: ActivityType;
  duration: DurationCategory;
  ageGroup: AgeGroup;
  healthConditions: HealthCondition[];
  hourlyForecast: HourlyEntry[];
}

interface ScoreBreakdown {
  base: number;
  activityModifier: number;
  durationModifier: number;
  timeModifier: number;
  personalModifier: number;
  total: number;
}

interface TimeWindow {
  start: number;
  end: number;
  level: 'low' | 'moderate';
}

interface Recommendation {
  type: 'warning' | 'tip' | 'action';
  text: string;
}

interface RiskResult {
  score: number;
  level: RiskLevel;
  heatIndex: number;
  scoreBreakdown: ScoreBreakdown;
  explanations: string[];
  hourlyRisk: Array<{ hour: number; score: number; level: RiskLevel }>;
  safeWindows: TimeWindow[];
  bestWindow: TimeWindow | null;
  recommendations: Recommendation[];
}
```

---

## 10. Weather Data Strategy (API + Fallback)

### Primary: OpenWeatherMap API

```
API: https://api.openweathermap.org/data/2.5/forecast
Endpoint: /forecast?q={city}&appid={API_KEY}&units=metric
Extracts: temp, humidity, dt (hour) from 3-hourly forecast
Interpolates to 24 hourly entries
```

### Fallback: Mock Dataset

Triggered when:
- `OPENWEATHER_API_KEY` is not set
- API returns non-200 status
- Network timeout (5s threshold)
- Rate limit exceeded

Mock data simulates a realistic Mumbai summer day:

```typescript
const MOCK_HOURLY: HourlyEntry[] = [
  { hour: 0,  temperature: 28, humidity: 82 },
  { hour: 1,  temperature: 27, humidity: 84 },
  { hour: 2,  temperature: 27, humidity: 85 },
  { hour: 3,  temperature: 26, humidity: 86 },
  { hour: 4,  temperature: 26, humidity: 86 },
  { hour: 5,  temperature: 27, humidity: 84 },
  { hour: 6,  temperature: 28, humidity: 82 },
  { hour: 7,  temperature: 30, humidity: 78 },
  { hour: 8,  temperature: 33, humidity: 74 },
  { hour: 9,  temperature: 35, humidity: 70 },
  { hour: 10, temperature: 37, humidity: 68 },
  { hour: 11, temperature: 38, humidity: 66 },
  { hour: 12, temperature: 39, humidity: 65 },
  { hour: 13, temperature: 40, humidity: 64 },
  { hour: 14, temperature: 40, humidity: 63 },
  { hour: 15, temperature: 39, humidity: 64 },
  { hour: 16, temperature: 38, humidity: 66 },
  { hour: 17, temperature: 37, humidity: 68 },
  { hour: 18, temperature: 35, humidity: 70 },
  { hour: 19, temperature: 33, humidity: 73 },
  { hour: 20, temperature: 32, humidity: 75 },
  { hour: 21, temperature: 31, humidity: 77 },
  { hour: 22, temperature: 30, humidity: 79 },
  { hour: 23, temperature: 29, humidity: 81 }
];
```

---

## 11. State Management & Data Flow

```
User opens app
     │
     ▼
[Frontend] GET /api/weather?city=Mumbai
     │
     ├─ API OK  → populate form fields, show "Live" badge
     └─ API fail → populate with mock, show "Mock" banner
     │
     ▼
User fills form → clicks Calculate
     │
     ▼
Zod validation (client-side)
     │
     ├─ Invalid → inline field errors, do not submit
     └─ Valid   → POST /api/calculate
     │
     ▼
[Backend] receives request
  → Zod schema validation
  → Run HeatRiskEngine.calculate(input)
  → Return RiskResult JSON
     │
     ▼
[Frontend] receives RiskResult
  → Store in Zustand
  → Navigate to /results
  → Animate in components
```

---

## 12. Error Handling & Edge Cases

| Scenario | Behavior |
|---|---|
| Weather API unavailable | Auto-switch to mock; amber banner shown |
| Temperature out of range (< 20 or > 50) | Zod error: "Must be between 20–50°C" shown inline |
| Humidity out of range | Zod error: "Must be between 20–100%" shown inline |
| No activity selected | CTA button stays disabled |
| API returns >5s | Timeout, fallback to mock |
| Network offline entirely | Show toast: "No connection — using demo data" |
| Hourly forecast missing | Time Window section hidden with message "Hourly data unavailable" |
| Score exactly = 50 | Classified as Moderate (lower bound inclusive: 51 = High) |
| All 24 hours are Extreme | `bestWindow = null`; recommendation says "No safe outdoor window today" |
| Health conditions: multiple selected | All modifiers are summed, capped at +15 |
| User is Senior + Heart condition | Both apply independently (not capped together) |

---

## 13. File & Folder Structure

```
heatguard/
├── client/                          # React frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── RiskBadge.tsx
│   │   │   │   ├── RiskScoreGauge.tsx
│   │   │   │   ├── ActivityCard.tsx
│   │   │   │   ├── TimeWindowStrip.tsx
│   │   │   │   ├── RecommendationItem.tsx
│   │   │   │   ├── NumericInput.tsx
│   │   │   │   ├── DataSourceBanner.tsx
│   │   │   │   └── SkeletonLoader.tsx
│   │   │   ├── panels/
│   │   │   │   ├── WeatherPanel.tsx
│   │   │   │   ├── ActivityPanel.tsx
│   │   │   │   └── PersonalFactorsPanel.tsx
│   │   │   └── cards/
│   │   │       ├── HeroRiskCard.tsx
│   │   │       ├── ExplanationCard.tsx
│   │   │       ├── TimeWindowCard.tsx
│   │   │       └── RecommendationsCard.tsx
│   │   ├── screens/
│   │   │   ├── InputScreen.tsx
│   │   │   └── ResultsScreen.tsx
│   │   ├── store/
│   │   │   └── useHeatGuardStore.ts
│   │   ├── api/
│   │   │   ├── weatherApi.ts
│   │   │   └── calculateApi.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── formatters.ts
│   │   ├── styles/
│   │   │   └── tokens.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── weather.ts
│   │   │   └── calculate.ts
│   │   ├── services/
│   │   │   ├── weatherService.ts    # API call + fallback logic
│   │   │   └── mockWeatherData.ts   # Static mock dataset
│   │   ├── engine/
│   │   │   ├── heatRiskEngine.ts    # Core algorithm
│   │   │   ├── modifiers.ts         # All modifier tables
│   │   │   └── recommendations.ts   # Rules engine
│   │   ├── middleware/
│   │   │   ├── validate.ts
│   │   │   └── errorHandler.ts
│   │   ├── schemas/
│   │   │   └── calculateSchema.ts   # Zod schemas
│   │   └── index.ts
│   ├── .env.example
│   └── tsconfig.json
│
├── shared/
│   └── types.ts                     # Shared TypeScript types
│
├── README.md
└── agent.md                         # ← This file
```

---

## 14. Constraints & Validation Rules

| Field | Min | Max | Allowed Values | Default |
|---|---|---|---|---|
| temperature | 20°C | 50°C | Integer or 1 decimal | — |
| humidity | 20% | 100% | Integer | — |
| currentHour | 0 | 23 | Integer | System time |
| activityType | — | — | walking, running, cycling, sports, labor, hiking | — |
| duration | — | — | `<30`, `30-60`, `>60` | — |
| ageGroup | — | — | child, adult, senior | adult |
| healthConditions | — | — | heart, diabetes, respiratory, pregnant | [] |
| hourlyForecast length | 0 | 24 | Array of HourlyEntry | [] |

### Validation Error Messages (user-facing)

```
temperature:   "Enter a temperature between 20°C and 50°C"
humidity:      "Enter humidity between 20% and 100%"
activityType:  "Please select an activity type"
duration:      "Please select an exposure duration"
```

---

## Appendix A: Risk Level Quick Reference

| Level | Score | Color | Icon | Meaning |
|---|---|---|---|---|
| Low | 0–25 | #22C55E | 🟢 | Safe to proceed normally |
| Moderate | 26–50 | #EAB308 | 🟡 | Proceed with precautions |
| High | 51–75 | #F97316 | 🟠 | Avoid or modify significantly |
| Extreme | 76–100 | #EF4444 | 🔴 | Do not proceed outdoors |

---

## Appendix B: Mock City Presets

| City | Base Temp (°C) | Base Humidity (%) | Climate Profile |
|---|---|---|---|
| Mumbai | 36 | 72 | Tropical coastal, humid |
| Delhi | 42 | 35 | Continental, dry summer |
| Chennai | 38 | 78 | Hot tropical, very humid |
| Bangalore | 30 | 55 | Mild, temperate |
| Kolkata | 37 | 75 | Humid subtropical |

---

*End of agent.md — HeatGuard Product Description Report*
*Version: 1.0 | Prepared for: Stitch → Figma → Antigravity pipeline*
