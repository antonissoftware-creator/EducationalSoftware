import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { resolveLanguage } from "@/lib/i18n";
import { uiText } from "@/lib/translations";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];
  return (
    <SiteShell lang={lang}>
      <h1 className="mb-4 text-4xl font-semibold text-[var(--color-primary)]">{t.register_title}</h1>
      <p className="text-sm text-[var(--color-on-surface-variant)]">{t.register_subtitle}</p>
    </SiteShell>
  );
}
