export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { recommendationFromScore } from "@/lib/adaptive-learning";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const attempts = await prisma.quizAttempt.findMany({ orderBy: { completedAt: "desc" }, take: 10 });
  const average = attempts.length ? attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length : 0;
  const recommendation = recommendationFromScore(average);

  return (
    <SiteShell>
      <h1 className="mb-6 text-4xl font-semibold text-[var(--color-primary)]">Progress Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-on-surface-variant)]">Average Score</p>
          <p className="mt-2 text-4xl font-bold text-[var(--color-primary)]">{Math.round(average)}%</p>
        </article>
        <article className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-on-surface-variant)]">Recent Attempts</p>
          <p className="mt-2 text-4xl font-bold text-[var(--color-primary)]">{attempts.length}</p>
        </article>
        <article className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-on-surface-variant)]">Recommendation</p>
          <p className="mt-2 text-2xl font-bold text-[var(--color-primary)]">{recommendation.title}</p>
        </article>
      </div>
      <p className="mt-6 text-[var(--color-on-surface-variant)]">{recommendation.action}</p>
    </SiteShell>
  );
}
