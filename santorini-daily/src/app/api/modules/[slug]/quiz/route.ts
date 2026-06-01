import { getCurrentUser } from "@/lib/auth";
import { badRequest, notFound, ok } from "@/lib/http";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { searchParams } = new URL(req.url);
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, searchParams.get("lang"));
  const { slug } = await params;
  const learningModule = await prisma.module.findUnique({ where: { slug } });
  if (!learningModule) return notFound("Module not found");

  const quiz = await prisma.quiz.findFirst({ where: { moduleId: learningModule.id, type: "module" } });
  if (!quiz) return notFound("Quiz not found");

  return ok({
    id: quiz.id,
    moduleId: quiz.moduleId,
    type: quiz.type,
    title: pickLocalized(quiz, "titleEn", "titleEl", lang),
  });
}

export async function POST() {
  return badRequest("Use /api/quizzes/:quizId/start or /submit");
}
