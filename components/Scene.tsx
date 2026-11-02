/**
 * Placeholders "fotográficos" em P&B gerados em SVG.
 * Substitua por fotos reais passando `src` para <DuotoneFrame />.
 */

export type SceneName = "factory" | "crowd" | "bank" | "dam" | "chart" | "rails" | "constitution";

// PRNG determinístico (mesmo resultado no servidor e no cliente)
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Sky({ id, light = 0.55 }: { id: string; light?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset="0.65" stopColor={`rgb(${light * 255},${light * 255},${light * 255})`} />
          <stop offset="1" stopColor="#222" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-sky)`} />
    </>
  );
}

function Vignette({ id }: { id: string }) {
  return <rect width="800" height="600" fill={`url(#${id}-vig)`} />;
}

// Chaminé afunilada com anéis e borda no topo
function Chimney({ x, top, base, w }: { x: number; top: number; base: number; w: number }) {
  return (
    <g>
      <path d={`M${x - w * 0.7} ${base} L${x - w / 2} ${top} H${x + w / 2} L${x + w * 0.7} ${base} Z`} fill="#111" />
      <rect x={x - w / 2 - 3} y={top - 7} width={w + 6} height="7" fill="#1c1c1c" />
      {[18, 30, 42].map((d) => (
        <rect key={d} x={x - w / 2 - 1} y={top + d} width={w + 2} height="4" fill="#3a3a3a" />
      ))}
      {/* Luz lateral */}
      <path d={`M${x + w * 0.18} ${top} H${x + w / 2} L${x + w * 0.7} ${base} H${x + w * 0.3} Z`} fill="#fff" opacity="0.06" />
    </g>
  );
}

// Fumaça em plumas: círculos desfocados subindo e derivando com o vento
function Plume({ x, top, seed, filter }: { x: number; top: number; seed: number; filter: string }) {
  const r = rng(seed);
  return (
    <g filter={filter}>
      {Array.from({ length: 12 }, (_, k) => (
        <circle
          key={k}
          cx={x + k * 15 + k * k * 1.4 + (r() - 0.5) * 10}
          cy={top - 14 - k * 15 + (r() - 0.5) * 8}
          r={12 + k * 4.2 + r() * 6}
          fill="#e8e8e8"
          opacity={0.55 - k * 0.035}
        />
      ))}
    </g>
  );
}

// Tanque de armazenamento: cilindro com tampa elíptica e brilho
function Tank({ x, y, w, h, grad }: { x: number; y: number; w: number; h: number; grad: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${grad})`} />
      <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={w * 0.09} fill="#6e6e6e" />
      <path d={`M${x + w * 0.15} ${y - w * 0.07} L${x + w * 0.15} ${y - w * 0.2} L${x + w * 0.35} ${y - w * 0.2}`} stroke="#3c3c3c" strokeWidth="2" fill="none" />
      {[0.33, 0.66].map((t) => (
        <line key={t} x1={x} x2={x + w} y1={y + h * t} y2={y + h * t} stroke="#2f2f2f" strokeWidth="1.5" />
      ))}
    </g>
  );
}

// Torre de destilação com plataformas e escada
function Tower({ x, top, base, w }: { x: number; top: number; base: number; w: number }) {
  const levels = Array.from({ length: Math.floor((base - top) / 34) }, (_, i) => top + 22 + i * 34);
  return (
    <g fill="#3d3d3d">
      <rect x={x} y={top} width={w} height={base - top} rx={w / 2} />
      {levels.map((ly) => (
        <rect key={ly} x={x - 6} y={ly} width={w + 12} height="3" />
      ))}
      <g stroke="#3d3d3d" strokeWidth="1.2">
        <line x1={x + w + 4} y1={top + 20} x2={x + w + 4} y2={base} />
        <line x1={x + w + 9} y1={top + 20} x2={x + w + 9} y2={base} />
        {Array.from({ length: Math.floor((base - top - 20) / 8) }, (_, i) => (
          <line key={i} x1={x + w + 4} x2={x + w + 9} y1={top + 24 + i * 8} y2={top + 24 + i * 8} />
        ))}
      </g>
    </g>
  );
}

function Factory({ id }: { id: string }) {
  const r = rng(7);
  const blur = `${id}-blur`;
  const tank = `${id}-tank`;
  const teeth = Array.from({ length: 11 }, (_, i) => -20 + i * 78);
  const roof = `M-20 600 V392 ${teeth.map((x) => `L${x} 340 L${x + 78} 392`).join(" ")} V600 Z`;
  const windows = [418, 466, 514].flatMap((y) =>
    Array.from({ length: 19 }, (_, i) => ({ x: 14 + i * 42, y, lit: r() > 0.62 }))
  );

  return (
    <>
      <Sky id={id} light={0.66} />
      <defs>
        <filter id={blur} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id={tank} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="0.35" stopColor="#6a6a6a" />
          <stop offset="0.6" stopColor="#3c3c3c" />
          <stop offset="1" stopColor="#1e1e1e" />
        </linearGradient>
        <radialGradient id={`${id}-flame`} cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Plano distante: galpões e guindaste */}
      <g fill="#8e8e8e">
        <path d="M0 360 V318 H60 V300 H120 V322 H190 V306 H250 V360 Z" />
        <rect x="70" y="250" width="6" height="60" />
        <path d="M73 250 L180 262 L180 266 L73 258 Z" />
      </g>
      <line x1="170" y1="264" x2="170" y2="300" stroke="#8e8e8e" strokeWidth="1.5" />

      {/* Fumaça atrás das chaminés */}
      <Plume x={150} top={112} seed={3} filter={`url(#${blur})`} />
      <Plume x={372} top={72} seed={5} filter={`url(#${blur})`} />
      <Plume x={612} top={132} seed={9} filter={`url(#${blur})`} />

      {/* Refinaria no plano médio */}
      <Tower x={470} top={196} base={392} w={20} />
      <Tower x={504} top={232} base={392} w={15} />
      <Tank x={530} y={326} w={92} h={66} grad={tank} />
      <Tank x={640} y={340} w={120} h={52} grad={tank} />
      <path d="M440 372 H800 M440 382 H800" stroke="#4a4a4a" strokeWidth="3" />
      {/* Tocha de queima */}
      <rect x="770" y="170" width="6" height="222" fill="#3d3d3d" />
      <path d="M773 132 C762 150 764 160 773 170 C782 160 784 150 773 132 Z" fill={`url(#${id}-flame)`} />
      <circle cx="773" cy="160" r="22" fill={`url(#${id}-flame)`} opacity="0.5" />

      {/* Chaminés */}
      <Chimney x={150} top={112} base={400} w={26} />
      <Chimney x={372} top={72} base={400} w={32} />
      <Chimney x={612} top={132} base={400} w={22} />

      {/* Fábrica com telhado em dente de serra */}
      <path d={roof} fill="#141414" />
      <g fill="#cfcfcf" opacity="0.35">
        {teeth.map((x) => (
          <rect key={x} x={x + 1} y="344" width="6" height="44" />
        ))}
      </g>
      {windows.map((w, i) => (
        <g key={i}>
          <rect x={w.x} y={w.y} width="24" height="32" fill={w.lit ? "#d9d9d9" : "#5a5a5a"} opacity={w.lit ? 0.75 : 0.35} />
          <path d={`M${w.x + 12} ${w.y} V${w.y + 32} M${w.x} ${w.y + 16} H${w.x + 24}`} stroke="#141414" strokeWidth="2" />
        </g>
      ))}

      {/* Caixa de água */}
      <path d="M688 342 L700 260 M736 342 L724 260 M690 300 H734" stroke="#0e0e0e" strokeWidth="3" />
      <rect x="692" y="226" width="40" height="36" rx="3" fill="#0e0e0e" />
      <path d="M688 228 L712 210 L736 228 Z" fill="#0e0e0e" />

      {/* Chão e trilhos */}
      <rect x="0" y="556" width="800" height="44" fill="#0a0a0a" />
      <path d="M0 572 H800 M0 586 H800" stroke="#4a4a4a" strokeWidth="2" />
      <g stroke="#2a2a2a" strokeWidth="4">
        {Array.from({ length: 27 }, (_, i) => (
          <line key={i} x1={i * 30 + 6} x2={i * 30 + 6} y1="568" y2="590" />
        ))}
      </g>

      <Vignette id={id} />
    </>
  );
}

// Livro da Constituição de 1988, inspirado na capa da edição do Senado
function Constitution({ id }: { id: string }) {
  const clip = `${id}-cover`;
  // Capa em coordenadas locais (250 x 326), posicionada e levemente girada
  return (
    <>
      <defs>
        <radialGradient id={`${id}-spot`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#5a5a5a" />
          <stop offset="1" stopColor="#0c0c0c" />
        </radialGradient>
        <linearGradient id={`${id}-desk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0e0e0e" />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}-spine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.8" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <rect x="0" y="0" width="250" height="326" rx="4" />
        </clipPath>
      </defs>

      {/* Fundo: luz de estúdio e mesa */}
      <rect width="800" height="600" fill={`url(#${id}-spot)`} />
      <rect y="492" width="800" height="108" fill={`url(#${id}-desk)`} />
      <ellipse cx="412" cy="512" rx="230" ry="26" fill={`url(#${id}-shadow)`} />

      <g transform="translate(400 292) scale(1.3) rotate(-4) translate(-132 -168)">
        {/* Bloco de páginas visto de lado */}
        <path d="M250 6 L264 14 L264 336 L250 326 Z" fill="#e9e6dc" />
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={251 + i} y1={7 + i * 0.6} x2={251 + i} y2={326 + i * 0.7} stroke="#b9b5a8" strokeWidth="0.4" />
        ))}
        <path d="M2 326 L16 336 H264 L250 326 Z" fill="#d6d2c6" />

        {/* Capa */}
        <g clipPath={`url(#${clip})`}>
          <rect width="250" height="98" fill="#fafafa" />
          {/* Brasão simplificado */}
          <g transform="translate(51 20)">
            <path d="M-15 6 Q-18 -10 -6 -16 M15 6 Q18 -10 6 -16" stroke="#2f8a3a" strokeWidth="3" fill="none" />
            <polygon points="0,-15 3.5,-5 14,-5 5.5,1.5 8.8,12 0,5.6 -8.8,12 -5.5,1.5 -14,-5 -3.5,-5" fill="#f2c200" stroke="#2f8a3a" strokeWidth="1.2" />
            <circle r="5.5" fill="#1f5fae" />
            <path d="M-12 12 Q0 18 12 12" stroke="#1f5fae" strokeWidth="3" fill="none" />
          </g>
          <text x="51" y="45" textAnchor="middle" fontSize="7.2" fill="#111" fontFamily="Segoe UI, Arial, sans-serif" letterSpacing="0.3">
            SENADO FEDERAL
          </text>
          <g fill="#9a9a9a">
            {[14, 19, 24, 29, 34].map((y, i) => (
              <rect key={y} x="122" y={y} width={i === 4 ? 50 : 94} height="2.2" />
            ))}
          </g>
          {/* Título com sombra, como na capa original */}
          <text x="127" y="77" textAnchor="middle" fontSize="35" fill="#000" opacity="0.25" fontFamily="'Arial Black', Impact, sans-serif" fontWeight="900" textLength="208" lengthAdjust="spacingAndGlyphs">
            CONSTITUIÇÃO
          </text>
          <text x="125" y="75" textAnchor="middle" fontSize="35" fill="#0b8a34" stroke="#06601f" strokeWidth="0.6" fontFamily="'Arial Black', Impact, sans-serif" fontWeight="900" textLength="208" lengthAdjust="spacingAndGlyphs">
            CONSTITUIÇÃO
          </text>
          <text x="27" y="90" fontSize="9.5" fill="#0b8a34" fontFamily="Segoe UI, Arial, sans-serif" textLength="140" lengthAdjust="spacingAndGlyphs">
            da República Federativa do Brasil
          </text>
          {/* Bandeira estilizada */}
          <rect y="98" width="250" height="228" fill="#009b3a" />
          <path d="M125 186 L245 326 H5 Z" fill="#fedf00" />
          <circle cx="125" cy="372" r="68" fill="#0095d9" />
          {/* Lombada e brilho */}
          <rect width="14" height="326" fill={`url(#${id}-spine)`} />
          <line x1="14" y1="0" x2="14" y2="326" stroke="#000" strokeOpacity="0.2" />
          <rect width="250" height="326" fill={`url(#${id}-gloss)`} />
        </g>
        <rect width="250" height="326" rx="4" fill="none" stroke="#000" strokeOpacity="0.35" />
      </g>

    </>
  );
}

type Headwear = "bare" | "cap" | "hat" | "scarf";
type Arm = "none" | "fist" | "pole";
type Person = { x: number; y: number; s: number; head: Headwear; arm: Arm; flip: boolean };

// Silhueta de um manifestante. Origem no centro dos ombros; o corpo desce para fora do quadro.
function Marcher({ p, fill }: { p: Person; fill: string }) {
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -p.s : p.s} ${p.s})`} fill={fill}>
      <ellipse cx="0" cy="-14" rx="7.5" ry="8.5" />
      <rect x="-3" y="-8" width="6" height="7" />
      <path d="M-16 4 Q-16 -2 -10 -3 L-3 -4 H3 L10 -3 Q16 -2 16 4 L18 90 H-18 Z" />
      {p.head === "cap" && (
        <path d="M-8.5 -16 Q-8 -25.5 0.5 -25 Q8 -24.5 8.5 -17 L14.5 -15.5 Q13 -14 8 -14.5 L-8.5 -14.5 Z" />
      )}
      {p.head === "hat" && (
        <path d="M-12 -16.5 Q0 -18.5 12 -16.5 L12 -15 Q0 -16.5 -12 -15 Z M-6.5 -17 Q-7 -27 0 -27.5 Q7 -27 6.5 -17 Z" />
      )}
      {p.head === "scarf" && (
        <path d="M-9.5 -12 Q-10.5 -25.5 0 -25.5 Q10.5 -25.5 9.5 -12 Q8 -3 0 -3 Q-8 -3 -9.5 -12 Z M-2 -4 L-6 4 L2 2 Z" />
      )}
      {p.arm === "fist" && (
        <>
          <line x1="11" y1="-1" x2="17" y2="-37" stroke={fill} strokeWidth="6.5" strokeLinecap="round" />
          <rect x="12.5" y="-46.5" width="10" height="9.5" rx="3" />
        </>
      )}
      {p.arm === "pole" && (
        <>
          <line x1="11" y1="-1" x2="16.5" y2="-26" stroke={fill} strokeWidth="6" strokeLinecap="round" />
          <rect x="15" y="-118" width="2.8" height="128" />
          <path d="M16.4 -128 L20 -118 H12.8 Z" />
        </>
      )}
    </g>
  );
}

// Bandeira tremulando: tecido em curva com dobras sombreadas por gradiente
function Flag({ id, x, top, bottom, w, h }: { id: string; x: number; top: number; bottom: number; w: number; h: number }) {
  const cloth = `M${x} ${top} C${x + w * 0.3} ${top - h * 0.2} ${x + w * 0.62} ${top + h * 0.24} ${x + w} ${top + h * 0.04} L${x + w * 0.97} ${top + h * 1.02} C${x + w * 0.6} ${top + h * 1.22} ${x + w * 0.3} ${top + h * 0.8} ${x} ${top + h} Z`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#262626" />
          <stop offset="0.22" stopColor="#3a3a3a" />
          <stop offset="0.45" stopColor="#1b1b1b" />
          <stop offset="0.7" stopColor="#363636" />
          <stop offset="1" stopColor="#202020" />
        </linearGradient>
      </defs>
      <rect x={x - 1.8} y={top - 6} width="3.6" height={bottom - top + 6} fill="#151515" />
      <path d={`M${x} ${top - 20} L${x + 5} ${top - 7} H${x - 5} Z`} fill="#151515" />
      <path d={cloth} fill={`url(#${id})`} />
      {/* Costura junto ao mastro */}
      <path d={`M${x + 4} ${top + 1} L${x + 4} ${top + h - 1}`} stroke="#0f0f0f" strokeWidth="2" />
    </g>
  );
}

function Crowd({ id }: { id: string }) {
  const r = rng(41);
  // Fileiras de trás para frente: mais claras e menores ao fundo (perspectiva atmosférica)
  const rows = [
    { y: 322, s: 0.42, fill: "#7a7a7a" },
    { y: 348, s: 0.55, fill: "#575757" },
    { y: 380, s: 0.72, fill: "#383838" },
    { y: 422, s: 0.95, fill: "#222" },
    { y: 478, s: 1.25, fill: "#121212" },
    { y: 552, s: 1.65, fill: "#080808" },
  ];
  const heads: Headwear[] = ["bare", "cap", "cap", "hat", "scarf", "bare", "cap"];
  // Ombro com ombro: o espaçamento acompanha a escala da fileira
  const crowd = rows.map((row) => {
    const n = Math.round(860 / (24 * row.s));
    return Array.from({ length: n }, (_, i): Person => {
      const roll = r();
      return {
        x: ((i + 0.5 + (r() - 0.5) * 0.8) / n) * 860 - 30,
        y: row.y + (r() - 0.5) * 22 * row.s,
        s: row.s * (0.92 + r() * 0.16),
        head: heads[Math.floor(r() * heads.length)],
        arm: roll > 0.975 ? "pole" : roll > 0.8 ? "fist" : "none",
        flip: r() > 0.5,
      };
    });
  });
  const rays = Array.from({ length: 11 }, (_, i) => -75 + i * 15);

  return (
    <>
      <Sky id={id} light={0.74} />
      <defs>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.52" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-banner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efefef" />
          <stop offset="1" stopColor="#bdbdbd" />
        </linearGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d0d0d0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#d0d0d0" stopOpacity="0.18" />
          <stop offset="1" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Luz atrás da multidão */}
      <circle cx="400" cy="310" r="330" fill={`url(#${id}-sun)`} />
      <g fill="#fff" opacity="0.05">
        {rays.map((deg) => (
          <path key={deg} d="M400 320 L392 -200 L408 -200 Z" transform={`rotate(${deg} 400 320)`} />
        ))}
      </g>

      {/* Cidade industrial no horizonte */}
      <g fill="#9a9a9a">
        <path d="M0 330 V292 H40 V300 H70 V280 H96 V300 H140 V286 H180 V330 Z" />
        <rect x="112" y="226" width="12" height="70" />
        <rect x="150" y="240" width="10" height="50" />
        <path d="M600 330 V296 H630 V270 H660 V292 H700 V278 H740 V296 H800 V330 Z" />
        <rect x="676" y="216" width="13" height="80" />
        <path d="M640 270 Q645 248 650 270 Z M645 252 L645 240" />
        <rect x="644" y="236" width="2" height="16" />
      </g>

      {/* Fileiras do fundo */}
      {crowd.slice(0, 3).map((row, ri) => (
        <g key={ri}>
          {row.map((p, i) => (
            <Marcher key={i} p={p} fill={rows[ri].fill} />
          ))}
          <rect x="0" y={rows[ri].y + 14 * rows[ri].s} width="800" height="600" fill={rows[ri].fill} />
          <rect x="0" y={rows[ri].y - 30} width="800" height="60" fill={`url(#${id}-haze)`} />
        </g>
      ))}

      {/* Bandeiras e faixa, seguradas no meio da multidão */}
      <Flag id={`${id}-flag-a`} x={150} top={168} bottom={430} w={150} h={78} />
      <Flag id={`${id}-flag-b`} x={600} top={196} bottom={440} w={128} h={66} />
      <g>
        <rect x="296" y="246" width="3.2" height="190" fill="#1a1a1a" />
        <rect x="520" y="246" width="3.2" height="190" fill="#1a1a1a" />
        <path d="M298 254 Q410 268 522 254 L522 300 Q410 314 298 300 Z" fill={`url(#${id}-banner)`} />
        <path d="M298 254 Q410 268 522 254" stroke="#8a8a8a" strokeWidth="1.5" fill="none" />
        <text
          x="410"
          y="290"
          textAnchor="middle"
          fill="#141414"
          fontSize="25"
          fontFamily="'Bebas Neue', Impact, 'Arial Narrow', sans-serif"
          letterSpacing="4"
        >
          PAZ, TERRA E PÃO
        </text>
      </g>

      {/* Fileiras da frente */}
      {crowd.slice(3).map((row, ri) => (
        <g key={ri + 3}>
          {row.map((p, i) => (
            <Marcher key={i} p={p} fill={rows[ri + 3].fill} />
          ))}
          <rect x="0" y={rows[ri + 3].y + 14 * rows[ri + 3].s} width="800" height="600" fill={rows[ri + 3].fill} />
        </g>
      ))}

      <Vignette id={id} />
    </>
  );
}

function Bank({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} light={0.5} />
      <g fill="#d8d8d8" opacity="0.92">
        <path d="M120 200 L400 90 L680 200 Z" />
        <rect x="110" y="200" width="580" height="22" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={140 + i * 70} y="232" width="34" height="250" />
        ))}
        <rect x="90" y="482" width="620" height="22" />
        <rect x="60" y="504" width="680" height="22" />
        <rect x="30" y="526" width="740" height="74" />
      </g>
      <g fill="#111" opacity="0.7">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={166 + i * 70} y="232" width="8" height="250" />
        ))}
      </g>
      <text x="400" y="180" textAnchor="middle" fill="#111" fontSize="26" fontFamily="serif" letterSpacing="10">
        BANCO
      </text>
      <Vignette id={id} />
    </>
  );
}

function Dam({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} light={0.6} />
      <path d="M0 600 V250 L800 200 V600 Z" fill="#1a1a1a" />
      <g fill="#9a9a9a">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${40 + i * 84} 260 h40 v340 h-40 Z`} opacity={0.35 + (i % 2) * 0.2} />
        ))}
      </g>
      <g stroke="#e5e5e5" strokeWidth="2" opacity="0.5">
        {Array.from({ length: 40 }, (_, i) => (
          <line key={i} x1={20 + i * 20} y1="420" x2={10 + i * 20} y2="600" />
        ))}
      </g>
      <path d="M0 250 L800 200" stroke="#eee" strokeWidth="6" />
      <Vignette id={id} />
    </>
  );
}

function Chart({ id }: { id: string }) {
  const bars = [60, 90, 130, 170, 230, 300, 380];
  return (
    <>
      <rect width="800" height="600" fill="#151515" />
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <g stroke="#444" strokeWidth="1">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="80" x2="740" y1={120 + i * 55} y2={120 + i * 55} />
        ))}
      </g>
      {bars.map((h, i) => (
        <rect key={i} x={110 + i * 90} y={505 - h} width="50" height={h} fill="#e0e0e0" />
      ))}
      {bars.map((_, i) => (
        <rect key={`p${i}`} x={160 + i * 90} y={505 - (60 - i * 6)} width="20" height={60 - i * 6} fill="#666" />
      ))}
      <path d="M135 445 L225 415 L315 375 L405 335 L495 275 L585 205 L675 125" stroke="#fff" strokeWidth="3" fill="none" />
      <Vignette id={id} />
    </>
  );
}

function Rails({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} light={0.66} />
      <path d="M0 600 L360 300 H440 L800 600 Z" fill="#202020" />
      <g stroke="#cfcfcf" strokeWidth="5">
        <line x1="250" y1="600" x2="390" y2="300" />
        <line x1="550" y1="600" x2="410" y2="300" />
      </g>
      <g stroke="#777" strokeWidth="6">
        {Array.from({ length: 14 }, (_, i) => {
          const t = i / 14;
          const y = 300 + Math.pow(t, 1.6) * 300;
          const half = 12 + Math.pow(t, 1.6) * 200;
          return <line key={i} x1={400 - half} x2={400 + half} y1={y} y2={y} />;
        })}
      </g>
      <g fill="#0b0b0b">
        <rect x="80" y="160" width="10" height="200" />
        <rect x="40" y="170" width="90" height="6" />
        <rect x="700" y="160" width="10" height="200" />
        <rect x="660" y="170" width="90" height="6" />
      </g>
      <path d="M85 172 Q400 240 705 172" stroke="#0b0b0b" strokeWidth="2" fill="none" />
      <Vignette id={id} />
    </>
  );
}

export default function Scene({
  name,
  className,
}: {
  name: SceneName;
  className?: string;
}) {
  const id = `scene-${name}`;
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {name === "factory" && <Factory id={id} />}
      {name === "crowd" && <Crowd id={id} />}
      {name === "bank" && <Bank id={id} />}
      {name === "dam" && <Dam id={id} />}
      {name === "chart" && <Chart id={id} />}
      {name === "rails" && <Rails id={id} />}
      {name === "constitution" && <Constitution id={id} />}
    </svg>
  );
}
