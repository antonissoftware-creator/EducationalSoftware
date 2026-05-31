import { z } from "zod";
import { createUserSession, hashPassword } from "@/lib/auth";
import { badRequest, ok } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.email(), password: z.string().min(8), name: z.string().min(2) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return badRequest("Email already registered");

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash: await hashPassword(parsed.data.password),
      settings: { create: { language: "en", aiEnabled: false } },
    },
  });

  await createUserSession(user.id);
  return ok({ id: user.id, email: user.email, name: user.name }, 201);
}
