export const dynamic = "force-dynamic";

import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const modules = await prisma.module.findMany({ orderBy: { orderIndex: "asc" }, take: 3 });

  return (
    <SiteShell>
      <section className="mb-10 rounded-lg border border-[var(--color-outline-variant)]/40 bg-white/60 p-8">
        <h1 className="mb-3 text-5xl font-bold text-[var(--color-primary)]">Learn Santorini Daily</h1>
        <p className="max-w-3xl text-lg text-[var(--color-on-surface-variant)]">
          Explore myths, volcanoes, and local culture through bilingual modules, quizzes, and adaptive recommendations.
        </p>
        <Link
          href="/modules"
          className="mt-6 inline-flex rounded-md bg-[var(--color-primary)] px-5 py-3 font-medium text-white"
        >
          Start Exploring
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <article key={module.id} className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">{module.titleEn}</h2>
            <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">{module.descriptionEn}</p>
            <Link href={`/modules/${module.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--color-secondary)]">
              Continue
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
