import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/order";

const TITLE = "50 Prompts para Sites Profissionais — Acesso liberado";
const DESC = "Acesse seus 50 prompts prontos para gerar sites profissionais em minutos.";

export const Route = createFileRoute("/prompts")({
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
  component: Prompts,
});

const PROMPTS = [
  "Landing page de alta conversão para [nicho], com hero, prova social e CTA único.",
  "Página de vendas longa com storytelling, objeções respondidas e garantia.",
  "Site institucional minimalista com seções Home, Sobre, Serviços e Contato.",
  "Portfólio para freelancer com grid de projetos e estudo de caso.",
  "Página de captura com isca digital e formulário de e-mail.",
  "Checkout de produto digital com order bump e prova social.",
  "Dashboard SaaS com métricas, gráficos e tabela filtrável.",
  "Blog com listagem paginada, categorias e página de artigo.",
  "Loja simples com catálogo, carrinho e finalização.",
  "Página de precificação com 3 planos e destaque no plano do meio.",
];

function Prompts() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => setOrder(loadOrder()), []);

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 py-14">
        <h1 className="text-2xl font-extrabold md:text-3xl">
          Seus <span className="text-gold">50 prompts</span> estão liberados
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {order?.email
            ? `O pacote completo também foi enviado para ${order.email}.`
            : "O pacote completo também foi enviado para o e-mail da compra."}
        </p>

        <div className="surface-card mt-8 space-y-3 rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Amostra do pacote
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {PROMPTS.map((p, i) => (
              <li key={p} className="flex gap-2">
                <span className="font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <p className="pt-2 text-xs text-muted-foreground">
            Os 40 prompts restantes estão no arquivo enviado por e-mail.
          </p>
        </div>

        <Link
          to="/download"
          className="mt-6 block rounded-xl border border-border bg-secondary px-6 py-3.5 text-center text-sm font-semibold hover:bg-accent"
        >
          Voltar para meus acessos
        </Link>
      </div>
    </main>
  );
}
