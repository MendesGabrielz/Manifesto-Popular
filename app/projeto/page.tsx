import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CallToAction from "@/components/CallToAction";
import Reveal from "@/components/projeto/Reveal";
import AxisCard from "@/components/projeto/AxisCard";
import { AXES, AXIS_PARTS, COSTS, FUNDING } from "@/lib/projeto";

export const metadata: Metadata = {
  title: "Projeto de País — Manifesto Popular",
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
                Manifesto Popular
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

          {/* A conta */}
          <section id="a-conta" className="border-t border-paper/10 bg-paper px-4 py-20 text-zinc-950 md:px-10 md:py-28">
            <div className="mx-auto max-w-[1600px]">
              <p data-reveal className="mb-6 flex items-center gap-4 font-grotesk text-xs font-bold uppercase tracking-[0.4em] text-red-600">
                <span className="h-px w-12 bg-red-600" />
                A conta
              </p>
              <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
                <h2 data-reveal className="font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.84]">
                  Quanto custa <span className="text-red-600">e quem paga</span>
                </h2>
                <p data-reveal className="max-w-xl font-grotesk text-lg font-medium leading-snug text-zinc-950/75 md:text-2xl">
                  Proposta sem conta é promessa. Aqui está a ordem de grandeza de cada eixo e as fontes de
                  dinheiro possíveis, inclusive as que já estão comprometidas.
                </p>
              </div>

              <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 data-reveal className="font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-zinc-950/60">
                    Custo por eixo
                  </h3>
                  <ul className="mt-4 border-b-2 border-zinc-950">
                    {COSTS.map((row) => {
                      const axis = AXES.find((a) => a.slug === row.slug)!;
                      return (
                        <li key={row.slug} data-reveal className="grid gap-2 border-t-2 border-zinc-950 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                          <div>
                            <a href={`/projeto/${axis.slug}#viabilidade`} className="font-display text-3xl leading-none hover:text-red-600 md:text-4xl">
                              <span className="text-red-600">{axis.n}</span> {axis.title}
                            </a>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-950/70">{row.note}</p>
                          </div>
                          <div className="sm:text-right">
                            <p className="font-display text-3xl leading-none md:text-4xl">{row.cost}</p>
                            <p className="mt-1 font-grotesk text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-950/55">{row.kind}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3 data-reveal className="font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-zinc-950/60">
                    De onde pode vir o dinheiro
                  </h3>
                  <ul className="mt-4 border-b-2 border-zinc-950">
                    {FUNDING.map((row) => (
                      <li key={row.source} data-reveal className="border-t-2 border-zinc-950 py-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <p className="font-display text-3xl leading-none md:text-4xl">{row.source}</p>
                          <span className="bg-zinc-950 px-2 py-1 font-grotesk text-[10px] font-bold uppercase tracking-[0.15em] text-paper">
                            {row.status}
                          </span>
                        </div>
                        <p className="mt-2 font-grotesk text-lg font-bold text-red-600">{row.size}</p>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-950/70">{row.note}</p>
                        <p className="mt-2 text-[11px] text-zinc-950/50">Fonte: {row.ref}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div data-reveal className="mt-14 bg-zinc-950 p-6 text-paper md:p-10">
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.25em] text-red-600">
                  A conclusão honesta
                </p>
                <p className="mt-3 max-w-5xl font-grotesk text-xl font-medium leading-snug md:text-3xl">
                  Só educação e infraestrutura pediriam mais de R$ 400 bilhões a mais por ano, entre dinheiro público e privado. Isso não cabe
                  de uma vez. O projeto precisa de etapas, de prioridades e de crescimento econômico, e cada
                  real novo tem de vir de uma fonte dita em voz alta.
                </p>
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
