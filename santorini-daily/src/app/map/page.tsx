"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";

const MapCanvas = dynamicImport(() => import("@/components/map/map-canvas").then((m) => m.MapCanvas), {
  ssr: false,
  loading: () => <div className="h-[540px] animate-pulse rounded-md bg-[#d8d4cb]" />,
});

type PlaceItem = {
  id: string;
  titleEn: string;
  descriptionEn: string;
  category: string;
  latitude: number;
  longitude: number;
};

export default function MapPage() {
  const [places, setPlaces] = useState<PlaceItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/places")
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
  }, []);

  return <SiteShell>{places.length ? <MapCanvas places={places} /> : <div className="h-[540px] animate-pulse rounded-md bg-[#d8d4cb]" />}</SiteShell>;
}
