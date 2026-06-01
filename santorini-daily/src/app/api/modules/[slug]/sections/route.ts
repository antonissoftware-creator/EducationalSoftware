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

  const sections = await prisma.moduleSection.findMany({ where: { moduleId: learningModule.id }, orderBy: { orderIndex: "asc" } });
  return ok(
    sections.map((section) => ({
      id: section.id,
      title: pickLocalized(section, "titleEn", "titleEl", lang),
      content: pickLocalized(section, "contentEn", "contentEl", lang),
      mediaType: section.mediaType,
      mediaUrl: section.mediaUrl,
    }))
  );
}
