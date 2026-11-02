/**
 * Bases de cálculo da Calculadora do Abismo Social.
 * Troque os números aqui quando sair uma edição nova das fontes.
 */

// Forbes Brasil, Bilionários 2025: Eduardo Saverin, R$ 227 bilhões, +45,5% em um ano
export const RICHEST = {
  name: "Eduardo Saverin",
  fortune: 227e9,
  yearlyGrowth: 0.455,
  source: "Forbes Brasil, lista de bilionários 2025",
};

// Quanto a fortuna cresceu em um ano, dividido pelos dias: ≈ R$ 194 milhões por dia
export const RICHEST_DAILY_GAIN =
  (RICHEST.fortune * RICHEST.yearlyGrowth) / (1 + RICHEST.yearlyGrowth) / 365;

// Banco Central: juro médio do rotativo do cartão, 438% ao ano (dez/2025)
export const CARD_YEARLY_RATE = 4.38;
export const CARD_MONTHLY_RATE = Math.pow(1 + CARD_YEARLY_RATE, 1 / 12) - 1;

// Lei 14.690/2023: juros e encargos do rotativo limitados a 100% da dívida original
export const LEGAL_CAP_MULTIPLIER = 2;

export const CARD_DEBT = 1000;
export const DEFAULT_SALARY = 3000;

/** Anos de salário integral, sem gastar nada, para igualar 24h de ganho do mais rico. */
export function yearsToMatchRichestDay(monthlySalary: number) {
  return RICHEST_DAILY_GAIN / (Math.max(monthlySalary, 1) * 12);
}

/** Dívida após `months` meses no rotativo, com ou sem o teto legal. */
export function cardDebtAfter(months: number, principal = CARD_DEBT, capped = true) {
  const raw = principal * Math.pow(1 + CARD_MONTHLY_RATE, months);
  return capped ? Math.min(raw, principal * LEGAL_CAP_MULTIPLIER) : raw;
}

/** Meses até a dívida dobrar e bater no teto da lei. */
export const MONTHS_TO_DOUBLE = Math.log(2) / Math.log(1 + CARD_MONTHLY_RATE);

export const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export const brlCompact = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 0,
});

export const intBR = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
