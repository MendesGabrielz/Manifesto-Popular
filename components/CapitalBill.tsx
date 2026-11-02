"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown,
  ArrowRight,
  Landmark,
  PlugZap,
  Receipt,
  Scale,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Theme = "paper" | "ink" | "blood";

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  // Conta de `from` até `value` (ex.: luz 100% → 0%)
  from?: number;
  label: string;
};

type LineItem = { desc: string; value: string; bar: number };

type Bill = {
  n: string;
  title: string;
  Icon: LucideIcon;
  theme: Theme;
  stat: Stat;
  text: string;
  items: LineItem[];
  total: string;
  stamp: string;
  source: string;
  flicker?: boolean;
};

const BILLS: Bill[] = [
  {
    n: "01",
    title: "O Monopólio Bancário",
    Icon: Landmark,
    theme: "paper",
    stat: { value: 438, suffix: "%", label: "de juros ao ano no rotativo do cartão (dez/2025)" },
    text: "Só quatro bancos — Banco do Brasil, Caixa, Itaú e Bradesco — concentram 57% de todo o crédito do país. Enquanto o rotativo do cartão cobra 438% de juros ao ano (desde 2024, a lei impede que a dívida passe do dobro do valor original), o Itaú fechou 2025 com R$ 46,8 bilhões de lucro, o maior da história dos bancos brasileiros em valores corrigidos pela inflação.",
    items: [
      { desc: "Juros do rotativo do cartão (a.a.)", value: "438%", bar: 1 },
      { desc: "Crédito nas mãos de 4 bancos", value: "57%", bar: 0.57 },
      { desc: "Lucro do Itaú em 2025", value: "R$ 46,8 bi", bar: 0.92 },
    ],
    total: "Seu salário",
    stamp: "Cobrado do povo",
    source: "Banco Central do Brasil — Relatório de Estabilidade Financeira (2025) e estatísticas de juros do cartão (dez/2025); balanço anual do Itaú Unibanco (2025)",
  },
  {
    n: "02",
    title: "Privatização e Apagão",
    Icon: PlugZap,
    theme: "ink",
    stat: { value: 0, from: 100, suffix: "%", label: "de luz. A promessa era eficiência." },
    text: "A promessa era eficiência. A realidade: o Amapá passou 22 dias no escuro em 2020 e a Enel deixou 2,1 milhões de clientes sem luz em São Paulo em 2023 — e 3,1 milhões em 2024. A privatização da energia e da água transformou infraestrutura básica em máquina de dividendos.",
    items: [
      { desc: "Amapá, nov/2020 — estado no escuro", value: "22 dias", bar: 0.7 },
      { desc: "São Paulo, nov/2023 — clientes sem luz", value: "2,1 mi", bar: 0.68 },
      { desc: "São Paulo, out/2024 — clientes sem luz", value: "3,1 mi", bar: 1 },
    ],
    total: "Tarifa + escuro",
    stamp: "Corte de serviço",
    source: "ONS / ANEEL (Amapá, 2020); ANEEL e Enel SP (São Paulo, 2023 e 2024)",
    flicker: true,
  },
  {
    n: "03",
    title: "A Fome e a Fartura",
    Icon: UtensilsCrossed,
    theme: "blood",
    stat: { value: 33.1, decimals: 1, suffix: " mi", label: "de brasileiros passando fome em 2022" },
    text: "Na pandemia, a fortuna dos bilionários brasileiros cresceu 30% — US$ 39,6 bilhões a mais —, enquanto em 2022 a fome chegou a 33,1 milhões de brasileiros (Rede Penssan). Desde então a fome recuou, mas 6,4 milhões ainda viviam em insegurança alimentar grave em 2024 (IBGE).",
    items: [
      { desc: "Fortuna dos bilionários na pandemia", value: "+30%", bar: 0.3 },
      { desc: "Fome em 2022 (Rede Penssan)", value: "33,1 mi", bar: 1 },
      { desc: "Fome grave em 2024 (IBGE)", value: "6,4 mi", bar: 0.19 },
    ],
    total: "Fome",
    stamp: "Pago com a fome",
    source: "Oxfam Brasil — A Desigualdade Mata (2022); Rede PENSSAN — II VIGISAN (2022); IBGE — PNAD Contínua, Segurança Alimentar (2024)",
  },
  {
    n: "04",
    title: "A Ilusão do Livre Mercado",
    Icon: Scale,
    theme: "paper",
    stat: { value: 7.9, decimals: 1, suffix: "%", label: "do PIB pagos em juros da dívida (2025)" },
    text: "Não existe livre mercado quando o Estado brasileiro paga mais de R$ 1 trilhão por ano em juros da dívida pública — 7,9% do PIB em 2025 —, com um dos juros reais mais altos do mundo, aos mesmos rentistas que exigem corte de gastos sociais.",
    items: [
      { desc: "Juros nominais do setor público, 2025", value: "R$ 1 tri", bar: 1 },
      { desc: "Juros nominais do setor público, 2024", value: "R$ 950 bi", bar: 0.94 },
      { desc: "Juro real brasileiro", value: "1º ou 2º do mundo", bar: 0.8 },
    ],
    total: "O orçamento",
    stamp: "Socializado",
    source: "Banco Central do Brasil — Estatísticas Fiscais, juros nominais do setor público consolidado (2024 e 2025); ranking de juros reais MoneYou / Lev Intelligence (2026)",
  },
];

const THEMES: Record<
  Theme,
  { card: string; muted: string; accent: string; rule: string; bar: string; track: string; stamp: string }
> = {
  paper: {
    card: "bg-paper text-ink",
    muted: "text-ink/60",
    accent: "text-rev-deep",
    rule: "border-ink",
    bar: "bg-rev-deep",
    track: "bg-ink/10",
    stamp: "border-rev-deep text-rev-deep mix-blend-multiply",
  },
  ink: {
    card: "bg-ink text-paper border-2 border-paper/80",
    muted: "text-paper/60",
    accent: "text-rev",
    rule: "border-paper/80",
    bar: "bg-rev",
    track: "bg-paper/10",
    stamp: "border-rev text-rev",
  },
  blood: {
    card: "bg-rev-deep text-paper",
    muted: "text-paper/75",
    accent: "text-ink",
    rule: "border-paper",
    bar: "bg-ink",
    track: "bg-paper/20",
    stamp: "border-paper text-paper",
  },
};

// Código de barras determinístico (mesmo HTML no servidor e no cliente)
function Barcode({ seed, className = "" }: { seed: number; className?: string }) {
  let s = seed;
  const bars = Array.from({ length: 46 }, () => {
    s = (s * 9301 + 49297) % 233280;
    return 1 + Math.floor((s / 233280) * 4);
  });
  return (
    <div className={`flex h-10 items-stretch gap-[2px] ${className}`} aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="bg-current" style={{ width: w }} />
      ))}
    </div>
  );
}

function formatStat(v: number, s: Stat) {
  const num = v.toLocaleString("pt-BR", {
    minimumFractionDigits: s.decimals ?? 0,
    maximumFractionDigits: s.decimals ?? 0,
  });
  return `${s.prefix ?? ""}${num}${s.suffix ?? ""}`;
}

/**
 * Anima o conteúdo de um card (contador, barras, carimbo, lâmpadas).
 * `st` monta o ScrollTrigger: no desktop ele é preso ao movimento horizontal
 * (containerAnimation); no mobile é um trigger vertical comum.
 */
function animateBill(
  card: HTMLElement,
  bill: Bill,
  st: (start: string, end?: string) => ScrollTrigger.Vars
) {
  const statEl = card.querySelector<HTMLElement>(".fc-stat")!;
  const obj = { v: bill.stat.from ?? 0 };
  statEl.textContent = formatStat(obj.v, bill.stat);

  // Contador: rola junto com o scroll (scrub), não por tempo
  gsap.to(obj, {
    v: bill.stat.value,
    ease: "power1.out",
    onUpdate: () => {
      statEl.textContent = formatStat(obj.v, bill.stat);
    },
    scrollTrigger: { ...st("start-counter", "end-counter"), scrub: true },
  });

  // Barras das linhas da fatura enchendo em sequência
  gsap.from(card.querySelectorAll(".fc-bar"), {
    scaleX: 0,
    stagger: 0.15,
    ease: "none",
    scrollTrigger: { ...st("start-bars", "end-bars"), scrub: true },
  });

  // Carimbo: bate quando o card chega ao ponto de leitura
  gsap.fromTo(
    card.querySelector(".fc-stamp"),
    { scale: 2.6, opacity: 0, rotate: -28 },
    {
      scale: 1,
      opacity: 1,
      rotate: -12,
      duration: 0.45,
      ease: "back.out(2.2)",
      scrollTrigger: { ...st("start-stamp"), toggleActions: "play none none reverse" },
    }
  );

  // Card 02: a luz pisca e apaga
  if (bill.flicker) {
    const bulbs = card.querySelectorAll(".fc-bulb");
    gsap
      .timeline({ scrollTrigger: { ...st("start-bars", "end-counter"), scrub: true } })
      .to(bulbs, { opacity: 0.15, stagger: { each: 0.04, from: "random" }, ease: "steps(3)" })
      .to(bulbs, { opacity: 0.9, stagger: { each: 0.02, from: "random" }, ease: "steps(2)" }, "<+0.2")
      .to(bulbs, { opacity: 0.05, stagger: { each: 0.03, from: "random" }, ease: "steps(4)" });
  }
}

// Pontos de início/fim de cada animação, por eixo
const POINTS = {
  horizontal: {
    "start-counter": "left 85%",
    "end-counter": "center center",
    "start-bars": "left 70%",
    "end-bars": "center 45%",
    "start-stamp": "center 60%",
  },
  vertical: {
    "start-counter": "top 85%",
    "end-counter": "center 60%",
    "start-bars": "top 70%",
    "end-bars": "bottom 80%",
    "start-stamp": "center 70%",
  },
} as const;

type PointKey = keyof (typeof POINTS)["horizontal"];

export default function CapitalBill() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, isMobile, reduceMotion } = ctx.conditions as Conditions;
        const cards = gsap.utils.toArray<HTMLElement>(".fc-card");

        // Sem animação: números finais; no desktop vira carrossel nativo
        if (reduceMotion) {
          cards.forEach((card, i) => {
            card.querySelector(".fc-stat")!.textContent = formatStat(BILLS[i].stat.value, BILLS[i].stat);
          });
          if (isDesktop) {
            section.current!.style.overflowX = "auto";
            return () => {
              section.current!.style.overflowX = "";
            };
          }
          return;
        }

        /* ───────────── DESKTOP (≥ 768px): scroll horizontal fixado ───────────── */
        if (isDesktop) {
          const el = track.current!;

          // Distância exata: tudo que excede a viewport.
          // Recalculada em todo refresh (resize, fontes carregadas, etc.).
          const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

          // Skew proporcional à velocidade da rolagem
          const skewTo = gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3.out" });
          const clampSkew = gsap.utils.clamp(-6, 6);
          // getVelocity() mantém o último valor quando a rolagem para,
          // então o skew volta a zero sozinho após um instante sem scroll.
          const settleSkew = gsap.delayedCall(0.12, () => skewTo(0)).pause();
          let current = -1;

          // Card mais próximo do centro da tela → contador "01 / 04".
          // Roda no update do tween (posição real, já suavizada pelo scrub).
          const updateCounter = () => {
            const mid = window.innerWidth / 2;
            let best = 0;
            let bestDist = Infinity;
            cards.forEach((c, i) => {
              const r = c.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - mid);
              if (d < bestDist) {
                bestDist = d;
                best = i;
              }
            });
            if (best !== current && counter.current) {
              current = best;
              counter.current.textContent = String(best + 1).padStart(2, "0");
            }
          };

          const horizontal = gsap.to(el, {
            x: () => -distance(),
            ease: "none", // linear: obrigatório para containerAnimation mapear 1:1
            onUpdate: updateCounter,
            scrollTrigger: {
              id: "capital-bill",
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                skewTo(clampSkew(self.getVelocity() / -400));
                settleSkew.restart(true);
              },
              onLeave: () => skewTo(0),
              onLeaveBack: () => skewTo(0),
            },
          });

          const pinned = {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          };

          // Camada de fundo em velocidade menor (parallax horizontal)
          gsap.to(".fc-bg-text", {
            x: () => -distance() * 0.35,
            ease: "none",
            scrollTrigger: { ...pinned, scrub: 0.8 },
          });

          gsap.to(".fc-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { ...pinned, scrub: true },
          });

          cards.forEach((card, i) => {
            // O card "se levanta" levemente ao entrar pela direita
            gsap.fromTo(
              card.querySelector(".fc-inner"),
              { yPercent: 6, rotate: 1.5 },
              {
                yPercent: 0,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left right",
                  end: "left 35%",
                  scrub: true,
                },
              }
            );

            animateBill(card, BILLS[i], (start, end) => ({
              trigger: card,
              containerAnimation: horizontal,
              start: POINTS.horizontal[start as PointKey],
              ...(end && { end: POINTS.horizontal[end as PointKey] }),
            }));
          });

          return () => skewTo(0);
        }

        /* ───────────── MOBILE (< 768px): pilha vertical, rolagem normal ───────────── */
        if (isMobile) {
          cards.forEach((card, i) => {
            // Cada fatura "sai da impressora": sobe e desenrola de cima para baixo
            gsap.from(card.querySelector(".fc-inner"), {
              y: 60,
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            });

            animateBill(card, BILLS[i], (start, end) => ({
              trigger: card,
              start: POINTS.vertical[start as PointKey],
              ...(end && { end: POINTS.vertical[end as PointKey] }),
            }));
          });
        }
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      id="fatura"
      ref={section}
      className="relative isolate overflow-hidden border-t border-paper/10 bg-zinc-950 md:h-svh"
    >
      {/* Texto de fundo em parallax (só desktop) */}
      <div
        aria-hidden="true"
        className="fc-bg-text text-outline pointer-events-none absolute left-0 top-1/2 -z-10 hidden -translate-y-1/2 select-none whitespace-nowrap font-display text-[42vh] leading-none opacity-[0.07] md:block"
      >
        A FATURA DO CAPITAL — A FATURA DO CAPITAL — A FATURA DO CAPITAL
      </div>

      {/* HUD: progresso e contador (só desktop) */}
      <div className="absolute inset-x-0 top-0 z-20 hidden h-[3px] bg-paper/10 md:block">
        <div className="fc-progress h-full origin-left scale-x-0 bg-rev-deep" />
      </div>
      <div className="pointer-events-none absolute bottom-8 left-10 z-20 hidden items-center gap-3 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/70 md:flex">
        <Receipt className="h-4 w-4 text-rev" />
        Fatura <span ref={counter} className="tabular-nums text-paper">01</span> / {String(BILLS.length).padStart(2, "0")}
      </div>

      {/* Mobile: coluna. Desktop: trilho horizontal */}
      <div
        ref={track}
        className="flex flex-col gap-6 px-4 py-24 md:h-full md:w-max md:flex-row md:items-center md:gap-12 md:py-0 md:pl-10 md:pr-[8vw] md:will-change-transform"
      >
        {/* Painel de abertura */}
        <div className="flex shrink-0 flex-col justify-between gap-10 md:h-[80svh] md:w-[46vw] md:gap-0">
          <div className="flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
            <span className="h-px w-12 bg-rev" />
            Os podres do sistema
          </div>
          <h2 className="font-display text-[clamp(3.5rem,20vw,10rem)] leading-[0.8] md:text-[10.5vw]">
            A fatura
            <br />
            <span className="text-rev-deep">do capital</span>
          </h2>
          <div className="max-w-md space-y-4">
            <p className="text-paper/65">
              O neoliberalismo prometeu eficiência e prosperidade. Entregou
              crises, concentração e uma conta que sempre chega para os mesmos.
            </p>
            <p className="flex items-center gap-3 font-grotesk text-sm uppercase tracking-[0.2em] text-paper/60">
              Confira os lançamentos
              <ArrowDown className="h-4 w-4 text-rev md:hidden" />
              <ArrowRight className="hidden h-4 w-4 text-rev md:block" />
            </p>
          </div>
        </div>

        {BILLS.map((bill, i) => {
          const t = THEMES[bill.theme];
          return (
            <article
              key={bill.n}
              className="fc-card relative w-full shrink-0 md:h-[84svh] md:w-[86vw] lg:w-[80vw] xl:w-[66vw] 2xl:w-[60vw]"
            >
              <div
                className={`fc-inner relative flex h-full flex-col overflow-hidden p-5 md:p-8 lg:p-10 ${t.card}`}
              >
                {/* Lâmpadas do card do apagão */}
                {bill.flicker && (
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-8 gap-3 p-6 opacity-40 md:grid-cols-8 md:grid-rows-6" aria-hidden="true">
                    {Array.from({ length: 48 }, (_, k) => (
                      <span key={k} className="fc-bulb m-auto h-2 w-2 rounded-full bg-paper opacity-90 shadow-[0_0_14px_3px_rgba(248,249,250,0.6)]" />
                    ))}
                  </div>
                )}

                {/* Cabeçalho da fatura */}
                <header className={`relative flex items-start justify-between gap-4 border-b-2 pb-3 ${t.rule}`}>
                  <div className="font-grotesk text-[10px] font-bold uppercase leading-relaxed tracking-[0.25em] md:text-xs">
                    <p>Fatura nº {bill.n} / Capital S.A.</p>
                    <p className={t.muted}>Vencimento: todo mês. Juros: sempre.</p>
                  </div>
                  <bill.Icon className={`h-7 w-7 shrink-0 md:h-9 md:w-9 ${t.accent}`} strokeWidth={1.5} />
                </header>

                <div className="relative grid flex-1 gap-6 pt-4 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pt-6">
                  {/* Coluna do número */}
                  <div className="flex flex-col justify-between gap-6">
                    <h3 className="font-display text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.85] md:text-[min(4.6vw,6.5vh)]">
                      {bill.title}
                    </h3>
                    <div>
                      <span
                        className={`fc-stat block font-display text-[clamp(5rem,30vw,9rem)] leading-[0.78] tabular-nums md:text-[min(11vw,15vh)] ${t.accent}`}
                      >
                        {formatStat(bill.stat.value, bill.stat)}
                      </span>
                      <span className={`mt-1 block font-grotesk text-xs font-bold uppercase tracking-[0.15em] md:text-sm ${t.muted}`}>
                        {bill.stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Coluna do texto + lançamentos */}
                  <div className="flex min-h-0 flex-col justify-between gap-5 md:gap-4">
                    <p className="font-grotesk text-base font-medium leading-snug md:text-sm lg:text-base xl:text-lg 2xl:text-xl [@media(min-width:768px)_and_(max-height:820px)]:text-sm">
                      {bill.text}
                    </p>

                    <ul className="space-y-3 [@media(min-width:768px)_and_(max-height:820px)]:space-y-2">
                      {bill.items.map((it) => (
                        <li key={it.desc}>
                          <div className="flex items-baseline justify-between gap-3 font-grotesk text-[11px] font-bold uppercase tracking-[0.12em] md:text-xs">
                            <span className={t.muted}>{it.desc}</span>
                            <span className="whitespace-nowrap">{it.value}</span>
                          </div>
                          <div className={`mt-1.5 h-[6px] w-full ${t.track}`}>
                            <div
                              className={`fc-bar h-full origin-left ${t.bar}`}
                              style={{ width: `${it.bar * 100}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>

                    <footer className={`border-t-2 pt-3 ${t.rule}`}>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className={`font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] ${t.muted}`}>
                            Total a pagar
                          </p>
                          <p className="font-display text-3xl leading-none md:text-4xl">{bill.total}</p>
                        </div>
                        <Barcode seed={i * 97 + 13} className="w-24 shrink-0 overflow-hidden md:w-32" />
                      </div>
                      <p className={`mt-3 text-[10px] leading-snug md:text-[11px] ${t.muted}`}>
                        Fonte: {bill.source}
                      </p>
                    </footer>
                  </div>
                </div>

                {/* Carimbo */}
                <div
                  aria-hidden="true"
                  className={`fc-stamp pointer-events-none absolute right-[6%] top-[18%] -rotate-12 border-[3px] px-4 py-2 font-display text-2xl uppercase leading-none tracking-wide opacity-90 md:left-[8%] md:right-auto md:top-[42%] md:text-3xl lg:text-5xl ${t.stamp}`}
                >
                  {bill.stamp}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
