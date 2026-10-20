import { z } from "zod";

export const FraudDecisionSchema = z.enum(["allow", "review", "block"]);

export type FraudDecision = z.infer<typeof FraudDecisionSchema>;

export const FraudSignalSchema = z.object({
  rule: z.string(),
  weight: z.number(),
  description: z.string(),
});
export type FraudSignal = z.infer<typeof FraudSignalSchema>;

export const RiskAssessmentSchema = z.object({
  id: z.string(),
  paymentId: z.string(),
  score: z.number().min(0).max(100),
  decision: FraudDecisionSchema,
  signals: z.array(FraudSignalSchema),
  evaluatedAt: z.string().datetime(),
});
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
