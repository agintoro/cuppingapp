"use client";

import { useState } from "react";
import { ExternalLink, MessageCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lot } from "@/lib/types";

const AVAILABILITY_COLORS: Record<string, string> = {
  Available: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
  Limited: "bg-amber-900/40 text-amber-300 border-amber-700/50",
  Reserved: "bg-sky-900/40 text-sky-300 border-sky-700/50",
  "Sold Out": "bg-red-900/40 text-red-400 border-red-800/50",
  "Coming Soon": "bg-violet-900/40 text-violet-300 border-violet-700/50",
};

export function LotCard({ lot }: { lot: Lot }) {
  const [expanded, setExpanded] = useState(false);
  const waMsg = encodeURIComponent(
    `Hi, I'm interested in:\n*${lot.lotName}*\nOrigin: ${lot.origin}\nProcess: ${lot.process}\nAltitude: ${lot.altitude}\n\nPlease share availability and pricing.`
  );

  return (
    <article className="flex flex-col rounded-[26px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 min-h-[420px] transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="flex justify-between gap-4 items-start mb-4">
        <span
          className={cn(
            "text-xs font-bold px-3 py-1.5 rounded-full border",
            AVAILABILITY_COLORS[lot.availability] ??
              "bg-white/10 text-white/60 border-white/20"
          )}
        >
          {lot.availability}
        </span>
        <span className="text-xs text-white/40 font-mono">{lot.altitude}</span>
      </div>

      <h3 className="font-serif text-2xl text-white/90 mb-1 leading-tight">{lot.lotName}</h3>
      <p className="text-sm text-white/40 mb-4">{lot.origin} · {lot.region}</p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
        {[
          ["Process", lot.process],
          ["Varietals", lot.varietals],
          ["Farm", lot.farm],
          ["Use", lot.recommendedUse],
        ].map(([k, v]) => (
          <div key={k}>
            <span className="text-white/30 uppercase tracking-wider block">{k}</span>
            <span className="text-white/70">{v}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {lot.tastingNotes.map((note) => (
          <span
            key={note}
            className="text-xs border border-white/[0.1] rounded-full px-2.5 py-1 text-white/50"
          >
            {note}
          </span>
        ))}
      </div>

      <p className="text-sm text-white/50 leading-relaxed mb-auto">{lot.buyerDescription}</p>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2 text-sm text-white/50">
          <p><span className="text-white/30">Process Details: </span>{lot.processDetails}</p>
          <p><span className="text-white/30">Price: </span>{lot.pricePerKg}</p>
          <p><span className="text-white/30">Min Order: </span>{lot.minimumOrder}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.08]">
        <button
          onClick={() => setExpanded((p) => !p)}
          className="text-xs font-bold border border-white/[0.12] rounded-full px-3 py-2 text-white/60 hover:border-white/30 hover:text-white/80 transition-colors"
        >
          <FileText className="inline w-3 h-3 mr-1" />
          {expanded ? "Less" : "Details"}
        </button>
        <a
          href={`https://wa.me/?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold border border-white/[0.12] rounded-full px-3 py-2 text-white/60 hover:border-green-500/40 hover:text-green-400 transition-colors"
        >
          <MessageCircle className="inline w-3 h-3 mr-1" />
          Inquire
        </a>
      </div>
    </article>
  );
}
