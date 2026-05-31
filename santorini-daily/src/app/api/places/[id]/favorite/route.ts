import { requireUser } from "@/lib/auth";
import { notFound, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const place = await prisma.place.findUnique({ where: { id } });
    if (!place) return notFound("Place not found");

    await prisma.favorite.upsert({
      where: { userId_placeId: { userId: user.id, placeId: id } },
      update: {},
      create: { userId: user.id, placeId: id },
    });

    return ok({ success: true });
  } catch {
    return unauthorized();
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    await prisma.favorite.deleteMany({ where: { userId: user.id, placeId: id } });
    return ok({ success: true });
  } catch {
    return unauthorized();
  }
}
