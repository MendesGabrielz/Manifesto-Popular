"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animações sutis das páginas do Projeto de País.
 * - [data-reveal]: sobe e aparece ao entrar na tela
 * - [data-reveal-bar]: barra que cresce da esquerda (gráficos)
 * Com movimento reduzido, nada é animado.
 */
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions as Conditions;
        if (reduceMotion) return;

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: isDesktop ? 40 : 24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-bar]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
