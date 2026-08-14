export type Order = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  bump: boolean;
  total: number;
  plan?: string;
  cpf?: string;
  communityPlan?: string;
  pixCode?: string;
  pixQr?: string;
};

const KEY = "vsl_order";

export function saveOrder(order: Order) {
  sessionStorage.setItem(KEY, JSON.stringify(order));
}

export function loadOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}