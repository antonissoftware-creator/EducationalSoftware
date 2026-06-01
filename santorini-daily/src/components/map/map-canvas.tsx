"use client";

import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import Image from "next/image";

type PlaceItem = {
  id: string;
  titleEn: string;
  descriptionEn: string;
  category: string;
  latitude: number;
  longitude: number;
};

const colorByCategory: Record<string, string> = {
  history: "#c69e14",
  volcano: "#0b4f7d",
  villages: "#2e7b66",
};

const categories = ["all", "history", "volcano", "villages"] as const;

function markerIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:20px;height:20px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

export function MapCanvas({ places }: { places: PlaceItem[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("all");

  const visible = useMemo(() => {
    if (activeFilter === "all") return places;
    return places.filter((place) => place.category === activeFilter);
  }, [places, activeFilter]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer center={[36.41, 25.43]} zoom={11} className="h-full w-full">
        <TileLayer
          attribution='&copy; Esri, Maxar, Earthstar Geographics'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {visible.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={markerIcon(colorByCategory[place.category] ?? "#0b4f7d")}
          >
            <Popup minWidth={260}>
              <div className="space-y-3">
                <Image src="/images/AncientAkrotiriHeroImage.png" alt={place.titleEn} width={760} height={374} className="h-32 w-full rounded object-cover" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7a6841]">{place.category}</p>
                  <h3 className="text-lg font-semibold text-[#1f252d]">{place.titleEn}</h3>
                  <p className="mt-1 text-sm text-[#4b5562]">{place.descriptionEn}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7b8592]">Curated Site</span>
                  <Link href="/modules/history" className="rounded bg-[#0b4f7d] px-3 py-2 text-xs font-semibold text-white">
                    Learn More
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute right-4 top-4 z-[500] rounded-md bg-white/95 p-3 shadow">
        <p className="mb-2 text-[11px] font-bold tracking-wide text-[#535d6b]">FILTER VIEW</p>
        <div className="space-y-1.5 text-xs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className="flex items-center gap-2"
            >
              <span
                className="h-3 w-3 rounded-full border border-[#9ba3af]"
                style={{
                  background:
                    category === "all" ? "#0f172a" : colorByCategory[category] ?? "#ffffff",
                  opacity: activeFilter === category ? 1 : 0.4,
                }}
              />
              <span className="capitalize">{category === "all" ? "All Sites" : category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
