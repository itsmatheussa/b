import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PLANS, brl } from "@/config/pix";
import { loadOrder, saveOrder, type Order } from "@/lib/order";
import { createOrder } from "@/lib/order.functions";

const TITLE = "Comunidade VIP no Discord para Criadores de Sites";
const DESC =
  "Entre na comunidade VIP: networking, aulas semanais ao vivo e mentoria individual para criadores de sites.";

export const Route = createFileRoute("/upsell")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Upsell,
});

function Upsell() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => setOrder(loadOrder()), []);

  const subscribe = async (plan: { id: string; name: string; price: number }) => {
    if (!order) {
      toast.error("Não encontramos seus dados. Refaça o checkout para continuar.");
      navigate({ to: "/checkout" });
      return;
    }
    setLoadingPlan(plan.id);
    try {
      const result = await createOrder({
        data: {
          name: order.name,
          email: order.email,
          phone: order.phone,
          bump: false,
          total: plan.price,
          plan: plan.name,
        },
      });
      // Reaproveita nome/e-mail/telefone/CPF já salvos e limpa o PIX anterior,
      // para que a página de pagamento gere o novo PIX automaticamente.
      const { pixCode: _pixCode, pixQr: _pixQr, ...saved } = order;
      saveOrder({
        ...saved,
        id: result.id,
        total: plan.price,
        plan: plan.name,
        bump: false,
      });
      navigate({ to: "/pagamento" });
    } catch {
      toast.error("Não foi possível gerar o PIX. Tente novamente.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent-foreground">
          Compra confirmada · Oferta exclusiva
        </p>
        <h1 className="mt-4 text-center text-3xl font-extrabold md:text-4xl">
          Entre para a <span className="text-gold">Comunidade VIP</span> no Discord
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          O ebook te dá o método. A comunidade te dá o ritmo: networking, aulas ao vivo e
          mentoria com quem já vive disso.
        </p>
        {order && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Assinando como {order.name} · {order.email}
          </p>
        )}

        <CountdownTimer minutes={5} className="mt-6" label="Condição válida por" />


        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`surface-card relative flex flex-col rounded-3xl p-6 ${
                plan.highlight ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.highlight && (
                <span className="btn-gold absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
                  Mais popular
                </span>
              )}
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="mt-3">
                <span className="text-3xl font-extrabold text-gold">{brl(plan.price)}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
                {plan.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-accent-foreground">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(plan)}
                disabled={loadingPlan !== null}
                className={`mt-6 w-full rounded-xl px-6 py-3.5 text-sm font-bold transition-transform ${
                  plan.highlight
                    ? "btn-gold btn-glow hover:scale-[1.02]"
                    : "border border-primary/40 bg-secondary hover:scale-[1.01] hover:border-primary hover:bg-accent"
                } disabled:opacity-60`}
              >
                {loadingPlan === plan.id ? "Gerando PIX..." : `Assinar ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Cancele quando quiser. Sem fidelidade.
        </p>

        <div className="mt-4 text-center">
          <Link to="/download" className="text-sm text-muted-foreground underline hover:text-foreground">
            Quero apenas o ebook por enquanto
          </Link>
        </div>
      </div>
    </main>
  );
}