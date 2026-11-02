"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Objection = {
  id: string;
  question: string;
  answer: string;
  facts: { label: string; value: string }[];
  // O que o argumento contrário tem de verdade: sem isso a resposta não convence
  admit: string;
  sources: string;
};

const OBJECTIONS: Objection[] = [
  {
    id: "dinheiro",
    question: "“O Estado não tem dinheiro para isso.”",
    answer: "O Estado tem dinheiro. A questão é com quem ele gasta. Em 2026, a União deve deixar de arrecadar cerca de R$ 613 bilhões com isenções, deduções e regimes especiais, e em 2025 gastou R$ 1 trilhão em juros da dívida. Rever privilégios fiscais já começou: uma lei de 2025 cortou 10% de boa parte desses benefícios, com ganho estimado de cerca de R$ 20 bilhões em 2026.",
    facts: [
      { label: "Benefícios fiscais, 2026", value: "R$ 613 bi" },
      { label: "Juros da dívida, 2025", value: "R$ 1 tri" },
      { label: "Corte de 10%, 2026", value: "≈ R$ 20 bi" },
    ],
    admit: "Nem todo benefício fiscal é privilégio: parte dele barateia a cesta básica, sustenta o Simples Nacional e financia a saúde. Cortar exige olhar um por um. E a taxação das altas rendas de 2025 não é dinheiro novo: ela paga a isenção do IR para quem ganha até R$ 5 mil.",
    sources: "Receita Federal, Demonstrativo de Gastos Tributários do PLOA 2026; Banco Central, Estatísticas Fiscais (2025); Lei Complementar 224/2025 e estimativa do Ministério da Fazenda; Lei 15.270/2025",
  },
  {
    id: "inflacao",
    question: "“Gasto público gera inflação.”",
    answer: "Gasto pago com dinheiro emitido ou com dívida sem controle gera, sim. Por isso cada proposta deste site aponta de onde vem a receita, e não da impressora. E existe um gasto que quase ninguém chama de gasto: os juros. Segundo o Banco Central, cada ponto a mais na Selic por um ano aumenta a dívida bruta em dezenas de bilhões de reais.",
    facts: [
      { label: "1 ponto de Selic por 12 meses", value: "R$ 31–56 bi" },
      { label: "Juros da dívida / PIB, 2025", value: "7,9%" },
      { label: "Dívida bruta / PIB, 2025", value: "78,7%" },
    ],
    admit: "Gastar mais do que a economia consegue produzir pressiona os preços, e quem mais perde com a inflação é o pobre. Responsabilidade fiscal não é bandeira da direita: é condição para que o Estado forte dure.",
    sources: "Banco Central do Brasil, Estatísticas Fiscais e sensibilidade da dívida à Selic (2025–2026)",
  },
  {
    id: "ineficiente",
    question: "“Estatal é ineficiente.”",
    answer: "Depende de como é gerida. A Embrapa, uma estatal, ajudou a transformar o cerrado num dos celeiros do mundo. Em 2024, ela calcula ter devolvido à sociedade R$ 25,37 para cada real que recebeu, um lucro social de R$ 107 bilhões. O SUS, público, faz uma das maiores campanhas de vacinação gratuita do planeta.",
    facts: [
      { label: "Lucro social da Embrapa, 2024", value: "R$ 107 bi" },
      { label: "Retorno por real investido", value: "R$ 25,37" },
      { label: "Média desde 1997", value: "R$ 13,60" },
    ],
    admit: "Há estatais mal geridas e loteadas por partidos. A resposta não é vender, é governar bem: diretoria técnica, metas públicas, transparência e punição, como exige a Lei das Estatais (Lei 13.303/2016).",
    sources: "Embrapa, Balanço Social 2024; Lei 13.303/2016",
  },
  {
    id: "corrupcao",
    question: "“Estatal é sinônimo de corrupção. Olha a Petrobras.”",
    answer: "A corrupção na Petrobras foi real e grave: a própria empresa reconheceu no balanço de 2014 perdas de R$ 6,2 bilhões com desvios. Mas quem pagava a propina eram empresas privadas, num cartel de 27 empreiteiras. E o setor privado tem seus próprios escândalos: em 2023, a Americanas admitiu uma fraude contábil de R$ 25,3 bilhões feita pela antiga diretoria.",
    facts: [
      { label: "Perda da Petrobras, 2014", value: "R$ 6,2 bi" },
      { label: "Empresas no cartel", value: "27" },
      { label: "Fraude na Americanas", value: "R$ 25,3 bi" },
    ],
    admit: "Estatal sem controle vira cabide e balcão de negócios. Defender o público é defender também auditoria independente, nomeação técnica e cadeia para quem rouba, seja de que partido for.",
    sources: "Petrobras, demonstrações financeiras de 2014 (abr/2015); Ministério Público Federal (Lava Jato); Americanas, fato relevante (jun/2023) e Agência Brasil",
  },
  {
    id: "venezuela",
    question: "“Isso vai virar a Venezuela.”",
    answer: "A Venezuela apostou tudo no petróleo, controlou preços à força, esvaziou as instituições e fechou a democracia. O resultado: o PIB caiu cerca de 75% entre 2013 e 2020, e os preços subiram mais de 130.000% em 2018. Este site defende o oposto: regras fiscais, instituições fortes e eleições livres. O modelo é mais parecido com a Noruega, onde o Estado controla 67% da maior petroleira do país e guarda a renda do petróleo num fundo para as próximas gerações.",
    facts: [
      { label: "PIB da Venezuela, 2013–2020", value: "≈ −75%" },
      { label: "Inflação venezuelana, 2018", value: "130.060%" },
      { label: "Fatia do Estado na Equinor", value: "67%" },
    ],
    admit: "Governos que se dizem de esquerda já destruíram economias e perseguiram opositores. Quem defende um Estado forte precisa dizer com clareza: sem democracia, não é o nosso projeto.",
    sources: "Estimativas do FMI, do Banco Mundial e da UCAB, compiladas pelo Chequeado (os números variam de 73% a 80%); Banco Central da Venezuela; Equinor, relação com investidores",
  },
  {
    id: "ricos",
    question: "“Taxar os ricos espanta investimento.”",
    answer: "O imposto mínimo criado em 2025 atinge só cerca de 141 mil pessoas, 0,13% dos contribuintes, com renda acima de R$ 600 mil por ano, e exige delas uma alíquota mínima de até 10% sobre a renda total. Em troca, cerca de 10 milhões de pessoas que ganham até R$ 5 mil por mês deixaram de pagar imposto de renda. É dinheiro que volta para o consumo e para o comércio local.",
    facts: [
      { label: "Atingidos pelo imposto mínimo", value: "141 mil" },
      { label: "Alíquota mínima, no topo", value: "10%" },
      { label: "Isentos de IR (até R$ 5 mil)", value: "10 mi" },
    ],
    admit: "Capital pode, sim, sair do país se a tributação for mal desenhada. Por isso ela precisa ser gradual, previsível e coordenada com outros países, como o imposto mínimo global de 15% sobre multinacionais acertado na OCDE.",
    sources: "Lei 15.270/2025; Ministério da Fazenda e Receita Federal (estimativas do projeto); DIEESE, Nota Técnica 290 (2026); OCDE, acordo do Pilar Dois",
  },
];

function ObjectionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: Objection;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // Abre e fecha animando a altura até "auto"
  useGSAP(
    () => {
      const reduce = window.matchMedia(BREAKPOINTS.reduceMotion).matches;
      gsap.to(panel.current, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: reduce ? 0 : 0.55,
        ease: "power3.inOut",
      });
    },
    { dependencies: [open] }
  );

  const panelId = `objecao-${item.id}`;

  return (
    <article className="obj-item border-t-2 border-zinc-950">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start gap-4 py-6 text-left md:gap-8 md:py-8"
        >
          <span className="mt-1 w-10 shrink-0 font-display text-3xl leading-none text-red-600 md:w-16 md:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 flex-1 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] transition-colors group-hover:text-red-600">
            {item.question}
          </span>
          <ChevronDown
            className={`mt-2 h-7 w-7 shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      <div ref={panel} id={panelId} role="region" aria-label={item.question} className="h-0 overflow-hidden opacity-0">
        <div className="grid gap-8 pb-10 md:pl-24 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <p className="font-grotesk text-lg font-medium leading-snug md:text-xl">{item.answer}</p>
            <dl className="mt-6 grid grid-cols-3 gap-px">
              {item.facts.map((f) => (
                <div key={f.label} className="border-t-2 border-zinc-950/20 pt-2 pr-2">
                  <dt className="font-grotesk text-[10px] uppercase leading-tight tracking-[0.12em] text-zinc-950/60">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl leading-none md:text-4xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="bg-zinc-950 p-5 text-paper md:p-6">
              <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.25em] text-red-600">
                O que o outro lado tem de razão
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/85">{item.admit}</p>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-zinc-950/60">Fontes: {item.sources}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Objections() {
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(OBJECTIONS[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(BREAKPOINTS, (ctx) => {
        const { reduceMotion } = ctx.conditions as Conditions;
        if (reduceMotion) return;
        gsap.from(".obj-title", {
          yPercent: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".obj-title", start: "top 85%" },
        });
        gsap.from(".obj-item", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".obj-list", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="objecoes" ref={root} className="relative bg-paper px-4 py-24 text-zinc-950 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center gap-4 font-grotesk text-xs font-bold uppercase tracking-[0.4em] text-red-600">
          <span className="h-px w-12 bg-red-600" />
          As perguntas difíceis
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="obj-title font-display text-[clamp(5rem,16vw,14rem)] leading-[0.8]">
            Mas e<span className="text-red-600">…?</span>
          </h2>
          <p className="max-w-xl font-grotesk text-lg font-medium leading-snug text-zinc-950/75 md:text-2xl">
            As objeções que todo mundo já ouviu, respondidas com número e fonte. Inclusive quando a
            resposta nos obriga a admitir o que o outro lado tem de razão.
          </p>
        </div>

        <div className="obj-list mt-14 border-b-2 border-zinc-950 md:mt-20">
          {OBJECTIONS.map((item, i) => (
            <ObjectionItem
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
