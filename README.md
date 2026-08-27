# Código IA — Front end (Vercel)

Front end estático (React + Vite + TanStack Router). Todo o **back end continua na Lovable**:
pagamentos PIX (MisticPay), verificação de pagamento e os arquivos (ebook em PDF e capa).

## Como publicar na Vercel

1. Suba esta pasta em um repositório no GitHub.
2. Na Vercel: **New Project → importar o repositório**.
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
3. (Opcional) Variável de ambiente:
   - `VITE_BACKEND_URL` = `https://codeaula.lovable.app`
   Se não definir, esse valor já é o padrão.

## Rodar localmente

```bash
npm install
npm run dev
```

## Como o back end é consumido

Arquivo `src/lib/backend.ts`:

- `POST {BACKEND}/api/public/pix` → gera a cobrança PIX (retorna `providerId`, `pixCode`, `pixQr`)
- `POST {BACKEND}/api/public/pix-status` → consulta se o PIX foi pago
- `assetUrl()` → transforma as URLs dos assets (ebook PDF, capa) em URLs absolutas do backend

Essas rotas já estão publicadas no projeto Lovable com CORS liberado. As credenciais da
MisticPay ficam **apenas** no servidor da Lovable — nada sensível vai para a Vercel.

## Preços

Definidos em `src/config/pix.ts` (ebook R$ 8,99 · order bump R$ 4,99 · planos da comunidade).
