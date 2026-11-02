import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import HorizontalScroll from "@/components/HorizontalScroll";
import CapitalBill from "@/components/CapitalBill";
import LiveDebtCounter from "@/components/LiveDebtCounter";
import InequalityCalculator from "@/components/InequalityCalculator";
import SymbolsGrid from "@/components/SymbolsGrid";
import PosterGenerator from "@/components/PosterGenerator";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <CapitalBill />
        <LiveDebtCounter />
        <InequalityCalculator />
        <div className="relative z-10 py-10">
          <Marquee words={["O ESTADO É O POVO", "TAXAR OS SUPER-RICOS"]} />
          <Marquee words={["SAÚDE PÚBLICA", "BANCO PÚBLICO", "SOBERANIA"]} reverse />
        </div>
        <HorizontalScroll />
        <SymbolsGrid />
        <PosterGenerator />
      </main>
      <CallToAction />
    </>
  );
}
