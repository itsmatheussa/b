// Dados do recebedor PIX (fallback estático enquanto a Mystic Pay não está conectada).
export const PIX_CONFIG = {
  key: "00000000000", // TODO: substituir pela chave PIX real / conta Mystic Pay
  merchantName: "CLEAN SWEEP",
  merchantCity: "SAO PAULO",
};

export const PRODUCTS = {
  ebook: { id: "ebook", name: "Ebook Completo + Extensão Lovable", price: 15.99 },
  bump: { id: "bump", name: "50 Prompts para Sites Profissionais", price: 9.99 },
};

export const PLANS = [
  {
    id: "normal",
    name: "Normal",
    price: 9.99,
    perks: ["Acesso à comunidade", "Networking com criadores", "Canais de suporte"],
  },
  {
    id: "vip",
    name: "VIP",
    price: 16.99,
    perks: ["Tudo do Normal", "1 aula ao vivo por semana", "Gravações das aulas"],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 59.99,
    perks: ["Tudo do VIP", "1 mentoria individual por semana", "Prioridade no suporte"],
  },
];

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });