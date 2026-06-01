export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Signal, Star } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

const images = [
  "/images/AncientAkrotiriModuleImage.png",
  "/images/volcanicCalderaModuleImage.png",
  "/images/TraditionalModuleImage.png",
];

export default async function ModulesPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const lang = resolveLanguage(user?.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];
  const modules = await prisma.module.findMany({ orderBy: { orderIndex: "asc" }, include: { progress: true } });

  return (
    <SiteShell lang={lang}>
      <section>
        <h1 className="text-4xl leading-[0.95] text-[#0b4f7d]">{t.curated_archives}</h1>
        <p className="mt-3 max-w-[760px] text-lg text-[#4f5968]">
          {t.modules_subtitle}
        </p>

        <div className="mt-6 flex items-center justify-end gap-2 text-xs">
          <span className="text-[#6d7683]">{t.filter_by_era}</span>
          <span className="rounded-full border border-[#b9c0ca] bg-[#f8f7f4] px-3 py-1">{t.bronze_age}</span>
          <span className="rounded-full border border-[#b9c0ca] bg-[#f8f7f4] px-3 py-1">{t.hellenistic}</span>
        </div>
      </section>

      <section className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module, index) => {
          const progress = Math.round(module.progress[0]?.completionPercentage ?? 0);
          const complete = progress >= 100;
          return (
            <article key={module.id} className="overflow-hidden rounded-lg border border-[#d6d1c8] bg-[#f8f7f4] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="relative">
                <Image src={images[index % images.length]} alt={pickLocalized(module, "titleEn", "titleEl", lang)} width={534} height={400} className="h-40 w-full object-cover" />
                {index === 0 && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#dbe8f5] px-2 py-1 text-[10px] font-semibold text-[#0b4f7d]">
                    <Star className="h-3 w-3" /> {t.recommended_for_you}
                  </div>
                )}
              </div>
              <div className="space-y-4 p-4">
                <h2 className="text-4xl leading-tight text-[#242b34]">{pickLocalized(module, "titleEn", "titleEl", lang)}</h2>
                <p className="line-clamp-3 text-sm text-[#606a78]">{pickLocalized(module, "descriptionEn", "descriptionEl", lang)}</p>

                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-[#5e6876]">
                    <span>{t.progress}</span>
                    <span className="font-semibold text-[#0b4f7d]">{complete ? t.complete : `${progress}%`}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#d9d6cf]">
                    <div className="h-full rounded-full bg-[#0b4f7d]" style={{ width: `${Math.max(6, progress)}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#5f6977]">
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {module.estimatedMinutes} mins</span>
                  <span className="inline-flex items-center gap-1"><Signal className="h-3 w-3" /> {module.difficulty}</span>
                </div>

                <Link
                  href={`/modules/${module.slug}`}
                  className={`inline-flex w-full items-center justify-center rounded border px-4 py-2.5 text-sm font-semibold ${
                    index === 0 ? "border-[#0b4f7d] bg-[#0b4f7d] text-white" : "border-[#9db1c8] text-[#0b4f7d]"
                  }`}
                >
                  {index === 0 ? t.continue_exploration : complete ? t.review_archive : t.start_module}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </SiteShell>
  );
}
