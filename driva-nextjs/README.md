# DRIVN — Next.js + shadcn + Tailwind + TypeScript

This is the Next.js port of the DRIVN buyer portal for Driva Coffee Processing.

## Setup

### 1. Install dependencies

```bash
npm install
```

This installs:
- `next`, `react`, `react-dom` — framework
- `framer-motion` — floating shape animations in hero
- `lucide-react` — icons
- `tailwindcss`, `autoprefixer`, `postcss` — styling
- `clsx`, `tailwind-merge`, `class-variance-authority` — shadcn utilities
- TypeScript + type definitions

### 2. Why `/components/ui`?

This follows the **shadcn/ui** convention. When you run `npx shadcn@latest init`,
it places generated components in `components/ui/`. Keeping all UI primitives there:
- Allows `shadcn add <component>` to auto-place components correctly
- Gives a predictable import path: `@/components/ui/<component>`
- Separates UI primitives from feature-level components

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Add more shadcn components

```bash
npx shadcn@latest init        # first time — configures shadcn
npx shadcn@latest add button  # example: adds Button component to components/ui/
npx shadcn@latest add dialog  # adds Dialog
npx shadcn@latest add input   # adds Input
```

### 5. Build for production

```bash
npm run build
npm start
```

## Component: HeroGeometric

**Path:** `components/ui/shape-landing-hero.tsx`

Floating animated ellipse shapes over a dark background, built with framer-motion.

```tsx
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

<HeroGeometric
  badge="West Java Microlot Catalogue"
  title1="Tracing coffee"
  title2="to its soul."
  description="Your subtitle here."
>
  {/* Optional children rendered in the content area */}
  <a href="#lots" className="...">Explore Lots</a>
</HeroGeometric>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `badge` | `string` | `"Design Collective"` |
| `title1` | `string` | First line of heading |
| `title2` | `string` | Second line (gradient colored) |
| `description` | `string` | Subtitle text |
| `children` | `ReactNode` | CTA buttons, panels, etc. |

## Project Structure

```
driva-nextjs/
├── app/
│   ├── globals.css        # Tailwind + Google Fonts import
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page (hero + processes + lots + intelligence)
├── components/
│   └── ui/
│       ├── shape-landing-hero.tsx  ← HeroGeometric component
│       ├── lot-card.tsx            ← Lot display card
│       └── process-card.tsx        ← Process row card
├── data/
│   ├── lots.json          # Coffee lot data (from original zip)
│   └── processes.json     # Process collection data
├── lib/
│   ├── utils.ts           # cn() helper (clsx + tailwind-merge)
│   └── types.ts           # TypeScript interfaces for Lot, Process
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── next.config.js
└── package.json
```
