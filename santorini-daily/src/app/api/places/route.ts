import { getCurrentUser } from "@/lib/auth";
import { ok } from "@/lib/http";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, searchParams.get("lang"));

  const modules = await prisma.module.findMany({
    where: category ? { slug: category } : undefined,
    orderBy: { orderIndex: "asc" },
    include: {
      places: {
        orderBy: { titleEn: "asc" },
        take: 1,
      },
    },
  });

  return ok(
    modules.flatMap((learningModule) => {
      const place = learningModule.places[0];
      if (!place) return [];

      return {
        id: learningModule.id,
        title: pickLocalized(learningModule, "titleEn", "titleEl", lang),
        description: pickLocalized(learningModule, "descriptionEn", "descriptionEl", lang),
        category: learningModule.slug,
        latitude: place.latitude,
        longitude: place.longitude,
        imageUrl: place.imageUrl,
        moduleSlug: learningModule.slug,
      };
    })
  );
}
