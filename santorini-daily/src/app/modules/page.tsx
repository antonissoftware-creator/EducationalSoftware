export const dynamic = "force-dynamic";

import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function ModulesPage() {
  const modules = await prisma.module.findMany({
    orderBy: { orderIndex: "asc" },
    include: { progress: true },
  });

  return (
    <SiteShell>
      <h1 className="mb-6 text-4xl font-semibold text-[var(--color-primary)]">Learning Modules</h1>
      <div className="grid gap-5 md:grid-cols-2">
        {modules.map((module) => {
          const progress = module.progress[0]?.completionPercentage ?? 0;
          return (
            <article key={module.id} className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-6">
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">{module.titleEn}</h2>
              <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">{module.descriptionEn}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-secondary)]">
                {module.difficulty} • {module.estimatedMinutes} minutes • {Math.round(progress)}% complete
              </p>
              <Link href={`/modules/${module.slug}`} className="mt-4 inline-block rounded border px-4 py-2 text-sm font-medium">
                Open Module
              </Link>
            </article>
          );
        })}
      </div>
    </SiteShell>
  );
}
