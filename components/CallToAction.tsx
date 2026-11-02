"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, BookOpen, Users } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { HammerSickle, RaisedFist, RedStar } from "./Symbols";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Canal de WhatsApp do Manifesto Popular
const COLLECTIVE_URL = "https://whatsapp.com/channel/0029Vb9vd7sAu3aYmf9VDv0A";
const READING_URL = "https://www.marxists.org/portugues/";

export default function CallToAction() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-char", {
          yPercent: 100,
          ease: "expo.out",
          duration: 1.2,
          stagger: 0.05,
          scrollTrigger: { trigger: ".cta-word", start: "top 85%" },
        });
        gsap.from(".cta-fade", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-fade", start: "top 90%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const word = "ORGANIZE-SE";

  return (
    <footer
      id="organize"
      ref={root}
      className="relative overflow-hidden bg-rev text-ink"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4 pt-24 text-center md:px-10 md:pt-32">
        <p className="cta-fade font-grotesk text-xs font-bold uppercase tracking-[0.5em]">
          Ninguém liberta ninguém sozinho
        </p>
        <p className="cta-fade mt-6 max-w-2xl font-grotesk text-xl font-medium leading-snug md:text-3xl">
          O poder do capital é concentrado. O nosso precisa ser organizado.
        </p>

        <div className="cta-fade -my-4 md:-my-8">
          <MagneticButton
            href={COLLECTIVE_URL}
            external
            className="h-36 w-36 bg-ink font-grotesk text-sm font-bold uppercase tracking-[0.15em] text-paper md:h-48 md:w-48 md:text-base"
          >
            <span className="flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              Entrar em
              <br />
              um coletivo
            </span>
          </MagneticButton>
        </div>

        <a
          href={READING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-fade group inline-flex items-center gap-3 border-b-2 border-ink pb-1 font-grotesk text-sm font-bold uppercase tracking-[0.2em]"
        >
          <BookOpen className="h-4 w-4" />
          Ler os materiais
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Texto massivo de ponta a ponta */}
      <h2
        className="cta-word mt-16 select-none whitespace-nowrap text-center font-display text-[25.5vw] leading-[0.78] tracking-tight"
        aria-label={word}
      >
        {word.split("").map((ch, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
            <span className="cta-char inline-block">{ch}</span>
          </span>
        ))}
      </h2>

      <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-ink bg-ink px-4 py-6 font-grotesk text-[11px] uppercase tracking-[0.25em] text-paper/70 md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} — Estado/Povo. Copie, compartilhe, organize.</span>
        <div className="flex items-center gap-4 text-rev">
          <RedStar className="h-5 w-5" strokeWidth={8} />
          <RaisedFist className="h-5 w-5" strokeWidth={8} />
          <HammerSickle className="h-5 w-5" strokeWidth={8} />
        </div>
        <a href="#topo" className="transition-colors hover:text-paper">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}
