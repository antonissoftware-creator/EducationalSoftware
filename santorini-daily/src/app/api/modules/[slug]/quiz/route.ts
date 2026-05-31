import { badRequest, notFound, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const learningModule = await prisma.module.findUnique({ where: { slug } });
  if (!learningModule) return notFound("Module not found");

  const quiz = await prisma.quiz.findFirst({ where: { moduleId: learningModule.id, type: "module" } });
  if (!quiz) return notFound("Quiz not found");

  return ok(quiz);
}

export async function POST() {
  return badRequest("Use /api/quizzes/:quizId/start or /submit");
}
