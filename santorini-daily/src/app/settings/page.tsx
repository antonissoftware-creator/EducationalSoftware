export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const settings = user
    ? await prisma.userSettings.findUnique({ where: { userId: user.id } })
    : null;

  return (
    <SiteShell>
      <h1 className="mb-6 text-4xl font-semibold text-[var(--color-primary)]">Settings</h1>
      <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-6">
        <p className="text-sm text-[var(--color-on-surface-variant)]">Language: {settings?.language ?? "en"}</p>
        <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">AI Enabled: {settings?.aiEnabled ? "Yes" : "No"}</p>
        <p className="mt-2 text-xs text-[var(--color-on-surface-variant)]">AI remains disabled until a Gemini key is configured.</p>
      </section>
    </SiteShell>
  );
}
