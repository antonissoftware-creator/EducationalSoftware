"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SettingsFormProps = {
  initialLanguage: "en" | "el";
  initialAiEnabled: boolean;
  initialHasGeminiKey: boolean;
  labels: {
    generalPreferences: string;
    interfaceLanguage: string;
    languageHelp: string;
    aiIntegration: string;
    enableAi: string;
    enableAiHelp: string;
    geminiKey: string;
    geminiKeyHelp: string;
    saveSettings: string;
    saving: string;
    disconnect: string;
    disconnecting: string;
    settingsSaved: string;
    saveError: string;
    saveUnavailable: string;
  };
};

export function SettingsForm({
  initialLanguage,
  initialAiEnabled,
  initialHasGeminiKey,
  labels,
}: SettingsFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<"en" | "el">(initialLanguage);
  const [aiEnabled, setAiEnabled] = useState(initialAiEnabled);
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [hasGeminiKey, setHasGeminiKey] = useState(initialHasGeminiKey);
  const [saving, setSaving] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const placeholder = useMemo(
    () => (hasGeminiKey ? "••••••" : "AIzaSy..."),
    [hasGeminiKey]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, aiEnabled, geminiApiKey }),
      });

      if (!response.ok) {
        setError(labels.saveError);
        setSaving(false);
        return;
      }

      const data = (await response.json()) as { language: "en" | "el"; aiEnabled: boolean; hasGeminiKey: boolean };
      setLanguage(data.language);
      setAiEnabled(data.aiEnabled);
      setHasGeminiKey(data.hasGeminiKey);
      setGeminiApiKey("");
      setMessage(labels.settingsSaved);
      window.location.reload();
    } catch {
      setError(labels.saveUnavailable);
    } finally {
      setSaving(false);
    }
  }

  async function onDisconnect() {
    setDisconnecting(true);
    setMessage("");
    setError("");

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      setError(labels.saveUnavailable);
      setDisconnecting(false);
    }
  }

  return (
    <form className="mt-8 space-y-8" onSubmit={onSubmit}>
      <section className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
        <h2 className="text-4xl text-[#0b4f7d]">{labels.generalPreferences}</h2>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#232a33]">{labels.interfaceLanguage}</p>
            <p className="text-xs text-[#6a7381]">{labels.languageHelp}</p>
          </div>
          <select
            value={language}
            onChange={(event) => {
              const nextLanguage = event.target.value as "en" | "el";
              setLanguage(nextLanguage);
              const params = new URLSearchParams(searchParams.toString());
              params.set("lang", nextLanguage);
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className="h-10 rounded border border-[#b9c0ca] bg-[#f2f0ea] px-3 text-sm"
          >
            <option value="en">English</option>
            <option value="el">Greek</option>
          </select>
        </div>
      </section>

      <section className="rounded-md border border-[#d8d4cb] border-t-[3px] border-t-[#c69e14] bg-[#f8f7f4] p-6">
        <h2 className="text-4xl text-[#0b4f7d]">{labels.aiIntegration}</h2>

        <div className="mt-8 space-y-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">{labels.enableAi}</p>
              <p className="text-xs text-[#6a7381]">{labels.enableAiHelp}</p>
            </div>
            <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(event) => setAiEnabled(event.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-[#d0d6df] peer-checked:bg-[#0b4f7d]" />
              <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </div>

          <div>
            <p className="text-sm font-semibold">{labels.geminiKey}</p>
            <p className="mb-2 text-xs text-[#6a7381]">{labels.geminiKeyHelp}</p>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(event) => setGeminiApiKey(event.target.value)}
              placeholder={placeholder}
              className="h-11 w-full rounded border border-[#b9c0ca] bg-[#f2f0ea] px-3 text-sm"
            />
          </div>
        </div>
      </section>

      {error ? <p className="text-sm text-[#b02a37]">{error}</p> : null}
      {message ? <p className="text-sm text-[#0f6b45]">{message}</p> : null}

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onDisconnect}
          disabled={saving || disconnecting}
          className="rounded border border-[#b02a37] px-8 py-3 text-sm font-semibold text-[#b02a37] disabled:opacity-50"
        >
          {disconnecting ? labels.disconnecting : labels.disconnect}
        </button>
        <button
          type="submit"
          disabled={saving || disconnecting}
          className="rounded bg-[#0b4f7d] px-8 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? labels.saving : labels.saveSettings}
        </button>
      </div>
    </form>
  );
}
