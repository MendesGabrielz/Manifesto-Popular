"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RedStar } from "./Symbols";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Faixas de texto gigante cruzando a tela, movidas pela rolagem. */
export default function Marquee({
  words,
  reverse = false,
}: {
  words: string[];
  reverse?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".mq-row",
          { xPercent: reverse ? -40 : 0 },
          {
            xPercent: reverse ? 0 : -40,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const items = [...words, ...words, ...words];

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`relative -my-px overflow-hidden border-y-2 border-ink py-3 md:py-5 ${
        reverse ? "-rotate-2 bg-paper text-ink" : "rotate-2 bg-rev text-ink"
      }`}
    >
      <div className="mq-row flex w-max items-center gap-8 whitespace-nowrap font-display text-6xl leading-none md:text-8xl">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w}
            <RedStar className="h-10 w-10 md:h-14 md:w-14" strokeWidth={8} />
          </span>
        ))}
      </div>
    </div>
  );
}
