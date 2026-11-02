# O Mercado Falhou — O Estado é o Povo

Site manifesto em Next.js (App Router) + Tailwind CSS v4 + GSAP/ScrollTrigger + Lenis.

## Rodar

```bash
npm install
npm run dev
```

## Deploy na Vercel

Suba a pasta para um repositório no GitHub e importe em vercel.com/new. Não precisa de configuração extra (framework detectado automaticamente).

## Estrutura

| Arquivo | O que faz |
| --- | --- |
| `app/layout.tsx` | Fontes (Bebas Neue, Space Grotesk, Inter) e Lenis global via `SmoothScroll` |
| `components/SmoothScroll.tsx` | Lenis sincronizado com o ticker do GSAP/ScrollTrigger |
| `components/Hero.tsx` | Título letra por letra (stagger) + parallax no scroll |
| `components/Manifesto.tsx` | Revelação linha por linha com máscara |
| `components/CapitalBill.tsx` | "A Fatura do Capital": 4 cards-fatura em scroll horizontal fixado, com contadores, barras, carimbo e skew por velocidade |
| `components/Marquee.tsx` | Faixas de texto gigante movidas pela rolagem |
| `components/HorizontalScroll.tsx` | Linha do tempo com scroll horizontal fixado (pin) |
| `components/SymbolsGrid.tsx` | Grid assimétrico dos 3 símbolos; clique abre o modal |
| `components/SymbolModal.tsx` | Página interna imersiva: máscara circular (desktop) ou drawer (mobile) |
| `components/symbolStories.ts` | Textos históricos, linha do tempo e fotos de cada símbolo |
| `lib/motion.ts` | Breakpoints compartilhados do `gsap.matchMedia()` e acesso ao Lenis |
| `components/CallToAction.tsx` | Footer "ORGANIZE-SE" com botão magnético |
| `components/MagneticButton.tsx` | Botão que segue o cursor |
| `components/Symbols.tsx` | SVGs: estrela, punho, foice e martelo, engrenagem |
| `components/Scene.tsx` | Placeholders P&B em SVG no lugar de fotos |

## Trocar placeholders por fotos reais

1. Coloque as imagens em `public/images/`.
2. Em `components/HorizontalScroll.tsx`, adicione `src: "/images/sua-foto.jpg"` ao card.
3. O filtro P&B e o duotone vermelho no hover são aplicados automaticamente pelo `DuotoneFrame`.

Para o fundo do Hero, troque `<Scene name="crowd" ... />` em `components/Hero.tsx` por um `<img>` com `object-cover`.

Fontes de fotos históricas de domínio público: Wikimedia Commons, Biblioteca Nacional Digital, Arquivo Nacional.

## Links a configurar

Em `components/CallToAction.tsx`:
- `COLLECTIVE_URL`: link do seu coletivo/formulário (hoje é um placeholder `#organize`).
- `READING_URL`: materiais de leitura (hoje aponta para o Marxists Internet Archive em português).

## Dados

Os cards de dados citam relatórios da Oxfam (2023 e 2024). Confira os números nas fontes originais antes de publicar e atualize se houver edições mais recentes.

## Mobile (< 768px)

- A Fatura do Capital vira uma pilha vertical com rolagem normal.
- A Luta vira um carrossel de arrastar com scroll-snap.
- A estrela 3D do Hero usa outra "câmera" (perspectiva mais curta, entra tombando em X) e fica centralizada atrás do título.
- O modal dos símbolos abre como drawer de baixo para cima.

## Acessibilidade

Com `prefers-reduced-motion: reduce`, o Lenis e as animações são desativados e a linha do tempo vira rolagem horizontal nativa.
