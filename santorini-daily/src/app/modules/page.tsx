export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Signal, Star } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

type EraFilter = "bronze-age" | "hellenistic" | "culture-modern";

const moduleImages: Record<string, string> = {
  history: "/images/AncientAkrotiriModuleImage.png",
  volcano: "/images/volcanicCalderaModuleImage.png",
  culture: "/images/TraditionalModuleImage.png",
};

const moduleEraMap: Record<string, EraFilter[]> = {
  history: ["bronze-age", "hellenistic"],
  volcano: ["bronze-age"],
  culture: ["culture-modern"],
};

const eraFilters: Array<{ value: EraFilter | null; labelKey: string }> = [
  { value: null, labelKey: "all_eras" },
  { value: "bronze-age", labelKey: "bronze_age" },
  { value: "hellenistic", labelKey: "hellenistic" },
  { value: "culture-modern", labelKey: "culture_modern" },
];

function normalizeEra(input: string | undefined): EraFilter | null {
  return input === "bronze-age" || input === "hellenistic" || input === "culture-modern" ? input : null;
}

function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export default async function ModulesPage({ searchParams }: { searchParams: Promise<{ lang?: string; era?: string }> }) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const lang = resolveLanguage(user?.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];
  const selectedEra = normalizeEra(params.era);
  const modules = await prisma.module.findMany({
    orderBy: { orderIndex: "asc" },
    include: { progress: { where: { userId: user?.id ?? "__anonymous__" }, take: 1 } },
  });
  const filteredModules = selectedEra ? modules.filter((module) => moduleEraMap[module.slug]?.includes(selectedEra)) : modules;

  function filterHref(era: EraFilter | null): string {
    const query = new URLSearchParams();
    if (params.lang) query.set("lang", params.lang);
    if (era) query.set("era", era);
    const queryString = query.toString();
    return queryString ? `/modules?${queryString}` : "/modules";
  }

  return (
    <SiteShell lang={lang}>
      <section>
        <h1 className="text-4xl leading-[0.95] text-[#0b4f7d]">{t.curated_archives}</h1>
        <p className="mt-3 max-w-[760px] text-lg text-[#4f5968]">
          {t.modules_subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2 text-xs">
          <span className="text-[#6d7683]">{t.filter_by_era}</span>
          {eraFilters.map((filter) => {
            const active = selectedEra === filter.value;
            return (
              <Link
                key={filter.value ?? "all"}
                href={filterHref(filter.value)}
                className={`rounded-full border px-3 py-1 font-medium transition ${
                  active ? "border-[#0b4f7d] bg-[#0b4f7d] text-white" : "border-[#b9c0ca] bg-[#f8f7f4] text-[#354052] hover:border-[#0b4f7d]"
                }`}
              >
                {t[filter.labelKey]}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {filteredModules.map((module) => {
          const progressRow = user ? module.progress[0] : null;
          const progress = clampProgress(progressRow?.completionPercentage ?? 0);
          const complete = Boolean(progressRow?.isCompleted) || progress >= 100;
          const started = progress > 0 && !complete;
          const ctaLabel = complete ? t.review_archive : started ? t.continue_exploration : t.start_module;
          return (
            <article key={module.id} className="flex min-h-[520px] flex-col overflow-hidden rounded-lg border border-[#d6d1c8] bg-[#f8f7f4] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="relative">
                <Image src={moduleImages[module.slug] ?? "/images/AncientAkrotiriModuleImage.png"} alt={pickLocalized(module, "titleEn", "titleEl", lang)} width={534} height={400} className="h-40 w-full object-cover" />
                {module.slug === "history" && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#dbe8f5] px-2 py-1 text-[10px] font-semibold text-[#0b4f7d]">
                    <Star className="h-3 w-3" /> {t.recommended_for_you}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="space-y-3">
                  <h2 className="line-clamp-2 min-h-[5.5rem] text-4xl leading-tight text-[#242b34]">{pickLocalized(module, "titleEn", "titleEl", lang)}</h2>
                  <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-[#606a78]">{pickLocalized(module, "descriptionEn", "descriptionEl", lang)}</p>
                </div>

                <div className="mt-auto pt-5">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-[#5e6876]">
                    <span>{t.progress}</span>
                    <span className="font-semibold text-[#0b4f7d]">{complete ? t.complete : `${progress}%`}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#d9d6cf]">
                    <div className="h-full rounded-full bg-[#0b4f7d]" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex min-h-5 items-center gap-4 text-xs text-[#5f6977]">
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {module.estimatedMinutes} mins</span>
                  <span className="inline-flex items-center gap-1"><Signal className="h-3 w-3" /> {module.difficulty}</span>
                </div>

                <Link
                  href={`/modules/${module.slug}`}
                  className={`mt-4 inline-flex w-full items-center justify-center rounded border px-4 py-2.5 text-sm font-semibold ${
                    started ? "border-[#0b4f7d] bg-[#0b4f7d] text-white" : "border-[#9db1c8] text-[#0b4f7d]"
                  }`}
                >
                  {ctaLabel}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </SiteShell>
  );
}
