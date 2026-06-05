import Link from "next/link";
import { CircleUserRound, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import type { Language } from "@/lib/i18n";
import { uiText } from "@/lib/translations";

type SiteShellProps = {
  children: React.ReactNode;
  variant?: "home" | "app";
  fullBleed?: boolean;
  hideFooter?: boolean;
  lang?: Language;
};

function Footer({ compact = false, lang = "en" }: { compact?: boolean; lang?: Language }) {
  const t = uiText[lang];
  return (
    <footer className="border-t border-[#d8d4cb] bg-[#e4e1da]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-10 text-xs text-[#586271] md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-[34px] leading-none text-[#0b4f7d]">Santorini Daily</p>
          <p className="mt-2">{t.footer_rights}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <span>{t.footer_terms}</span>
          <span>{t.footer_privacy}</span>
          <span>{t.footer_sources}</span>
          <span>{t.footer_credits}</span>
        </div>
      </div>
      {!compact && <div className="h-2" />}
    </footer>
  );
}

function HomeTopBar({ lang = "en" }: { lang?: Language }) {
  const t = uiText[lang];
  return (
    <header className="border-b border-[#d8d4cb] bg-[#f2f0ea]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 md:px-9">
        <Link href="/" className="font-serif text-[34px] leading-none text-[#0b4f7d]">
          Santorini Daily
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/ai-tutor" className="rounded-lg bg-[#0b4f7d] px-4 py-2 text-sm font-medium text-white">
            {t.ai_tutor}
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileTopNav({ lang = "en" }: { lang?: Language }) {
  const t = uiText[lang];
  return (
    <div className="border-b border-[#d8d4cb] bg-[#f2f0ea] px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-serif text-[30px] leading-none text-[#0b4f7d]">
          Santorini Daily
        </Link>
        <Link href="/ai-tutor" className="inline-flex items-center gap-2 rounded bg-[#00426d] px-3 py-2 text-xs text-white">
          <Sparkles className="h-3.5 w-3.5" /> {t.ai_tutor}
        </Link>
      </div>
      <nav className="mt-3 flex flex-wrap gap-3 text-xs text-[#2e3742]">
        <Link href="/">{t.nav_home}</Link>
        <Link href="/modules">{t.nav_modules}</Link>
        <Link href="/map">{t.nav_map}</Link>
        <Link href="/dashboard">{t.nav_progress}</Link>
        <Link href="/settings">{t.nav_settings}</Link>
      </nav>
    </div>
  );
}

export function SiteShell({ children, variant = "app", fullBleed = false, hideFooter = false, lang = "en" }: SiteShellProps) {
  const t = uiText[lang];
  if (variant === "home") {
    return (
      <div className="min-h-screen bg-[#f2f0ea] text-[#1e252c]">
        <HomeTopBar lang={lang} />
        <main className="mx-auto w-full max-w-[1280px] px-6 py-7 md:px-9 md:py-10">{children}</main>
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f0ea] text-[#1e252c] lg:flex">
      <SidebarNav labels={{ home: t.nav_home, modules: t.nav_modules, map: t.nav_map, progress: t.nav_progress, settings: t.nav_settings, aiTutorConsult: t.ai_tutor_consult }} />
      <div className="min-w-0 flex flex-1 flex-col justify-between">
        <MobileTopNav lang={lang} />
        <main className={fullBleed ? "w-full flex-1" : "mx-auto w-full max-w-[1040px] px-5 py-8 md:px-10 md:py-12"}>{children}</main>
        {!hideFooter && <Footer compact lang={lang} />}
      </div>
    </div>
  );
}
