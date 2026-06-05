import { getCurrentUser } from "@/lib/auth";
import { notFound, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
  if (!quiz) return notFound("Quiz not found");

  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const attempt = await prisma.$transaction(async (tx) => {
    const createdAttempt = await tx.quizAttempt.create({
      data: {
        quizId,
        userId: user.id,
        score: 0,
        totalQuestions: quiz.questions.length,
        correctAnswers: 0,
        startedAt: new Date(),
      },
    });

    if (quiz.moduleId) {
      const existingProgress = await tx.progress.findUnique({
        where: { userId_moduleId: { userId: user.id, moduleId: quiz.moduleId } },
      });

      await tx.progress.upsert({
        where: { userId_moduleId: { userId: user.id, moduleId: quiz.moduleId } },
        update: {
          completionPercentage: Math.max(existingProgress?.completionPercentage ?? 0, 1),
          isCompleted: existingProgress?.isCompleted ?? false,
          lastVisitedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId: quiz.moduleId,
          completedSections: 0,
          completionPercentage: 1,
          isCompleted: false,
        },
      });
    }

    return createdAttempt;
  });

  return ok({ attemptId: attempt.id, totalQuestions: attempt.totalQuestions });
}
