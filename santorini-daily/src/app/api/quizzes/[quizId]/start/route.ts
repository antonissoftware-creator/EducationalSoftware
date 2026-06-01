import { getCurrentUser } from "@/lib/auth";
import { notFound, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
  if (!quiz) return notFound("Quiz not found");

  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId,
      userId: user.id,
      score: 0,
      totalQuestions: quiz.questions.length,
      correctAnswers: 0,
      startedAt: new Date(),
    },
  });

  return ok({ attemptId: attempt.id, totalQuestions: attempt.totalQuestions });
}
