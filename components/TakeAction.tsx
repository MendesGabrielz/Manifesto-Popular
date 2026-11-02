"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { BREAKPOINTS, type Conditions } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SITE_URL = "https://manifestopopular.vercel.app/";
const SHARE_TEXT = "O mercado falhou. O Estado é o povo. Conheça o Manifesto Popular:";
const CHANNEL_URL = "https://whatsapp.com/channel/0029Vb9vd7sAu3aYmf9VDv0A";

type Step = {
  title: string;
  body: string;
  link?: { href: string; label: string; external?: boolean };
};

// O primeiro passo (compartilhar) tem botões próprios; os outros, um link cada
const STEPS: Step[] = [
  {
    title: "Converse com uma pessoa",
    body: "Escolha um dado deste site e leve para o almoço, o trabalho ou o grupo da família. Ouça antes de responder: ninguém muda de ideia sendo humilhado.",
    link: { href: "/#objecoes", label: "Ver as perguntas difíceis" },
  },
  {
    title: "Faça o seu cartaz",
    body: "Escreva a sua palavra de ordem, baixe o cartaz e poste. Cada perfil é um muro.",
    link: { href: "/#cartaz", label: "Criar cartaz" },
  },
  {
    title: "Entre no canal",
    body: "Receba os novos materiais, dados e chamados do Manifesto Popular direto no WhatsApp.",
    link: { href: CHANNEL_URL, label: "Seguir o canal", external: true },
  },
  {
    title: "Leve para onde você já está",
    body: "Sindicato, grêmio estudantil, associação de bairro, coletivo, igreja, time de várzea. Organização começa onde as pessoas já se encontram.",
  },
];

function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Manifesto Popular", text: SHARE_TEXT, url: SITE_URL });
      } catch {
        // A pessoa fechou a janela de compartilhamento
      }
      return;
    }
    copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
    } catch {
      // Sem permissão para a API moderna: cópia à moda antiga
      const field = document.createElement("textarea");
      field.value = SITE_URL;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}`;
  const btn =
    "inline-flex items-center gap-2 border-2 border-zinc-950 px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-[0.15em] transition-colors";

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={share} className={`${btn} bg-zinc-950 text-paper hover:bg-paper hover:text-zinc-950`}>
        <Share2 className="h-4 w-4" />
        Compartilhar
      </button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${btn} hover:bg-zinc-950 hover:text-paper`}>
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <button type="button" onClick={copy} className={`${btn} hover:bg-zinc-950 hover:text-paper`}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "Link copiado" : "Copiar link"}</span>
      </button>
    </div>
  );
}

export default function TakeAction() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(BREAKPOINTS, (ctx) => {
        const { reduceMotion } = ctx.conditions as Conditions;
        if (reduceMotion) return;
        gsap.from(".act-step", {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".act-list", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="agir" ref={root} className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
          <span className="h-px w-12 bg-red-600" />
          Ação concreta
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.84]">
            O que você pode fazer <span className="text-red-600">hoje</span>
          </h2>
          <p className="max-w-xl font-grotesk text-lg font-medium leading-snug text-paper/75 md:text-2xl">
            Concordar não muda nada sozinho. Cinco passos pequenos, que cabem na rotina de qualquer pessoa.
          </p>
        </div>

        <ol className="act-list mt-14 grid gap-px border-2 border-paper/80 bg-paper/80 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {/* Passo 1: compartilhar, em destaque */}
          <li className="act-step flex flex-col bg-red-600 p-6 text-zinc-950 md:p-8 lg:row-span-2">
            <span className="font-display text-6xl leading-none md:text-7xl">01</span>
            <h3 className="mt-4 font-display text-4xl leading-none md:text-5xl">Compartilhe este site</h3>
            <p className="mt-3 text-[15px] leading-relaxed md:text-base">
              Mande para três pessoas que ainda não pensam como você. É assim que uma ideia sai da bolha.
            </p>
            <div className="mt-auto pt-6">
              <ShareButtons />
            </div>
          </li>

          {STEPS.map((step, i) => (
            <li key={step.title} className="act-step flex flex-col bg-ink p-6 md:p-8">
              <span className="font-display text-5xl leading-none text-red-600">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-3xl leading-none md:text-4xl">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/70">{step.body}</p>
              {step.link && (
                <a
                  href={step.link.href}
                  {...(step.link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group mt-auto inline-flex items-center gap-2 pt-6 font-grotesk text-xs font-bold uppercase tracking-[0.2em] text-paper hover:text-red-600"
                >
                  {step.link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
