"use client";

import { useCallback, useEffect, useState } from "react";
import { Crown } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import { RICHEST, RICHEST_DAILY_GAIN, brlCompact, intBR, yearsToMatchRichestDay } from "@/lib/inequality";

export default function BillionaireCard({ salary }: { salary: number }) {
  const years = yearsToMatchRichestDay(salary);
  const formatYears = useCallback((n: number) => intBR.format(n), []);

  // Ano atual só no cliente, para não divergir do HTML gerado no build
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const startYear = year !== null ? Math.round(year - years) : null;

  return (
    <article className="relative flex flex-col justify-between gap-8 bg-paper p-6 text-ink md:p-10">
      <header className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3">
        <p className="font-grotesk text-xs font-bold uppercase tracking-[0.25em]">
          01 — O bilionário
        </p>
        <Crown className="h-7 w-7 text-red-600" strokeWidth={1.5} />
      </header>

      <div>
        <p className="font-grotesk text-lg font-medium leading-snug md:text-xl">
          Você precisaria trabalhar
        </p>
        <p className="mt-2 font-display leading-[0.85] text-red-600">
          <AnimatedNumber
            value={years}
            format={formatYears}
            className="block text-[clamp(4.5rem,13vw,11rem)] tabular-nums"
          />
          <span className="block text-[clamp(2.5rem,6vw,5rem)]">
            {Math.round(years) === 1 ? "ano" : "anos"}
          </span>
        </p>
        <p className="mt-4 max-w-md font-grotesk text-lg font-medium leading-snug md:text-xl">
          sem gastar um centavo para juntar o que a fortuna do brasileiro mais rico cresceu em{" "}
          <strong className="bg-ink px-1 text-paper">24 horas</strong>.
        </p>
        {startYear !== null && startYear < 0 && (
          <p className="mt-4 font-grotesk text-sm font-bold uppercase tracking-[0.15em] text-red-600">
            Teria que ter começado no ano {intBR.format(Math.abs(startYear))} a.C.
          </p>
        )}
        {startYear !== null && startYear >= 0 && (
          <p className="mt-4 font-grotesk text-sm font-bold uppercase tracking-[0.15em] text-red-600">
            Teria que ter começado no ano {startYear}.
          </p>
        )}
      </div>

      <footer className="border-t-2 border-ink pt-3 text-[11px] leading-snug text-ink/60">
        Base: a fortuna de {RICHEST.name} chegou a R$ 227 bilhões, alta de 45,5% em um ano — cerca
        de {brlCompact.format(RICHEST_DAILY_GAIN)} por dia. Fonte: {RICHEST.source}.
      </footer>
    </article>
  );
}
