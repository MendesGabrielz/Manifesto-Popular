"use client";

import { useEffect, useState } from "react";

// ~R$ 1 trilhão por ano em juros da dívida pública
// (BCB, Estatísticas Fiscais: R$ 1,0076 tri em 2025, setor público consolidado)
const ANNUAL_INTEREST = 1_000_000_000_000;
const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
const PER_SECOND = ANNUAL_INTEREST / SECONDS_PER_YEAR; // ≈ R$ 31.709,79
const TICK_MS = 50;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const brlShort = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function LiveDebtCounter() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // O valor sai sempre do relógio, não da soma de ticks:
    // não acumula erro e continua certo se a aba ficar em segundo plano.
    const start = Date.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(
      () => setElapsed(Date.now() - start),
      reduceMotion ? 1000 : TICK_MS
    );
    return () => window.clearInterval(id);
  }, []);

  const amount = (elapsed / 1000) * PER_SECOND;
  const text = brl.format(amount);
  // O número cresce em dígitos com o tempo: a fonte encolhe para caber na largura
  const fontSize = `min(15vw, 14rem, ${(92 / (text.length * 0.6)).toFixed(2)}vw)`;

  return (
    <section
      id="contador"
      aria-labelledby="contador-titulo"
      className="relative overflow-hidden border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-center gap-3 font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-red-600">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
          </span>
          Ao vivo
          <span className="tabular-nums text-paper/50">{formatElapsed(elapsed)}</span>
        </div>

        <h2
          id="contador-titulo"
          className="max-w-4xl font-grotesk text-xl font-medium uppercase leading-snug tracking-wide text-paper/80 md:text-3xl"
        >
          Desde que você abriu esta página, o Estado brasileiro já transferiu para rentistas:
        </h2>

        {/* Leitores de tela recebem só a taxa, não 20 atualizações por segundo */}
        <p className="sr-only">
          Cerca de {brl.format(PER_SECOND)} por segundo em juros da dívida pública.
        </p>
        <p
          aria-hidden="true"
          className="mt-6 whitespace-nowrap font-grotesk font-bold leading-none tracking-tighter text-red-600 tabular-nums md:mt-10"
          style={{ fontSize }}
        >
          {text}
        </p>

        <div className="mt-12 grid gap-px border-y-2 border-paper/80 bg-paper/20 md:mt-16 md:grid-cols-3">
          {[
            { label: "Por segundo", value: brl.format(PER_SECOND) },
            { label: "Por hora", value: brlShort.format(PER_SECOND * 3600) },
            { label: "Por dia", value: brlShort.format(PER_SECOND * 86400) },
          ].map((s) => (
            <div key={s.label} className="bg-ink py-5 md:px-6 md:py-7 md:first:pl-0">
              <p className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-paper/50">
                {s.label}
              </p>
              <p className="mt-2 font-display text-5xl leading-none text-paper md:text-6xl">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-paper/45">
          Base de cálculo: cerca de R$ 1 trilhão por ano em juros nominais da dívida pública
          (Banco Central do Brasil, Estatísticas Fiscais: R$ 1,0076 trilhão em 2025, setor
          público consolidado), dividido pelos segundos do ano.
        </p>
      </div>
    </section>
  );
}
