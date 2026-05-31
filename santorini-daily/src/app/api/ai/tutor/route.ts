import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { isAiEnabledForUser } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({ question: z.string().min(3), moduleSlug: z.string().optional() });

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!isAiEnabledForUser(settings)) return badRequest("AI is disabled or missing API key");

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  return ok({ answer: `AI tutor placeholder response for: ${parsed.data.question}` });
}
