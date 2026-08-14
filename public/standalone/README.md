# Frontend standalone

Checkout estático (HTML + JS puro) que consome o backend hospedado na Lovable.

## Como usar

1. Baixe `frontend-standalone.zip` (ou esta pasta).
2. Abra `index.html` e ajuste a constante no topo do script:

```js
var API = "https://sweet-spark-cloud.lovable.app";
```

3. Suba os arquivos em qualquer hospedagem estática (Vercel, Netlify, Hostinger, cPanel, S3...).

## Endpoints usados (CORS liberado)

| Método | Rota | Body | Resposta |
| --- | --- | --- | --- |
| POST | `/api/public/orders/create` | `{ name, email, phone, bump, total, plan? }` | `{ id }` |
| POST | `/api/public/orders/pix` | `{ id, payerDocument, plan? }` | `{ pixCode, pixQr }` |
| POST | `/api/public/orders/status` | `{ id, plan? }` | `{ paid }` |

Quando o status volta `paid`, o backend dispara os avisos de e-mail/Telegram automaticamente.
