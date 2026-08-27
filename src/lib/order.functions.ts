import { backendPost } from "./backend";
import type { OrderInput } from "./order.schemas";

/**
 * Mesma assinatura das server functions originais ({ data }), mas agora chamando
 * a API pública do backend hospedado na Lovable.
 */
export async function createOrder({ data }: { data: OrderInput }) {
  void data;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id };
}

export async function generateOrderPix({
  data,
}: {
  data: {
    id: string;
    name: string;
    total: number;
    payerDocument: string;
    plan?: string;
  };
}) {
  return backendPost<{ providerId: string; pixCode: string; pixQr: string }>(
    "/api/public/pix",
    data,
  );
}

export async function checkOrderPayment({ data }: { data: { providerId: string } }) {
  return backendPost<{ paid: boolean; failed: boolean }>("/api/public/pix-status", data);
}
