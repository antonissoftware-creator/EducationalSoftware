import { prisma } from "@/lib/prisma";
import { getLanguage, pickLocalized } from "@/lib/i18n";
import { ok } from "@/lib/http";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = getLanguage(searchParams.get("lang"));
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
