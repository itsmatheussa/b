import { z } from "zod";

export const orderInputSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(10).max(20),
  bump: z.boolean(),
  total: z.number().min(1).max(1000),
  plan: z.string().trim().max(50).optional(),
});

export const pixInputSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(3).max(100),
  total: z.number().min(1).max(1000),
  payerDocument: z.string().regex(/^\d{11}$/, "CPF inválido"),
  plan: z.string().trim().max(50).optional(),
});

export const checkOrderSchema = z.object({
  providerId: z.string().trim().min(1).max(100),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
