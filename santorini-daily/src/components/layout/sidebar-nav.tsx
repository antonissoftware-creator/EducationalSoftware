"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Gauge, Home, MapPinned, Settings, Sparkles } from "lucide-react";
import clsx from "clsx";

type SidebarNavProps = {
  labels: {
    home: string;
    modules: string;
    map: string;
    progress: string;
    settings: string;
    aiTutorConsult: string;
  };
};

export function SidebarNav({ labels }: SidebarNavProps) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: labels.home, icon: Home },
    { href: "/modules", label: labels.modules, icon: BookOpenText },
    { href: "/map", label: labels.map, icon: MapPinned },
    { href: "/dashboard", label: labels.progress, icon: Gauge },
    { href: "/settings", label: labels.settings, icon: Settings },
  ] as const;

  return (
    <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 border-r border-[#d9d6cf] bg-[#f2f0ea] lg:flex lg:flex-col">
      <div className="px-6 py-6">
        <Link href="/" className="font-serif text-[28px] leading-none text-[#0b4f7d]">
          Santorini Daily
        </Link>
      </div>

      <nav className="space-y-1 px-2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex items-center gap-3 rounded-md px-3 py-3 text-[13px] font-medium transition-colors",
                active ? "bg-[#dedcd6] text-[#0b4f7d]" : "text-[#2e3742] hover:bg-[#e9e6de]"
              )}
            >
              {active && <span className="absolute inset-y-2 right-0 w-[3px] rounded-l bg-[#c69e14]" />}
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded bg-[#00426d] px-3 py-2 text-xs font-medium text-white"
        >
          <Sparkles className="h-3.5 w-3.5" /> {labels.aiTutorConsult}
        </button>
      </div>
    </aside>
  );
}
