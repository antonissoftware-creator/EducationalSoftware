import { z } from "zod";
import { createPracticePrompt, isAiEnabledForUser } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ topic: z.string().min(3) });

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!isAiEnabledForUser(settings)) return badRequest("AI is disabled or missing API key");

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  return ok({ prompt: createPracticePrompt(parsed.data.topic), questions: [] });
}
