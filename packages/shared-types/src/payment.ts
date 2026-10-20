import { z } from "zod";

import { MoneySchema } from "./money";

import { IdempotencyKeySchema } from "./common";

export const PaymentStatusSchema = z.enum([
  "pending",
  "processing",
  "succeeded",
  "failed",
  "refunded",
]);


export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PspSchema = z.enum(["paystack", "flutterwave", "stripe"]);

export type Psp = z.infer<typeof PspSchema>;

export const PaymentSchema = z.object({
  id: z.string(),
  idempotencyKey: IdempotencyKeySchema,
  amount: MoneySchema,
  status: PaymentStatusSchema,
  psp: PspSchema,
  merchantId: z.string(),
  customerId: z.string().optional(),
  reference: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Payment = z.infer<typeof PaymentSchema>;

export const CreatePaymentRequestSchema = z.object({
  amount: MoneySchema,
  idempotencyKey: IdempotencyKeySchema,
  merchantId: z.string(),
  customerId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  preferredPsp: PspSchema.optional(),
});

export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequestSchema>;

export const PaymentRoutingDecisionSchema = z.object({
  paymentId: z.string(),
  chosenPsp: PspSchema,
  reason: z.string(),
  alternatives: z.array(z.object({ psp: PspSchema, reason: z.string() })),
  decidedAt: z.string().datetime(),
});


export type PaymentRoutingDecision = z.infer<typeof PaymentRoutingDecisionSchema>;
