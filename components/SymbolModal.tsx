"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, X } from "lucide-react";
import DuotoneFrame from "./DuotoneFrame";
import Scene from "./Scene";
import type { SymbolStory } from "./symbolStories";
import { getLenis } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

export type Origin = { x: number; y: number };

/**
 * Página interna imersiva.
 * Desktop: máscara circular que nasce no ponto do clique.
 * Mobile: drawer que sobe de baixo e ocupa 100% da tela.
 */
export default function SymbolModal({
  story,
  origin,
  onClosed,
}: {
  story: SymbolStory;
  origin: Origin;
  onClosed: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const titleId = `${story.id}-title`;

  // Máscara inicial/final de acordo com o formato da tela
  const masks = () => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) {
      return { hidden: "inset(100% 0% 0% 0%)", shown: "inset(0% 0% 0% 0%)" };
    }
    // Raio que cobre a tela inteira a partir do ponto do clique
    const r = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    );
    return {
      hidden: `circle(0px at ${origin.x}px ${origin.y}px)`,
      shown: `circle(${r}px at ${origin.x}px ${origin.y}px)`,
    };
  };

  const reduce = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Entrada
  useGSAP(
    () => {
      const el = root.current!;
      if (reduce()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });
        closeBtn.current?.focus();
        return;
      }

      const { hidden, shown } = masks();
      const strokes = el.querySelectorAll<SVGGeometryElement>(
        // Fora da máscara: só os traços visíveis são desenhados
        ".md-symbol :is(path, line, circle, rect, polygon):not(mask *)"
      );
      strokes.forEach((s) => {
        const len = s.getTotalLength();
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap
        .timeline({ onComplete: () => closeBtn.current?.focus() })
        .fromTo(
          el,
          { clipPath: hidden },
          {
            clipPath: shown,
            duration: 1.1,
            ease: "expo.inOut",
            // Sem máscara depois de aberto: clip-path em container rolável
            // pode deixar áreas sem repintar em alguns navegadores
            onComplete: () => gsap.set(el, { clearProps: "clipPath" }),
          }
        )
        .from(".md-bg", { scale: 1.3, duration: 1.6, ease: "expo.out" }, 0.3)
        .from(
          ".md-char",
          { yPercent: 110, stagger: 0.025, duration: 0.9, ease: "expo.out" },
          0.6
        )
        .to(
          strokes,
          { strokeDashoffset: 0, duration: 1.8, stagger: 0.04, ease: "power2.inOut" },
          0.6
        )
        .from(
          ".md-reveal",
          { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" },
          0.9
        );
    },
    { scope: root }
  );

  // Saída: a mesma máscara, ao contrário
  const { contextSafe } = useGSAP({ scope: root });
  const close = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    const el = root.current!;
    if (reduce()) {
      gsap.to(el, { opacity: 0, duration: 0.2, onComplete: onClosed });
      return;
    }
    const { hidden, shown } = masks();
    gsap.fromTo(el, { clipPath: shown }, {
      clipPath: hidden,
      duration: 0.9,
      ease: "expo.inOut",
      onComplete: onClosed,
    });
  });
  const closeRef = useRef(close);
  closeRef.current = close;

  // Trava a rolagem da página, ESC fecha e o foco fica preso no modal
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !root.current) return;
      const focusables = root.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, []);

  const { Icon } = story;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-ink text-paper"
    >
      {/* Botão fixo de fechar */}
      <button
        ref={closeBtn}
        onClick={close}
        className="fixed right-4 top-4 z-10 flex items-center gap-2 border-2 border-paper bg-ink px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-paper hover:text-ink md:right-10 md:top-6"
      >
        <X className="h-4 w-4" /> Fechar
      </button>

      {/* Abertura */}
      <header className="relative flex min-h-svh flex-col justify-end overflow-hidden px-4 pb-12 pt-24 md:px-10 md:pb-16">
        <div className="md-bg absolute inset-0 -z-0">
          <Scene name={story.scene} className="h-full w-full grayscale" />
          <div className="absolute inset-0 bg-rev mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </div>

        <Icon
          className="md-symbol absolute right-[-10%] top-[12%] h-[70vw] w-[70vw] text-paper/80 md:right-[4%] md:top-[10%] md:h-[min(42vw,620px)] md:w-[min(42vw,620px)]"
          strokeWidth={1.2}
        />

        <div className="relative">
          <p className="md-reveal mb-4 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
            Símbolo {story.n} — Os símbolos da luta
          </p>
          <h2
            id={titleId}
            className="font-display text-[clamp(3.5rem,13vw,12rem)] leading-[0.85]"
          >
            {story.name.split(" ").map((word, w) => (
              <span key={w} className="mr-[0.2em] inline-block whitespace-nowrap">
                {word.split("").map((ch, i) => (
                  <span key={i} className="-mt-[0.15em] inline-block overflow-hidden pt-[0.15em] align-bottom">
                    <span className="md-char inline-block">{ch}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="md-reveal mt-4 max-w-xl font-grotesk text-lg uppercase tracking-[0.15em] text-paper/80 md:text-2xl">
            {story.tagline}
          </p>
        </div>
      </header>

      {/* Texto aprofundado */}
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <p className="md-reveal mb-6 font-grotesk text-xs uppercase tracking-[0.4em] text-rev">
              Linha do tempo
            </p>
            <ol className="border-l-2 border-rev">
              {story.timeline.map((t) => (
                <li key={t.year} className="md-reveal relative pb-8 pl-6 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3 w-3 bg-rev" />
                  <span className="font-display text-5xl leading-none">{t.year}</span>
                  <p className="mt-1 text-sm text-paper/70">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="md:col-span-8">
          <p className="md-reveal font-grotesk text-2xl font-medium leading-snug md:text-4xl">
            {story.lead}
          </p>
          {story.sections.map((s) => (
            <section key={s.title} className="md-reveal mt-14 border-t border-paper/20 pt-6">
              <h3 className="font-display text-4xl text-rev md:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
                {s.body}
              </p>
            </section>
          ))}
          {story.quote && (
            <blockquote className="md-reveal mt-16 bg-rev p-6 text-ink md:p-10">
              <p className="font-display text-5xl leading-[0.9] md:text-7xl">
                “{story.quote.text}”
              </p>
              <footer className="mt-4 font-grotesk text-xs font-bold uppercase tracking-[0.2em]">
                {story.quote.author}
              </footer>
            </blockquote>
          )}
        </article>
      </div>

      {/* Fotos de época */}
      <div className="mx-auto grid max-w-[1600px] gap-4 px-4 pb-20 md:grid-cols-3 md:gap-6 md:px-10">
        {story.photos.map((p, i) => (
          <figure key={i} className={`md-reveal group ${i === 1 ? "md:translate-y-12" : ""}`}>
            <DuotoneFrame
              scene={p.scene}
              src={p.src}
              alt={p.caption}
              className="aspect-[4/5] w-full"
            />
            <figcaption className="mt-3 font-grotesk text-[11px] uppercase tracking-[0.2em] text-paper/55">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Botão gigante */}
      <button
        onClick={close}
        className="group relative block w-full overflow-hidden border-t-2 border-paper bg-rev py-10 text-ink md:py-14"
      >
        <span className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <span className="relative flex items-center justify-center gap-[0.15em] font-display text-[clamp(2.75rem,11vw,11rem)] leading-none">
          <ArrowLeft className="h-[0.7em] w-[0.7em] transition-transform duration-500 group-hover:-translate-x-3" strokeWidth={2.5} />
          Fechar e voltar
        </span>
      </button>
    </div>
  );
}
