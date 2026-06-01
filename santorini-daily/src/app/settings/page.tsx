export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const settings = user ? await prisma.userSettings.findUnique({ where: { userId: user.id } }) : null;

  return (
    <SiteShell>
      <h1 className="text-6xl leading-[0.95] text-[#232a33]">Configuration</h1>
      <p className="mt-2 text-sm text-[#5f6977]">Manage your archival experience and AI tutor preferences.</p>

      <div className="mt-8 space-y-8">
        <section className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
          <h2 className="text-4xl text-[#0b4f7d]">General Preferences</h2>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 border-b border-[#e1ddd5] pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#232a33]">Interface Language</p>
                <p className="text-xs text-[#6a7381]">Select the primary language for archival records.</p>
              </div>
              <select defaultValue={settings?.language ?? "en"} className="h-10 rounded border border-[#b9c0ca] bg-[#f2f0ea] px-3 text-sm">
                <option value="en">English</option>
                <option value="el">Greek</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#535e6d]">
              <p className="font-semibold text-[#232a33]">Notification Preferences</p>
              <label className="inline-flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[#0b4f7d]" /> Daily Digests</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-[#0b4f7d]" /> Module Reminders</label>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-[#d8d4cb] border-t-[3px] border-t-[#c69e14] bg-[#f8f7f4] p-6">
          <h2 className="text-4xl text-[#0b4f7d]">AI Tutor Integration</h2>

          <div className="mt-8 space-y-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Enable AI Tutor</p>
                <p className="text-xs text-[#6a7381]">Enable personalized learning assistance powered by Gemini AI.</p>
              </div>
              <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
                <input type="checkbox" defaultChecked={settings?.aiEnabled ?? false} className="peer sr-only" />
                <span className="h-6 w-11 rounded-full bg-[#d0d6df] peer-checked:bg-[#0b4f7d]" />
                <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
              </label>
            </div>

            <div>
              <p className="text-sm font-semibold">Gemini API Key</p>
              <p className="mb-2 text-xs text-[#6a7381]">Your key is stored securely locally.</p>
              <input
                type="password"
                defaultValue={settings?.geminiApiKeyEncrypted ?? "AIzaSy..."}
                placeholder="AIzaSy..."
                className="h-11 w-full rounded border border-[#b9c0ca] bg-[#f2f0ea] px-3 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
          <h2 className="text-4xl text-[#0b4f7d]">Accessibility</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded bg-[#f2f0ea] p-4">
              <p className="text-sm font-semibold">High Contrast</p>
              <p className="mt-1 text-xs text-[#6a7381]">Increase contrast for improved readability.</p>
              <label className="mt-4 inline-flex h-5 w-10 items-center rounded-full bg-[#d9d6cf] p-1">
                <span className="h-3 w-3 rounded-full bg-white" />
              </label>
            </article>
            <article className="rounded bg-[#f2f0ea] p-4">
              <p className="text-sm font-semibold">Typography Scale</p>
              <p className="mt-1 text-xs text-[#6a7381]">Adjust the base font size for all text.</p>
              <div className="mt-4 flex gap-2 text-xs">
                <button type="button" className="rounded border border-[#c8cfd8] px-3 py-1">A-</button>
                <button type="button" className="rounded border border-[#c8cfd8] px-3 py-1">Default</button>
                <button type="button" className="rounded border border-[#c8cfd8] px-3 py-1">A+</button>
              </div>
            </article>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="button" className="rounded bg-[#0b4f7d] px-8 py-3 text-sm font-semibold text-white">Save Settings</button>
        </div>
      </div>
    </SiteShell>
  );
}
