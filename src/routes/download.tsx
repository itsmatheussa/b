import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/order";
import ebookAsset from "@/assets/ebook.pdf.asset.json";

const TITLE = "Download — Ebook Completo + Extensão Lovable";
const DESC = "Acesse o download do seu ebook completo e da extensão do Lovable.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Download,
});

function Download() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => setOrder(loadOrder()), []);
  const hasCommunity = Boolean(order?.communityPlan);

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 py-14 text-center">
        <h1 className="text-2xl font-extrabold md:text-3xl">
          Seu acesso está <span className="text-gold">liberado</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {order
            ? `Enviamos tudo também para ${order.email}.`
            : "Enviamos tudo também para o e-mail cadastrado."}
        </p>

        <div className="surface-card mt-8 space-y-3 rounded-3xl p-6 text-left">
          <a
            href={ebookAsset.url}
            download="codigoia-masterclass.pdf"
            className="btn-gold block rounded-xl px-6 py-3.5 text-center text-sm font-bold hover:scale-[1.01]"
          >
            Baixar o ebook completo (PDF)
          </a>
          <a
            href="https://obylovable.xyz/download"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-border bg-secondary px-6 py-3.5 text-center text-sm font-semibold hover:bg-accent"
          >
            Baixar a extensão do Lovable
          </a>
          {order?.bump && (
            <Link
              to="/prompts"
              className="block rounded-xl border border-border bg-secondary px-6 py-3.5 text-center text-sm font-semibold hover:bg-accent"
            >
              Acessar meus 50 prompts
            </Link>
          )}
          <p className="pt-2 text-xs text-muted-foreground">
            Problemas com o download? Responda o e-mail da compra que resolvemos rapidinho.
          </p>
        </div>




        {hasCommunity ? (
          <Link
            to="/comunidade"
            className="btn-gold btn-glow mt-6 block rounded-xl px-6 py-3.5 text-center text-sm font-bold"
          >
            Entrar na Comunidade VIP
          </Link>
        ) : (
          <div className="surface-card animate-rise mt-6 overflow-hidden rounded-3xl border border-primary/40 p-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              Vaga ainda aberta
            </span>
            <h2 className="mt-3 text-lg font-extrabold leading-snug">
              Você deixou a <span className="text-gold-sheen">Comunidade VIP</span> para trás
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>• Aulas ao vivo toda semana</li>
              <li>• Networking com quem já está faturando</li>
              <li>• Mentoria direta para tirar dúvidas</li>
            </ul>
            <Link
              to="/upsell"
              className="btn-gold btn-glow mt-5 block rounded-xl px-6 py-3.5 text-center text-sm font-bold"
            >
              Garantir minha vaga agora
            </Link>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              O preço desta página fica disponível por pouco tempo
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
