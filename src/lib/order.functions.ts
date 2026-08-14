// Cliente HTTP do backend hospedado na Lovable (mesma API usada pelo site original).
const API = import.meta.env.VITE_API_BASE_URL ?? "https://codevolution.lovable.app";

async function post<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(`${API}/api/public/orders/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload?.error) throw new Error(payload?.error ?? "Erro inesperado");
  return payload as T;
}

type Args<T> = { data: T };

export const createOrder = ({ data }: Args<Record<string, unknown>>) =>
  post<{ id: string }>("create", data);

export const generateOrderPix = ({ data }: Args<Record<string, unknown>>) =>
  post<{ pixCode: string; pixQr: string }>("pix", data);

export const checkOrderPayment = ({ data }: Args<Record<string, unknown>>) =>
  post<{ paid: boolean; failed: boolean }>("status", data);

export const confirmOrderPaid = ({ data }: Args<Record<string, unknown>>) =>
  post<{ emailSent: boolean }>("status", data);
