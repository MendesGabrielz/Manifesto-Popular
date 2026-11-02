"use client";

import { useCallback } from "react";
import { CreditCard } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import {
  CARD_DEBT,
  CARD_YEARLY_RATE,
  LEGAL_CAP_MULTIPLIER,
  MONTHS_TO_DOUBLE,
  brl,
  cardDebtAfter,
  intBR,
} from "@/lib/inequality";

const W = 320;
const H = 120;
const MONTHS = Array.from({ length: 13 }, (_, m) => m);

// Curva dos 12 meses: sem teto (pontilhada) e com o teto da lei (cheia)
function Curve({ capped }: { capped: boolean }) {
  const max = cardDebtAfter(12, CARD_DEBT, false);
  const pts = MONTHS.map((m) => {
    const x = (m / 12) * W;
    const y = H - (cardDebtAfter(m, CARD_DEBT, capped) / max) * (H - 6);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <polyline
      points={pts.join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={capped ? 3 : 2}
      strokeDasharray={capped ? undefined : "4 5"}
      strokeLinejoin="round"
    />
  );
}

export default function CardTrapCard({ salary }: { salary: number }) {
  const uncapped = cardDebtAfter(12, CARD_DEBT, false);
  const capped = CARD_DEBT * LEGAL_CAP_MULTIPLIER;
  const salaryShare = salary > 0 ? (capped / salary) * 100 : 0;
  const formatPercent = useCallback((n: number) => `${intBR.format(n)}%`, []);

  return (
    <article className="relative flex flex-col justify-between gap-8 border-2 border-paper/80 bg-ink p-6 text-paper md:p-10">
      <header className="flex items-start justify-between gap-4 border-b-2 border-paper/80 pb-3">
        <p className="font-grotesk text-xs font-bold uppercase tracking-[0.25em]">
          02 — A armadilha do rotativo
        </p>
        <CreditCard className="h-7 w-7 text-red-600" strokeWidth={1.5} />
      </header>

      <div>
        <p className="font-grotesk text-lg font-medium leading-snug md:text-xl">
          Se hoje você não conseguir pagar {brl.format(CARD_DEBT)} da fatura, a{" "}
          {intBR.format(CARD_YEARLY_RATE * 100)}% ao ano, em 12 meses a dívida viraria
        </p>
        <p className="mt-2 font-display text-[clamp(3rem,8vw,6.5rem)] leading-none text-paper/35 line-through decoration-red-600 decoration-4">
          {brl.format(uncapped)}
        </p>
        <p className="mt-4 font-grotesk text-lg font-medium leading-snug md:text-xl">
          O teto da lei impede isso. Mesmo assim, em só{" "}
          <strong className="text-red-600">{Math.ceil(MONTHS_TO_DOUBLE)} meses</strong> o banco já
          pode cobrar
        </p>
        <p className="mt-2 font-display text-[clamp(4.5rem,13vw,11rem)] leading-[0.85] text-red-600">
          {brl.format(capped)}
        </p>
        <p className="mt-4 font-grotesk text-sm font-bold uppercase tracking-[0.15em] text-paper/70">
          O dobro do que você devia —{" "}
          <AnimatedNumber value={salaryShare} format={formatPercent} className="tabular-nums text-paper" />{" "}
          do seu salário.
        </p>

        <svg viewBox={`0 0 ${W} ${H + 18}`} className="mt-8 w-full max-w-md text-red-600" aria-hidden="true">
          <line x1="0" y1={H} x2={W} y2={H} stroke="currentColor" strokeOpacity="0.3" />
          <g className="text-paper/40">
            <Curve capped={false} />
          </g>
          <Curve capped />
          {[0, 6, 12].map((m) => (
            <text key={m} x={(m / 12) * W} y={H + 15} fill="currentColor" fillOpacity="0.5" fontSize="10" textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"}>
              {m === 0 ? "hoje" : `${m} meses`}
            </text>
          ))}
        </svg>
      </div>

      <footer className="border-t-2 border-paper/80 pt-3 text-[11px] leading-snug text-paper/50">
        Base: juro médio do rotativo de 438% ao ano (Banco Central, dez/2025), em juros compostos.
        A Lei 14.690/2023 limita juros e encargos a 100% da dívida original, sem contar o IOF; dívidas
        anteriores a 2024 podem ficar fora do teto.
      </footer>
    </article>
  );
}
