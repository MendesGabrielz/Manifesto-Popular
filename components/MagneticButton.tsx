"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Botão magnético: dentro da área de atração ele segue o cursor;
 * ao sair, volta com efeito elástico.
 */
export default function MagneticButton({
  children,
  href,
  strength = 0.4,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  strength?: number;
  className?: string;
}) {
  const zone = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const z = zone.current!;
      if (window.matchMedia("(hover: none)").matches) return;

      const xTo = gsap.quickTo(button.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(button.current, "y", { duration: 0.6, ease: "power3.out" });
      const lxTo = gsap.quickTo(label.current, "x", { duration: 0.6, ease: "power3.out" });
      const lyTo = gsap.quickTo(label.current, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = z.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        // O texto se move um pouco mais: sensação de profundidade
        lxTo(dx * strength * 0.35);
        lyTo(dy * strength * 0.35);
      };

      const onLeave = () => {
        gsap.to([button.current, label.current], {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.35)",
        });
      };

      z.addEventListener("mousemove", onMove);
      z.addEventListener("mouseleave", onLeave);
      return () => {
        z.removeEventListener("mousemove", onMove);
        z.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: zone }
  );

  return (
    <div ref={zone} className="inline-flex p-10 md:p-16">
      <a
        ref={button}
        href={href}
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full will-change-transform ${className}`}
      >
        {/* Preenchimento que sobe no hover */}
        <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <span
          ref={label}
          className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-ink"
        >
          {children}
        </span>
      </a>
    </div>
  );
}
