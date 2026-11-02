import { HammerSickle, RaisedFist, RedStar } from "./Symbols";
import type { SceneName } from "./Scene";

export type SymbolStory = {
  id: string;
  n: string;
  name: string;
  tagline: string;
  Icon: typeof RedStar;
  scene: SceneName;
  lead: string;
  sections: { title: string; body: string }[];
  timeline: { year: string; text: string }[];
  quote?: { text: string; author: string };
  // Fotos de época em domínio público (Wikimedia Commons); `scene` é o desenho de reserva
  photos: { scene: SceneName; src?: string; caption: string }[];
};

export const STORIES: SymbolStory[] = [
  {
    id: "foice-martelo",
    n: "01",
    name: "A Foice e o Martelo",
    tagline: "A união do campo e da cidade",
    Icon: HammerSickle,
    scene: "factory",
    lead: "Dois instrumentos de trabalho cruzados: o martelo do operário e a foice do camponês. Juntos, afirmam que quem produz a riqueza deve decidir o destino dela.",
    sections: [
      {
        title: "Origem: 1917–1918",
        body: "Depois da Revolução de Outubro, o novo poder soviético procurava um emblema para a aliança entre operários e camponeses, as duas classes que derrubaram o czarismo. Em 1918, a foice e o martelo entram no brasão da República Socialista Federativa Soviética da Rússia. A autoria do desenho costuma ser atribuída ao artista Evgueni Kamzolkin.",
      },
      {
        title: "Na bandeira vermelha",
        body: "Com a fundação da União Soviética, no fim de 1922, o símbolo dourado sob uma estrela passa a ocupar o canto da bandeira vermelha. Ao longo do século XX, ele viraria uma das imagens políticas mais reconhecidas do planeta.",
      },
      {
        title: "O sentido hoje",
        body: "Partidos comunistas do mundo inteiro adotaram o emblema, inclusive no Brasil, onde o PCB foi fundado em 1922. Para além das experiências históricas, ele continua dizendo algo simples: campo e cidade, juntos, sustentam o país inteiro.",
      },
    ],
    timeline: [
      { year: "1917", text: "Revolução de Outubro na Rússia" },
      { year: "1918", text: "Símbolo entra no brasão soviético" },
      { year: "1922", text: "Fundação do PCB e da URSS" },
    ],
    photos: [
      { scene: "factory", src: "/images/historia/greve-1917-comicio-bras.jpg", caption: "Operários em comício no Brás durante a greve geral de 1917, São Paulo. Autor desconhecido, domínio público" },
      { scene: "crowd", src: "/images/historia/colheita-1909-prokudin-gorskii.jpg", caption: "Camponeses na colheita, Império Russo, 1909. Foto: Serguei Prokudin-Gorskii, domínio público" },
      { scene: "rails", src: "/images/historia/feno-1909-prokudin-gorskii.jpg", caption: "Trabalhadores rurais no feno, 1909. Foto: Serguei Prokudin-Gorskii, domínio público" },
    ],
  },
  {
    id: "estrela",
    n: "02",
    name: "A Estrela Vermelha",
    tagline: "O internacionalismo",
    Icon: RedStar,
    scene: "crowd",
    lead: "Cinco pontas, uma cor. A estrela vermelha virou a assinatura do internacionalismo: a ideia de que trabalhadores de países diferentes têm mais em comum entre si do que com seus patrões.",
    sections: [
      {
        title: "Origem: 1918",
        body: "O Exército Vermelho, criado em 1918 durante a guerra civil russa, adotou a estrela vermelha como insígnia. Uma das leituras mais difundidas associa as cinco pontas aos cinco continentes, unidos pela mesma luta.",
      },
      {
        title: "Pelo mundo",
        body: "A estrela de cinco pontas atravessou fronteiras. Aparece em bandeiras e brasões de países que passaram por revoluções socialistas ou de libertação nacional, como China e Vietnã, e em movimentos anticoloniais da Ásia, da África e da América Latina.",
      },
      {
        title: "No Brasil",
        body: "Em 1980, o Partido dos Trabalhadores nasceu do movimento sindical do ABC paulista e adotou a estrela vermelha como símbolo, levando-a para greves, praças e eleições.",
      },
    ],
    timeline: [
      { year: "1848", text: "Publicação do Manifesto Comunista" },
      { year: "1918", text: "Insígnia do Exército Vermelho" },
      { year: "1980", text: "Fundação do PT no Brasil" },
    ],
    quote: {
      text: "Proletários de todos os países, uni-vos!",
      author: "Marx e Engels, Manifesto Comunista (1848)",
    },
    photos: [
      { scene: "crowd", src: "/images/historia/greve-1917-bandeiras-vermelhas.jpg", caption: "Trabalhadores com bandeiras vermelhas na greve geral de 1917, São Paulo. Autor desconhecido, domínio público" },
      { scene: "dam", src: "/images/historia/milicianas-cartagena-1936.jpg", caption: "Milicianas e milicianos antifascistas em Cartagena, Espanha, 1936. Autor desconhecido, domínio público" },
      { scene: "factory", src: "/images/historia/lenin-putilov-brodsky.jpg", caption: "Isaak Brodsky, Lênin na fábrica Putilov em 1917 (pintura de 1929). Domínio público" },
    ],
  },
  {
    id: "punho",
    n: "03",
    name: "O Punho Erguido",
    tagline: "A resistência anticolonial e sindical",
    Icon: RaisedFist,
    scene: "rails",
    lead: "Uma mão fechada é a imagem mais simples da força coletiva: dedos que, separados, se quebram e que, juntos, resistem.",
    sections: [
      {
        title: "Origem",
        body: "O punho cerrado aparece na iconografia operária desde o início do século XX. Nos anos 1920, a Liga dos Combatentes da Frente Vermelha, na Alemanha, fez dele uma saudação. Na Guerra Civil Espanhola (1936–1939), virou o gesto dos antifascistas republicanos.",
      },
      {
        title: "Anticolonial e antirracista",
        body: "Em 1968, nas Olimpíadas do México, os atletas Tommie Smith e John Carlos ergueram o punho no pódio contra o racismo nos Estados Unidos. Em 1990, Nelson Mandela deixou a prisão com o punho erguido, depois de 27 anos encarcerado pelo regime do apartheid.",
      },
      {
        title: "Nas greves",
        body: "No Brasil, o gesto marcou as greves do ABC paulista no fim dos anos 1970 e segue vivo em assembleias, ocupações e piquetes. É o sinal de que ninguém luta sozinho.",
      },
    ],
    timeline: [
      { year: "1936", text: "Saudação antifascista na Espanha" },
      { year: "1968", text: "Pódio olímpico no México" },
      { year: "1978", text: "Greves do ABC paulista" },
      { year: "1990", text: "Mandela deixa a prisão" },
    ],
    quote: {
      text: "A luta continua!",
      author: "Palavra de ordem da FRELIMO, Moçambique",
    },
    photos: [
      { scene: "crowd", src: "/images/historia/mexico-1968-podio.jpg", caption: "Tommie Smith e John Carlos erguem o punho no pódio olímpico, Cidade do México, 1968. Foto: Angelo Cozzi, domínio público" },
      { scene: "factory", src: "/images/historia/greve-1917-operarias.jpg", caption: "Operárias em greve a caminho da negociação, São Paulo, 1917. Autor desconhecido, domínio público" },
      { scene: "chart", src: "/images/historia/greve-1917-repressao.jpg", caption: "Polícia dispersa grevistas em São Paulo, 1917. Autor desconhecido, domínio público" },
    ],
  },
];
