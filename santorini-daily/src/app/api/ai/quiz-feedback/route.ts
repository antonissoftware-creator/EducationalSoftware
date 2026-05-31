import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { isAiEnabledForUser } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({ weakCategories: z.array(z.string()).min(1), score: z.number().min(0).max(100) });

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!isAiEnabledForUser(settings)) return badRequest("AI is disabled or missing API key");

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  return ok({ feedback: `Review topics: ${parsed.data.weakCategories.join(", ")}. Current score: ${Math.round(parsed.data.score)}%.` });
}
