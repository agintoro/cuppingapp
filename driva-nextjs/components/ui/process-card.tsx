import { cn } from "@/lib/utils";
import type { Process } from "@/lib/types";

export function ProcessCard({ process }: { process: Process }) {
  return (
    <div className="grid grid-cols-[56px_1fr_minmax(200px,0.5fr)] md:grid-cols-[90px_1fr_minmax(240px,0.5fr)] gap-6 items-center py-8 border-t border-white/[0.08] group">
      <span className="font-serif text-3xl md:text-[42px] text-white/30 group-hover:text-white/50 transition-colors">
        {process.number}
      </span>
      <h3 className="font-serif text-2xl md:text-[clamp(32px,5vw,70px)] text-white/80 group-hover:text-white transition-colors leading-none">
        {process.name}
      </h3>
      <div>
        <span className="text-xs uppercase tracking-widest text-white/30 block mb-2">
          {process.category}
        </span>
        <p className="text-sm text-white/40 leading-relaxed">{process.description}</p>
      </div>
    </div>
  );
}
