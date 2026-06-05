export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";
import { QuizStepper } from "@/components/quiz/quiz-stepper";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

export default async function ModuleQuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/modules/${slug}/quiz`)}`);
  const search = await searchParams;
  const lang = resolveLanguage(user.preferredLanguage, search.lang ?? null);
  const t = uiText[lang];

  const quiz = await prisma.quiz.findFirst({
    where: { module: { slug }, type: "module" },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: { options: { orderBy: { orderIndex: "asc" } } },
      },
    },
  });

  if (!quiz || quiz.questions.length === 0) notFound();

  return (
    <div className="min-h-screen bg-[#f2f0ea] px-4 py-8 md:px-8 md:py-10">
      <QuizStepper
        quizId={quiz.id}
        title={pickLocalized(quiz, "titleEn", "titleEl", lang)}
        exitHref={`/modules/${slug}`}
        exitLabel={t.exit_quiz}
        questions={quiz.questions.map((question) => ({
          id: question.id,
          questionEn: pickLocalized(question, "questionEn", "questionEl", lang),
          options: question.options.map((option) => ({ id: option.id, textEn: pickLocalized(option, "textEn", "textEl", lang) })),
        }))}
        labels={{
          quizComplete: t.quiz_complete,
          youAnswered: t.answered,
          outOf: t.out_of,
          correctly: t.correctly,
          viewProgress: t.view_progress,
          question: t.question,
          of: t.of,
          previous: t.previous,
          submitting: t.submitting,
          submitQuiz: t.submit_quiz,
          nextQuestion: t.next_question,
          quizStartError: t.quiz_start_error,
          quizSubmitError: t.quiz_submit_error,
        }}
      />
    </div>
  );
}
