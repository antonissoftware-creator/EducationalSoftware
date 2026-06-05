export const dynamic = "force-dynamic";

import { BookCopy, Lightbulb, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ProgressTrendChart } from "@/components/dashboard/progress-trend-chart";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

const moduleImages: Record<string, string> = {
  history: "/images/AncientAkrotiriModuleImage.png",
  volcano: "/images/volcanicCalderaModuleImage.png",
  culture: "/images/TraditionalModuleImage.png",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fdashboard");
  const params = await searchParams;
  const lang = resolveLanguage(user.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];

  const modules = await prisma.module.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      progress: { where: { userId: user.id }, take: 1 },
      quizzes: {
        where: { type: "module" },
        include: {
          attempts: {
            where: { userId: user.id, completedAt: { not: null } },
            orderBy: { completedAt: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  const moduleSummaries = modules.map((learningModule) => {
    const progress = learningModule.progress[0] ?? null;
    const latestAttempt = learningModule.quizzes.flatMap((quiz) => quiz.attempts)[0] ?? null;

    return {
      id: learningModule.id,
      slug: learningModule.slug,
      title: pickLocalized(learningModule, "titleEn", "titleEl", lang),
      description: pickLocalized(learningModule, "descriptionEn", "descriptionEl", lang),
      orderIndex: learningModule.orderIndex,
      estimatedMinutes: learningModule.estimatedMinutes,
      progress: Math.round(progress?.completionPercentage ?? 0),
      isCompleted: progress?.isCompleted ?? false,
      quizScore: latestAttempt ? Math.round(latestAttempt.score) : 0,
      hasQuizScore: Boolean(latestAttempt),
    };
  });

  const scoredModules = moduleSummaries.filter((module) => module.hasQuizScore);
  const average = scoredModules.length ? scoredModules.reduce((sum, item) => sum + item.quizScore, 0) / scoredModules.length : 0;
  const chart = moduleSummaries.map((module) => ({ label: `M${module.orderIndex}`, score: module.quizScore }));
  const completedModules = moduleSummaries.filter((row) => row.isCompleted).length;
  const nextModule = moduleSummaries.find((module) => !module.isCompleted) ?? moduleSummaries[moduleSummaries.length - 1];
  const reviewModules = moduleSummaries
    .filter((module) => !module.isCompleted || module.quizScore < 70)
    .sort((a, b) => a.progress - b.progress || a.quizScore - b.quizScore)
    .slice(0, 2);
  const moduleEstimate = nextModule
    ? lang === "el"
      ? `Ενότητα ${nextModule.orderIndex} • Εκτ. ${nextModule.estimatedMinutes} λεπτά`
      : `Module ${nextModule.orderIndex} • Est. ${nextModule.estimatedMinutes} mins`
    : "";

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
            <div
              className="h-20 bg-cover bg-center"
              style={{ backgroundImage: nextModule ? `url('${moduleImages[nextModule.slug] ?? "/images/AncientAkrotiriModuleImage.png"}')` : undefined }}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <span className="rounded border border-[#d6d1c8] px-2 py-1 text-[10px] uppercase text-[#6e7783]">{t.up_next}</span>
                <h3 className="mt-2 text-4xl text-[#0b4f7d]">{nextModule?.title}</h3>
                <p className="mt-1 text-sm text-[#6a7381]">{moduleEstimate}</p>
              </div>
              {nextModule ? (
                <Link href={`/modules/${nextModule.slug}`} className="rounded bg-[#0b4f7d] px-5 py-2.5 text-sm font-semibold text-white">
                  {t.resume_study}
                </Link>
              ) : null}
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-[#2d3642]"><Lightbulb className="h-4 w-4 text-[#c69e14]" /> {t.suggested_review}</h4>
              <ul className="space-y-3 text-sm text-[#4e5866]">
                {(reviewModules.length ? reviewModules : moduleSummaries.slice(0, 2)).map((module) => (
                  <li key={module.id}>• {module.title}</li>
                ))}
              </ul>
              <Link href="/ai-tutor" className="mt-5 inline-flex w-full justify-center rounded border border-[#8ca5be] px-4 py-2 text-sm font-semibold text-[#0b4f7d]">{t.generate_practice}</Link>
            </article>

            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-3 text-sm font-bold tracking-wide text-[#2d3642]">{t.score_trend}</h4>
              <ProgressTrendChart scores={chart} />
            </article>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
