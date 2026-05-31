export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const learningModule = await prisma.module.findUnique({
    where: { slug },
    include: { sections: { orderBy: { orderIndex: "asc" } }, places: true },
  });

  if (!learningModule) notFound();

  return (
    <SiteShell>
      <h1 className="mb-3 text-4xl font-semibold text-[var(--color-primary)]">{learningModule.titleEn}</h1>
      <p className="mb-6 text-[var(--color-on-surface-variant)]">{learningModule.descriptionEn}</p>
      <section className="space-y-4">
        {learningModule.sections.map((section) => (
          <article key={section.id} className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
            <h2 className="text-xl font-semibold text-[var(--color-primary)]">{section.titleEn}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-on-surface-variant)]">{section.contentEn}</p>
          </article>
        ))}
      </section>
      <div className="mt-8 flex items-center gap-4">
        <Link href={`/modules/${learningModule.slug}/quiz`} className="rounded bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white">
          Take Quiz
        </Link>
        <Link href="/map" className="rounded border px-4 py-2 text-sm font-medium">
          Related Map Points
        </Link>
      </div>
    </SiteShell>
  );
}
