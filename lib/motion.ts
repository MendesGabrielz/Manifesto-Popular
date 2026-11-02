import type Lenis from "lenis";

/**
 * Condições compartilhadas por todos os gsap.matchMedia() do site.
 * Uso: mm.add(BREAKPOINTS, (ctx) => { const c = ctx.conditions as Conditions; ... })
 * O callback roda de novo (e o anterior é revertido) sempre que uma condição muda.
 */
export const BREAKPOINTS = {
  isDesktop: "(min-width: 768px)",
  isMobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type Conditions = Record<keyof typeof BREAKPOINTS, boolean>;

// Instância global do Lenis, para travar a rolagem quando um modal abre
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;
