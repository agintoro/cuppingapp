import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { LotCard } from "@/components/ui/lot-card";
import { ProcessCard } from "@/components/ui/process-card";
import lotsData from "@/data/lots.json";
import processesData from "@/data/processes.json";
import type { Lot, Process } from "@/lib/types";
import { ArrowDown, Instagram } from "lucide-react";

const lots = lotsData as Lot[];
const processes = processesData as Process[];

export default function Home() {
  return (
    <main>
      {/* ── TOPBAR ───────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-5 md:px-14 h-[68px] backdrop-blur-[18px] bg-black/30 border-b border-white/[0.06]">
        <a href="#home" className="flex items-center gap-3 text-white no-underline group">
          <span className="w-10 h-10 rounded-full bg-white grid place-items-center text-black font-extrabold text-sm shrink-0 group-hover:bg-white/90 transition-colors">
            D
          </span>
          <span>
            <strong className="block text-sm font-bold tracking-tight">DRIVN</strong>
            <small className="block text-[10px] text-white/40 -mt-0.5 uppercase tracking-widest">
              Driva Coffee Processing
            </small>
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="#processes" className="hidden md:block text-sm text-white/50 hover:text-white transition-colors">
            Processes
          </a>
          <a href="#lots" className="hidden md:block text-sm text-white/50 hover:text-white transition-colors">
            Lots
          </a>
          <a href="#intelligence" className="hidden md:block text-sm text-white/50 hover:text-white transition-colors">
            Quality
          </a>
          <a
            href="https://instagram.com/drivacoffee"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold border border-white/[0.12] rounded-full px-4 py-2 text-white/60 hover:border-white/30 hover:text-white transition-all"
          >
            <Instagram className="w-3.5 h-3.5" />
            @drivacoffee
          </a>
        </nav>
      </header>

      {/* ── HERO (HeroGeometric as background) ───────────────── */}
      <section id="home">
        <HeroGeometric
          badge="West Java Microlot Catalogue"
          title1="Tracing coffee"
          title2="to its soul."
          description="A buyer-facing catalogue for Driva lots, process systems, tasting notes, and availability. Indragiri & Palawija · West Java · 1600–1800 MASL."
        >
          {/* CTA buttons rendered inside the HeroGeometric content */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a
              href="#lots"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Explore Lots
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#processes"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/[0.2] text-white/70 font-medium text-sm hover:border-white/40 hover:text-white transition-all"
            >
              See Process System
            </a>
          </div>

          {/* Origin panel — shown below CTA */}
          <div className="mt-12 max-w-lg mx-auto border border-white/[0.08] rounded-2xl bg-white/[0.03] backdrop-blur-sm p-5 text-left divide-y divide-white/[0.06]">
            {[
              ["Origin", "Indragiri / Palawija / West Java"],
              ["Core Altitude", "1600–1800 MASL"],
              ["Use Case", "Filter / Espresso / Roaster Samples"],
              ["System", "Lot → Process → Flavor DNA → Inquiry"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-3.5 text-sm">
                <span className="text-white/40">{label}</span>
                <strong className="text-white/80 text-right">{value}</strong>
              </div>
            ))}
          </div>
        </HeroGeometric>
      </section>

      {/* ── PROCESSES ────────────────────────────────────────── */}
      <section
        id="processes"
        className="relative z-10 py-20 md:py-28 px-5 md:px-14 border-t border-white/[0.06]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-[1fr_0.8fr] gap-10 items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30 font-bold mb-3">
                The Collections
              </p>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white/90 leading-none">
                Process systems,<br />not random names.
              </h2>
            </div>
            <p className="text-base md:text-lg text-white/40 leading-relaxed">
              Each process is treated like a collection: clear purpose, sensory direction, and
              operational logic. This keeps the buyer journey sharp instead of becoming a
              coffee-word swamp.
            </p>
          </div>

          <div className="[&>*:last-child]:border-b [&>*:last-child]:border-white/[0.08]">
            {processes.map((p) => (
              <ProcessCard key={p.name} process={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOTS ─────────────────────────────────────────────── */}
      <section
        id="lots"
        className="relative z-10 py-20 md:py-28 px-5 md:px-14 border-t border-white/[0.06]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/30 font-bold mb-3">
                Available / Editable Lots
              </p>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white/90 leading-none">
                Buyer-ready<br />lot library.
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────────── */}
      <section
        id="intelligence"
        className="relative z-10 py-20 md:py-28 px-5 md:px-14 border-t border-white/[0.06] bg-white/[0.015]"
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-white/30 font-bold mb-3">
            Processing Intelligence
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white/90 max-w-3xl leading-tight mb-14">
            Built for buyers who care about repeatability, clarity, and controlled expression.
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "Traceable",
                body: "Origin, region, farm, producer, varietal, altitude, and process data are kept visible on every lot card.",
              },
              {
                num: "02",
                title: "Technical",
                body: "Process details, moisture, water activity, and recommended use are prepared for serious roaster evaluation.",
              },
              {
                num: "03",
                title: "Actionable",
                body: "Every lot can generate a WhatsApp inquiry with structured lot information for fast, direct communication.",
              },
            ].map((p) => (
              <article
                key={p.num}
                className="border border-white/[0.08] rounded-[26px] p-6 bg-white/[0.025] hover:bg-white/[0.04] transition-colors"
              >
                <span className="font-serif text-[42px] text-white/20 block mb-4">{p.num}</span>
                <h3 className="font-serif text-2xl text-white/80 mb-3">{p.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="relative z-10 flex flex-col md:flex-row justify-between gap-5 px-5 md:px-14 py-8 border-t border-white/[0.06] text-white/40 text-sm">
        <div>
          <strong className="text-white/70 block mb-1">DRIVN</strong>
          <p>Driva Coffee Processing — Tracing Coffee To Its Soul</p>
        </div>
        <a
          href="https://instagram.com/drivacoffee"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-white/70 hover:text-white transition-colors self-start md:self-center"
        >
          @drivacoffee
        </a>
      </footer>
    </main>
  );
}
