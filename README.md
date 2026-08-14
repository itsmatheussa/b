# Frontend (Vite + React) — deploy na Vercel

Este pacote é o site completo (todas as páginas, vídeo, checkout, PIX) rodando como SPA.
Todo o backend continua na Lovable: pagamentos, e-mails e Telegram.

## Rodar local

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba esta pasta em um repositório Git e importe na Vercel (framework: **Vite**).
2. Build command: `npm run build` — Output: `dist`.
3. (Opcional) Variável de ambiente `VITE_API_BASE_URL` para apontar para outro backend.
   Padrão: `https://codevolution.lovable.app`.

O `vercel.json` já faz o rewrite de todas as rotas para `index.html` (SPA).
