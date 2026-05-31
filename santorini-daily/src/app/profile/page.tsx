export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <SiteShell>
        <h1 className="text-4xl font-semibold text-[var(--color-primary)]">Profile</h1>
        <p className="mt-3 text-[var(--color-on-surface-variant)]">Please log in to view your profile, favorites, and bookmarks.</p>
      </SiteShell>
    );
  }

  const [favorites, bookmarks] = await Promise.all([
    prisma.favorite.findMany({ where: { userId: user.id }, include: { place: true } }),
    prisma.bookmark.findMany({ where: { userId: user.id }, include: { module: true } }),
  ]);

  return (
    <SiteShell>
      <h1 className="text-4xl font-semibold text-[var(--color-primary)]">{user.name}</h1>
      <p className="mt-2 text-[var(--color-on-surface-variant)]">{user.email}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">Favorite Places</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            {favorites.map((fav) => <li key={fav.id}>• {fav.place.titleEn}</li>)}
          </ul>
        </section>
        <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">Bookmarks</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            {bookmarks.map((bookmark) => <li key={bookmark.id}>• {bookmark.module.titleEn}</li>)}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
