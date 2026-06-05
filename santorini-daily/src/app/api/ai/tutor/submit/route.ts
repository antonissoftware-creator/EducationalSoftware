import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { isAiEnabledForUser, scoreAiTutorQuiz } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  quizToken: z.string().min(20),
  answers: z.array(z.object({ questionId: z.string(), selectedOptionId: z.string().nullable() })),
  timeSpentSeconds: z.number().int().min(0).default(0),
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!isAiEnabledForUser(settings) || !settings?.geminiApiKeyEncrypted) return badRequest("AI is disabled or missing API key");

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  try {
    return ok(
      await scoreAiTutorQuiz({
        apiKey: settings.geminiApiKeyEncrypted,
        quizToken: parsed.data.quizToken,
        userId: user.id,
        answers: parsed.data.answers,
      })
    );
  } catch {
    return badRequest("Could not submit quiz");
  }
}
