"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Hand, TrendingDown, TrendingUp } from "lucide-react";
import DuotoneFrame from "./DuotoneFrame";
import type { SceneName } from "./Scene";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HistoryCard = {
  kind: "history";
  year: string;
  title: string;
  body: string;
  scene: SceneName;
  src?: string;
};

type DataCard = {
  kind: "data";
  figure: string;
  label: string;
  versus: string;
  versusLabel: string;
  source: string;
};

type Card = HistoryCard | DataCard;

// Troque `src` por fotos reais (ex.: "/images/1917.jpg" em /public/images)
const CARDS: Card[] = [
  {
    kind: "history",
    year: "1917",
    title: "Os trabalhadores tomam a palavra",
    body: "A Revolução Russa mostra ao mundo que a ordem econômica não é eterna: ela pode ser disputada por quem trabalha.",
    scene: "crowd",
  },
  {
    kind: "history",
    year: "1929",
    title: "O mercado desaba",
    body: "O crash de Nova York arrasta o planeta à Grande Depressão. A saída veio do investimento público, não da mão invisível.",
    scene: "bank",
  },
  {
    kind: "history",
    year: "1948",
    title: "Saúde como direito",
    body: "Nasce o NHS britânico: atendimento universal e gratuito, pago por todos, para todos. Prova de que o público funciona.",
    scene: "rails",
  },
  {
    kind: "data",
    figure: "5",
    label: "homens mais ricos do mundo dobraram suas fortunas desde 2020",
    versus: "5 bi",
    versusLabel: "de pessoas ficaram mais pobres no mesmo período",
    source: "Oxfam, Desigualdade S.A., 2024",
  },
  {
    kind: "history",
    year: "1953",
    title: "O petróleo é nosso",
    body: "Após ampla mobilização popular, nasce a Petrobras: soberania energética como projeto nacional.",
    scene: "factory",
  },
  {
    kind: "history",
    year: "1988",
    title: "A Constituição Cidadã",
    body: "O Brasil inscreve a saúde como direito de todos e dever do Estado. Nasce o SUS, um dos maiores sistemas públicos e universais de saúde do mundo.",
    scene: "constitution",
  },
  {
    kind: "history",
    year: "2008",
    title: "Lucro privado, prejuízo público",
    body: "A crise financeira global termina com governos resgatando bancos com dinheiro público enquanto famílias perdem suas casas.",
    scene: "chart",
  },
  {
    kind: "data",
    figure: "63%",
    label: "de toda a riqueza nova criada em 2020–2021 ficou com o 1% mais rico",
    versus: "37%",
    versusLabel: "foi dividido entre os outros 99% da humanidade",
    source: "Oxfam, A Sobrevivência dos Mais Ricos, 2023",
  },
];

export default function HorizontalScroll() {
  const section = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, isMobile, reduceMotion } = ctx.conditions as Conditions;

        /* ───────────── DESKTOP: rolagem vertical vira horizontal ───────────── */
        if (isDesktop && !reduceMotion) {
          const el = track.current!;
          const distance = () => el.scrollWidth - window.innerWidth;

          const tween = gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(".hs-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          // Ano de cada card desliza em sentido oposto (parallax horizontal)
          gsap.utils.toArray<HTMLElement>(".hs-year").forEach((year) => {
            gsap.fromTo(
              year,
              { xPercent: 25 },
              {
                xPercent: -25,
                ease: "none",
                scrollTrigger: {
                  trigger: year.closest(".hs-card"),
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });
          return;
        }

        /* ───── MOBILE ou movimento reduzido: carrossel nativo de arrastar ───── */
        const sc = scroller.current!;
        // Desktop com movimento reduzido: o trilho vira rolagem lateral nativa
        if (isDesktop) sc.style.overflowX = "auto";
        const setProgress = gsap.quickSetter(".hs-progress", "scaleX");
        const onScroll = () => {
          const max = sc.scrollWidth - sc.clientWidth;
          setProgress(max > 0 ? sc.scrollLeft / max : 0);
        };
        onScroll();
        sc.addEventListener("scroll", onScroll, { passive: true });

        // Dica de "arraste" some depois do primeiro gesto
        const hint = sc.parentElement!.querySelector(".hs-hint");
        const hideHint = () => gsap.to(hint, { autoAlpha: 0, duration: 0.4 });
        sc.addEventListener("scroll", hideHint, { once: true, passive: true });

        if (isMobile && !reduceMotion) {
          // O carrossel entra deslizando da direita quando aparece na tela
          gsap.from(".hs-card", {
            x: 80,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: sc, start: "top 80%" },
          });
          gsap.to(hint, {
            x: 12,
            repeat: -1,
            yoyo: true,
            duration: 0.7,
            ease: "sine.inOut",
          });
        }

        return () => {
          sc.removeEventListener("scroll", onScroll);
          sc.removeEventListener("scroll", hideHint);
          sc.style.overflowX = "";
        };
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      id="luta"
      ref={section}
      className="relative overflow-hidden border-t border-paper/10 bg-ink py-20 md:h-svh md:py-0"
    >
      <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-paper/10">
        <div className="hs-progress h-full origin-left scale-x-0 bg-rev" />
      </div>

      {/* Mobile: só o título fica fora do carrossel */}
      <div className="mb-8 px-4 md:hidden">
        <div className="mb-4 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
          <span className="h-px w-12 bg-rev" />
          Linha do tempo
        </div>
        <h2 className="font-display text-[clamp(4rem,26vw,8rem)] leading-[0.8]">
          A <span className="text-rev">luta</span>
        </h2>
      </div>

      <div className="relative md:h-full">
        {/* Mobile: overflow-x nativo + scroll-snap. Desktop: GSAP move o trilho */}
        <div
          ref={scroller}
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:h-full md:snap-none md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={track}
            className="flex w-max items-stretch gap-4 px-4 md:h-full md:items-center md:gap-10 md:pl-10 md:pr-[10vw]"
          >
            {/* Painel de abertura (só desktop) */}
            <div className="hidden h-[78svh] w-[42vw] shrink-0 flex-col justify-between md:flex">
              <div className="flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
                <span className="h-px w-12 bg-rev" />
                Linha do tempo
              </div>
              <h2 className="font-display text-[13vw] leading-[0.8]">
                A<br />
                <span className="text-rev">LUTA</span>
              </h2>
              <p className="flex max-w-md items-center gap-3 font-grotesk text-sm uppercase tracking-[0.2em] text-paper/60">
                Continue rolando <ArrowRight className="h-4 w-4 text-rev" />
              </p>
            </div>

            {CARDS.map((card, i) =>
              card.kind === "history" ? (
                <article
                  key={i}
                  className="hs-card group relative flex h-[68svh] w-[82vw] shrink-0 snap-center flex-col border border-paper/15 bg-zinc-950 md:h-[78svh] md:w-[34vw]"
                >
                  <DuotoneFrame
                    scene={card.scene}
                    src={card.src}
                    alt={card.title}
                    className="h-[50%] w-full md:h-[55%]"
                  />
                  <div className="relative flex flex-1 flex-col justify-end overflow-hidden p-5 md:p-7">
                    <span className="hs-year text-outline-red pointer-events-none absolute right-2 top-1 font-display text-[28vw] leading-none opacity-60 md:text-[10vw]">
                      {card.year}
                    </span>
                    <span className="font-grotesk text-xs uppercase tracking-[0.3em] text-rev">
                      {card.year}
                    </span>
                    <h3 className="mt-2 font-display text-[clamp(2rem,9vw,3rem)] leading-none">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper/65 md:text-base">
                      {card.body}
                    </p>
                  </div>
                </article>
              ) : (
                <article
                  key={i}
                  className="hs-card relative flex h-[68svh] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden bg-rev p-6 text-ink md:h-[78svh] md:w-[30vw] md:p-8"
                >
                  <div className="flex items-center justify-between font-grotesk text-xs font-bold uppercase tracking-[0.3em]">
                    <span>Dado</span>
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="hs-year font-display text-[clamp(5rem,30vw,8rem)] md:text-[11vw] leading-[0.8]">
                      {card.figure}
                    </p>
                    <p className="mt-2 max-w-xs font-grotesk text-lg font-bold uppercase leading-tight">
                      {card.label}
                    </p>
                  </div>
                  <div className="border-t-2 border-ink pt-4">
                    <div className="flex items-baseline gap-3">
                      <TrendingDown className="h-5 w-5 shrink-0" />
                      <span className="font-display text-5xl leading-none">
                        {card.versus}
                      </span>
                    </div>
                    <p className="mt-1 font-grotesk text-sm font-medium uppercase">
                      {card.versusLabel}
                    </p>
                    <p className="mt-4 font-grotesk text-[10px] uppercase tracking-[0.2em] opacity-70">
                      Fonte: {card.source}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>

        {/* Dica de gesto (mobile) */}
        <div className="hs-hint pointer-events-none mt-6 flex items-center gap-3 px-4 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/60 md:hidden">
          <Hand className="h-4 w-4 text-rev" />
          Arraste para o lado
        </div>
      </div>
    </section>
  );
}
