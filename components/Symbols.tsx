import type { SVGProps } from "react";

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

// Foice e martelo vetorizados a partir do emblema clássico: o contorno
// da silhueta inteira, com o cabo do martelo cruzando a lâmina.
const HAMMER_SICKLE =
  "M140.4 26 L126 16.2 L114 10.2 L102.6 6.4 L117 16.2 L132.1 31.3 L141.1 44.1 L150.2 63.8 L155.5 86.4 L155.5 103 L152.5 114.3 L144.9 127.2 L143.4 127.9 L83 70.6 L111.7 41.1 L70.9 35.8 L24.9 81.9 L47.5 104.5 L70.2 83.4 L126 141.5 L120.8 144.5 L110.9 146.8 L97.4 146.8 L87.5 144.5 L77.7 140 L73.2 137 L66.4 130.2 L61.1 134 L55.8 134 L52.1 137 L48.3 137.8 L45.3 140.8 L40.7 149.1 L35.4 154.4 L18.1 163.4 L11.3 170.2 L7.5 176.3 L6 181.5 L6.8 187.6 L6 189.8 L9 193.6 L20.3 192.9 L30.2 187.6 L37 180 L42.2 168 L46 162.7 L52.1 157.4 L58.9 153.6 L62.6 148.3 L71.7 156.6 L79.2 161.9 L96.6 169.5 L110.2 171.7 L120 171.7 L132.8 169.5 L147.2 163.4 L175.1 192.1 L178.9 193.6 L184.2 193.6 L188 192.1 L192.5 187.6 L194 183.8 L194 178.5 L191 172.5 L165.3 148.3 L174.4 131.7 L178.9 112.8 L178.9 94.7 L175.1 77.3 L170.6 65.3 L160.8 47.9 L151.7 36.6 Z";

export function HammerSickle({ strokeWidth = 1.5, ...props }: SymbolProps) {
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
      <path d={HAMMER_SICKLE} />
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
