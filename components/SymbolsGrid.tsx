"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import Scene from "./Scene";
import SymbolModal, { type Origin } from "./SymbolModal";
import { STORIES } from "./symbolStories";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Grid assimétrico: um card alto à esquerda, dois empilhados à direita
const LAYOUT = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
];

export default function SymbolsGrid() {
  const root = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<{ index: number; origin: Origin } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions as Conditions;
        if (reduceMotion) return;

        const cards = gsap.utils.toArray<HTMLElement>(".sg-card");

        if (isDesktop) {
          // Desktop: cortina de baixo para cima, em cascata e alturas diferentes
          gsap.from(cards, {
            clipPath: "inset(100% 0% 0% 0%)",
            y: (i) => 60 + i * 30,
            duration: 1.4,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: ".sg-grid", start: "top 80%" },
          });
          // Ícones flutuam em parallax dentro do card
          cards.forEach((card) => {
            gsap.fromTo(
              card.querySelector(".sg-icon"),
              { yPercent: 12 },
              {
                yPercent: -12,
                ease: "none",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          });
        } else {
          // Mobile: cada card sobe sozinho ao entrar na tela, sem parallax
          cards.forEach((card) => {
            gsap.from(card, {
              y: 50,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            });
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const open = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // Teclado (detail === 0) abre a partir do centro do card
    const rect = e.currentTarget.getBoundingClientRect();
    const origin =
      e.detail === 0
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: e.clientX, y: e.clientY };
    setActive({ index, origin });
  };

  const onClosed = () => {
    const index = active?.index;
    setActive(null);
    if (index !== undefined) triggers.current[index]?.focus({ preventScroll: true });
  };

  return (
    <section
      id="simbolos"
      ref={root}
      className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
              <span className="h-px w-12 bg-rev" />
              Simbologia
            </div>
            <h2 className="font-display text-[clamp(3.5rem,15vw,10rem)] leading-[0.82]">
              Os símbolos <span className="text-outline">da luta</span>
            </h2>
          </div>
          <p className="max-w-sm text-paper/60">
            Cada traço carrega um século de história. Toque em um símbolo para
            conhecer sua origem.
          </p>
        </div>

        <div className="sg-grid grid grid-cols-1 gap-4 md:h-[min(88vh,920px)] md:grid-cols-12 md:grid-rows-2 md:gap-5">
          {STORIES.map((story, i) => {
            const { Icon } = story;
            return (
              <button
                key={story.id}
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                onClick={(e) => open(i, e)}
                aria-haspopup="dialog"
                className={`sg-card group relative aspect-[4/5] overflow-hidden border border-paper/15 bg-zinc-900 text-left outline-none focus-visible:ring-2 focus-visible:ring-rev md:aspect-auto ${LAYOUT[i]}`}
              >
                {/* Imagem: zoom + P&B → duotone vermelho */}
                <div className="absolute inset-0 grayscale contrast-125 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-focus-visible:scale-110">
                  <Scene name={story.scene} className="h-full w-full opacity-60" />
                  <div className="absolute inset-0 bg-ink/50" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-rev opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-rev-deep opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-25 group-focus-visible:opacity-25" />

                <span className="sg-icon pointer-events-none absolute inset-0">
                <Icon
                  className={`absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-paper transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                    i === 0 ? "h-[62%] w-[62%] md:h-[55%] md:w-[55%]" : "h-[58%] w-[58%] md:h-[62%] md:w-[62%]"
                  }`}
                  strokeWidth={1.25}
                />
                </span>

                <span className="absolute left-5 top-5 font-display text-2xl text-paper/70 md:left-6 md:top-6">
                  {story.n}
                </span>
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/60 text-paper transition-all duration-500 group-hover:rotate-90 group-hover:border-paper group-hover:bg-paper group-hover:text-ink md:right-6 md:top-6">
                  <Plus className="h-5 w-5" />
                </span>

                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-5 md:p-6">
                  <span className="block font-display text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.9] md:text-[clamp(2rem,3.6vw,4.5rem)]">
                    {story.name}
                  </span>
                  <span className="mt-2 block font-grotesk text-xs uppercase tracking-[0.25em] text-paper/75">
                    {story.tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <SymbolModal
          key={STORIES[active.index].id}
          story={STORIES[active.index]}
          origin={active.origin}
          onClosed={onClosed}
        />
      )}
    </section>
  );
}
