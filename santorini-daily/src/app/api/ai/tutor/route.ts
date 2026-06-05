import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { generateAiTutorQuiz, getAiTutorConcept, isAiEnabledForUser } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  conceptId: z.enum(["history", "volcano", "culture"]),
  lang: z.enum(["en", "el"]).default("en"),
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!isAiEnabledForUser(settings) || !settings?.geminiApiKeyEncrypted) return badRequest("AI is disabled or missing API key");

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");
  if (!getAiTutorConcept(parsed.data.conceptId)) return badRequest("Unknown concept");

  try {
    return ok(
      await generateAiTutorQuiz({
        apiKey: settings.geminiApiKeyEncrypted,
        conceptId: parsed.data.conceptId,
        lang: parsed.data.lang,
        userId: user.id,
      })
    );
  } catch {
    return badRequest("Could not generate quiz");
  }
}
