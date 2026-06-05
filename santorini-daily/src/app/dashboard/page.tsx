export const dynamic = "force-dynamic";

import { BookCopy, Lightbulb, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ProgressTrendChart } from "@/components/dashboard/progress-trend-chart";
import { getCurrentUser } from "@/lib/auth";
import { resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fdashboard");
  const params = await searchParams;
  const lang = resolveLanguage(user.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId: user.id, completedAt: { not: null } },
    orderBy: { completedAt: "asc" },
    take: 5,
  });
  const progressRows = await prisma.progress.findMany({ where: { userId: user.id } });

  const average = attempts.length ? attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length : 0;
  const chart = attempts.map((item, idx) => ({ label: `Mod ${idx + 1}`, score: Math.round(item.score) }));
  const completedModules = progressRows.filter((row) => row.isCompleted).length;

  return (
    <SiteShell lang={lang}>
      <h1 className="text-4xl text-[#0b4f7d]">{t.dashboard_title}</h1>
      <p className="mt-3 max-w-[760px] text-lg text-[#4f5968]">{t.dashboard_subtitle}</p>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_1.5fr]">
        <section className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
          <h2 className="text-4xl text-[#232a33]">{t.course_completion}</h2>
          <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-[#0b4f7d] text-center">
            <p className="font-serif text-4xl text-[#0b4f7d]">{Math.round(average)}<span className="text-3xl">%</span></p>
          </div>
          <p className="mt-8 text-center text-sm text-[#5f6977]">{t.dashboard_steady}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <article className="rounded bg-white p-4">
              <BookCopy className="h-4 w-4 text-[#7d8795]" />
              <p className="mt-2 font-serif text-4xl">{completedModules}</p>
              <p className="text-xs text-[#66707d]">{t.completed_modules}</p>
            </article>
            <article className="rounded bg-white p-4">
              <Star className="h-4 w-4 text-[#7d8795]" />
              <p className="mt-2 font-serif text-4xl">{Math.round(average)}%</p>
              <p className="text-xs text-[#66707d]">{t.avg_quiz_score}</p>
            </article>
          </div>
        </section>

        <div className="space-y-4">
          <article className="overflow-hidden rounded-md border border-[#d8d4cb] bg-[#f8f7f4]">
            <div className="h-20 bg-[url('/images/TraditionalOiaHeroImage.png')] bg-cover bg-center" />
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <span className="rounded border border-[#d6d1c8] px-2 py-1 text-[10px] uppercase text-[#6e7783]">{t.up_next}</span>
                <h3 className="mt-2 text-4xl text-[#0b4f7d]">{t.maritime}</h3>
                <p className="mt-1 text-sm text-[#6a7381]">{t.module_est}</p>
              </div>
              <button type="button" className="rounded bg-[#0b4f7d] px-5 py-2.5 text-sm font-semibold text-white">{t.resume_study}</button>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-[#2d3642]"><Lightbulb className="h-4 w-4 text-[#c69e14]" /> {t.suggested_review}</h4>
              <ul className="space-y-3 text-sm text-[#4e5866]">
                <li>• {t.pottery}</li>
                <li>• {t.timeline}</li>
              </ul>
              <Link href="/ai-tutor" className="mt-5 inline-flex w-full justify-center rounded border border-[#8ca5be] px-4 py-2 text-sm font-semibold text-[#0b4f7d]">{t.generate_practice}</Link>
            </article>

            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-3 text-sm font-bold tracking-wide text-[#2d3642]">{t.score_trend}</h4>
              <ProgressTrendChart scores={chart.length ? chart : [{ label: "Mod 1", score: 45 }, { label: "Mod 2", score: 64 }, { label: "Mod 3", score: 57 }, { label: "Mod 4", score: 78 }, { label: "Mod 5", score: 84 }]} />
            </article>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
