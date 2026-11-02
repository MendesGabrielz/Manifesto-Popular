"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { RedStar } from "./Symbols";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// clamp(mínimo, fluido, máximo): nunca vaza no celular nem explode no 4K
const LINES = [
  { text: "O MERCADO", size: "text-[clamp(3.5rem,21vw,15rem)]" },
  { text: "FALHOU.", size: "text-[clamp(3.5rem,21vw,15rem)] text-rev" },
  { text: "O ESTADO É O POVO", size: "text-outline mt-4 text-[clamp(2rem,10.5vw,8rem)]" },
];

/**
 * "Câmera" da estrela 3D por formato de tela.
 * Desktop (paisagem): câmera distante, estrela gira em Y vindo da lateral.
 * Mobile (retrato): câmera mais próxima, estrela tomba em X vindo de cima,
 * centralizada atrás do título para caber inteira na tela vertical.
 */
const CAMERA = {
  desktop: { perspective: 1400, from: { rotationY: -110, rotationX: 25, z: -900 }, spin: 180, parallax: 45 },
  mobile: { perspective: 700, from: { rotationX: 80, rotationY: -15, z: -350 }, spin: 90, parallax: 25 },
};

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="-mt-[0.2em] inline-block overflow-hidden pt-[0.2em] align-bottom">
          <span className="hero-char inline-block will-change-transform">
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions as Conditions;
        const cam = isDesktop ? CAMERA.desktop : CAMERA.mobile;

        // A perspectiva vai no próprio transform da estrela (perspective())
        gsap.set(".hero-star-3d", { transformPerspective: cam.perspective });
        if (reduceMotion) return;

        // Entrada: fundo, estrela 3D e título letra por letra
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-bg", { scale: 1.25, opacity: 0, duration: 2.2 })
          .from(
            ".hero-star-3d",
            { ...cam.from, scale: 0.4, opacity: 0, duration: 2.6, transformOrigin: "50% 50%" },
            0
          )
          .from(
            ".hero-char",
            { yPercent: 115, rotate: 6, duration: 1.1, stagger: isDesktop ? 0.035 : 0.025 },
            0.2
          )
          .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.6");

        const scrub = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };

        // Parallax: o texto desce mais devagar que a página (menos no celular)
        gsap.to(".hero-title", { yPercent: cam.parallax, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-bg", { yPercent: 20, scale: 1.1, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-star-spin", { rotate: cam.spin, ease: "none", scrollTrigger: scrub });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="topo"
      ref={root}
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Fundo: marcha da greve geral de 1917 em São Paulo, desfocada e escurecida */}
      <div className="hero-bg absolute inset-0 -z-10">
        <Image
          src="/images/historia/hero-greve-1917-bandeiras.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%] blur-[2px] contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </div>

      {/* Linhas construtivistas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-0 h-full w-px bg-paper/10" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-paper/10" />
        <div className="absolute left-0 top-[22%] h-px w-full bg-paper/10" />
        <div className="absolute -left-[10%] top-[70%] h-[3px] w-[130%] origin-left -rotate-[8deg] bg-rev/70" />
      </div>

      {/* Palco 3D da estrela: posição/tamanho por breakpoint, câmera via GSAP */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-star-wrap absolute left-1/2 top-[42%] aspect-square w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 md:left-[78%] md:top-[28%] md:w-[min(38vw,560px)]">
          <div className="hero-star-spin h-full w-full">
            <RedStar className="hero-star-3d h-full w-full text-rev/25" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="hero-title relative z-10 w-full px-4 text-center md:px-10">
        <p className="hero-fade mb-6 font-grotesk text-[11px] uppercase tracking-[0.35em] text-paper/60 md:text-xs md:tracking-[0.5em]">
          Manifesto nº 01 — Pela soberania popular
        </p>
        <h1 className="font-display leading-[0.82] tracking-tight">
          {LINES.map((line) => (
            <span key={line.text} className={`block ${line.size}`}>
              <SplitChars text={line.text} />
            </span>
          ))}
        </h1>
      </div>

      <div className="hero-fade absolute bottom-6 left-0 right-0 z-10 flex items-end justify-between px-4 font-grotesk text-[10px] uppercase tracking-[0.3em] text-paper/60 md:bottom-10 md:px-10 md:text-xs">
        <span className="max-w-[14rem] leading-relaxed">
          Riqueza produzida por muitos,
          <br />
          apropriada por poucos.
        </span>
        <span className="hidden max-w-[18rem] text-center text-[10px] leading-relaxed tracking-[0.2em] text-paper/40 lg:block">
          Foto: greve geral de 1917, São Paulo. Domínio público
        </span>
        <a
          href="#manifesto"
          className="flex items-center gap-3 text-paper transition-colors hover:text-rev"
        >
          Role
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
