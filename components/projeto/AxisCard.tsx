import { ArrowUpRight } from "lucide-react";
import type { Axis } from "@/lib/projeto";

/** Cartão de um eixo, usado na apresentação do projeto e na homepage. */
export default function AxisCard({ axis, featured = false }: { axis: Axis; featured?: boolean }) {
  const published = Boolean(axis.content);

  return (
    <a
      href={`/projeto/${axis.slug}`}
      data-reveal
      className={`group relative flex flex-col justify-between gap-8 overflow-hidden border-2 p-6 transition-colors md:p-8 ${
        featured
          ? "border-red-600 bg-red-600 text-zinc-950"
          : "border-paper/20 bg-ink text-paper hover:border-paper"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-6xl leading-none md:text-7xl">{axis.n}</span>
        <span
          className={`border px-2 py-1 font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] ${
            published
              ? featured
                ? "border-zinc-950 bg-zinc-950 text-paper"
                : "border-red-600 bg-red-600 text-zinc-950"
              : featured
                ? "border-zinc-950/50"
                : "border-paper/40 text-paper/70"
          }`}
        >
          {published ? "Publicado" : "Em construção"}
        </span>
      </div>
      <div>
        <h3 className="font-display text-[clamp(2rem,3.2vw,3rem)] leading-[0.92]">{axis.title}</h3>
        <p className={`mt-3 text-sm leading-relaxed md:text-base ${featured ? "text-zinc-950/80" : "text-paper/65"}`}>
          {axis.short}
        </p>
      </div>
      <span className="flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-[0.2em]">
        {published ? "Ler o eixo" : "Ver escopo"}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </span>
    </a>
  );
}
