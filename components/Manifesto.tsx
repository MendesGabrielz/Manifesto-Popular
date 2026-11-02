"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Cada item é uma "linha" com máscara própria. `em` destaca em vermelho.
const LINES: { text: string; em?: boolean }[] = [
  { text: "Enquanto a riqueza nova vai para o topo," },
  { text: "quem trabalha fica com as sobras." },
  { text: "A riqueza não evapora:", em: true },
  { text: "ela sobe, se acumula e se esconde" },
  { text: "em juros, dividendos e paraísos fiscais." },
  { text: "O mercado não é natureza." },
  { text: "É escolha política — de poucos.", em: true },
  { text: "Bancos lucram na crise, o povo paga o resgate." },
  { text: "Por isso defendemos um Estado forte:" },
  { text: "saúde, educação, energia e crédito", em: true },
  { text: "sob controle público e democrático." },
];

const PILLARS = [
  { n: "01", title: "Taxar grandes fortunas", body: "Quem tem mais, contribui mais. O imposto sobre grandes fortunas está na Constituição desde 1988 e nunca foi regulamentado. A taxação de dividendos aprovada em 2025 é um começo, não o fim." },
  { n: "02", title: "Bancos públicos fortes", body: "Crédito barato para quem produz, não para quem especula. Juros como instrumento de desenvolvimento." },
  { n: "03", title: "Setores estratégicos", body: "Energia, água, saúde e infraestrutura são bens comuns, não ativos para o rentismo." },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Revelação linha por linha: o texto sobe de dentro da máscara
        gsap.utils.toArray<HTMLElement>(".mf-line").forEach((line) => {
          gsap.from(line, {
            yPercent: 110,
            rotate: 2,
            opacity: 0,
            ease: "power4.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.from(".mf-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "expo.inOut",
          duration: 1.4,
          scrollTrigger: { trigger: ".mf-rule", start: "top 85%" },
        });

        gsap.from(".mf-pillar", {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: ".mf-pillars", start: "top 80%" },
        });

        // Número gigante de fundo deslizando
        gsap.to(".mf-bignum", {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative overflow-hidden border-t border-paper/10 bg-ink px-4 py-28 md:px-10 md:py-40"
    >
      <span
        aria-hidden="true"
        className="mf-bignum text-outline pointer-events-none absolute -right-[10%] top-10 select-none font-display text-[40vw] leading-none opacity-20"
      >
        1%
      </span>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
          <span className="h-px w-12 bg-rev" />
          Manifesto
        </div>

        <h2 className="font-display text-[12vw] leading-[0.92] tracking-tight md:text-[6.6vw]">
          {LINES.map((l, i) => (
            <span key={i} className="-mt-[0.15em] block overflow-hidden pb-[0.04em] pt-[0.15em]">
              <span
                className={`mf-line block will-change-transform ${
                  l.em ? "text-rev" : "text-paper"
                }`}
              >
                {l.text}
              </span>
            </span>
          ))}
        </h2>

        <div className="mf-rule mt-24 h-[3px] w-full bg-paper" />

        <div className="mf-pillars mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {PILLARS.map((p) => (
            <article
              key={p.n}
              className="mf-pillar border-paper/15 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <span className="font-display text-6xl text-rev">{p.n}</span>
              <h3 className="mt-3 font-grotesk text-2xl font-bold uppercase tracking-tight">
                {p.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-paper/65">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
