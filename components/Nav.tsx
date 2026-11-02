import { RedStar } from "./Symbols";

const links = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#fatura", label: "A Fatura" },
  { href: "#luta", label: "A Luta" },
  { href: "#simbolos", label: "Símbolos" },
  { href: "#organize", label: "Organize-se" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-5 md:px-10">
        <a href="#topo" className="flex items-center gap-2 text-paper">
          <RedStar className="h-7 w-7" strokeWidth={6} />
          <span className="font-display text-2xl tracking-wider">
            ESTADO/POVO
          </span>
        </a>
        <ul className="hidden gap-8 font-grotesk text-xs uppercase tracking-[0.25em] text-paper md:flex">
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
        <a
          href="#organize"
          className="font-grotesk text-xs uppercase tracking-[0.25em] text-paper md:hidden"
        >
          Organize-se
        </a>
      </nav>
    </header>
  );
}
