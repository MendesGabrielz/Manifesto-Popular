"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, ChevronDown, Scale, X } from "lucide-react";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Verdict = "fail" | "ok";

type Case = {
  id: string;
  name: string;
  sector: string;
  year: string;
  headline: string;
  body: string;
  facts: { label: string; value: string }[];
  // O outro lado da história: honestidade intelectual em cada card
  caveat?: string;
  sources: string;
};

const FAILS: Case[] = [
  {
    id: "enel",
    name: "Enel SP",
    sector: "Distribuição de energia",
    year: "Eletropaulo privatizada em 1998; Enel desde 2018",
    headline: "Promessa: eficiência. Realidade: equipe cortada e cidade no escuro.",
    body: "Ninguém escolhe de qual poste compra energia. Sem concorrência, cortar pessoal é o caminho mais curto para o lucro. Entre 2019 e 2023, a Enel reduziu cerca de 36% da equipe em São Paulo. Em novembro de 2023, 2,1 milhões de clientes ficaram sem luz; em outubro de 2024, 3,1 milhões. A ANEEL abriu processo que pode tirar a concessão da empresa.",
    facts: [
      { label: "Equipe, 2019–2023", value: "−36%" },
      { label: "Sem luz, nov/2023", value: "2,1 mi" },
      { label: "Sem luz, out/2024", value: "3,1 mi" },
    ],
    caveat: "Ironia: o maior acionista da Enel é o próprio Estado italiano. Lá, a energia é estratégica; aqui, foi vendida.",
    sources: "CNN Brasil (2023), Enel SP e ANEEL",
  },
  {
    id: "eletrobras",
    name: "Eletrobras",
    sector: "Geração e transmissão de energia",
    year: "Privatizada em 2022",
    headline: "Promessa: conta de luz mais barata. Realidade: o Estado ficou com o risco e perdeu o comando.",
    body: "Usinas hidrelétricas e linhas de transmissão são monopólio natural: ninguém constrói uma segunda rede ao lado da primeira. Na privatização, o governo prometeu queda de 7,36% na conta de luz; no TCU, um ministro projetou o oposto, alta de 4,3% a 6,5% ao ano. A União manteve cerca de 40% das ações, mas teve o voto limitado a 10%: continua sócia sem mandar na empresa.",
    facts: [
      { label: "Promessa do governo", value: "−7,36%" },
      { label: "Projeção no TCU", value: "+4,3 a 6,5%/ano" },
      { label: "Voto da União", value: "10%" },
    ],
    sources: "Governo federal e TCU (2022); Lei 14.182/2021",
  },
  {
    id: "vale",
    name: "Vale",
    sector: "Mineração e recursos estratégicos",
    year: "Privatizada em 1997",
    headline: "Lucro privatizado, prejuízo socializado.",
    body: "Mineração não é monopólio natural, mas explora riquezas do subsolo, que pertencem à União, e gera riscos que caem sobre cidades inteiras. Vendida em 1997 por cerca de R$ 3,3 bilhões, a Vale esteve no centro dos dois maiores desastres de barragem do país: Mariana (2015, pela Samarco, sua sociedade com a BHP, 19 mortos) e Brumadinho (2019, 270 mortos).",
    facts: [
      { label: "Venda do controle, 1997", value: "R$ 3,3 bi" },
      { label: "Mortos em Brumadinho", value: "270" },
      { label: "Acordo de Brumadinho", value: "R$ 37,7 bi" },
    ],
    sources: "TJMG (acordo de 2021) e Agência Brasil",
  },
];

const WINS: Case[] = [
  {
    id: "telebras",
    name: "Sistema Telebrás",
    sector: "Telefonia",
    year: "Privatizado em 1998",
    headline: "Do telefone como patrimônio ao celular no bolso.",
    body: "Nos anos 1990, uma linha fixa custava cerca de R$ 1,2 mil e dois anos de espera, ou até R$ 7 mil no mercado paralelo. Com a privatização e a entrada de concorrentes, o preço de acesso despencou e o celular se universalizou: hoje o Brasil tem mais linhas móveis do que habitantes.",
    facts: [
      { label: "Linha fixa nos anos 90", value: "R$ 1,2 mil + 2 anos" },
      { label: "Mercado paralelo", value: "até R$ 7 mil" },
      { label: "Venda do sistema", value: "R$ 22 bi" },
    ],
    caveat: "Mas: a assinatura básica subiu 42,5% nos três anos seguintes, e o setor só funciona porque a Anatel regula as operadoras. Concorrência sem regulação vira cartel.",
    sources: "Idec, Anatel e leilão do Sistema Telebrás (1998)",
  },
  {
    id: "embraer",
    name: "Embraer",
    sector: "Aviação",
    year: "Privatizada em 1994",
    headline: "Para competir com Boeing e Airbus, é preciso agilidade e capital.",
    body: "Num mercado global e disputado, a empresa precisava de capital e de velocidade de decisão que o orçamento público não dava. Depois da privatização, tornou-se uma das maiores fabricantes de jatos comerciais do mundo.",
    facts: [
      { label: "Criada pelo Estado", value: "1969" },
      { label: "Privatizada", value: "1994" },
      { label: "Poder de veto da União", value: "Golden share" },
    ],
    caveat: "Mas: a Embraer só existe porque o Estado a criou, com engenheiros formados no ITA, uma escola pública. E a União mantém uma ação especial com poder de veto. O mercado colheu o que o Estado plantou.",
    sources: "Embraer e Instituto Tecnológico de Aeronáutica",
  },
];

const TONES = {
  fail: {
    column: "bg-ink text-paper",
    card: "border-paper/20 hover:border-red-600",
    open: "border-red-600",
    muted: "text-paper/65",
    badge: "bg-red-600 text-zinc-950",
    fact: "border-paper/20",
    caveat: "border-red-600 text-paper/80",
    Icon: X,
  },
  ok: {
    column: "bg-paper text-zinc-950",
    card: "border-zinc-950/20 hover:border-zinc-950",
    open: "border-zinc-950",
    muted: "text-zinc-950/65",
    badge: "bg-zinc-950 text-paper",
    fact: "border-zinc-950/20",
    caveat: "border-red-600 text-zinc-950/80",
    Icon: Check,
  },
} as const;

function CaseCard({
  item,
  verdict,
  open,
  onToggle,
}: {
  item: Case;
  verdict: Verdict;
  open: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const t = TONES[verdict];

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

  const panelId = `caso-${item.id}`;

  return (
    <article className={`border-2 transition-colors ${open ? t.open : t.card}`}>
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-4 p-5 text-left md:p-6"
        >
          <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center ${t.badge}`}>
            <t.Icon className="h-5 w-5" strokeWidth={3} />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] ${t.muted}`}>
              {item.sector}
            </span>
            <span className="mt-1 block font-display text-4xl leading-none md:text-5xl">{item.name}</span>
            <span className="mt-2 block font-grotesk text-base font-medium leading-snug md:text-lg">
              {item.headline}
            </span>
          </span>
          <ChevronDown
            className={`mt-2 h-6 w-6 shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h4>

      <div ref={panel} id={panelId} role="region" aria-label={item.name} className="h-0 overflow-hidden opacity-0">
        <div className="px-5 pb-6 md:px-6 md:pl-[4.75rem]">
          <p className={`font-grotesk text-xs font-bold uppercase tracking-[0.2em] ${t.muted}`}>{item.year}</p>
          <p className="mt-3 text-[15px] leading-relaxed md:text-base">{item.body}</p>

          <dl className="mt-5 grid grid-cols-3 gap-px">
            {item.facts.map((f) => (
              <div key={f.label} className={`border-t-2 pt-2 pr-2 ${t.fact}`}>
                <dt className={`font-grotesk text-[10px] uppercase leading-tight tracking-[0.12em] ${t.muted}`}>
                  {f.label}
                </dt>
                <dd className="mt-1 font-display text-2xl leading-none md:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>

          {item.caveat && (
            <p className={`mt-5 border-l-4 pl-4 text-sm leading-relaxed ${t.caveat}`}>{item.caveat}</p>
          )}

          <p className={`mt-5 text-[11px] ${t.muted}`}>Fontes: {item.sources}</p>
        </div>
      </div>
    </article>
  );
}

function Column({
  verdict,
  kicker,
  title,
  concept,
  items,
  openId,
  setOpenId,
}: {
  verdict: Verdict;
  kicker: string;
  title: string;
  concept: string;
  items: Case[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const t = TONES[verdict];
  return (
    <div className={`pz-col flex flex-col gap-6 p-5 md:p-10 ${t.column}`}>
      <div>
        <p className="flex items-center gap-3 font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-red-600">
          <t.Icon className="h-4 w-4" strokeWidth={3} />
          {kicker}
        </p>
        <h3 className="mt-3 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.88]">{title}</h3>
        <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${t.muted}`}>{concept}</p>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <CaseCard
            key={item.id}
            item={item}
            verdict={verdict}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function PrivatizationAnalysis() {
  const root = useRef<HTMLElement>(null);
  // Um card aberto por coluna, para comparar lado a lado
  const [openFail, setOpenFail] = useState<string | null>(FAILS[0].id);
  const [openWin, setOpenWin] = useState<string | null>(WINS[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(BREAKPOINTS, (ctx) => {
        const { isDesktop, reduceMotion } = ctx.conditions as Conditions;
        if (reduceMotion) return;
        // Desktop: as colunas entram de lados opostos. Mobile: sobem uma de cada vez.
        gsap.utils.toArray<HTMLElement>(".pz-col").forEach((col, i) => {
          gsap.from(col, {
            x: isDesktop ? (i === 0 ? -60 : 60) : 0,
            y: isDesktop ? 0 : 50,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: col, start: "top 85%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="privatizacoes"
      ref={root}
      className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
          <span className="h-px w-12 bg-red-600" />
          Raio-X das privatizações
        </div>
        <h2 className="max-w-5xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.85]">
          Não é Estado contra mercado. <span className="text-outline">É saber onde cada um funciona.</span>
        </h2>

        <div className="mt-14 grid border-2 border-paper/80 lg:grid-cols-2 md:mt-20">
          <Column
            verdict="fail"
            kicker="Onde a privatização sucateia"
            title="Monopólios naturais e recursos estratégicos"
            concept="Você não escolhe de qual poste recebe energia nem de qual cano vem a sua água. Sem concorrência, a empresa privada não precisa ser melhor: basta cortar manutenção e pessoal para lucrar mais, e quem paga é o cidadão."
            items={FAILS}
            openId={openFail}
            setOpenId={setOpenFail}
          />
          <Column
            verdict="ok"
            kicker="Onde a privatização funcionou"
            title="Mercados competitivos"
            concept="O Estado é lento para gerir tecnologia de consumo e produtos que mudam a cada ano. Onde há concorrência de verdade, a disputa por clientes força preço menor e inovação, desde que haja regulação firme."
            items={WINS}
            openId={openWin}
            setOpenId={setOpenWin}
          />
        </div>

        <div className="flex flex-col gap-4 border-2 border-t-0 border-paper/80 bg-red-600 p-5 text-zinc-950 md:flex-row md:items-center md:gap-8 md:p-10">
          <Scale className="h-12 w-12 shrink-0" strokeWidth={1.5} />
          <p className="font-grotesk text-lg font-bold leading-snug md:text-2xl">
            A regra: onde não há concorrência possível (energia, água, saneamento, transmissão), o serviço
            deve ser público ou regulado com mão de ferro. Onde há concorrência real, o Estado regula e o
            mercado compete.
          </p>
        </div>
      </div>
    </section>
  );
}
