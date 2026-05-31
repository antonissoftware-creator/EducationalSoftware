export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-6 shadow-sm">
      <h2 className="mb-3 font-serif text-2xl font-semibold text-[var(--color-primary)]">{title}</h2>
      {children}
    </section>
  );
}
