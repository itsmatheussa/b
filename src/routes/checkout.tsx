import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { CountdownTimer } from "@/components/CountdownTimer";
import { PRODUCTS, brl } from "@/config/pix";
import { saveOrder } from "@/lib/order";
import { createOrder } from "@/lib/order.functions";
import { toast } from "sonner";

const TITLE = "Checkout — Ebook Completo";
const DESC = "Preencha seus dados e finalize o pedido via PIX em poucos segundos.";

export const Route = createFileRoute("/checkout")({
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
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
});

function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [bump, setBump] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const total = PRODUCTS.ebook.price + (bump ? PRODUCTS.bump.price : 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    let created: { id: string };
    try {
      created = await createOrder({ data: { ...parsed.data, bump, total } });
    } catch {
      setLoading(false);
      toast.error("Não foi possível registrar seu pedido. Tente novamente.");
      return;
    }
    setLoading(false);
    saveOrder({
      ...parsed.data,
      bump,
      total,
      id: created.id,
    });
    navigate({ to: "/pagamento" });
  };

  const field = (key: "name" | "email" | "phone", label: string, type = "text") => (
    <div>
      <label htmlFor={key} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={key}
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-2 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-ring"
      />
      {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 py-14">
        <h1 className="text-2xl font-extrabold md:text-3xl">Finalizar pedido</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Seus dados são usados apenas para liberar o acesso.
        </p>


        <CountdownTimer minutes={7} className="mt-6" label="Oferta reservada por" />



        <form onSubmit={submit} className="surface-card mt-8 space-y-5 rounded-2xl p-6">
          {field("name", "Nome completo")}
          {field("email", "E-mail", "email")}
          {field("phone", "Telefone / WhatsApp", "tel")}

          <button
            type="button"
            onClick={() => setBump(!bump)}
            aria-pressed={bump}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              bump
                ? "border-primary bg-accent"
                : "border-border bg-secondary hover:border-primary/50"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-black ${
                bump ? "btn-gold" : "border border-border bg-background"
              }`}
            >
              {bump ? "✓" : ""}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold leading-snug">
                Quer entregar sites prontos hoje? Leve 50 prompts testados
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                <span className="line-through">R$ 47,00</span>{" "}
                <span className="font-bold text-gold">+ {brl(PRODUCTS.bump.price)}</span> · adicione
                em 1 clique
              </span>
            </span>
          </button>



          <div className="space-y-1 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>{PRODUCTS.ebook.name}</span>
              <span>{brl(PRODUCTS.ebook.price)}</span>
            </div>
            {bump && (
              <div className="flex justify-between text-muted-foreground">
                <span>{PRODUCTS.bump.name}</span>
                <span>{brl(PRODUCTS.bump.price)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total</span>
              <span className="text-gold">{brl(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold btn-glow w-full rounded-xl px-8 py-4 text-base hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "Gerando PIX..." : `Gerar PIX de ${brl(total)}`}
          </button>
        </form>
      </div>
    </main>
  );
}