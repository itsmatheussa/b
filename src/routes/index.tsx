import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const TITLE = "Crie Sites Profissionais com IA — Método Completo";
const DESC =
  "Assista à aula e descubra o método completo para criar e vender sites profissionais usando IA.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const REVIEWS = [
  {
    name: "Rafael M.",
    role: "Freelancer",
    text: "Fechei 3 sites em duas semanas usando exatamente o passo a passo. O material vale muito mais do que custa.",
  },
  {
    name: "Camila S.",
    role: "Designer",
    text: "O método mudou meu fluxo de trabalho. Entrego em horas o que antes levava dias.",
  },
  {
    name: "Lucas P.",
    role: "Iniciante",
    text: "Nunca tinha programado. Segui o ebook e coloquei meu primeiro site no ar no mesmo dia.",
  },
  {
    name: "Bruna A.",
    role: "Agência",
    text: "Usei os prompts com o time inteiro. A padronização das entregas ficou absurda.",
  },
];

function Index() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="space-bg min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            Aula exclusiva
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">
            Como{" "}
            <span
              className="text-gold-sheen"
              style={{ textShadow: "0 0 22px color-mix(in oklab, var(--primary) 45%, transparent)" }}
            >
              faturar
            </span>{" "}
            <span
              className="text-gold-sheen"
              style={{ textShadow: "0 0 22px color-mix(in oklab, var(--primary) 45%, transparent)" }}
            >
              20 mil
            </span>{" "}
            com sites
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground md:text-base">
            A aula abaixo te ensina do zero o método que já colocou milhares de reais no bolso dos maiores criadores do mercado.
          </p>
          <div className="mt-5 flex justify-center">
            <svg
              className="h-5 w-5 animate-bounce text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="surface-card mt-7 overflow-hidden rounded-2xl p-2 md:mt-10">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-secondary">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/lgbRF-RYEXY?rel=0"
              title="Aula VSL"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {revealed && (
          <div className="animate-rise mt-8">
            <div className="text-center">
              <Link
                to="/oferta"
                className="btn-gold btn-glow inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-base transition-transform hover:scale-[1.03] active:scale-95 md:w-auto md:text-lg"
              >
                Quero garantir meu acesso agora
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">
                Pagamento via PIX · Acesso imediato
              </p>
            </div>

            <h2 className="mt-12 text-center text-2xl font-bold md:text-3xl">
              Quem já aplicou o método
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {REVIEWS.map((r) => (
                <div key={r.name} className="surface-card rounded-2xl p-6">
                  <div className="text-accent-foreground">★★★★★</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    “{r.text}”
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    {r.name} <span className="text-muted-foreground">· {r.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
