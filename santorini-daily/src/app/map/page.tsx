export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { prisma } from "@/lib/prisma";

export default async function MapPage() {
  const places = await prisma.place.findMany({ orderBy: { titleEn: "asc" } });

  return (
    <SiteShell>
      <h1 className="mb-6 text-4xl font-semibold text-[var(--color-primary)]">Interactive Map</h1>
      <p className="mb-6 text-[var(--color-on-surface-variant)]">Leaflet integration placeholder with all mapped locations.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {places.map((place) => (
          <article key={place.id} className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
            <h2 className="text-xl font-semibold text-[var(--color-primary)]">{place.titleEn}</h2>
            <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">{place.descriptionEn}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-secondary)]">
              {place.category} • {place.latitude.toFixed(3)}, {place.longitude.toFixed(3)}
            </p>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
