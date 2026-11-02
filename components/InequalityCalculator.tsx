"use client";

import { useState } from "react";
import SalaryInput from "./calculator/SalaryInput";
import BillionaireCard from "./calculator/BillionaireCard";
import CardTrapCard from "./calculator/CardTrapCard";
import { DEFAULT_SALARY } from "@/lib/inequality";

export default function InequalityCalculator() {
  const [salary, setSalary] = useState(DEFAULT_SALARY);

  return (
    <section
      id="calculadora"
      className="relative border-t border-paper/10 bg-ink px-4 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center gap-4 font-grotesk text-xs uppercase tracking-[0.4em] text-red-600">
          <span className="h-px w-12 bg-red-600" />
          Calculadora do abismo social
        </div>

        <SalaryInput value={salary} onChange={setSalary} />

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-2">
          <BillionaireCard salary={salary} />
          <CardTrapCard salary={salary} />
        </div>
      </div>
    </section>
  );
}
