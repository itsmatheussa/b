import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { brl } from "@/config/pix";
import { loadOrder, saveOrder, type Order } from "@/lib/order";
import { checkOrderPayment, generateOrderPix } from "@/lib/order.functions";

const TITLE = "Pagamento via PIX — Finalize seu acesso";
const DESC = "Escaneie o QR Code ou copie o código PIX para liberar seu acesso imediato.";

export const Route = createFileRoute("/pagamento")({
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
  component: Pagamento,
});

const FIXED_CPF = "77777777777";

function Pagamento() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [code, setCode] = useState("");
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const autoRan = useRef(false);

  useEffect(() => {
    const o = loadOrder();
    if (!o) {
      navigate({ to: "/checkout" });
      return;
    }
    setOrder(o);
    setCode(o.pixCode ?? "");
    setQr(o.pixQr ?? "");
    // CPF fixo em segundo plano: gera o PIX automaticamente ao abrir a página.
    if (!o.pixCode && o.id && !autoRan.current) {
      autoRan.current = true;
      void generateFor(o, FIXED_CPF);
    }
  }, [navigate]);


  const generateFor = async (current: Order, document: string) => {
    if (!current.id) return;
    setGenerating(true);
    try {
      const result = await generateOrderPix({
        data: {
          id: current.id,
          name: current.name,
          total: current.total,
          payerDocument: document,
          ...(current.plan ? { plan: current.plan } : {}),
        },
      });
      const updated = {
        ...current,
        cpf: document,
        providerId: result.providerId,
        pixCode: result.pixCode,
        pixQr: result.pixQr,
      };
      saveOrder(updated);
      setOrder(updated);
      setCode(result.pixCode);
      setQr(result.pixQr);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(
        msg && !msg.includes("[object")
          ? msg
          : "Não foi possível gerar o PIX. Tente novamente em instantes.",
      );
    } finally {
      setGenerating(false);
    }
  };

  // Verifica automaticamente na operadora se o PIX já caiu e segue para o upsell.
  useEffect(() => {
    const providerId = order?.providerId;
    if (!code || !providerId) return;
    const plan = order?.plan;
    let active = true;

    const tick = async () => {
      try {
        const result = await checkOrderPayment({ data: { providerId } });
        if (!active) return;
        if (result.paid) {
          active = false;
          clearInterval(timer);
          toast.success("Pagamento confirmado! Liberando seu acesso...");
          if (plan) {
            const current = loadOrder();
            if (current) saveOrder({ ...current, communityPlan: plan });
          }
          navigate({ to: plan ? "/download" : "/upsell" });
        }
      } catch {
        // silencioso: tenta novamente no próximo ciclo
      }
    };

    const timer = setInterval(tick, 5000);
    void tick();

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [code, order?.providerId, order?.plan, navigate]);


  if (!order) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 py-14 text-center">
        <h1 className="text-2xl font-extrabold md:text-3xl">Pague com PIX para liberar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Olá, {order.name.split(" ")[0]} — o acesso vai para {order.email}
        </p>

        <div className="surface-card mt-8 rounded-3xl p-6">
          <p className="text-sm text-muted-foreground">Valor total</p>
          <p className="text-4xl font-extrabold text-gold">{brl(order.total)}</p>

          {!code && generating && (
            <p className="mt-6 text-sm text-muted-foreground">Gerando seu PIX...</p>
          )}


          {qr && (
            <img
              src={qr}
              alt="QR Code do pagamento PIX"
              width={320}
              height={320}
              className="mx-auto mt-6 h-56 w-56 rounded-2xl bg-foreground p-2"
            />
          )}

          {code && (
            <>
              <p className="mt-6 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                PIX copia e cola
              </p>
              <p className="mt-2 break-all rounded-xl border border-border bg-secondary p-3 text-left text-[11px] text-muted-foreground">
                {code}
              </p>
              <button onClick={copy} className="btn-gold mt-4 w-full rounded-xl px-6 py-3.5 text-sm hover:scale-[1.01]">
                {copied ? "Código copiado!" : "Copiar código PIX"}
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
                Aguardando o pagamento — a liberação é automática
              </p>
            </>

          )}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          A confirmação é automática assim que o PIX cair.
        </p>
      </div>
    </main>
  );
}