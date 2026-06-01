import { getCurrentUser } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const progress = await prisma.progress.findMany({ where: { userId: user.id }, include: { module: true } });
  return ok(progress);
}
