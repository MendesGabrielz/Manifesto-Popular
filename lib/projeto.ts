/**
 * Conteúdo do Projeto de País.
 * Cada eixo segue a mesma estrutura em 9 partes. Eixos sem `content`
 * aparecem como "em construção": só tema e escopo, nenhuma proposta.
 *
 * Regra editorial: todo número tem fonte; quando não há base para uma
 * meta, o texto diz que ela depende de estudos técnicos.
 */

export type Prazo = "Curto prazo" | "Médio prazo" | "Longo prazo";

export type Reference = { title: string; source: string; year: string; url?: string };

export type Proposal = {
  title: string;
  description: string;
  // Quem tem a competência constitucional ou legal
  competence: string;
  term: Prazo;
  // Caminhos diferentes para o mesmo objetivo
  alternatives?: string[];
};

export type Indicator = { name: string; current: string; target: string; source: string };

export type Bar = {
  label: string;
  current: number; // 0 a 100
  target: number; // 0 a 100
  currentLabel: string;
  targetLabel: string;
  note: string;
};

export type AxisContent = {
  diagnosis: string[];
  keyNumbers: { value: string; label: string; source: string }[];
  bars: { title: string; caption: string; items: Bar[] };
  objectives: string[];
  proposals: Proposal[];
  implementation: { title: string; body: string }[];
  viability: { costs: string[]; funding: string[]; limits: string[] };
  timeline: { term: Prazo; items: string[] }[];
  indicators: Indicator[];
  risks: { title: string; body: string }[];
  references: Reference[];
};

export type Axis = {
  n: string;
  slug: string;
  title: string;
  short: string;
  lead: string;
  themes: string[];
  content?: AxisContent;
};

const INFRA: AxisContent = {
  diagnosis: [
    "O Brasil investe pouco em infraestrutura há quinze anos. Em 2024, o investimento somou cerca de R$ 267 bilhões, entre 2,2% e 2,3% do PIB, e cerca de 70% veio do setor privado. A depreciação do que já existe ficou em patamar parecido, o que significa que o estoque de infraestrutura do país praticamente não cresce. Estudos de diferentes instituições estimam a necessidade entre 4% e 4,5% do PIB por ano.",
    "No saneamento, cerca de 83% da população tem água encanada, mas pouco mais da metade tem coleta de esgoto, e só cerca de 52% do esgoto é tratado. No campo, o atendimento de água cai para 24%. O Marco Legal do Saneamento fixou como meta, até 2033, água para 99% da população e coleta e tratamento de esgoto para 90%. O investimento de 2024, recorde, foi de R$ 29 bilhões, muito abaixo do ritmo que as estimativas de custo exigem.",
    "Num país continental, a carga anda sobre pneus: as rodovias respondem por algo entre 62% e 67% do transporte de cargas, e as ferrovias por cerca de 21% a 27%, conforme a metodologia. Isso encarece o frete, aumenta acidentes e emissões e penaliza quem produz longe dos portos.",
    "Na energia, o Brasil tem uma das matrizes elétricas mais limpas do mundo: 88% renovável em 2024. Mas a geração eólica e solar cresceu mais rápido que as linhas de transmissão. Em 2025, cerca de 20% da produção eólica e solar foi cortada pelo operador do sistema por falta de rede ou de demanda, com perda estimada em R$ 6,5 bilhões, concentrada no Nordeste.",
    "Por trás de tudo está a desigualdade territorial. Em 2023, o PIB per capita do Distrito Federal (R$ 129,8 mil) foi quase seis vezes o do Maranhão (R$ 22 mil). Onde falta estrada, trem, esgoto e rede elétrica, falta também emprego.",
  ],
  keyNumbers: [
    { value: "2,2%", label: "do PIB investido em infraestrutura em 2024", source: "ABDIB / Agência iNFRA" },
    { value: "52%", label: "do esgoto é tratado", source: "SINISA, Ministério das Cidades" },
    { value: "~65%", label: "das cargas viajam por rodovias", source: "PNL 2035 / Infra S.A." },
    { value: "88%", label: "da eletricidade foi renovável em 2024", source: "EPE, BEN 2025" },
    { value: "~20%", label: "da geração eólica e solar foi cortada em 2025", source: "Volt Robotics / Agência iNFRA" },
    { value: "5,9×", label: "PIB per capita do DF em relação ao Maranhão (2023)", source: "IBGE, Contas Regionais" },
  ],
  bars: {
    title: "Onde estamos e onde precisamos chegar",
    caption: "Metas de saneamento definidas em lei (Lei 14.026/2020). A referência de investimento vem de estudos setoriais, não de lei.",
    items: [
      { label: "População com água encanada", current: 83.1, target: 99, currentLabel: "83,1%", targetLabel: "99% até 2033", note: "SINISA (ano-base 2023)" },
      { label: "Esgoto tratado", current: 52, target: 90, currentLabel: "~52%", targetLabel: "90% até 2033", note: "SINISA" },
      { label: "Água no meio rural", current: 24, target: 99, currentLabel: "24%", targetLabel: "99% até 2033", note: "SINISA (ano-base 2023)" },
      { label: "Investimento em infraestrutura (% do PIB, escala até 5%)", current: (2.27 / 5) * 100, target: (4 / 5) * 100, currentLabel: "2,27%", targetLabel: "4% a 4,5% (estudos)", note: "Agência iNFRA, ABDIB, CNI" },
    ],
  },
  objectives: [
    "Elevar de forma sustentada o investimento em infraestrutura. A meta exata deve sair de um plano plurianual que considere o espaço fiscal; os estudos disponíveis apontam 4% a 4,5% do PIB como referência.",
    "Cumprir as metas do Marco Legal do Saneamento até 2033: 99% da população com água potável e 90% com coleta e tratamento de esgoto, incluindo as áreas rurais e as periferias.",
    "Aumentar a participação de ferrovias e hidrovias no transporte de cargas. A meta numérica depende da atualização do Plano Nacional de Logística.",
    "Garantir que a transmissão acompanhe a geração renovável, reduzindo os cortes de energia limpa e aproveitando a vantagem da matriz brasileira.",
    "Priorizar transporte coletivo nas cidades, como determina a Política Nacional de Mobilidade Urbana.",
    "Usar a infraestrutura como instrumento de redução das desigualdades regionais.",
  ],
  proposals: [
    {
      title: "Plano Nacional de Infraestrutura de longo prazo",
      description: "Uma carteira de projetos com horizonte de 20 anos, aprovada em lei e revisada a cada quatro anos, para que as obras não dependam do governo da vez. Cada projeto entra na carteira só depois de estudo de viabilidade técnica, econômica e ambiental.",
      competence: "União, com participação de estados e municípios",
      term: "Curto prazo",
      alternatives: [
        "Atualizar e dar força de lei aos instrumentos que já existem (Plano Nacional de Logística e Novo PAC).",
        "Criar um órgão de planejamento de Estado, com mandato técnico, nos moldes de comissões nacionais de infraestrutura adotadas em outros países.",
      ],
    },
    {
      title: "Saneamento: dinheiro público onde a conta não fecha",
      description: "O Marco Legal agrupou municípios em blocos para dar escala à prestação do serviço. Onde a tarifa não paga o investimento, como em áreas rurais, favelas e cidades pequenas e pobres, a universalização exige recurso público: FGTS, bancos públicos e orçamento federal, com tarifa social para famílias de baixa renda.",
      competence: "Municípios (titulares do serviço) e estados; a União financia e define diretrizes",
      term: "Longo prazo",
      alternatives: [
        "Prestação por companhias públicas estaduais, desde que vençam licitações e cumpram metas contratuais.",
        "Concessões e parcerias público-privadas com metas de universalização e regulação firme.",
        "Modelo misto: privado nos blocos rentáveis, público e subsidiado onde não há retorno.",
      ],
    },
    {
      title: "Ferrovias: terminar o que foi começado",
      description: "Antes de anunciar novas linhas, concluir os eixos em obra, como a Ferrovia de Integração Oeste-Leste (FIOL), a Ferrovia de Integração do Centro-Oeste (FICO) e a Transnordestina, e integrá-los a portos e hidrovias. Garantir o direito de passagem para que diferentes operadores usem a mesma via.",
      competence: "União (Constituição, art. 21, XII)",
      term: "Médio prazo",
      alternatives: [
        "Investimento público direto pela Infra S.A.",
        "Concessões tradicionais.",
        "Autorizações privadas, criadas pelo Marco das Ferrovias (Lei 14.273/2021), em que a empresa constrói por conta e risco próprios.",
      ],
    },
    {
      title: "Transmissão antes de nova geração",
      description: "Coordenar os leilões de geração e de transmissão para que nenhuma usina fique pronta sem linha para escoar a energia, priorizando o Nordeste. Contratar armazenamento, como baterias e usinas hidrelétricas reversíveis, para guardar a energia que hoje é desperdiçada.",
      competence: "União, por meio do Ministério de Minas e Energia, da EPE, da ANEEL e do ONS",
      term: "Curto prazo",
    },
    {
      title: "Transporte coletivo de alta capacidade",
      description: "Financiamento federal estável para metrôs, trens metropolitanos e corredores de ônibus nas regiões metropolitanas, com prioridade ao transporte coletivo sobre o individual, como manda a Política Nacional de Mobilidade Urbana.",
      competence: "Municípios e regiões metropolitanas (Constituição, art. 30, V); a União financia",
      term: "Médio prazo",
      alternatives: [
        "Financiamento de obras com repasse federal e operação pública.",
        "Parcerias público-privadas, com o poder público garantindo parte da receita.",
      ],
    },
    {
      title: "Critério regional nos investimentos federais",
      description: "Usar indicadores de déficit, como cobertura de esgoto, acesso a transporte e rede elétrica, para priorizar recursos federais nas regiões mais atrasadas, articulado com a Política Nacional de Desenvolvimento Regional e os fundos constitucionais do Norte, Nordeste e Centro-Oeste.",
      competence: "União, em cooperação com os estados",
      term: "Médio prazo",
    },
  ],
  implementation: [
    {
      title: "Projeto antes do anúncio",
      body: "A experiência brasileira mostra que dinheiro sem projeto vira obra parada. O plano deve contar com equipes de estruturação de projetos no BNDES e na Infra S.A., e nenhuma obra deve ser anunciada sem estudo concluído.",
    },
    {
      title: "Modelo misto, com regulação forte",
      body: "Onde há retorno econômico, concessões e parcerias público-privadas (Leis 8.987/1995 e 11.079/2004). Onde não há, investimento público. Em ambos os casos, agências reguladoras com quadro técnico e autonomia.",
    },
    {
      title: "Cooperação entre União, estados e municípios",
      body: "Muitas competências são locais. Consórcios públicos (Lei 11.107/2005) e a regionalização do saneamento permitem que cidades pequenas ganhem escala e capacidade técnica.",
    },
    {
      title: "Licenciamento ambiental rápido e rigoroso",
      body: "Reforçar as equipes técnicas dos órgãos ambientais para cumprir prazos sem afrouxar a proteção. Licença demorada encarece a obra; licença frouxa gera desastre e insegurança jurídica.",
    },
    {
      title: "Transparência em tempo real",
      body: "Painel público com custo, prazo e andamento de cada obra financiada com recursos federais, permitindo fiscalização pela sociedade, pelo Tribunal de Contas e pelo Congresso.",
    },
  ],
  viability: {
    costs: [
      "Não existe um número único. Para universalizar o saneamento até 2033, as estimativas vão de R$ 420 bilhões (CNI) a R$ 600–900 bilhões (ABCON), conforme a metodologia.",
      "Elevar o investimento total em infraestrutura de 2,27% para 4% do PIB significaria cerca de R$ 200 bilhões a mais por ano, em valores de 2024. É uma estimativa nossa, calculada sobre o investimento de 2024, e não inclui custos de manutenção.",
      "O custo de cada ferrovia, linha de transmissão ou sistema de transporte depende de estudos específicos de cada projeto.",
    ],
    funding: [
      "Orçamento federal, dentro dos limites do arcabouço fiscal (Lei Complementar 200/2023).",
      "Bancos públicos (BNDES, Caixa) e FGTS, que já financiam saneamento e habitação.",
      "Debêntures incentivadas e debêntures de infraestrutura, que atraem poupança privada de longo prazo.",
      "Concessões e parcerias público-privadas nos projetos com retorno econômico.",
      "Referência: o Novo PAC (2023) previu R$ 1,7 trilhão, sendo R$ 612 bilhões privados, R$ 371 bilhões do orçamento, R$ 343 bilhões de estatais e R$ 362 bilhões em financiamentos.",
    ],
    limits: [
      "O espaço fiscal é limitado, e cada real a mais em infraestrutura precisa caber nas regras fiscais ou vir de nova receita.",
      "Juros altos encarecem o financiamento de longo prazo e afastam o investimento privado.",
      "Tarifas não podem subir além da capacidade de pagamento da população; universalizar exige subsídio.",
    ],
  },
  timeline: [
    {
      term: "Curto prazo",
      items: [
        "Aprovar o plano de longo prazo e a carteira de projetos.",
        "Coordenar leilões de transmissão para o Nordeste.",
        "Reforçar equipes de estruturação de projetos e de licenciamento.",
      ],
    },
    {
      term: "Médio prazo",
      items: [
        "Concluir ferrovias em obra e integrá-las a portos.",
        "Ampliar o transporte coletivo de alta capacidade nas metrópoles.",
        "Concluir as linhas de transmissão prioritárias.",
      ],
    },
    {
      term: "Longo prazo",
      items: [
        "Universalizar água e esgoto até 2033, como manda a lei.",
        "Mudar a matriz de cargas em direção a trilhos e hidrovias.",
        "Reduzir de forma mensurável as desigualdades regionais de acesso.",
      ],
    },
  ],
  indicators: [
    { name: "Investimento em infraestrutura", current: "2,2% a 2,3% do PIB (2024)", target: "Definida em plano; estudos indicam 4% a 4,5%", source: "ABDIB, Agência iNFRA" },
    { name: "População com água encanada", current: "83,1% (2023)", target: "99% até 2033", source: "SINISA; Lei 14.026/2020" },
    { name: "Esgoto tratado", current: "~52%", target: "90% até 2033", source: "SINISA; Lei 14.026/2020" },
    { name: "Água no meio rural", current: "24% (2023)", target: "99% até 2033", source: "SINISA" },
    { name: "Participação das ferrovias na carga", current: "~21% a 27%", target: "Depende da atualização do PNL", source: "Infra S.A.; ANTF; Fundação Dom Cabral" },
    { name: "Corte de geração eólica e solar", current: "~20% (2025)", target: "Redução contínua; meta depende de estudos do ONS e da EPE", source: "Volt Robotics; Agência iNFRA" },
  ],
  risks: [
    {
      title: "Descontinuidade política",
      body: "Obras de infraestrutura atravessam vários governos. Sem plano em lei e carteira de projetos estável, a troca de governo interrompe obras. O Tribunal de Contas da União tem apontado milhares de obras paralisadas no país.",
    },
    {
      title: "Restrição fiscal e juros",
      body: "Com pouco espaço no orçamento e juros altos, o investimento público é o primeiro a ser cortado em momentos de aperto, e o privado fica mais caro.",
    },
    {
      title: "Tarifas e exclusão",
      body: "Concessões mal desenhadas podem elevar tarifas e excluir quem mais precisa. A universalização exige tarifa social e subsídio onde a renda é baixa.",
    },
    {
      title: "Impacto ambiental e social",
      body: "Ferrovias, portos e linhas de transmissão podem atingir comunidades tradicionais e áreas protegidas. Consulta prévia e licenciamento sério são condição, não obstáculo.",
    },
    {
      title: "Corrupção e sobrepreço",
      body: "Grandes obras concentram contratos bilionários. Transparência total, auditoria independente e projetos completos antes da licitação reduzem o risco.",
    },
    {
      title: "Capacidade técnica local",
      body: "Muitos municípios não têm engenheiros nem equipe para planejar e fiscalizar obras. Sem apoio técnico federal e estadual, o dinheiro não vira obra.",
    },
  ],
  references: [
    { title: "Constituição da República Federativa do Brasil", source: "Presidência da República", year: "1988", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { title: "Lei 14.026/2020, Marco Legal do Saneamento", source: "Presidência da República", year: "2020", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14026.htm" },
    { title: "Lei 14.273/2021, Marco Legal das Ferrovias", source: "Presidência da República", year: "2021", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14273.htm" },
    { title: "Lei 12.587/2012, Política Nacional de Mobilidade Urbana", source: "Presidência da República", year: "2012", url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12587.htm" },
    { title: "Lei 11.079/2004, Parcerias Público-Privadas", source: "Presidência da República", year: "2004", url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l11079.htm" },
    { title: "Lei 11.107/2005, Consórcios Públicos", source: "Presidência da República", year: "2005", url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11107.htm" },
    { title: "Lei Complementar 200/2023, Regime Fiscal Sustentável", source: "Presidência da República", year: "2023", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp200.htm" },
    { title: "SINISA 2024: resultados de abastecimento de água e esgotamento sanitário", source: "Ministério das Cidades", year: "2025", url: "https://www.gov.br/cidades/pt-br/assuntos/noticias-1/noticia-mcid-n-996/ReleaseSINISA.pdf/@@download/file" },
    { title: "Brasil precisa investir R$ 420 bilhões para universalizar saneamento até 2033", source: "CNI, Agência de Notícias da Indústria", year: "2025", url: "https://noticias.portaldaindustria.com.br/noticias/infraestrutura/brasil-precisa-investir-r-420-bilhoes-para-universalizar-saneamento-ate-2033-diz-cni/" },
    { title: "Investimentos em saneamento em 2024 e necessidade de universalização (dados ABCON SINDCON)", source: "Brasil 61", year: "2026", url: "https://brasil61.com/n/brasil-investe-r-29-1-bilhoes-em-saneamento-mas-precisa-de-ate-r-900-bilhoes-para-universalizar-bras2616916.amp" },
    { title: "Infraestrutura em Números 2024", source: "ABDIB", year: "2025", url: "https://www.abdib.org.br/wp-content/uploads/2025/06/Apresentacao_INFRAESTRUTURA_Numeros-2024.pdf" },
    { title: "Setor privado fez 70,5% dos investimentos em infraestrutura em 2024", source: "Agência iNFRA", year: "2025", url: "https://agenciainfra.com/blog/setor-privado-fez-705-dos-investimentos-em-infraestrutura-em-2024/" },
    { title: "Panorama do Sistema Ferroviário Brasileiro", source: "Infra S.A. / Observatório Nacional de Transporte e Logística", year: "2025", url: "https://ontl.infrasa.gov.br/wp-content/uploads/2025/12/PANORAMA-DO-SISTEMA-FERROVIARIO-BRASILEIRO-14.12.25_.pdf" },
    { title: "Matriz elétrica fechou 2024 com 88% de participação renovável (Balanço Energético Nacional 2025)", source: "EPE, via eixos", year: "2025", url: "https://eixos.com.br/energias-renovaveis/matriz-eletrica-fechou-2024-com-88-de-participacao-renovavel-mostra-balanco-da-epe/" },
    { title: "Cortes de geração solar e eólica em 2025", source: "Agência iNFRA", year: "2025", url: "https://agenciainfra.com/blog/?p=24215" },
    { title: "Prejuízo com cortes de geração renovável em 2025 (Volt Robotics)", source: "Agência iNFRA", year: "2026", url: "https://agenciainfra.com/blog/?p=35439" },
    { title: "PIB per capita das Unidades da Federação em 2023 (Contas Regionais, IBGE)", source: "IstoÉ Dinheiro", year: "2025", url: "https://istoedinheiro.com.br/df-maior-pib-per-capita-brasil-24-vezes-maior-media-pais" },
    { title: "Novo PAC e o financiamento de projetos de infraestrutura", source: "Machado Meyer Advogados", year: "2023", url: "https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/infraestrutura-e-energia-ij/novo-pac-e-o-financiamento-de-projetos-de-infraestrutura" },
  ],
};

export const AXES: Axis[] = [
  {
    n: "01",
    slug: "educacao-ciencia-tecnologia",
    title: "Educação, Ciência e Tecnologia",
    short: "Escola, universidade e pesquisa como base do desenvolvimento.",
    lead: "Nenhum país se desenvolveu sem educar o seu povo e produzir o próprio conhecimento.",
    themes: [
      "Reforma e modernização da educação básica",
      "Valorização dos professores",
      "Ensino técnico e profissionalizante",
      "Fortalecimento das universidades públicas",
      "Pesquisa científica e desenvolvimento tecnológico",
      "Inteligência artificial e inovação",
      "Integração entre universidades e setor produtivo",
      "Democratização do acesso ao conhecimento",
    ],
  },
  {
    n: "02",
    slug: "industrializacao-desenvolvimento",
    title: "Industrialização e Desenvolvimento Econômico",
    short: "Reindustrializar o país e gerar empregos qualificados.",
    lead: "Um país que só exporta matéria-prima importa o próprio subdesenvolvimento.",
    themes: [
      "Reindustrialização brasileira",
      "Política industrial de longo prazo",
      "Desenvolvimento de tecnologias nacionais",
      "Incentivos à inovação e à produtividade",
      "Fortalecimento de pequenas e médias empresas",
      "Desenvolvimento de setores estratégicos",
      "Geração de empregos qualificados",
      "Integração entre indústria, universidades e pesquisa",
    ],
  },
  {
    n: "03",
    slug: "infraestrutura",
    title: "Infraestrutura e Desenvolvimento Territorial",
    short: "Trilhos, saneamento, energia e transporte para integrar o país.",
    lead: "Sem trilhos, esgoto, energia e transporte, não há desenvolvimento que chegue a todo o território.",
    themes: [
      "Expansão ferroviária",
      "Modernização de portos e aeroportos",
      "Saneamento básico",
      "Mobilidade urbana",
      "Segurança energética",
      "Expansão de fontes renováveis",
      "Integração regional brasileira",
      "Redução das desigualdades territoriais",
    ],
    content: INFRA,
  },
  {
    n: "04",
    slug: "politica-externa-soberania",
    title: "Política Externa e Soberania Nacional",
    short: "Autonomia estratégica num mundo em disputa.",
    lead: "Soberania é ter voz própria no mundo e decidir o próprio caminho.",
    themes: [
      "Autonomia estratégica brasileira",
      "Fortalecimento da diplomacia",
      "Integração latino-americana",
      "Relações comerciais internacionais",
      "Cooperação científica e tecnológica",
      "Participação em organismos multilaterais",
      "Defesa dos interesses nacionais",
      "Diversificação das parcerias internacionais",
    ],
  },
  {
    n: "05",
    slug: "democracia-instituicoes",
    title: "Democracia e Fortalecimento Institucional",
    short: "Instituições transparentes, participação popular e controle público.",
    lead: "Sem democracia forte, nenhum projeto de país sobrevive à próxima eleição.",
    themes: [
      "Transparência pública",
      "Combate à corrupção",
      "Modernização administrativa",
      "Reforma política",
      "Participação popular",
      "Fortalecimento das instituições democráticas",
      "Independência e equilíbrio entre os Poderes",
      "Acesso à justiça",
      "Controle e fiscalização dos recursos públicos",
    ],
  },
];

export const getAxis = (slug: string) => AXES.find((a) => a.slug === slug);

// As 9 partes de cada eixo, na ordem em que aparecem na página
export const AXIS_PARTS = [
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "objetivos", label: "Objetivos" },
  { id: "propostas", label: "Propostas" },
  { id: "implementacao", label: "Implementação" },
  { id: "viabilidade", label: "Viabilidade econômica" },
  { id: "prazos", label: "Prazos" },
  { id: "indicadores", label: "Indicadores" },
  { id: "riscos", label: "Riscos e desafios" },
  { id: "referencias", label: "Referências" },
] as const;
