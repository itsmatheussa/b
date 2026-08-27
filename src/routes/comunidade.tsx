import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/order";

const TITLE = "Comunidade VIP no Discord — Seu acesso liberado";
const DESC = "Entre agora na Comunidade VIP no Discord e comece o networking com outros criadores.";

export const DISCORD_INVITE = "https://discord.gg/P7TssgDdxb";

export const Route = createFileRoute("/comunidade")({
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
  component: Comunidade,
});

function Comunidade() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => setOrder(loadOrder()), []);

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="animate-rise mx-auto max-w-xl px-5 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
          Assinatura confirmada
        </p>
        <h1 className="mt-4 text-2xl font-extrabold md:text-3xl">
          Bem-vindo à <span className="text-gold">Comunidade VIP</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {order?.communityPlan
            ? `Plano ${order.communityPlan} ativo. Clique abaixo para entrar no servidor do Discord.`
            : "Clique abaixo para entrar no servidor do Discord."}
        </p>

        <div className="surface-card mt-8 space-y-3 rounded-3xl p-6">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-glow block rounded-xl px-6 py-4 text-center text-sm font-bold"
          >
            Entrar na Comunidade no Discord
          </a>
          <p className="text-xs text-muted-foreground">
            Use o mesmo e-mail da compra {order?.email ? `(${order.email})` : ""} ao se apresentar no
            canal de boas-vindas.
          </p>
        </div>

        <Link to="/download" className="mt-6 inline-block text-xs text-muted-foreground underline">
          Voltar para os downloads
        </Link>
      </div>
    </main>
  );
}
