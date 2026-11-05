"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis global sincronizado com o ticker do GSAP,
 * para que todos os ScrollTriggers leiam a mesma posição suavizada.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // A altura da página muda depois do carregamento (acordeões, imagens,
    // calculadora). Sem recalcular, as seções fixadas travam na posição antiga.
    let lastHeight = document.body.scrollHeight;
    let refreshTimer: ReturnType<typeof setTimeout>;
    const heightObserver = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    heightObserver.observe(document.body);

    // Links âncora passam pelo Lenis: "#parte" sempre e "/#secao" quando já
    // estamos na home (nas outras páginas eles navegam normalmente até a home)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"], a[href^="/#"]'
      );
      if (!link) return;
      const href = link.getAttribute("href")!;
      if (href.startsWith("/#") && window.location.pathname !== "/") return;
      const id = href.replace(/^\//, "");
      if (id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      // Respeita o scroll-margin-top da seção (espaço do menu fixo)
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      lenis.scrollTo(target, { offset: -margin });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      heightObserver.disconnect();
      clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
