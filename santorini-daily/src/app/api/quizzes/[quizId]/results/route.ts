import { notFound, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const { searchParams } = new URL(req.url);
  const attemptId = searchParams.get("attemptId");
  if (!attemptId) return notFound("attemptId query param required");

  const attempt = await prisma.quizAttempt.findFirst({
    where: { id: attemptId, quizId },
    include: { answers: true },
  });

  if (!attempt) return notFound("Attempt not found");
  return ok(attempt);
}
