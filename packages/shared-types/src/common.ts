import { z } from "zod";

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: { code: string; message: string; details?: Record<string, unknown> } | null;
  requestId: string;
  timestamp: string;
};

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});


export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const PaginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});


export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export const IdempotencyKeySchema = z.string().min(8).max(128);

export type IdempotencyKey = z.infer<typeof IdempotencyKeySchema>;
