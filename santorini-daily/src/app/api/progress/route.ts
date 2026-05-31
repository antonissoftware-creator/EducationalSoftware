import { ensureGuestSession, getCurrentUser } from "@/lib/auth";
import { ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (user) {
    const progress = await prisma.progress.findMany({ where: { userId: user.id }, include: { module: true } });
    return ok(progress);
  }

  const token = await ensureGuestSession();
  const guest = await prisma.guestSession.findUnique({ where: { sessionToken: token } });
  const progress = guest ? await prisma.progress.findMany({ where: { guestSessionId: guest.id }, include: { module: true } }) : [];
  return ok(progress);
}
