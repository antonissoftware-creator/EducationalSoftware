import { ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const places = await prisma.place.findMany({
    where: category ? { category } : undefined,
    orderBy: { titleEn: "asc" },
  });

  return ok(places);
}
