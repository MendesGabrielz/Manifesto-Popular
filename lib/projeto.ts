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
  // "Meta" por padrão; "Referência" quando o alvo é histórico ou comparativo
  targetName?: string;
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

const EDU: AxisContent = {
  diagnosis: [
    "O Brasil universalizou a matrícula, mas não a aprendizagem. No PISA 2022, 73% dos estudantes brasileiros de 15 anos ficaram abaixo do nível básico em matemática, contra cerca de 31% na média da OCDE; em leitura, foram 50%. Os resultados são praticamente os mesmos de 2018.",
    "O problema começa cedo. Em 2024, 59,2% das crianças da rede pública estavam alfabetizadas ao fim do 2º ano. O país assumiu a meta de chegar a 80% em 2030. Onde houve política contínua, como no Ceará desde 2007, a alfabetização na idade certa virou regra.",
    "Quem ensina ganha pouco. O piso nacional do magistério é de R$ 5.130,63 para 40 horas em 2026, e um terço dos municípios ainda não cumpre o piso. A meta do Plano Nacional de Educação anterior, de igualar o salário dos professores ao de outros profissionais com a mesma escolaridade, não foi cumprida. A carreira atrai poucos dos melhores alunos.",
    "O ensino médio forma pouco para o trabalho. A parcela de matrículas com educação profissional cresceu, mas ainda fica entre 13% e 22% do ensino médio, conforme o critério usado no Censo Escolar 2024.",
    "Na ciência, o Brasil investiu 1,19% do PIB em pesquisa e desenvolvimento em 2023, metade vinda do setor privado. Em 2018, a China investia 2,1%, os Estados Unidos 2,7% e a Coreia do Sul 4,2%. Sem orçamento estável, laboratórios param e pesquisadores vão embora.",
  ],
  keyNumbers: [
    { value: "73%", label: "dos estudantes abaixo do nível básico em matemática (PISA 2022)", source: "OCDE / INEP" },
    { value: "59,2%", label: "das crianças alfabetizadas ao fim do 2º ano (2024)", source: "INEP / MEC, Indicador Criança Alfabetizada" },
    { value: "R$ 5,1 mil", label: "piso salarial do professor, 40 horas (2026)", source: "MEC" },
    { value: "~5,5%", label: "do PIB em educação pública (estimativa usada no debate do novo PNE)", source: "Congresso Nacional, PL 2.614/2024" },
    { value: "1,19%", label: "do PIB em pesquisa e desenvolvimento (2023)", source: "MCTI / CNI" },
    { value: "R$ 23 bi", label: "previstos no Plano Brasileiro de IA para 2024–2028", source: "MCTI / Agência Gov" },
  ],
  bars: {
    title: "Onde estamos e onde precisamos chegar",
    caption: "Metas de alfabetização e de financiamento definidas em políticas e leis nacionais. As referências de matemática e de pesquisa vêm de comparações internacionais, não de lei.",
    items: [
      { label: "Crianças alfabetizadas ao fim do 2º ano", current: 59.2, target: 80, currentLabel: "59,2%", targetLabel: "80% em 2030", note: "INEP / MEC, Compromisso Nacional Criança Alfabetizada" },
      { label: "Estudantes no nível básico ou acima em matemática (PISA)", current: 27, target: 69, currentLabel: "27%", targetLabel: "média da OCDE (~69%)", note: "OCDE, PISA 2022" },
      { label: "Gasto público em educação (% do PIB, escala até 10%)", current: 55, target: 100, currentLabel: "~5,5%", targetLabel: "10% ao fim do novo PNE", note: "PL 2.614/2024 (novo PNE)" },
      { label: "Pesquisa e desenvolvimento (% do PIB, escala até 5%)", current: (1.19 / 5) * 100, target: (2.1 / 5) * 100, currentLabel: "1,19%", targetLabel: "2,1% (China, 2018)", note: "MCTI; indicadores internacionais do MCTIC" },
    ],
  },
  objectives: [
    "Alfabetizar todas as crianças até o fim do 2º ano, cumprindo a meta nacional de 80% em 2030 como etapa intermediária.",
    "Reduzir a parcela de estudantes abaixo do nível básico de aprendizagem. A meta numérica deve seguir o novo Plano Nacional de Educação e o Saeb.",
    "Tornar a carreira de professor atraente: piso cumprido em todo o país e remuneração equiparada à de outros profissionais com a mesma escolaridade.",
    "Expandir a educação profissional integrada ao ensino médio, ligada à vocação econômica de cada região.",
    "Dar à ciência um orçamento estável e previsível, sem cortes no meio do ano.",
    "Construir capacidade nacional em inteligência artificial e em tecnologias estratégicas, para não depender apenas de plataformas estrangeiras.",
    "Democratizar o acesso ao conhecimento: escolas conectadas e produção científica pública aberta a todos.",
  ],
  proposals: [
    {
      title: "Alfabetização como prioridade nacional",
      description: "Levar para todo o país o modelo que funcionou no Ceará desde 2007: material didático estruturado, formação continuada dos professores alfabetizadores, avaliação anual de cada criança e apoio técnico do estado aos municípios. A Emenda Constitucional 108/2020 já obriga os estados a distribuir parte do ICMS aos municípios conforme resultados educacionais, um incentivo que precisa ser bem usado.",
      competence: "Municípios (educação infantil e anos iniciais) e estados, em regime de colaboração; a União dá apoio técnico e financeiro (Constituição, art. 211)",
      term: "Curto prazo",
    },
    {
      title: "Carreira docente que atraia os melhores",
      description: "Garantir o cumprimento do piso, com complementação federal aos municípios que comprovadamente não conseguem pagar. Criar planos de carreira com progressão por formação e desempenho, formação inicial com prática supervisionada nas escolas, como uma residência, e redução de contratos temporários.",
      competence: "Estados e municípios (empregadores); a União define o piso (Lei 11.738/2008) e complementa o Fundeb",
      term: "Médio prazo",
      alternatives: [
        "Progressão salarial baseada em formação e tempo de carreira, como na maior parte das redes hoje.",
        "Progressão que combine formação com avaliação de desempenho, com regras claras e sem punição coletiva.",
        "Bônus por resultado da escola. É controverso: pode motivar, mas também incentivar o ensino só para a prova.",
      ],
    },
    {
      title: "Ensino médio técnico em larga escala",
      description: "Ampliar o ensino médio integrado à formação técnica, com cursos escolhidos a partir da vocação econômica de cada região, usando o itinerário técnico previsto na reforma do ensino médio (Lei 14.945/2024) e a experiência dos Institutos Federais.",
      competence: "Estados (ensino médio); a União mantém a rede federal",
      term: "Médio prazo",
      alternatives: [
        "Expansão da rede federal de Institutos Federais.",
        "Expansão das redes estaduais, com apoio financeiro da União.",
        "Parcerias com o Sistema S e com empresas, mantendo a escola pública como responsável.",
      ],
    },
    {
      title: "Ciência com orçamento previsível",
      description: "Executar integralmente o Fundo Nacional de Desenvolvimento Científico e Tecnológico (FNDCT), cujo contingenciamento foi proibido pela Lei Complementar 177/2021. Reajustar bolsas de pesquisa de forma periódica e abrir editais com calendário fixo, para que laboratórios possam planejar.",
      competence: "União (Constituição, arts. 218 e 219)",
      term: "Curto prazo",
    },
    {
      title: "Inteligência artificial com capacidade nacional",
      description: "Executar o Plano Brasileiro de Inteligência Artificial, com metas públicas e prestação de contas: supercomputação para pesquisa, uso de dados públicos com proteção da privacidade, formação de especialistas nas universidades e IA aplicada a serviços públicos como saúde e educação.",
      competence: "União, com universidades e institutos de pesquisa",
      term: "Médio prazo",
    },
    {
      title: "Universidade que conversa com quem produz",
      description: "Usar os instrumentos do Marco Legal de Ciência, Tecnologia e Inovação (Lei 13.243/2016) para aproximar pesquisa e produção: projetos cofinanciados entre institutos de pesquisa e empresas, como faz a Embrapii, e encomendas tecnológicas, em que o Estado contrata a solução de um problema que o mercado ainda não resolveu.",
      competence: "União, estados e universidades",
      term: "Médio prazo",
      alternatives: [
        "Cofinanciamento de projetos entre empresas e institutos de pesquisa.",
        "Encomendas tecnológicas do Estado para resolver problemas públicos.",
        "Incentivos fiscais à pesquisa nas empresas, com avaliação periódica de resultados.",
      ],
    },
    {
      title: "Conhecimento aberto e escolas conectadas",
      description: "Internet de qualidade em todas as escolas públicas e acesso aberto a toda pesquisa financiada com dinheiro público, ampliando iniciativas brasileiras como a biblioteca científica SciELO.",
      competence: "União, estados e municípios",
      term: "Curto prazo",
    },
  ],
  implementation: [
    {
      title: "Colaboração entre os entes",
      body: "A educação básica é tarefa de estados e municípios, com apoio da União. O Sistema Nacional de Educação, previsto para organizar essa cooperação, ainda não foi regulamentado. Regulamentá-lo daria regras claras de quem faz o quê.",
    },
    {
      title: "Dinheiro ligado a resultados, com equilíbrio",
      body: "O Fundeb já tem uma parcela da complementação federal distribuída por resultados. Ela deve premiar a melhora e a redução de desigualdades, e não só quem já está na frente.",
    },
    {
      title: "Avaliar para ajudar, não para punir",
      body: "Avaliações como o Saeb e o Indicador Criança Alfabetizada devem orientar onde chegar com apoio: formação, material e equipe. Resultados por escola publicados de forma clara.",
    },
    {
      title: "Aprender com quem deu certo",
      body: "No Brasil, a alfabetização no Ceará e as escolas de ensino médio integral em Pernambuco. Fora daqui, países como Coreia do Sul e Finlândia, onde ser professor é uma carreira seletiva e valorizada.",
    },
    {
      title: "Ciência com calendário",
      body: "Editais anuais com datas conhecidas e bolsas reajustadas por regra, para acabar com o ciclo de anúncio e corte que expulsa pesquisadores do país.",
    },
  ],
  viability: {
    costs: [
      "O novo Plano Nacional de Educação prevê subir o gasto público para 7,5% do PIB em sete anos e 10% ao fim do decênio. Partindo de cerca de 5,5%, isso significa quase dobrar o investimento.",
      "Cada ponto percentual do PIB equivale a cerca de R$ 117 bilhões por ano, considerando o PIB de 2024. É uma estimativa nossa, para dar ordem de grandeza.",
      "O Plano Brasileiro de Inteligência Artificial prevê R$ 23 bilhões entre 2024 e 2028.",
      "O custo de cada proposta, como alfabetização, carreira e ensino técnico, depende de estudos técnicos por rede de ensino.",
    ],
    funding: [
      "Fundeb, com a complementação da União chegando a 23% em 2026 (Emenda Constitucional 108/2020).",
      "Salário-educação e royalties do petróleo destinados à educação (Lei 12.858/2013).",
      "FNDCT e Finep para ciência e inovação; BNDES para inovação nas empresas.",
      "Queda no número de crianças em idade escolar, que libera recursos por aluno se o orçamento total for mantido.",
    ],
    limits: [
      "A meta de 10% do PIB repete a do plano anterior, que não foi cumprida. Sem fonte definida, vira só intenção.",
      "As regras fiscais (Lei Complementar 200/2023) limitam o crescimento da despesa federal.",
      "Muitos municípios não têm receita própria para pagar o piso e manter a rede.",
    ],
  },
  timeline: [
    {
      term: "Curto prazo",
      items: [
        "Pacto nacional de alfabetização em todos os estados.",
        "Execução integral do FNDCT e calendário fixo de editais.",
        "Internet de qualidade em todas as escolas.",
      ],
    },
    {
      term: "Médio prazo",
      items: [
        "Novos planos de carreira docente e piso cumprido em todo o país.",
        "Ensino médio técnico em larga escala.",
        "Infraestrutura nacional de pesquisa em inteligência artificial.",
      ],
    },
    {
      term: "Longo prazo",
      items: [
        "Aprendizagem próxima da média da OCDE.",
        "Gasto público em educação de 10% do PIB, se houver fonte de financiamento.",
        "Investimento em pesquisa e desenvolvimento acima de 2% do PIB.",
      ],
    },
  ],
  indicators: [
    { name: "Crianças alfabetizadas ao fim do 2º ano", current: "59,2% (2024)", target: "80% em 2030", source: "INEP / MEC, Indicador Criança Alfabetizada" },
    { name: "Estudantes abaixo do nível básico em matemática", current: "73% (PISA 2022)", target: "Meta a definir no novo PNE; média da OCDE: ~31%", source: "OCDE / INEP" },
    { name: "Gasto público em educação", current: "~5,5% do PIB (estimativa)", target: "7,5% em 7 anos; 10% ao fim do PNE", source: "PL 2.614/2024 (novo PNE)" },
    { name: "Ensino médio com educação profissional", current: "13% a 22% (2024, conforme o critério)", target: "Depende de estudos e das metas do novo PNE", source: "Censo Escolar 2024, INEP / MEC" },
    { name: "Remuneração do professor frente a outros profissionais com a mesma escolaridade", current: "Abaixo (meta do PNE anterior não cumprida)", target: "Equiparação", source: "Observatório do PNE; Fineduca" },
    { name: "Investimento em pesquisa e desenvolvimento", current: "1,19% do PIB (2023)", target: "Acima de 2%, a ser fixado em plano de CT&I", source: "MCTI; CNI" },
  ],
  risks: [
    {
      title: "Descontinuidade",
      body: "Educação dá resultado em década, não em mandato. Programas trocados a cada governo desperdiçam dinheiro e confundem professores.",
    },
    {
      title: "Restrição fiscal",
      body: "Educação e ciência costumam ser as primeiras áreas cortadas em crises. Sem fontes protegidas, metas de financiamento viram promessa.",
    },
    {
      title: "Avaliação que vira punição",
      body: "Usar provas só para ranquear e punir escolas incentiva ensinar para o teste e esconder alunos com dificuldade.",
    },
    {
      title: "Evasão no ensino médio",
      body: "Jovens pobres deixam a escola para trabalhar. Sem apoio financeiro e um ensino que faça sentido, a expansão técnica não chega a quem mais precisa.",
    },
    {
      title: "Fuga de cérebros",
      body: "Com bolsas defasadas e laboratórios parados, pesquisadores formados com dinheiro público vão trabalhar fora do país.",
    },
    {
      title: "Dependência tecnológica",
      body: "Se a inteligência artificial vier só de grandes empresas estrangeiras, o país perde controle sobre dados, empregos e decisões públicas.",
    },
  ],
  references: [
    { title: "Constituição da República Federativa do Brasil (arts. 205 a 214, 218 e 219)", source: "Presidência da República", year: "1988", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { title: "Emenda Constitucional 108/2020 (novo Fundeb)", source: "Presidência da República", year: "2020", url: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc108.htm" },
    { title: "Lei 11.738/2008, Piso Salarial Profissional Nacional do Magistério", source: "Presidência da República", year: "2008", url: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11738.htm" },
    { title: "Lei 14.945/2024, reforma do ensino médio", source: "Presidência da República", year: "2024", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14945.htm" },
    { title: "Lei Complementar 177/2021 (FNDCT)", source: "Presidência da República", year: "2021", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp177.htm" },
    { title: "Lei 13.243/2016, Marco Legal de Ciência, Tecnologia e Inovação", source: "Presidência da República", year: "2016", url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13243.htm" },
    { title: "Lei 12.858/2013, royalties do petróleo para educação e saúde", source: "Presidência da República", year: "2013", url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12858.htm" },
    { title: "Câmara aprova Plano Nacional de Educação e amplia investimentos para 10% do PIB", source: "Agência Câmara de Notícias", year: "2025", url: "https://www.camara.leg.br/noticias/1234955-retrospectiva-2025-camara-aprova-plano-nacional-de-educacao-e-amplia-investimentos-para-10-do-pib/" },
    { title: "Divulgados os resultados do PISA 2022", source: "Agência Gov / INEP", year: "2023", url: "https://agenciagov.ebc.com.br/noticias/202312/divulgados-os-resultados-do-pisa-2022" },
    { title: "PISA 2022: 73% dos estudantes brasileiros estão abaixo do nível básico em matemática", source: "Correio Braziliense", year: "2023", url: "https://www.correiobraziliense.com.br/euestudante/2023/12/6665288-pisa-73-dos-estudantes-brasileiros-estao-abaixo-do-nivel-em-matematica.html" },
    { title: "58% dos municípios melhoraram a alfabetização (Indicador Criança Alfabetizada 2024)", source: "Agência Gov", year: "2025", url: "https://agenciagov.ebc.com.br/noticias/202507/58-dos-municipios-melhoraram-alfabetizacao" },
    { title: "Censo Escolar 2024", source: "MEC / INEP", year: "2025", url: "https://www.gov.br/mec/pt-br/centrais-de-conteudo/infograficos/censo-escolar/documentos/censo-escolar-2024.pdf" },
    { title: "Piso nacional do magistério é fixado em R$ 5,1 mil em 2026", source: "Conexão Tocantins", year: "2026", url: "https://conexaoto.com.br/2026/01/30/piso-nacional-do-magisterio-e-fixado-em-r-5-1-mil-aumento-de-5-4" },
    { title: "Reajuste para professores e o cumprimento do piso (Anuário da Educação Básica 2025)", source: "Viva", year: "2026", url: "https://viva.com.br/carreira-e-educacao/reajuste-para-professores-passa-inflacao-mas-nao-supre-desafios-estruturais.html" },
    { title: "Remuneração docente frente a outros profissionais", source: "Revista Fineduca", year: "2023", url: "https://seer.ufrgs.br/index.php/fineduca/article/view/68054" },
    { title: "Investimentos em P&D no Brasil (Mobilização Empresarial pela Inovação)", source: "CNI, Portal da Indústria", year: "2025", url: "https://noticias.portaldaindustria.com.br/noticias/inovacao-e-tecnologia/mobilizacao-empresarial-pela-inovacao-impactos-economicos-investimentos-em-pd-e-premio-de-inovacao-sao-discutidos-durante-encontro/" },
    { title: "Plano Brasileiro de Inteligência Artificial: R$ 23 bilhões até 2028", source: "Agência Gov", year: "2024", url: "https://agenciagov.ebc.com.br/noticias/202407/lula-desenvolve-ia" },
  ],
};

const IND: AxisContent = {
  diagnosis: [
    "O Brasil se desindustrializou cedo, antes de ficar rico. A indústria de transformação chegou a 35,9% do PIB em 1985; em 2023, era 15,3%. O país passou a vender mais matéria-prima e a comprar de fora mais produtos de alta tecnologia.",
    "Em 2025, cinco produtos, petróleo bruto, soja, minério de ferro, carne bovina e café, somaram quase 43% de tudo o que o Brasil exportou, e a China comprou 28,7% do total. Commodity ajuda a fechar as contas externas, mas oscila com o preço internacional e gera poucos empregos qualificados.",
    "A produtividade do trabalho está praticamente parada há mais de uma década: cresceu só 0,1% em 2024, segundo estimativa do FGV IBRE. A informalidade explica mais da metade da queda de produtividade desde 2014, e empresas formais são, em média, cerca de quatro vezes mais produtivas que as informais.",
    "Investir na produção é caro no Brasil. A taxa Selic chegou a 15% ao ano em 2025, uma das maiores taxas de juros reais do mundo, e o sistema de impostos sobre o consumo, que só agora começa a ser simplificado pela reforma tributária, pune quem produz em várias etapas.",
    "Enquanto isso, o mundo voltou a fazer política industrial. Os Estados Unidos aprovaram em 2022 leis bilionárias para trazer de volta a fabricação de chips e de tecnologias limpas; China e Coreia do Sul nunca deixaram de fazer. O Brasil retomou em 2024, com a Nova Indústria Brasil, e o desafio agora é dar continuidade e medir resultados.",
  ],
  keyNumbers: [
    { value: "15,3%", label: "do PIB era a indústria de transformação em 2023 (35,9% em 1985)", source: "IBGE, Contas Nacionais / CNI" },
    { value: "~43%", label: "das exportações vieram de cinco commodities em 2025", source: "MDIC / Secex" },
    { value: "28,7%", label: "das exportações foram para a China em 2025", source: "MDIC / Secex" },
    { value: "0,1%", label: "de crescimento da produtividade do trabalho em 2024", source: "FGV IBRE (estimativa)" },
    { value: "15%", label: "ao ano, a taxa Selic em 2025", source: "Banco Central / Copom" },
    { value: "R$ 300 bi", label: "em crédito do BNDES para a Nova Indústria Brasil até 2025", source: "BNDES" },
  ],
  bars: {
    title: "De onde viemos e para onde vamos",
    caption: "A participação de 1985 é uma referência histórica, não uma meta: a economia mudou. A meta de crédito é a do próprio BNDES para a Nova Indústria Brasil.",
    items: [
      { label: "Indústria de transformação no PIB (escala até 40%)", current: (15.3 / 40) * 100, target: (35.9 / 40) * 100, currentLabel: "15,3% (2023)", targetLabel: "35,9% em 1985", targetName: "Referência", note: "IBGE, Contas Nacionais; série da CNI a preços correntes" },
      { label: "Crédito do BNDES para a Nova Indústria Brasil (escala até R$ 400 bi)", current: (300 / 400) * 100, target: (370 / 400) * 100, currentLabel: "R$ 300 bi (até 2025)", targetLabel: "R$ 370 bi até 2026", note: "BNDES" },
    ],
  },
  objectives: [
    "Reverter a desindustrialização e aumentar o peso da indústria de transformação na economia. A meta numérica deve seguir as metas por missão da Nova Indústria Brasil até 2033 e estudos técnicos.",
    "Diversificar as exportações, vendendo mais produtos de maior valor agregado e dependendo menos de poucas commodities e de poucos compradores.",
    "Voltar a crescer a produtividade de forma sustentada, com formalização das empresas e dos trabalhadores.",
    "Gerar empregos formais e qualificados, com salários acima da média.",
    "Construir capacidade nacional em setores estratégicos: saúde, energia limpa, minerais críticos, defesa, tecnologias digitais e agroindústria.",
    "Fortalecer pequenas e médias empresas e integrá-las às cadeias das grandes.",
    "Aproximar indústria, universidade e pesquisa, em conexão com o eixo de Educação, Ciência e Tecnologia.",
  ],
  proposals: [
    {
      title: "Política industrial de Estado, com metas e avaliação",
      description: "Dar continuidade à Nova Indústria Brasil e às suas seis missões, com metas públicas até 2033, avaliação independente periódica e regra clara para cortar o incentivo que não entregar resultado. Política industrial não pode mudar a cada governo.",
      competence: "União, por meio do Ministério do Desenvolvimento, Indústria, Comércio e Serviços e do Conselho Nacional de Desenvolvimento Industrial",
      term: "Curto prazo",
      alternatives: [
        "Manter a política como programa de governo, revisado a cada mandato.",
        "Fixar metas, instrumentos e avaliação em lei, dando estabilidade para além dos mandatos.",
      ],
    },
    {
      title: "Crédito de longo prazo para quem produz e inova",
      description: "Crédito do BNDES e da Finep com custo menor para investimento produtivo e inovação, sempre com contrapartidas medidas: investimento, emprego, exportação ou pesquisa. Ampliar fundos garantidores para que pequenas empresas tenham acesso.",
      competence: "União, por meio do BNDES, da Finep e dos fundos garantidores",
      term: "Curto prazo",
      alternatives: [
        "Crédito público direcionado com juros subsidiados para setores e missões prioritárias.",
        "Incentivos fiscais à inovação nas empresas, com avaliação periódica.",
        "Fundos garantidores e mercado de capitais (debêntures) para financiar com poupança privada.",
      ],
    },
    {
      title: "Compras públicas como motor da inovação",
      description: "Usar o poder de compra do SUS, das Forças Armadas e das obras públicas para desenvolver fornecedores nacionais: margens de preferência permitidas pela Lei de Licitações (14.133/2021), encomendas tecnológicas e parcerias para produção de medicamentos e vacinas no país, com prazo para transferência de tecnologia.",
      competence: "União, estados e municípios",
      term: "Médio prazo",
    },
    {
      title: "Setores estratégicos com missão clara",
      description: "Complexo industrial da saúde, para não repetir a dependência de insumos importados vista na pandemia; transição energética, com fabricação de equipamentos e hidrogênio de baixo carbono; minerais críticos, para processar no país em vez de exportar bruto; defesa e aeroespacial; e tecnologias digitais e semicondutores.",
      competence: "União, com estados, universidades e empresas",
      term: "Longo prazo",
    },
    {
      title: "Pequenas e médias empresas no centro",
      description: "Crédito e garantia em escala, extensão tecnológica com o Senai, o Sebrae e a Embrapii para modernizar processos, e integração das pequenas como fornecedoras de grandes empresas e do poder público, usando a preferência em licitações já prevista no Estatuto da Microempresa (Lei Complementar 123/2006).",
      competence: "União e estados",
      term: "Curto prazo",
    },
    {
      title: "Ambiente para produzir",
      description: "Implementar a reforma tributária do consumo (Emenda Constitucional 132/2023) sem abrir novas exceções, para acabar com o imposto em cascata que pune quem produz. Coordenar a política econômica para reduzir os juros reais e evitar câmbio valorizado demais, que barateia o importado e tira competitividade da indústria nacional.",
      competence: "União e Congresso Nacional; Banco Central na política de juros",
      term: "Médio prazo",
    },
    {
      title: "Trabalhadores qualificados para a nova indústria",
      description: "Ligar o ensino técnico e a requalificação de trabalhadores às missões da política industrial, para que os empregos criados sejam ocupados por brasileiros e não esbarrem na falta de mão de obra.",
      competence: "União, estados e Sistema S",
      term: "Médio prazo",
    },
  ],
  implementation: [
    {
      title: "Toda ajuda com contrapartida",
      body: "Crédito barato, incentivo fiscal ou preferência em compras só com metas medidas, como investimento, emprego, exportação e pesquisa, e com prazo de validade. É o que a Coreia do Sul fez nas décadas de 1970 a 1990: apoio do Estado em troca de metas de exportação.",
    },
    {
      title: "Aprender com os erros",
      body: "Incentivos amplos, sem contrapartida e sem avaliação, como parte das desonerações da década de 2010, foram muito criticados por custar caro e entregar pouco. A nova política precisa de critérios públicos e saída programada.",
    },
    {
      title: "Governança e transparência",
      body: "O Conselho Nacional de Desenvolvimento Industrial coordena as missões; um painel público mostra quanto cada empresa recebeu e o que entregou.",
    },
    {
      title: "Avaliação independente",
      body: "Avaliações periódicas por órgãos técnicos, como o IPEA, e controle do Tribunal de Contas da União, com relatórios publicados.",
    },
    {
      title: "Coordenação com a política econômica",
      body: "Política industrial não funciona com juros reais muito altos e câmbio instável. Ela precisa estar alinhada à política fiscal e monetária, e não competir com elas.",
    },
  ],
  viability: {
    costs: [
      "A Nova Indústria Brasil previu R$ 300 bilhões em crédito do BNDES, da Finep e da Embrapii entre 2023 e 2026. Em dezembro de 2025, o BNDES informou ter atingido o valor e anunciou mais R$ 70 bilhões até 2026.",
      "O custo fiscal de cada incentivo, como juros subsidiados ou impostos que deixam de ser cobrados, depende do desenho e precisa ser estimado e publicado antes da aprovação.",
      "O custo de cada missão setorial depende de estudos técnicos.",
    ],
    funding: [
      "BNDES, com recursos do FAT e captações próprias.",
      "Finep, FNDCT e Embrapii para inovação.",
      "Compras públicas: o Estado já compra; trata-se de usar melhor esse dinheiro.",
      "Mercado de capitais, com debêntures e fundos de investimento.",
      "Fundos garantidores para pequenas e médias empresas.",
    ],
    limits: [
      "Juros altos encarecem o crédito e tornam mais caro o subsídio público.",
      "As regras fiscais limitam a ampliação de gastos e de renúncias de receita.",
      "Regras de comércio internacional, como as da OMC, restringem alguns instrumentos, como exigências de conteúdo local.",
    ],
  },
  timeline: [
    {
      term: "Curto prazo",
      items: [
        "Metas e avaliação da política industrial fixadas e publicadas.",
        "Crédito e garantias ampliados para pequenas e médias empresas.",
        "Regras da reforma tributária aplicadas sem novas exceções.",
      ],
    },
    {
      term: "Médio prazo",
      items: [
        "Compras públicas usadas para desenvolver fornecedores nacionais.",
        "Programas de qualificação ligados às missões.",
        "Primeiras avaliações independentes, com corte do que não funcionar.",
      ],
    },
    {
      term: "Longo prazo",
      items: [
        "Indústria de transformação com peso crescente no PIB.",
        "Exportações mais diversificadas e com mais tecnologia.",
        "Capacidade nacional nos setores estratégicos.",
      ],
    },
  ],
  indicators: [
    { name: "Indústria de transformação no PIB", current: "15,3% (2023)", target: "Reverter a queda; meta depende de estudos e das metas da NIB", source: "IBGE, Contas Nacionais" },
    { name: "Concentração das exportações", current: "Cinco commodities somam ~43% (2025)", target: "Reduzir; meta depende de estudos", source: "MDIC / Secex" },
    { name: "Crescimento da produtividade do trabalho", current: "0,1% (2024, estimativa)", target: "Crescimento sustentado; meta a definir", source: "FGV IBRE, Observatório da Produtividade" },
    { name: "Crédito para a Nova Indústria Brasil", current: "R$ 300 bi (até 2025)", target: "R$ 370 bi até 2026", source: "BNDES" },
    { name: "Crédito para micro, pequenas e médias indústrias", current: "R$ 111,8 bi dos R$ 300 bi", target: "Ampliar a fatia; meta a definir", source: "BNDES" },
    { name: "Investimento em pesquisa e desenvolvimento", current: "1,19% do PIB (2023), metade privado", target: "Acima de 2%, em conexão com o eixo de Ciência", source: "MCTI; CNI" },
  ],
  risks: [
    {
      title: "Captura por grupos de interesse",
      body: "Empresas bem conectadas tendem a conseguir benefícios sem entregar resultados. Contrapartidas, transparência e prazo de validade reduzem esse risco.",
    },
    {
      title: "Concentração nas grandes empresas",
      body: "Dos R$ 300 bilhões do BNDES para a Nova Indústria Brasil, R$ 175,6 bilhões foram para grandes empresas. Sem metas para pequenas e médias, a política reforça quem já é forte.",
    },
    {
      title: "Proteção que encarece",
      body: "Proteger demais a indústria nacional pode deixar produtos caros e piores para o consumidor. Toda proteção precisa ser temporária e ligada a metas de produtividade.",
    },
    {
      title: "Descontinuidade",
      body: "Indústria leva anos para amadurecer. Mudanças de rumo a cada governo afastam investimento.",
    },
    {
      title: "Juros e câmbio",
      body: "Juros reais altos e câmbio instável podem anular o efeito de qualquer política setorial.",
    },
    {
      title: "Regras internacionais",
      body: "Alguns instrumentos podem ser contestados por outros países na OMC ou em acordos comerciais, o que exige desenho jurídico cuidadoso.",
    },
  ],
  references: [
    { title: "Constituição da República Federativa do Brasil (arts. 170, 174, 218 e 219)", source: "Presidência da República", year: "1988", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { title: "Emenda Constitucional 132/2023, reforma tributária", source: "Presidência da República", year: "2023", url: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm" },
    { title: "Lei 14.133/2021, Licitações e Contratos", source: "Presidência da República", year: "2021", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm" },
    { title: "Lei Complementar 123/2006, Estatuto da Microempresa", source: "Presidência da República", year: "2006", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm" },
    { title: "Lei 13.243/2016, Marco Legal de Ciência, Tecnologia e Inovação", source: "Presidência da República", year: "2016", url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13243.htm" },
    { title: "Peso da indústria no PIB cai no pós-redemocratização", source: "Poder360", year: "2025", url: "https://www.poder360.com.br/poder-economia/peso-da-industria-no-PIB-cai-no-pos-redemocratizacao" },
    { title: "O Brasil no ranking mundial da indústria em 2024", source: "IEDI", year: "2025", url: "https://iedi.org.br/artigos/destaque/2017/destaque_iedi_20250417.html" },
    { title: "Brasil tem superávit comercial de US$ 68,3 bi em 2025 (dados MDIC / Secex)", source: "Forbes Brasil", year: "2026", url: "https://forbes.com.br/forbes-money/2026/01/brasil-tem-superavit-comercial-de-us-683-bi-em-2025/" },
    { title: "Estagnação da produtividade (Observatório da Produtividade)", source: "Blog do IBRE, FGV", year: "2019", url: "https://blogdoibre.fgv.br/posts/estagnacao-da-produtividade-em-2018" },
    { title: "Produtividade e informalidade no Brasil (texto para discussão)", source: "Instituto de Economia, UFRJ", year: "2022", url: "https://www.ie.ufrj.br/images/IE/TDS/2022/TD_IE_009_2022_SABOIA_ROSA_VILLACORTA_SOARES.pdf" },
    { title: "Histórico das taxas de juros (Selic)", source: "Banco Central do Brasil", year: "2025", url: "https://www.bcb.gov.br/controleinflacao/historicotaxasjuros" },
    { title: "Governo anuncia nova política industrial com crédito de R$ 300 bilhões", source: "Agência Brasil, via Movimento Econômico", year: "2024", url: "https://movimentoeconomico.com.br/economia/2024/01/22/governo-anuncia-nova-politica-industrial-com-credito-de-r-300-bilhoes/" },
    { title: "Nova Indústria Brasil ganha reforço de R$ 70 bilhões", source: "Diário do Comércio", year: "2026", url: "https://diariodocomercio.com.br/?p=562041" },
    { title: "O que é fato e o que é fake sobre a Nova Indústria Brasil", source: "CNI, Portal da Indústria", year: "2024", url: "https://noticias.portaldaindustria.com.br/noticias/politica-industrial/o-que-e-fato-e-o-que-e-fake-sobre-a-nova-industria-brasil-o-programa-de-politica-industrial-do-pais/" },
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
    content: EDU,
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
    content: IND,
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
