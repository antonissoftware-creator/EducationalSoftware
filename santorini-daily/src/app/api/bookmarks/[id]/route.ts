import { requireUser } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    await prisma.bookmark.deleteMany({ where: { id, userId: user.id } });
    return ok({ success: true });
  } catch {
    return unauthorized();
  }
}
