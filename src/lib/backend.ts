/**
 * Backend hospedado na Lovable. Todo o pagamento (MisticPay/PIX) e os arquivos
 * (ebook, capa) continuam sendo servidos por lá — o front na Vercel só consome.
 *
 * Para apontar para outro backend, defina VITE_BACKEND_URL na Vercel.
 */
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ?? "https://codeaula.lovable.app"
).replace(/\/$/, "");

/** Converte a URL relativa dos assets (.asset.json) em URL absoluta do backend. */
export const assetUrl = (path: string) =>
  path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

export async function backendPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(
      typeof payload["error"] === "string"
        ? (payload["error"] as string)
        : "Não foi possível falar com o servidor de pagamento",
    );
  }
  return payload as T;
}
