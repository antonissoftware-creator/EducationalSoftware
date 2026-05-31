export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

const sideImages = [
  "/images/volcanicCalderaHeroImage.png",
  "/images/TraditionalOiaHeroImage.png",
];

export default async function HomePage() {
  const modules = await prisma.module.findMany({ orderBy: { orderIndex: "asc" }, take: 3 });

  return (
    <SiteShell variant="home">
      <section className="relative overflow-hidden rounded-md border border-[#d3cfc6]">
        <Image
          src="/images/heroSectionImage.png"
          alt="Santorini panorama"
          width={1152}
          height={716}
          className="h-[520px] w-full object-cover md:h-[620px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-[520px] flex-col items-center px-5 text-center text-white md:bottom-12">
          <h1 className="text-6xl leading-none md:text-7xl">Santorini Daily</h1>
          <p className="mt-4 text-sm text-[#f1eee8] md:text-xl">Your digital guide to the history, culture, and wonders of the Aegean.</p>
          <Link href="/modules" className="mt-6 inline-flex items-center gap-2 rounded bg-[#0b4f7d] px-8 py-3 text-sm font-semibold">
            Start Exploring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between border-b border-[#d8d4cb] pb-4">
          <div>
            <h2 className="text-6xl text-[#232a33]">Curated Collections</h2>
            <p className="mt-2 text-sm text-[#5f6876]">Explore the depths of Aegean heritage.</p>
          </div>
          <Link href="/modules" className="text-xs font-semibold text-[#0b4f7d]">View Archive</Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2.1fr_1fr]">
          {modules[0] ? (
            <article className="overflow-hidden rounded-md border border-[#d8d4cb] bg-[#f8f7f4]">
              <Image
                src="/images/AncientAkrotiriHeroImage.png"
                alt={modules[0].titleEn}
                width={760}
                height={374}
                className="h-[250px] w-full object-cover md:h-[340px]"
              />
              <div className="space-y-4 p-5">
                <span className="inline-flex rounded-full border border-[#d1d5dc] bg-[#eaf0f5] px-2 py-1 text-[10px] font-semibold text-[#375678]">Bronze Age</span>
                <h3 className="text-5xl text-[#232a33]">{modules[0].titleEn.split(" of ")[0]}</h3>
                <p className="text-sm text-[#5d6775]">{modules[0].descriptionEn}</p>
                <Link href={`/modules/${modules[0].slug}`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b4f7d]">
                  Begin Module <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ) : null}

          <div className="grid gap-4">
            {modules.slice(1).map((module, index) => (
              <article key={module.id} className="overflow-hidden rounded-md border border-[#d8d4cb] bg-[#f8f7f4]">
                <Image src={sideImages[index]} alt={module.titleEn} width={736} height={300} className="h-[136px] w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-4xl text-[#232a33]">{module.titleEn.split(",")[0]}</h3>
                  <p className="mt-2 text-xs text-[#5d6775]">{module.descriptionEn}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
