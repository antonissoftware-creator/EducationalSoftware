"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { uiText } from "@/lib/translations";
import type { Language } from "@/lib/i18n";

const MapCanvas = dynamicImport(() => import("@/components/map/map-canvas").then((m) => m.MapCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#d8d4cb]" />,
});

type PlaceItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  moduleSlug: string;
};

export default function MapPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = useMemo(() => uiText[lang], [lang]);
  const [places, setPlaces] = useState<PlaceItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data?.language === "el") setLang("el");
      })
      .catch(() => {});

    fetch(`/api/places?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setPlaces(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setPlaces([]);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  return (
    <SiteShell fullBleed lang={lang}>
      {places.length ? <MapCanvas places={places} labels={{ learnMore: t.map_learn_more, curatedSite: t.map_curated_site, filterView: t.map_filter_view, allSites: t.map_all_sites }} /> : <div className="h-full w-full animate-pulse bg-[#d8d4cb]" />}
    </SiteShell>
  );
}
