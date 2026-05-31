export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { QuizStepper } from "@/components/quiz/quiz-stepper";
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

  if (!quiz || quiz.questions.length === 0) notFound();

  return (
    <div className="min-h-screen bg-[#f2f0ea] px-4 py-8 md:px-8 md:py-10">
      <QuizStepper
        title={quiz.titleEn}
        questions={quiz.questions.map((question) => ({
          id: question.id,
          questionEn: question.questionEn,
          options: question.options.map((option) => ({ id: option.id, textEn: option.textEn })),
        }))}
      />
    </div>
  );
}
