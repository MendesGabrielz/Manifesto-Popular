"use client";

import { intBR } from "@/lib/inequality";

/**
 * Campo gigante só com linha de base. Aceita apenas dígitos e
 * mostra o valor já formatado (3.000, 12.500...).
 */
export default function SalaryInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="font-grotesk text-lg font-medium uppercase tracking-wide text-paper/80 md:text-2xl">
        Qual é o seu salário mensal?
      </span>
      <span className="group mt-4 flex items-baseline gap-3 border-b-4 border-paper/40 pb-2 transition-colors focus-within:border-red-600 md:gap-6">
        <span className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-none text-paper/40 transition-colors group-focus-within:text-red-600">
          R$
        </span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label="Salário mensal em reais"
          value={value ? intBR.format(value) : ""}
          placeholder="0"
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
            onChange(digits ? Number(digits) : 0);
          }}
          onFocus={(e) => e.target.select()}
          className="w-full min-w-0 bg-transparent font-display text-[clamp(4rem,16vw,13rem)] leading-[0.9] text-paper caret-red-600 outline-none placeholder:text-paper/20"
        />
      </span>
    </label>
  );
}
