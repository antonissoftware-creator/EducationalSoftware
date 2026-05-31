import { ensureGuestSession, getCurrentUser } from "@/lib/auth";
import { notFound, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
  if (!quiz) return notFound("Quiz not found");

  const user = await getCurrentUser();
  const guestToken = user ? null : await ensureGuestSession();
  const guest = guestToken ? await prisma.guestSession.findUnique({ where: { sessionToken: guestToken } }) : null;

  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId,
      userId: user?.id,
      guestSessionId: guest?.id,
      score: 0,
      totalQuestions: quiz.questions.length,
      correctAnswers: 0,
      startedAt: new Date(),
    },
  });

  return ok({ attemptId: attempt.id, totalQuestions: attempt.totalQuestions });
}
