import { getCurrentUser } from "@/lib/auth";
import { notFound, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const { searchParams } = new URL(req.url);
  const attemptId = searchParams.get("attemptId");
  if (!attemptId) return notFound("attemptId query param required");

  const attempt = await prisma.quizAttempt.findFirst({
    where: { id: attemptId, quizId, userId: user.id },
    include: { answers: true },
  });

  if (!attempt) return notFound("Attempt not found");
  return ok(attempt);
}
