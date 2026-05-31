export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function ModuleQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await prisma.quiz.findFirst({
    where: { module: { slug }, type: "module" },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: { options: { orderBy: { orderIndex: "asc" } } },
      },
    },
  });

  if (!quiz) notFound();

  return (
    <SiteShell>
      <h1 className="mb-6 text-4xl font-semibold text-[var(--color-primary)]">{quiz.titleEn}</h1>
      <div className="space-y-4">
        {quiz.questions.map((question, index) => (
          <article key={question.id} className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
            <h2 className="font-semibold">Q{index + 1}. {question.questionEn}</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-on-surface-variant)]">
              {question.options.map((opt) => (
                <li key={opt.id}>• {opt.textEn}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-[var(--color-on-surface-variant)]">Quiz submission endpoint: /api/quizzes/[quizId]/submit</p>
    </SiteShell>
  );
}
