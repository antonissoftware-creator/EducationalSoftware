export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { CircleAlert, House, Mountain, MoveRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const learningModule = await prisma.module.findUnique({
    where: { slug },
    include: { sections: { orderBy: { orderIndex: "asc" } }, places: true },
  });
  if (!learningModule) notFound();

  const topPlaces = learningModule.places.slice(0, 2);

  return (
    <SiteShell>
      <div className="mb-5 text-xs text-[#6a7381]">Modules <span className="mx-1">›</span> {learningModule.titleEn}</div>

      <div className="mb-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide">
        <span className="rounded-full border border-[#ccd3dd] bg-[#eaf0f5] px-2 py-1 text-[#375678]">Bronze Age</span>
        <span className="rounded-full border border-[#ccd3dd] bg-[#edf2f7] px-2 py-1 text-[#375678]">Archaeology</span>
      </div>

      <h1 className="max-w-[730px] text-7xl leading-[0.95] text-[#232a33]">{learningModule.titleEn}</h1>
      <p className="mt-4 max-w-[760px] text-sm leading-7 text-[#5c6675]">{learningModule.descriptionEn}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <Image src="/images/Akrotiri Site View.png" alt="Akrotiri site" width={636} height={320} className="h-[320px] w-full rounded-md object-cover" />
          <div className="mt-2 inline-flex rounded border border-[#c9d0da] bg-white px-3 py-1 text-[10px] text-[#4a5462]">
            Excavation Site, Sector Alpha
          </div>
        </div>

        <aside className="space-y-3">
          <section className="rounded-md border border-[#d6d1c8] bg-[#f8f7f4] p-4">
            <h2 className="mb-3 flex items-center gap-2 text-4xl text-[#1f2833]"><CircleAlert className="h-4 w-4 text-[#0b4f7d]" /> Archival Data</h2>
            <dl className="space-y-2 text-xs text-[#54606e]">
              <div className="flex justify-between"><dt>Era</dt><dd>Late Minoan IA</dd></div>
              <div className="flex justify-between"><dt>Eruption Date</dt><dd>~1620–1500 BC</dd></div>
              <div className="flex justify-between"><dt>Discovery</dt><dd>1967 (S. Marinatos)</dd></div>
              <div className="flex justify-between"><dt>Status</dt><dd className="rounded bg-[#efe5b8] px-2 py-0.5 text-[10px] text-[#6d5a0f]">Active Site</dd></div>
            </dl>
          </section>

          <section className="rounded-md border border-[#d6d1c8] bg-[#f8f7f4] p-4">
            <h3 className="mb-2 text-4xl text-[#1f2833]">Related Locations</h3>
            <div className="space-y-2">
              {topPlaces.map((place, idx) => (
                <div key={place.id} className="flex items-center gap-3 rounded bg-[#f1eee8] p-2 text-xs text-[#46505d]">
                  {idx === 0 ? <House className="h-3.5 w-3.5 text-[#0b4f7d]" /> : <Mountain className="h-3.5 w-3.5 text-[#0b4f7d]" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#1f2833]">{place.titleEn}</p>
                    <p className="truncate">{place.descriptionEn}</p>
                  </div>
                  <MoveRight className="h-3.5 w-3.5" />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-8 rounded-md border border-[#d6d1c8] bg-[#f8f7f4] p-5">
        <h2 className="mb-3 text-5xl text-[#232a33]">Learning Objectives</h2>
        <ul className="space-y-2 text-sm text-[#525d6b]">
          <li>Understand the timeline and societal context of the Theran eruption.</li>
          <li>Identify key architectural features and urban planning systems.</li>
          <li>Analyze the significance of preserved frescoes and storage practices.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-8">
        <article>
          <h2 className="text-6xl text-[#232a33]">The Ash That Preserved Time</h2>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#596373]">{learningModule.sections[0]?.contentEn ?? "Preserved by volcanic layers, Akrotiri offers a rare intact snapshot of Bronze Age life and infrastructure."}</p>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Image src="/images/Fresco detail.png" alt="Fresco detail" width={562} height={384} className="h-[190px] w-full rounded object-cover" />
            <p className="mt-1 text-[10px] text-[#6c7683]">Detail of the Spring Fresco</p>
          </div>
          <div>
            <Image src="/images/Ancient pottery.png" alt="Ancient pottery" width={562} height={384} className="h-[190px] w-full rounded object-cover" />
            <p className="mt-1 text-[10px] text-[#6c7683]">Preserved pithoi (storage jars)</p>
          </div>
        </div>

        <article>
          <h3 className="text-6xl text-[#232a33]">Advanced Urban Planning</h3>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#596373]">{learningModule.sections[1]?.contentEn ?? "The settlement demonstrates paved streets, engineered drainage, and multi-level architecture uncommon for its period."}</p>
        </article>
      </section>

      <section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-md bg-[#0b4f7d] p-6 text-white">
        <div>
          <h3 className="text-5xl">Test Your Knowledge</h3>
          <p className="mt-1 text-sm text-[#dce8f2]">Complete the module quiz to earn your archival badge.</p>
        </div>
        <Link href={`/modules/${learningModule.slug}/quiz`} className="inline-flex items-center gap-2 rounded bg-[#5ba2dd] px-5 py-2.5 text-sm font-semibold text-[#083557]">
          Take Quiz <MoveRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteShell>
  );
}
