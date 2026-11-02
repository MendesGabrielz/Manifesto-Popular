import { useId, type SVGProps } from "react";

type SymbolProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

/**
 * Símbolos em traço fino (placeholders minimalistas).
 * Todos herdam a cor via `currentColor`, então basta trocar `text-*`.
 */

export function RedStar({ strokeWidth = 1.5, ...props }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      <circle cx="100" cy="100" r="92" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="32" strokeOpacity="0.35" strokeDasharray="2 5" />
      <polygon points="100,20 118.81,74.11 176.08,75.28 130.43,109.89 147.02,164.72 100,132 52.98,164.72 69.57,109.89 23.92,75.28 81.19,74.11" />
      {/* Arestas internas: dão volume construtivista */}
      <g strokeOpacity="0.6">
        <line x1="100" y1="100" x2="100" y2="20" />
        <line x1="100" y1="100" x2="176.08" y2="75.28" />
        <line x1="100" y1="100" x2="147.02" y2="164.72" />
        <line x1="100" y1="100" x2="52.98" y2="164.72" />
        <line x1="100" y1="100" x2="23.92" y2="75.28" />
      </g>
    </svg>
  );
}

// Punho erguido vetorizado a partir do cartaz clássico: cada peça preta
// da silhueta original vira um contorno, e os vãos brancos entre elas
// viram as linhas duplas que separam dedos, polegar e palma.
const FIST_PARTS = [
  // Indicador
  "M88.7 6.7 L84.8 10.6 L69.9 31.5 L70.5 32.5 L89.7 41.1 L91.7 41.1 L103 24.9 L105.6 19.6 L102.6 16.3 L95.7 10.6 L90.4 7 Z",
  // Médio
  "M111.6 21.9 L109.9 21.9 L108.3 23.5 L96 42.7 L96 43.4 L98.7 45.4 L105.6 48.7 L108.9 51 L109.3 64.3 L110.3 63.9 L129.5 38.4 L114.9 24.2 Z",
  // Anelar
  "M148.7 57 L135.1 43.1 L132.4 41.4 L124.8 50.4 L104.3 78.2 L102.3 82.5 L115.6 88.7 L119.2 89.7 L121.2 89.4 L145.7 61.6 Z",
  // Mínimo
  "M152 60.6 L148 64.3 L123.8 91.4 L123.8 92.7 L125.8 95.4 L133.4 102.6 L135.1 102.3 L161.6 80.8 L165.5 76.8 L159.9 68.6 Z",
  // Ponta do polegar
  "M104 70.2 L100.3 69.9 L87.4 72.5 L77.8 71.9 L77.2 72.9 L78.2 73.9 L94.4 80.1 L96.7 80.5 L102 75.2 L103.6 72.5 Z",
  // Dorso da mão, polegar e lado esquerdo do antebraço
  "M63.9 34.5 L59.6 39.8 L36.1 73.2 L34.5 76.2 L34.1 78.2 L35.8 81.8 L73.5 137.7 L66.9 183.1 L66.2 192 L67.9 192.7 L74.8 193 L104.6 192.3 L105.6 191.7 L106.6 183.7 L109.6 146.7 L109.9 135.7 L105 136.1 L104 135.1 L110.3 129.8 L110.6 128.1 L106.6 120.2 L85.8 84.1 L81.1 80.8 L66.6 75.2 L65.9 73.9 L67.6 72.9 L71.9 72.2 L74.2 70.2 L73.9 68.2 L71.5 63.6 L71.5 59.6 L79.8 67.2 L83.8 68.9 L89.4 68.9 L103.3 66.9 L104.6 66.2 L105.6 64.6 L106.6 59.3 L106.6 53.7 L103.6 51 L69.9 36.1 L65.6 34.5 Z",
  // Palma e lado direito do antebraço
  "M91.1 83.8 L91.1 85.1 L95.4 93.4 L120.5 136.1 L120.2 136.7 L114.9 136.4 L114.2 138.1 L109.9 181.1 L109.9 191.7 L110.9 192.7 L129.1 193 L134.1 192.3 L134.8 191.4 L135.1 186.4 L134.4 144.7 L142 136.1 L148 125.2 L152 111.9 L154.9 92.4 L154 91.7 L135.7 105 L132.8 105.6 L118.9 93 L101.3 85.1 L94.7 83.8 Z",
];

export function RaisedFist({ strokeWidth = 1.5, ...props }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {FIST_PARTS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}


// Martelo (coordenadas antes da rotação de -45°): cabeça, encaixe e cabo
const HAMMER_HEAD = "M68 36 H128 L138 42 V58 L128 64 H68 L62 59 V41 Z";
const HAMMER_SOCKET = "M93 64 V72 H107 V64";
const HAMMER_HANDLE = "M94 72 C95 110 95.5 150 95.5 182 Q100 190 104.5 182 C104.5 150 105 110 106 72";

export function HammerSickle({ strokeWidth = 1.5, ...props }: SymbolProps) {
  // Id único por instância para a máscara (o símbolo aparece várias vezes na página)
  const maskId = `hs-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Moldura construtivista */}
      <circle cx="100" cy="100" r="96" strokeOpacity="0.2" strokeDasharray="1 6" />
      <circle cx="100" cy="100" r="89" strokeOpacity="0.12" />
      <g strokeOpacity="0.35">
        <line x1="100" y1="1" x2="100" y2="9" />
        <line x1="100" y1="191" x2="100" y2="199" />
        <line x1="1" y1="100" x2="9" y2="100" />
        <line x1="191" y1="100" x2="199" y2="100" />
      </g>

      {/*
        Orientação do emblema clássico:
        foice com a ponta no alto à direita, lâmina descendo pela direita e por baixo,
        cabo no canto inferior esquerdo; martelo com a cabeça no alto à esquerda
        e o cabo cruzando a lâmina rumo ao canto inferior direito.
      */}
      <g transform="translate(8 -6)">
        {/* Silhueta do martelo recortada da foice: o cabo passa por cima da lâmina */}
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-60" y="-60" width="320" height="320">
          <rect x="-60" y="-60" width="320" height="320" fill="white" stroke="none" />
          <g
            transform="rotate(-45 100 100)"
            fill="black"
            stroke="black"
            strokeWidth={strokeWidth * 2.5 + 3}
          >
            <path d={HAMMER_HEAD} />
            <path d={`${HAMMER_SOCKET} Z`} />
            <path d={`${HAMMER_HANDLE} Z`} />
          </g>
        </mask>

        {/* Foice */}
        <g mask={`url(#${maskId})`}>
          {/* Lâmina + cabo em uma silhueta só, afinando até a ponta */}
          <path d="M134.6 31.1 A78 78 0 1 1 42.3 154.6 Q29.7 167.8 14.6 177.9 A7 7 0 0 1 6.8 168.7 Q27.7 148.5 51.2 131.4 A66 66 0 1 0 134.6 31.1 Z" />
          {/* Fio da lâmina */}
          <path d="M134.6 31.1 A68 68 0 1 1 54.6 139.3" strokeOpacity="0.45" />
          {/* Anel de metal entre lâmina e cabo */}
          <path d="M40.6 156 L32.8 146.8 M36 159.9 L28.2 150.7" />
          <circle cx="34.4" cy="153.4" r="1.6" />
          {/* Ranhuras da empunhadura */}
          <path d="M27.7 165.5 L21.3 157.9 M21.5 170.7 L15.1 163.1" strokeOpacity="0.5" />
        </g>

        {/* Martelo, girado em -45°: cabeça no alto à esquerda */}
        <g transform="rotate(-45 100 100)">
          <path d={HAMMER_HEAD} />
          {/* Face de impacto e lado da pena */}
          <path d="M72 36 V64 M128 36 V64" strokeOpacity="0.55" />
          {/* Chanfro central da cabeça */}
          <path d="M78 50 H122" strokeOpacity="0.3" />
          <path d={HAMMER_SOCKET} />
          <path d={HAMMER_HANDLE} />
          {/* Veio da madeira e anéis da empunhadura */}
          <path d="M100 80 C98.6 112 101.2 142 100 176" strokeOpacity="0.35" />
          <path d="M95.5 160 H104.5 M95.5 166 H104.5" strokeOpacity="0.55" />
        </g>
      </g>
    </svg>
  );
}

/** Engrenagem: usada como detalhe gráfico */
export function Gear({ strokeWidth = 1.5, ...props }: SymbolProps) {
  const teeth = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    >
      <circle cx="100" cy="100" r="62" />
      <circle cx="100" cy="100" r="24" />
      {teeth.map((deg) => (
        <rect
          key={deg}
          x="92"
          y="22"
          width="16"
          height="18"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
  );
}
