import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { notFound, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { searchParams } = new URL(req.url);
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, searchParams.get("lang"));
  const { slug } = await params;

  const learningModule = await prisma.module.findUnique({ where: { slug } });
  if (!learningModule) return notFound("Module not found");

  return ok({
    id: learningModule.id,
    slug: learningModule.slug,
    title: pickLocalized(learningModule, "titleEn", "titleEl", lang),
    description: pickLocalized(learningModule, "descriptionEn", "descriptionEl", lang),
    difficulty: learningModule.difficulty,
    estimatedMinutes: learningModule.estimatedMinutes,
  });
}
