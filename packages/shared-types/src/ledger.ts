import { z } from "zod";

import { MoneySchema } from "./money";

export const LedgerEntryTypeSchema = z.enum(["debit", "credit"]);


export type LedgerEntryType = z.infer<typeof LedgerEntryTypeSchema>;

export const LedgerEntrySchema = z.object({
  id: z.string(),
  transactionId: z.string(),
  accountId: z.string(),
  type: LedgerEntryTypeSchema,
  amount: MoneySchema,
  description: z.string().optional(),
  createdAt: z.string().datetime(),
});


export type LedgerEntry = z.infer<typeof LedgerEntrySchema>;

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  balanceMinor: z.number().int(),
  lastActivityAt: z.string().datetime().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

export const LedgerTransactionSchema = z.object({
  id: z.string(),
  reference: z.string(),
  entries: z.array(LedgerEntrySchema),
  createdAt: z.string().datetime(),
});

export type LedgerTransaction = z.infer<typeof LedgerTransactionSchema>;
