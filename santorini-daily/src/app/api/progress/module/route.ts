import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ moduleId: z.string(), completedSections: z.number().int().min(0), completionPercentage: z.number().min(0).max(100) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  const user = await getCurrentUser();
  if (!user) return unauthorized();
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

  return ok({ success: true });
}
