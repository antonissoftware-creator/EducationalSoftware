import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, notFound, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  attemptId: z.string(),
  answers: z.array(z.object({ questionId: z.string(), selectedOptionId: z.string().nullable() })),
  timeSpentSeconds: z.number().int().min(0).default(0),
});

export async function POST(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const attempt = await prisma.quizAttempt.findFirst({
    where: { id: parsed.data.attemptId, quizId, userId: user.id },
    include: { quiz: { include: { module: { include: { _count: { select: { sections: true } } } } } } },
  });
  if (!attempt) return notFound("Attempt not found");

  const options = await prisma.questionOption.findMany({
    where: { questionId: { in: parsed.data.answers.map((a) => a.questionId) } },
  });

  const correctByQuestion = new Map<string, string>();
  for (const option of options) {
    if (option.isCorrect) correctByQuestion.set(option.questionId, option.id);
  }

  let correct = 0;
  for (const answer of parsed.data.answers) {
    const isCorrect = correctByQuestion.get(answer.questionId) === answer.selectedOptionId;
    if (isCorrect) correct += 1;

    await prisma.userAnswer.create({
      data: {
        quizAttemptId: attempt.id,
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId,
        isCorrect,
      },
    });
  }

  const total = parsed.data.answers.length || 1;
  const score = (correct / total) * 100;

  await prisma.$transaction(async (tx) => {
    await tx.quizAttempt.update({
      where: { id: attempt.id },
      data: {
        correctAnswers: correct,
        totalQuestions: total,
        score,
        completedAt: new Date(),
        timeSpentSeconds: parsed.data.timeSpentSeconds,
      },
    });

    if (attempt.quiz.moduleId) {
      await tx.progress.upsert({
        where: { userId_moduleId: { userId: user.id, moduleId: attempt.quiz.moduleId } },
        update: {
          completedSections: attempt.quiz.module?._count.sections ?? 0,
          completionPercentage: 100,
          isCompleted: true,
          lastVisitedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId: attempt.quiz.moduleId,
          completedSections: attempt.quiz.module?._count.sections ?? 0,
          completionPercentage: 100,
          isCompleted: true,
        },
      });
    }
  });

  return ok({ score, correctAnswers: correct, totalQuestions: total });
}
