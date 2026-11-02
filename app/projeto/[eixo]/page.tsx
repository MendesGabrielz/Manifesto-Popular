import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import CallToAction from "@/components/CallToAction";
import Reveal from "@/components/projeto/Reveal";
import { AXES, AXIS_PARTS, getAxis, type Axis, type AxisContent } from "@/lib/projeto";

export const dynamicParams = false;

export function generateStaticParams() {
  return AXES.map((a) => ({ eixo: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ eixo: string }> }): Promise<Metadata> {
  const axis = getAxis((await params).eixo);
  if (!axis) return {};
  return {
    title: `${axis.title} — Projeto de País`,
    description: axis.lead,
  };
}

/* ───────────── Peças de layout ───────────── */

function Part({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t-2 border-paper/80 pt-6">
      <div data-reveal className="mb-8 flex items-baseline gap-4">
        <span className="font-display text-3xl text-red-600 md:text-4xl">{String(n).padStart(2, "0")}</span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Bars({ data }: { data: AxisContent["bars"] }) {
  return (
    <figure data-reveal className="mt-12 border-2 border-paper/20 p-5 md:p-8">
      <figcaption className="mb-8">
        <p className="font-display text-3xl leading-none md:text-4xl">{data.title}</p>
        <p className="mt-2 text-sm text-paper/60">{data.caption}</p>
      </figcaption>
      <div className="flex flex-col gap-7">
        {data.items.map((b) => (
          <div key={b.label}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-grotesk text-sm font-bold uppercase tracking-[0.1em]">{b.label}</span>
              <span className="font-grotesk text-xs uppercase tracking-[0.15em] text-paper/60">
                Hoje <strong className="text-red-600">{b.currentLabel}</strong> · {b.targetName ?? "Meta"} {b.targetLabel}
              </span>
            </div>
            {/* Trilho = 100%; barra vermelha = hoje; marcador branco = meta */}
            <div className="relative h-5 bg-paper/10" role="img" aria-label={`${b.label}: hoje ${b.currentLabel}, ${(b.targetName ?? "meta").toLowerCase()} ${b.targetLabel}`}>
              <div data-reveal-bar className="absolute inset-y-0 left-0 bg-red-600" style={{ width: `${b.current}%` }} />
              <div className="absolute -inset-y-1 w-[3px] bg-paper" style={{ left: `calc(${b.target}% - 1.5px)` }} />
            </div>
            <p className="mt-1 text-[11px] text-paper/45">Fonte: {b.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-5 font-grotesk text-[11px] uppercase tracking-[0.15em] text-paper/60">
        <span className="flex items-center gap-2"><span className="h-3 w-5 bg-red-600" /> Situação atual</span>
        <span className="flex items-center gap-2"><span className="h-4 w-[3px] bg-paper" /> Meta ou referência</span>
      </div>
    </figure>
  );
}

function AxisBody({ c }: { c: AxisContent }) {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      <Part id="diagnostico" n={1} title="Diagnóstico">
        <div className="max-w-3xl space-y-5">
          {c.diagnosis.map((p, i) => (
            <p key={i} data-reveal className={i === 0 ? "font-grotesk text-xl font-medium leading-snug md:text-2xl" : "text-base leading-relaxed text-paper/80 md:text-lg"}>
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 grid gap-px border-2 border-paper/20 bg-paper/20 sm:grid-cols-2 lg:grid-cols-3">
          {c.keyNumbers.map((k) => (
            <div key={k.label} data-reveal className="bg-ink p-5 md:p-6">
              <p className="font-display text-6xl leading-none text-red-600 md:text-7xl">{k.value}</p>
              <p className="mt-2 font-grotesk text-sm font-bold uppercase leading-snug tracking-[0.08em]">{k.label}</p>
              <p className="mt-3 text-[11px] text-paper/45">Fonte: {k.source}</p>
            </div>
          ))}
        </div>
        <Bars data={c.bars} />
      </Part>

      <Part id="objetivos" n={2} title="Objetivos">
        <ol className="grid gap-4 md:grid-cols-2">
          {c.objectives.map((o, i) => (
            <li key={i} data-reveal className="flex gap-4 border-l-4 border-red-600 pl-4">
              <span className="font-display text-3xl leading-none text-paper/40">{i + 1}</span>
              <p className="leading-relaxed text-paper/85">{o}</p>
            </li>
          ))}
        </ol>
      </Part>

      <Part id="propostas" n={3} title="Propostas">
        <div className="flex flex-col gap-4">
          {c.proposals.map((p, i) => (
            <article key={p.title} data-reveal className="grid gap-6 border-2 border-paper/20 p-5 md:grid-cols-[1.4fr_1fr] md:p-8">
              <div>
                <p className="font-grotesk text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                  Proposta {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-[0.92]">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-paper/80">{p.description}</p>
              </div>
              <div className="flex flex-col gap-4 border-t-2 border-paper/20 pt-4 md:border-l-2 md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-paper/50">Competência</p>
                  <p className="mt-1 text-sm">{p.competence}</p>
                </div>
                <div>
                  <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-paper/50">Prazo</p>
                  <p className="mt-1 inline-block bg-paper px-2 py-0.5 font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-zinc-950">
                    {p.term}
                  </p>
                </div>
                {p.alternatives && (
                  <div>
                    <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-paper/50">Caminhos possíveis</p>
                    <ul className="mt-2 space-y-2">
                      {p.alternatives.map((a) => (
                        <li key={a} className="flex gap-2 text-sm leading-snug text-paper/75">
                          <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 bg-red-600" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Part>

      <Part id="implementacao" n={4} title="Implementação">
        <div className="grid gap-px border-2 border-paper/20 bg-paper/20 md:grid-cols-2">
          {c.implementation.map((it) => (
            <div key={it.title} data-reveal className="bg-ink p-5 md:p-7">
              <h3 className="font-display text-3xl leading-none">{it.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/75">{it.body}</p>
            </div>
          ))}
        </div>
      </Part>

      <Part id="viabilidade" n={5} title="Viabilidade econômica">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "Custos", items: c.viability.costs, tone: "border-paper/20" },
            { title: "Financiamento", items: c.viability.funding, tone: "border-paper/20" },
            { title: "Limitações", items: c.viability.limits, tone: "border-red-600" },
          ].map((col) => (
            <div key={col.title} data-reveal className={`border-2 p-5 md:p-7 ${col.tone}`}>
              <h3 className="font-display text-4xl leading-none">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((t) => (
                  <li key={t} className="text-sm leading-relaxed text-paper/80">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Part>

      <Part id="prazos" n={6} title="Prazos">
        <div className="grid gap-px border-2 border-paper/20 bg-paper/20 md:grid-cols-3">
          {c.timeline.map((t, i) => (
            <div key={t.term} data-reveal className="bg-ink p-5 md:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-3 bg-red-600" style={{ width: `${(i + 1) * 24}px` }} />
                <h3 className="font-display text-3xl leading-none">{t.term}</h3>
              </div>
              <ul className="space-y-2">
                {t.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-paper/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Part>

      <Part id="indicadores" n={7} title="Indicadores">
        <div data-reveal className="overflow-hidden border-2 border-paper/20">
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 bg-paper px-5 py-3 font-grotesk text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-950 md:grid">
            <span>Indicador</span>
            <span>Hoje</span>
            <span>Meta</span>
            <span>Fonte</span>
          </div>
          {c.indicators.map((ind) => (
            <div key={ind.name} className="grid gap-1 border-t border-paper/15 px-5 py-4 first:border-t-0 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-4">
              <span className="font-grotesk font-bold">{ind.name}</span>
              <span className="text-sm text-red-600"><span className="text-paper/50 md:hidden">Hoje: </span>{ind.current}</span>
              <span className="text-sm text-paper/85"><span className="text-paper/50 md:hidden">Meta: </span>{ind.target}</span>
              <span className="text-xs text-paper/50"><span className="md:hidden">Fonte: </span>{ind.source}</span>
            </div>
          ))}
        </div>
      </Part>

      <Part id="riscos" n={8} title="Riscos e desafios">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.risks.map((r) => (
            <div key={r.title} data-reveal className="border-l-4 border-red-600 bg-paper/[0.04] p-5">
              <h3 className="font-display text-3xl leading-none">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">{r.body}</p>
            </div>
          ))}
        </div>
      </Part>

      <Part id="referencias" n={9} title="Referências">
        <ol className="grid gap-x-10 gap-y-4 md:grid-cols-2">
          {c.references.map((ref, i) => (
            <li key={ref.title} className="flex gap-3 text-sm leading-snug">
              <span className="font-grotesk text-xs text-paper/40">{String(i + 1).padStart(2, "0")}</span>
              <span>
                {ref.url ? (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="group text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-red-600">
                    {ref.title}
                    <ExternalLink className="ml-1 inline h-3 w-3 text-paper/50 group-hover:text-red-600" />
                  </a>
                ) : (
                  ref.title
                )}
                <span className="block text-paper/50">
                  {ref.source}, {ref.year}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Part>
    </div>
  );
}

function UnderConstruction({ axis }: { axis: Axis }) {
  return (
    <div className="flex flex-col gap-12">
      <div data-reveal className="border-2 border-red-600 p-6 md:p-10">
        <p className="font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-red-600">Em construção</p>
        <p className="mt-4 max-w-3xl font-grotesk text-xl font-medium leading-snug md:text-2xl">
          Este eixo ainda está em pesquisa. Ele será publicado com diagnóstico, propostas, custos,
          prazos, indicadores, riscos e fontes, como os eixos já publicados. Até lá, nada aqui é proposta.
        </p>
      </div>
      <div>
        <h2 data-reveal className="mb-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">Temas que serão tratados</h2>
        <ul className="grid gap-px border-2 border-paper/20 bg-paper/20 sm:grid-cols-2 lg:grid-cols-3">
          {axis.themes.map((t, i) => (
            <li key={t} data-reveal className="flex gap-4 bg-ink p-5">
              <span className="font-display text-2xl text-paper/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-grotesk font-medium">{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div data-reveal>
        <h2 className="mb-4 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/60">Cada tema terá</h2>
        <p className="max-w-3xl text-paper/70">
          {AXIS_PARTS.map((p) => p.label).join(" · ")}
        </p>
      </div>
    </div>
  );
}

function AxisNav({ current }: { current: Axis }) {
  const i = AXES.findIndex((a) => a.slug === current.slug);
  const prev = AXES[i - 1];
  const next = AXES[i + 1];
  return (
    <nav aria-label="Outros eixos" className="mt-24 border-t-2 border-paper/80 pt-8">
      <div className="grid gap-4 md:grid-cols-2">
        {prev ? (
          <a href={`/projeto/${prev.slug}`} className="group border-2 border-paper/20 p-5 transition-colors hover:border-paper">
            <span className="flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-paper/60">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Eixo {prev.n}
            </span>
            <span className="mt-2 block font-display text-3xl leading-none">{prev.title}</span>
          </a>
        ) : (
          <a href="/projeto" className="group border-2 border-paper/20 p-5 transition-colors hover:border-paper">
            <span className="flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-paper/60">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </span>
            <span className="mt-2 block font-display text-3xl leading-none">Projeto de País</span>
          </a>
        )}
        {next ? (
          <a href={`/projeto/${next.slug}`} className="group border-2 border-paper/20 p-5 text-right transition-colors hover:border-paper">
            <span className="flex items-center justify-end gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-paper/60">
              Eixo {next.n} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block font-display text-3xl leading-none">{next.title}</span>
          </a>
        ) : (
          <a href="/projeto" className="group border-2 border-paper/20 p-5 text-right transition-colors hover:border-paper">
            <span className="flex items-center justify-end gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-paper/60">
              Todos os eixos <ArrowRight className="h-4 w-4" />
            </span>
            <span className="mt-2 block font-display text-3xl leading-none">Projeto de País</span>
          </a>
        )}
      </div>
    </nav>
  );
}

/* ───────────── Página ───────────── */

export default async function AxisPage({ params }: { params: Promise<{ eixo: string }> }) {
  const axis = getAxis((await params).eixo);
  if (!axis) notFound();
  const c = axis.content;

  return (
    <>
      <Nav />
      <main className="bg-ink">
        <Reveal>
          <header className="relative overflow-hidden border-b border-paper/10 px-4 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
            <div className="pointer-events-none absolute inset-0">
              <span className="text-outline absolute -right-[4%] -top-[6%] select-none font-display text-[42vw] leading-none opacity-10 md:text-[30vw]">
                {axis.n}
              </span>
            </div>
            <div className="relative mx-auto max-w-[1600px]">
              <p data-reveal className="mb-6 flex flex-wrap items-center gap-3 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/60">
                <a href="/projeto" className="text-red-600 hover:underline">Projeto de País</a>
                <span>/</span>
                <span>Eixo {axis.n}</span>
                <span className={`ml-2 px-2 py-0.5 text-[10px] font-bold ${c ? "bg-red-600 text-zinc-950" : "border border-paper/40"}`}>
                  {c ? "Publicado" : "Em construção"}
                </span>
              </p>
              <h1 data-reveal className="max-w-6xl font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.85]">
                {axis.title}
              </h1>
              <p data-reveal className="mt-8 max-w-3xl font-grotesk text-xl font-medium leading-snug text-paper/85 md:text-2xl">
                {axis.lead}
              </p>
            </div>
          </header>

          <div className="px-4 py-16 md:px-10 md:py-24">
            <div className={`mx-auto max-w-[1600px] ${c ? "lg:grid lg:grid-cols-[220px_1fr] lg:gap-16" : ""}`}>
              {c && (
                <aside className="hidden lg:block">
                  <nav aria-label="Partes deste eixo" className="sticky top-28">
                    <p className="mb-4 font-grotesk text-[10px] uppercase tracking-[0.3em] text-paper/50">Neste eixo</p>
                    <ol className="space-y-2">
                      {AXIS_PARTS.map((p, i) => (
                        <li key={p.id}>
                          <a href={`#${p.id}`} className="flex gap-3 font-grotesk text-sm text-paper/70 transition-colors hover:text-red-600">
                            <span className="text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                            {p.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </aside>
              )}
              <div className="min-w-0">
                {c ? <AxisBody c={c} /> : <UnderConstruction axis={axis} />}
                <AxisNav current={axis} />
              </div>
            </div>
          </div>
        </Reveal>
      </main>
      <CallToAction />
    </>
  );
}
