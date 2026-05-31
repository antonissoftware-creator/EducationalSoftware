import { z } from "zod";
import { ensureGuestSession, getCurrentUser } from "@/lib/auth";
import { badRequest, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ moduleId: z.string(), completedSections: z.number().int().min(0), completionPercentage: z.number().min(0).max(100) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  const user = await getCurrentUser();
  if (user) {
    await prisma.progress.upsert({
      where: { userId_moduleId: { userId: user.id, moduleId: parsed.data.moduleId } },
      update: {
        completedSections: parsed.data.completedSections,
        completionPercentage: parsed.data.completionPercentage,
        isCompleted: parsed.data.completionPercentage >= 100,
        lastVisitedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId: parsed.data.moduleId,
        completedSections: parsed.data.completedSections,
        completionPercentage: parsed.data.completionPercentage,
        isCompleted: parsed.data.completionPercentage >= 100,
      },
    });
  } else {
    const token = await ensureGuestSession();
    const guest = await prisma.guestSession.findUniqueOrThrow({ where: { sessionToken: token } });
    await prisma.progress.upsert({
      where: { guestSessionId_moduleId: { guestSessionId: guest.id, moduleId: parsed.data.moduleId } },
      update: {
        completedSections: parsed.data.completedSections,
        completionPercentage: parsed.data.completionPercentage,
        isCompleted: parsed.data.completionPercentage >= 100,
        lastVisitedAt: new Date(),
      },
      create: {
        guestSessionId: guest.id,
        moduleId: parsed.data.moduleId,
        completedSections: parsed.data.completedSections,
        completionPercentage: parsed.data.completionPercentage,
        isCompleted: parsed.data.completionPercentage >= 100,
      },
    });
  }

  return ok({ success: true });
}
