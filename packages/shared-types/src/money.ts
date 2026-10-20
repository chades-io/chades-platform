import { z } from "zod";

/**
 * Supported currencies. Amounts are ALWAYS integers in minor units
 * (kobo, cents, pence) — never floats.
 */
export const CurrencySchema = z.enum(["NGN", "USD", "GBP", "EUR"]);


export type Currency = z.infer<typeof CurrencySchema>;

export const MoneySchema = z.object({

  amount: z.number().int().nonnegative(),

  currency: CurrencySchema,

});

export type Money = z.infer<typeof MoneySchema>;

export function toMinorUnits(value: number, _currency: Currency): number {
  return Math.round(value * 100);
}

export function toMajorUnits(minor: number, _currency: Currency): number {
  return minor / 100;
}
 