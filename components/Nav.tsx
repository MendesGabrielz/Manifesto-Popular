import { RedStar } from "./Symbols";

// Links absolutos: o menu também aparece nas páginas do Projeto de País
const links = [
  { href: "/#manifesto", label: "Manifesto" },
  { href: "/#fatura", label: "A Fatura" },
  { href: "/#luta", label: "A Luta" },
  { href: "/#simbolos", label: "Símbolos" },
  { href: "/projeto", label: "Projeto de País" },
  { href: "/#organize", label: "Organize-se" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-5 md:px-10">
        <a href="/#topo" className="flex items-center gap-2 text-paper">
          <RedStar className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={6} />
          <span className="font-display text-xl tracking-wider sm:text-2xl">
            ESTADO/POVO
          </span>
        </a>
        <ul className="hidden gap-7 font-grotesk text-xs uppercase tracking-[0.22em] text-paper lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-paper after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 font-grotesk text-[11px] uppercase tracking-[0.15em] text-paper sm:gap-5 sm:text-xs sm:tracking-[0.2em] lg:hidden">
          <a href="/projeto">Projeto</a>
          <a href="/#organize">Organize-se</a>
        </div>
      </nav>
    </header>
  );
}
