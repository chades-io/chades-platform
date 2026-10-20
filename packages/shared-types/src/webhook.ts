import { z } from "zod";

export const WebhookEventTypeSchema = z.enum([
  "payment.succeeded",
  "payment.failed",
  "payment.refunded",
  "payout.succeeded",
  "payout.failed",
  "dispute.opened",
  "dispute.resolved",
]);
export type WebhookEventType = z.infer<typeof WebhookEventTypeSchema>;

export const WebhookEventSchema = z.object({
  id: z.string(),
  type: WebhookEventTypeSchema,
  payload: z.record(z.string(), z.unknown()),
  signature: z.string(),
  receivedAt: z.string().datetime(),
  deliveredAt: z.string().datetime().nullable(),
  attempts: z.number().int().nonnegative(),
});
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
