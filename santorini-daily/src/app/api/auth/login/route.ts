import { z } from "zod";
import { createUserSession, verifyPassword } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.email(), password: z.string().min(1) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Invalid payload");

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return unauthorized();

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return unauthorized();

  await createUserSession(user.id);
  return ok({ id: user.id, email: user.email, name: user.name });
}
