import { prisma } from "@/lib/prisma";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { ok } from "@/lib/http";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, searchParams.get("lang"));
  const modules = await prisma.module.findMany({ orderBy: { orderIndex: "asc" } });

  return ok(
    modules.map((module) => ({
      id: module.id,
      slug: module.slug,
      title: pickLocalized(module, "titleEn", "titleEl", lang),
      description: pickLocalized(module, "descriptionEn", "descriptionEl", lang),
      difficulty: module.difficulty,
      estimatedMinutes: module.estimatedMinutes,
    }))
  );
}
