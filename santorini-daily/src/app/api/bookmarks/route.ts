import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ moduleId: z.string(), sectionId: z.string().nullable().optional() });

export async function GET() {
  try {
    const user = await requireUser();
    const bookmarks = await prisma.bookmark.findMany({ where: { userId: user.id }, include: { module: true, section: true } });
    return ok(bookmarks);
  } catch {
    return unauthorized();
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Invalid payload");

    const bookmark = await prisma.bookmark.create({
      data: { userId: user.id, moduleId: parsed.data.moduleId, sectionId: parsed.data.sectionId ?? null },
    });

    return ok(bookmark, 201);
  } catch {
    return unauthorized();
  }
}
