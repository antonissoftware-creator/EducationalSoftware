export const dynamic = "force-dynamic";

import { BookCopy, Lightbulb, Star } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ProgressTrendChart } from "@/components/dashboard/progress-trend-chart";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const attempts = await prisma.quizAttempt.findMany({ orderBy: { completedAt: "asc" }, take: 5 });
  const average = attempts.length ? attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length : 0;
  const chart = attempts.map((item, idx) => ({ label: `Mod ${idx + 1}`, score: Math.round(item.score) }));

  return (
    <SiteShell>
      <h1 className="text-7xl text-[#0b4f7d]">Archival Progress</h1>
      <p className="mt-3 max-w-[760px] text-lg text-[#4f5968]">Track your journey through the layers of Akrotiri and your quiz consistency.</p>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_1.5fr]">
        <section className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
          <h2 className="text-5xl text-[#232a33]">Course Completion</h2>
          <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-[#0b4f7d] text-center">
            <p className="font-serif text-6xl text-[#0b4f7d]">{Math.round(average)}<span className="text-3xl">%</span></p>
          </div>
          <p className="mt-8 text-center text-sm text-[#5f6977]">You are making steady progress through foundational eras.</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <article className="rounded bg-white p-4">
              <BookCopy className="h-4 w-4 text-[#7d8795]" />
              <p className="mt-2 font-serif text-4xl">4</p>
              <p className="text-xs text-[#66707d]">COMPLETED MODULES</p>
            </article>
            <article className="rounded bg-white p-4">
              <Star className="h-4 w-4 text-[#7d8795]" />
              <p className="mt-2 font-serif text-4xl">{Math.round(average)}%</p>
              <p className="text-xs text-[#66707d]">AVG. QUIZ SCORE</p>
            </article>
          </div>
        </section>

        <div className="space-y-4">
          <article className="overflow-hidden rounded-md border border-[#d8d4cb] bg-[#f8f7f4]">
            <div className="h-20 bg-[url('/images/TraditionalOiaHeroImage.png')] bg-cover bg-center" />
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <span className="rounded border border-[#d6d1c8] px-2 py-1 text-[10px] uppercase text-[#6e7783]">UP NEXT</span>
                <h3 className="mt-2 text-5xl text-[#0b4f7d]">The Maritime Frescoes</h3>
                <p className="mt-1 text-sm text-[#6a7381]">Module 5 • Est. 45 mins</p>
              </div>
              <button type="button" className="rounded bg-[#0b4f7d] px-5 py-2.5 text-sm font-semibold text-white">Resume Study</button>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-[#2d3642]"><Lightbulb className="h-4 w-4 text-[#c69e14]" /> SUGGESTED REVIEW</h4>
              <ul className="space-y-3 text-sm text-[#4e5866]">
                <li>• Minoan Pottery Typology</li>
                <li>• Thera Eruption Timeline</li>
              </ul>
              <button type="button" className="mt-5 w-full rounded border border-[#8ca5be] px-4 py-2 text-sm font-semibold text-[#0b4f7d]">Generate Practice Quiz</button>
            </article>

            <article className="rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-4">
              <h4 className="mb-3 text-sm font-bold tracking-wide text-[#2d3642]">SCORE TREND</h4>
              <ProgressTrendChart scores={chart.length ? chart : [{ label: "Mod 1", score: 45 }, { label: "Mod 2", score: 64 }, { label: "Mod 3", score: 57 }, { label: "Mod 4", score: 78 }, { label: "Mod 5", score: 84 }]} />
            </article>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
