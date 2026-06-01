export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings/settings-form";
import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fsettings");
  const lang = resolveLanguage(user.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];

  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });

  return (
    <SiteShell lang={lang}>
      <h1 className="text-4xl leading-[0.95] text-[#0b4f7d]">{t.settings_title}</h1>
      <p className="mt-2 text-sm text-[#5f6977]">{t.settings_subtitle}</p>

      <SettingsForm
        initialLanguage={settings?.language === "el" ? "el" : "en"}
        initialAiEnabled={settings?.aiEnabled ?? false}
        initialHasGeminiKey={Boolean(settings?.geminiApiKeyEncrypted)}
        labels={{
          generalPreferences: t.general_preferences,
          interfaceLanguage: t.interface_language,
          languageHelp: t.language_help,
          aiIntegration: t.ai_integration,
          enableAi: t.enable_ai,
          enableAiHelp: t.enable_ai_help,
          geminiKey: t.gemini_key,
          geminiKeyHelp: t.gemini_key_help,
          saveSettings: t.save_settings,
          saving: t.saving,
          settingsSaved: t.settings_saved,
          saveError: t.save_error,
          saveUnavailable: t.save_unavailable,
        }}
      />
    </SiteShell>
  );
}
