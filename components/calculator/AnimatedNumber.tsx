"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Número que desliza do valor antigo para o novo.
 * Escreve direto no DOM durante o tween: nenhuma re-renderização por quadro.
 */
export default function AnimatedNumber({
  value,
  format,
  duration = 0.7,
  className,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const el = useRef<HTMLSpanElement>(null);
  const current = useRef({ v: value });
  // Texto inicial fixo: depois disso só o tween escreve no nó,
  // senão o React pularia para o valor final antes da animação
  const initial = useRef(format(value)).current;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(current.current, {
      v: value,
      duration: reduce ? 0 : duration,
      ease: "expo.out",
      overwrite: true,
      onUpdate: () => {
        if (el.current) el.current.textContent = format(current.current.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, format, duration]);

  return (
    <span ref={el} className={className}>
      {initial}
    </span>
  );
}
