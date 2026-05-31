import Link from "next/link";
import { CircleUserRound, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";

type SiteShellProps = {
  children: React.ReactNode;
  variant?: "home" | "app";
};

function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className="mt-16 border-t border-[#d8d4cb] bg-[#e4e1da]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-10 text-xs text-[#586271] md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-[34px] leading-none text-[#0b4f7d]">Santorini Daily</p>
          <p className="mt-2">© 2024 Santorini Daily Digital Museum. All Rights Reserved.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Archival Sources</span>
          <span>Museum Credits</span>
        </div>
      </div>
      {!compact && <div className="h-2" />}
    </footer>
  );
}

function HomeTopBar() {
  return (
    <header className="border-b border-[#d8d4cb] bg-[#f2f0ea]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 md:px-9">
        <Link href="/" className="font-serif text-[34px] leading-none text-[#0b4f7d]">
          Santorini Daily
        </Link>
        <div className="flex items-center gap-3">
          <CircleUserRound className="h-5 w-5 text-[#465166]" />
          <button type="button" className="rounded-lg bg-[#0b4f7d] px-4 py-2 text-sm font-medium text-white">
            AI Tutor
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileTopNav() {
  return (
    <div className="border-b border-[#d8d4cb] bg-[#f2f0ea] px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-serif text-[30px] leading-none text-[#0b4f7d]">
          Santorini Daily
        </Link>
        <button type="button" className="inline-flex items-center gap-2 rounded bg-[#00426d] px-3 py-2 text-xs text-white">
          <Sparkles className="h-3.5 w-3.5" /> AI Tutor
        </button>
      </div>
      <nav className="mt-3 flex flex-wrap gap-3 text-xs text-[#2e3742]">
        <Link href="/">Home</Link>
        <Link href="/modules">Modules</Link>
        <Link href="/map">Map</Link>
        <Link href="/dashboard">Progress</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </div>
  );
}

export function SiteShell({ children, variant = "app" }: SiteShellProps) {
  if (variant === "home") {
    return (
      <div className="min-h-screen bg-[#f2f0ea] text-[#1e252c]">
        <HomeTopBar />
        <main className="mx-auto w-full max-w-[1280px] px-6 py-7 md:px-9 md:py-10">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f0ea] text-[#1e252c] lg:flex">
      <SidebarNav />
      <div className="min-w-0 flex-1">
        <MobileTopNav />
        <main className="mx-auto w-full max-w-[1040px] px-5 py-8 md:px-10 md:py-12">{children}</main>
        <Footer compact />
      </div>
    </div>
  );
}
