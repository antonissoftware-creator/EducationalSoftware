import { notFound, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = await prisma.place.findUnique({ where: { id } });
  if (!place) return notFound("Place not found");
  return ok(place);
}
