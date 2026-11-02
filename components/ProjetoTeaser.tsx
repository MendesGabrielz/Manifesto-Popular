import { ArrowRight } from "lucide-react";
import Reveal from "./projeto/Reveal";
import { AXES } from "@/lib/projeto";

/** Chamada curta na homepage; o conteúdo completo fica em /projeto. */
export default function ProjetoTeaser() {
  return (
    <section id="projeto" className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36">
      <Reveal className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
              <span className="h-px w-12 bg-red-600" />
              Projeto de País
            </p>
            <h2 data-reveal className="font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.84]">
              Criticar <span className="text-outline">não basta.</span>
            </h2>
            <p data-reveal className="mt-8 max-w-xl font-grotesk text-lg font-medium leading-snug text-paper/80 md:text-2xl">
              Cinco eixos de propostas para o Brasil, cada um com diagnóstico, custo, prazo, indicadores,
              riscos e fontes. Sem slogans.
            </p>
            <a
              data-reveal
              href="/projeto"
              className="group mt-10 inline-flex items-center gap-4 bg-red-600 px-6 py-4 font-display text-3xl leading-none text-zinc-950 transition-colors hover:bg-paper md:text-4xl"
            >
              Explorar o projeto
              <ArrowRight className="h-7 w-7 transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>

          <ol className="border-t-2 border-paper/80">
            {AXES.map((axis) => (
              <li key={axis.slug} data-reveal className="border-b border-paper/15">
                <a
                  href={`/projeto/${axis.slug}`}
                  className="group flex items-center gap-5 py-5 transition-colors hover:text-red-600 md:gap-8 md:py-6"
                >
                  <span className="font-display text-4xl text-paper/35 transition-colors group-hover:text-red-600 md:text-5xl">
                    {axis.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95]">
                      {axis.title}
                    </span>
                    <span className="mt-1 block text-sm text-paper/55">{axis.short}</span>
                  </span>
                  <span
                    className={`hidden shrink-0 px-2 py-1 font-grotesk text-[10px] font-bold uppercase tracking-[0.15em] sm:block ${
                      axis.content ? "bg-red-600 text-zinc-950" : "border border-paper/30 text-paper/60"
                    }`}
                  >
                    {axis.content ? "Publicado" : "Em construção"}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
