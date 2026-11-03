import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CallToAction from "@/components/CallToAction";
import Reveal from "@/components/projeto/Reveal";
import AxisCard from "@/components/projeto/AxisCard";
import { AXES, AXIS_PARTS } from "@/lib/projeto";

export const metadata: Metadata = {
  title: "Projeto de País — Movimento Popular",
  description:
    "Propostas estruturadas para o desenvolvimento do Brasil em cinco eixos, com diagnóstico, custos, prazos, indicadores, riscos e fontes.",
};

export default function ProjetoPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink">
        <Reveal>
          {/* Abertura */}
          <section className="relative overflow-hidden border-b border-paper/10 px-4 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[8%] top-0 h-full w-px bg-paper/10" />
              <div className="absolute -left-[10%] top-[78%] h-[3px] w-[130%] origin-left -rotate-[4deg] bg-red-600/70" />
            </div>
            <div className="relative mx-auto max-w-[1600px]">
              <p data-reveal className="mb-6 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
                <span className="h-px w-12 bg-red-600" />
                Movimento Popular
              </p>
              <h1 data-reveal className="font-display text-[clamp(4rem,15vw,13rem)] leading-[0.82]">
                Projeto <span className="text-outline">de</span> País
              </h1>
              <p data-reveal className="mt-8 max-w-3xl font-grotesk text-xl font-medium leading-snug text-paper/85 md:text-3xl">
                Criticar não basta. Aqui estão propostas para o Brasil que queremos construir, com
                diagnóstico, custo, prazo e risco, e sem promessas vazias.
              </p>
            </div>
          </section>

          {/* Eixos */}
          <section className="px-4 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-[1600px]">
              <h2 data-reveal className="mb-10 font-grotesk text-xs uppercase tracking-[0.4em] text-paper/60">
                Cinco eixos
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {AXES.map((axis) => (
                  <AxisCard key={axis.slug} axis={axis} featured={Boolean(axis.content)} />
                ))}
              </div>
            </div>
          </section>

          {/* Método */}
          <section className="border-t border-paper/10 px-4 py-20 md:px-10 md:py-28">
            <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div data-reveal>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85]">
                  Como cada eixo é construído
                </h2>
                <p className="mt-6 max-w-md text-paper/70">
                  Nenhum número sem fonte. Quando não há dados para fixar uma meta, dizemos que ela depende
                  de estudos técnicos. Eixos marcados como &ldquo;em construção&rdquo; ainda estão em pesquisa e
                  não trazem propostas.
                </p>
              </div>
              <ol className="grid gap-px border-2 border-paper/20 bg-paper/20 sm:grid-cols-3">
                {AXIS_PARTS.map((part, i) => (
                  <li key={part.id} data-reveal className="bg-ink p-5 md:p-6">
                    <span className="font-display text-4xl text-red-600">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2 font-grotesk text-sm font-bold uppercase tracking-[0.12em]">{part.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>
      </main>
      <CallToAction />
    </>
  );
}
