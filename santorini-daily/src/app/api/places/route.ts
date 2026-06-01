import { getCurrentUser } from "@/lib/auth";
import { ok } from "@/lib/http";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, searchParams.get("lang"));

  const places = await prisma.place.findMany({
    where: category ? { category } : undefined,
    orderBy: { titleEn: "asc" },
  });

  return ok(
    places.map((place) => ({
      id: place.id,
      title: pickLocalized(place, "titleEn", "titleEl", lang),
      description: pickLocalized(place, "descriptionEn", "descriptionEl", lang),
      category: place.category,
      latitude: place.latitude,
      longitude: place.longitude,
      imageUrl: place.imageUrl,
      relatedModuleId: place.relatedModuleId,
    }))
  );
}
