import Scene, { type SceneName } from "./Scene";

/**
 * Container de imagem P&B que, no hover do `group` pai,
 * dá zoom leve e vira duotone vermelho.
 *
 * - `src`: foto real (ex.: /images/greve-1917.jpg em /public)
 * - `scene`: placeholder SVG usado quando não há `src`
 */
export default function DuotoneFrame({
  src,
  alt = "",
  scene = "crowd",
  className = "",
}: {
  src?: string;
  alt?: string;
  scene?: SceneName;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      <div className="absolute inset-0 grayscale contrast-125 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Scene name={scene} className="h-full w-full" />
        )}
      </div>
      {/* Duotone: multiply pinta os claros de vermelho e mantém os pretos */}
      <div className="pointer-events-none absolute inset-0 bg-rev opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-rev-deep opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-20" />
    </div>
  );
}
