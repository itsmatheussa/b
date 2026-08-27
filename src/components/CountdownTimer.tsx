import { TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  /** Duração total em minutos */
  minutes: number;
  label?: string;
  className?: string;
};

/**
 * Cronômetro apenas visual: começa branco e vai ficando vermelho conforme o tempo acaba.
 * Não bloqueia a compra nem altera preços quando chega em zero.
 */
export function CountdownTimer({ minutes, label = "Sua oferta expira em", className = "" }: Props) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);

  useEffect(() => {
    const id = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const progress = 1 - left / total; // 0 -> 1
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div
      className={`mx-auto flex w-fit items-center gap-3 rounded-full border border-border bg-secondary/70 px-4 py-2 backdrop-blur ${className}`}
      style={{
        borderColor: `color-mix(in oklab, var(--destructive) ${Math.round(progress * 80)}%, var(--border))`,
        boxShadow:
          progress > 0.5
            ? `0 0 ${Math.round(progress * 26)}px color-mix(in oklab, var(--destructive) ${Math.round(progress * 45)}%, transparent)`
            : "none",
      }}
      aria-live="off"
    >
      <TimerIcon
        aria-hidden="true"
        className="size-4 shrink-0 animate-pulse transition-transform duration-300"
        style={{
          color: `color-mix(in oklab, var(--destructive) ${Math.round(progress * 100)}%, oklch(0.99 0 0))`,
          transform: `rotate(${left % 2 === 0 ? -12 : 12}deg)`,
        }}
      />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>

      <span
        className="font-display text-lg font-extrabold tabular-nums transition-colors duration-1000"
        style={{
          color: `color-mix(in oklab, var(--destructive) ${Math.round(progress * 100)}%, oklch(0.99 0 0))`,
        }}
      >
        {mm}:{ss}
      </span>
    </div>
  );
}
