"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import { Download, Loader2, Share2 } from "lucide-react";
import { HammerSickle, RaisedFist, RedStar } from "./Symbols";

const SITE_DOMAIN = "MANIFESTOPOPULAR.COM.BR";
const MAX_CHARS = 60;
const EXPORT_SIZE = 1080; // px, quadrado do feed do Instagram
const FILE_NAME = "cartaz-luta.png";

const SYMBOLS = [
  { id: "star", label: "Estrela", Icon: RedStar },
  { id: "fist", label: "Punho", Icon: RaisedFist },
  { id: "hammer", label: "Foice e martelo", Icon: HammerSickle },
] as const;

const THEMES = {
  red: { label: "Vermelho", poster: "bg-red-600 text-zinc-950", rule: "bg-zinc-950", muted: "text-zinc-950/70", symbol: "text-zinc-950" },
  black: { label: "Preto", poster: "bg-zinc-950 text-paper", rule: "bg-red-600", muted: "text-paper/60", symbol: "text-red-600" },
} as const;

type SymbolId = (typeof SYMBOLS)[number]["id"];
type ThemeId = keyof typeof THEMES;

/** Maior tamanho de fonte em que o texto cabe inteiro na caixa (busca binária). */
function fitText(box: HTMLElement, text: HTMLElement) {
  let lo = 8;
  let hi = box.clientHeight;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    text.style.fontSize = `${mid}px`;
    const fits = text.scrollHeight <= box.clientHeight && text.scrollWidth <= box.clientWidth;
    if (fits) lo = mid;
    else hi = mid;
  }
  text.style.fontSize = `${lo}px`;
}

export default function PosterGenerator() {
  const [slogan, setSlogan] = useState("O Estado é o povo");
  const [symbol, setSymbol] = useState<SymbolId>("star");
  const [theme, setTheme] = useState<ThemeId>("red");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canShare, setCanShare] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const refit = useCallback(() => {
    if (boxRef.current && textRef.current) fitText(boxRef.current, textRef.current);
  }, []);

  // Reajusta a cada letra, ao trocar o tema e quando a fonte terminar de carregar
  useLayoutEffect(refit, [slogan, theme, symbol, refit]);
  useEffect(() => {
    document.fonts.ready.then(refit);
    const ro = new ResizeObserver(refit);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [refit]);

  // Compartilhar arquivo só existe em alguns navegadores (principalmente no celular)
  useEffect(() => {
    const probe = new File([""], FILE_NAME, { type: "image/png" });
    setCanShare(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
  }, []);

  // Renderiza o cartaz em 1080×1080, independente do tamanho da prévia na tela
  const exportOptions = () => {
    const node = posterRef.current!;
    return { node, options: { pixelRatio: EXPORT_SIZE / node.offsetWidth, cacheBust: true } };
  };

  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const { node, options } = exportOptions();
      const dataUrl = await toPng(node, options);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = FILE_NAME;
      link.click();
    } catch {
      setError("Não foi possível gerar a imagem. Tente de novo.");
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    setBusy(true);
    setError(null);
    try {
      const { node, options } = exportOptions();
      const blob = await toBlob(node, options);
      if (!blob) throw new Error("blob vazio");
      await navigator.share({
        files: [new File([blob], FILE_NAME, { type: "image/png" })],
        text: "Organize-se.",
      });
    } catch (e) {
      // Fechar a janela de compartilhar não é erro
      if (!(e instanceof DOMException && e.name === "AbortError")) {
        setError("Não foi possível compartilhar. Use o botão de baixar.");
      }
    } finally {
      setBusy(false);
    }
  };

  const t = THEMES[theme];
  const { Icon } = SYMBOLS.find((s) => s.id === symbol)!;
  const remaining = MAX_CHARS - slogan.length;

  return (
    <section id="cartaz" className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
          <span className="h-px w-12 bg-red-600" />
          Gerador de cartazes
        </div>
        <h2 className="mb-14 font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85]">
          Faça o seu <span className="text-outline">cartaz</span>
        </h2>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* ───── Controles ───── */}
          <div className="flex flex-col gap-8">
            <label className="block">
              <span className="font-grotesk text-lg font-medium uppercase tracking-wide text-paper/80 md:text-2xl">
                Qual a sua palavra de ordem?
              </span>
              <textarea
                value={slogan}
                maxLength={MAX_CHARS}
                rows={3}
                onChange={(e) => setSlogan(e.target.value.replace(/\n/g, " "))}
                placeholder="Escreva aqui"
                className="mt-4 block w-full resize-none border-2 border-red-600 bg-black p-5 font-poster text-3xl uppercase leading-tight text-paper outline-none placeholder:text-paper/25 focus:border-paper md:text-4xl"
              />
              <span
                className={`mt-2 block text-right font-grotesk text-xs uppercase tracking-[0.2em] ${
                  remaining <= 10 ? "text-red-600" : "text-paper/50"
                }`}
              >
                {slogan.length}/{MAX_CHARS}
              </span>
            </label>

            <fieldset>
              <legend className="mb-3 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/60">
                Símbolo
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {SYMBOLS.map(({ id, label, Icon: SymbolIcon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={symbol === id}
                    onClick={() => setSymbol(id)}
                    className={`flex flex-col items-center gap-2 border-2 px-2 py-3 font-grotesk text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                      symbol === id
                        ? "border-red-600 bg-red-600 text-zinc-950"
                        : "border-paper/30 text-paper hover:border-paper"
                    }`}
                  >
                    <SymbolIcon className="h-9 w-9" strokeWidth={6} />
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-grotesk text-xs uppercase tracking-[0.3em] text-paper/60">
                Fundo
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={theme === id}
                    onClick={() => setTheme(id)}
                    className={`flex items-center justify-center gap-3 border-2 px-3 py-3 font-grotesk text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                      theme === id ? "border-paper text-paper" : "border-paper/30 text-paper/70 hover:border-paper"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 border border-paper/50 ${id === "red" ? "bg-red-600" : "bg-zinc-950"}`}
                    />
                    {THEMES[id].label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={download}
                disabled={busy}
                className="group relative flex items-center justify-center gap-4 overflow-hidden bg-red-600 px-6 py-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-zinc-950 transition-colors disabled:opacity-60"
              >
                <span className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative flex items-center gap-4">
                  {busy ? (
                    <Loader2 className="h-[0.7em] w-[0.7em] animate-spin" />
                  ) : (
                    <Download className="h-[0.7em] w-[0.7em]" strokeWidth={2.5} />
                  )}
                  Baixar cartaz
                </span>
              </button>
              {canShare && (
                <button
                  type="button"
                  onClick={share}
                  disabled={busy}
                  className="flex items-center justify-center gap-3 border-2 border-paper/60 px-6 py-4 font-grotesk text-sm font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-paper disabled:opacity-60"
                >
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </button>
              )}
              <p role="status" className="min-h-5 font-grotesk text-xs text-red-600">
                {error}
              </p>
            </div>
          </div>

          {/* ───── Cartaz (é este nó que vira PNG) ───── */}
          <div
            ref={posterRef}
            className={`@container relative flex aspect-square w-full flex-col overflow-hidden p-[6%] ${t.poster}`}
          >
            <header className="flex items-center justify-between font-grotesk text-[2.4cqw] font-bold uppercase tracking-[0.2em]">
              <span>Palavra de ordem</span>
              <span>Nº {String(slogan.length).padStart(3, "0")}</span>
            </header>
            <div className={`mt-[2.5%] h-[1.2cqw] w-full ${t.rule}`} />

            <div ref={boxRef} className="flex min-h-0 flex-1 items-center py-[3%]">
              <p
                ref={textRef}
                className="w-full font-poster uppercase leading-[1.02] tracking-tighter [overflow-wrap:normal] [word-break:keep-all]"
              >
                {slogan.trim() || "Sua palavra de ordem"}
              </p>
            </div>

            <div className={`h-[1.2cqw] w-full ${t.rule}`} />
            <footer className="mt-[3%] flex items-end justify-between gap-4">
              <Icon className={`h-[17cqw] w-[17cqw] ${t.symbol}`} strokeWidth={5} />
              <span className={`text-right font-grotesk text-[2.2cqw] font-bold uppercase tracking-[0.2em] ${t.muted}`}>
                Gerado em: {SITE_DOMAIN}
              </span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
