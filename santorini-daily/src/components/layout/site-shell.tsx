import Link from "next/link";

const nav = [
  ["/", "Home"],
  ["/modules", "Modules"],
  ["/map", "Map"],
  ["/dashboard", "Dashboard"],
  ["/profile", "Profile"],
  ["/settings", "Settings"],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)]">
      <header className="border-b border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
          <Link href="/" className="font-serif text-2xl font-bold text-[var(--color-primary)]">
            Santorini Daily
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-16 md:py-12">{children}</main>
    </div>
  );
}
