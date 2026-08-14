import { createFileRoute, Link } from "@tanstack/react-router";
import ebookCover from "@/assets/capa-ebook.png.asset.json";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PRODUCTS, brl } from "@/config/pix";

const TITLE = "Oferta — Ebook Completo + Extensão Lovable";
const DESC =
  "Acesso vitalício ao ebook completo e à extensão do Lovable por R$39,99. Pagamento via PIX com liberação imediata.";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Oferta,
});

const INCLUDES = [
  "Ebook completo passo a passo (do zero à primeira venda)",
  "Extensão do Lovable para acelerar suas entregas",
  "Modelos de proposta e precificação para clientes",
  "Atualizações vitalícias, sem mensalidade",
];

function Oferta() {
  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="text-center text-3xl font-extrabold md:text-4xl">
          Tudo o que você precisa por <span className="text-gold">apenas {brl(PRODUCTS.ebook.price)}</span>
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          Pagamento único via PIX. Sem assinatura, sem pegadinha.
        </p>

        <CountdownTimer minutes={7} className="mt-6" />


        <div className="surface-card mt-10 rounded-3xl p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={ebookCover.url}
              alt="Capa do ebook Código IA — guia para entender, criar e lucrar com inteligência artificial"
              width={1049}
              height={1483}
              className="h-56 w-40 rounded-2xl object-cover shadow-lg"
            />

            <div>
              <h2 className="text-xl font-bold">{PRODUCTS.ebook.name}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {INCLUDES.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-foreground">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-center gap-3">
            <span className="text-sm text-muted-foreground line-through">R$ 99,00</span>
            <span className="text-4xl font-extrabold text-gold">
              {brl(PRODUCTS.ebook.price)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="btn-gold btn-glow mt-6 flex w-full items-center justify-center rounded-xl px-8 py-4 text-base hover:scale-[1.01]"
          >
            Adquira e comece hoje
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Você poderá adicionar o pacote de 50 prompts por mais {brl(PRODUCTS.bump.price)} no
            checkout.
          </p>
        </div>
      </div>
    </main>
  );
}