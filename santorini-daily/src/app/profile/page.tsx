export const dynamic = "force-dynamic";

import { SiteShell } from "@/components/layout/site-shell";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];

  if (!user) {
    return (
      <SiteShell lang={lang}>
        <h1 className="text-4xl font-semibold text-[var(--color-primary)]">{t.profile}</h1>
        <p className="mt-3 text-[var(--color-on-surface-variant)]">{t.profile_login_required}</p>
      </SiteShell>
    );
  }

  const [favorites, bookmarks] = await Promise.all([
    prisma.favorite.findMany({ where: { userId: user.id }, include: { place: true } }),
    prisma.bookmark.findMany({ where: { userId: user.id }, include: { module: true } }),
  ]);

  return (
    <SiteShell lang={lang}>
      <h1 className="text-4xl font-semibold text-[var(--color-primary)]">{user.name}</h1>
      <p className="mt-2 text-[var(--color-on-surface-variant)]">{user.email}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">{t.favorite_places}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            {favorites.map((fav) => <li key={fav.id}>• {pickLocalized(fav.place, "titleEn", "titleEl", lang)}</li>)}
          </ul>
        </section>
        <section className="rounded-lg border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] p-5">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">{t.bookmarks}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            {bookmarks.map((bookmark) => <li key={bookmark.id}>• {pickLocalized(bookmark.module, "titleEn", "titleEl", lang)}</li>)}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
