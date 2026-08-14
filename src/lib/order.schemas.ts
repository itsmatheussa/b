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
  payerDocument: z.string().regex(/^\d{11}$/, "CPF inválido"),
  plan: z.string().trim().max(50).optional(),
});

export const confirmOrderSchema = z.object({
  id: z.string().uuid(),
  plan: z.string().trim().max(50).optional(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
export type OrderNotification = OrderInput;
export const checkOrderSchema = z.object({
  id: z.string().uuid(),
  plan: z.string().trim().max(50).optional(),
});
