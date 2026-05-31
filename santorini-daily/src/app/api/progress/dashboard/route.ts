import { ensureGuestSession, getCurrentUser } from "@/lib/auth";
import { recommendationFromScore } from "@/lib/adaptive-learning";
import { ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  const attemptWhere = user
    ? { userId: user.id }
    : { guestSessionId: (await prisma.guestSession.findUnique({ where: { sessionToken: await ensureGuestSession() } }))?.id ?? "" };

  const attempts = await prisma.quizAttempt.findMany({ where: attemptWhere, orderBy: { completedAt: "desc" } });
  const avg = attempts.length ? attempts.reduce((sum, row) => sum + row.score, 0) / attempts.length : 0;

  return ok({
    attempts,
    averageScore: avg,
    recommendation: recommendationFromScore(avg),
  });
}
