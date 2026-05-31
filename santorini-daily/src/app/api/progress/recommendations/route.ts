import { recommendationFromScore } from "@/lib/adaptive-learning";
import { ok } from "@/lib/http";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const score = Number(searchParams.get("score") ?? "0");
  return ok(recommendationFromScore(score));
}
