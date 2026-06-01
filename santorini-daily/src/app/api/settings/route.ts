import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  language: z.enum(["en", "el"]),
  aiEnabled: z.boolean(),
  geminiApiKey: z.string().optional(),
});

function toResponse(settings: { language: string; aiEnabled: boolean; geminiApiKeyEncrypted: string | null }) {
  return {
    language: settings.language === "el" ? "el" : "en",
    aiEnabled: settings.aiEnabled,
    hasGeminiKey: Boolean(settings.geminiApiKeyEncrypted),
  };
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  if (!settings) {
    return ok({
      language: user.preferredLanguage === "el" ? "el" : "en",
      aiEnabled: false,
      hasGeminiKey: false,
    });
  }

  return ok(toResponse(settings));
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  const incomingKey = parsed.data.geminiApiKey?.trim();
  const existing = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  const nextGeminiValue =
    incomingKey && incomingKey.length > 0
      ? incomingKey
      : (existing?.geminiApiKeyEncrypted ?? null);

  const settings = await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {
      language: parsed.data.language,
      aiEnabled: parsed.data.aiEnabled,
      geminiApiKeyEncrypted: nextGeminiValue,
    },
    create: {
      userId: user.id,
      language: parsed.data.language,
      aiEnabled: parsed.data.aiEnabled,
      geminiApiKeyEncrypted: nextGeminiValue,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { preferredLanguage: parsed.data.language },
  });

  return ok(toResponse(settings));
}
