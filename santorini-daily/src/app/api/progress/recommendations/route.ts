import { getCurrentUser } from "@/lib/auth";
import { recommendationFromScore } from "@/lib/adaptive-learning";
import { ok, unauthorized } from "@/lib/http";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const { searchParams } = new URL(req.url);
  const score = Number(searchParams.get("score") ?? "0");
  return ok(recommendationFromScore(score));
}
