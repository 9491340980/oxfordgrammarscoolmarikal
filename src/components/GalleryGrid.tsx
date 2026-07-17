"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Img = { id: string; title: string; category: string; url: string };

export default function GalleryGrid({ images }: { images: Img[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  );
  const [active, setActive] = useState("All");
  const shown = active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === cat ? "bg-ink text-cream" : "border border-ink/15 text-ink/70 hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map((g) => (
          <figure key={g.id} className="group relative break-inside-avoid overflow-hidden rounded-2xl">
            <Image
              src={g.url}
              alt={g.title}
              width={600}
              height={450}
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink-950/85 to-transparent p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">{g.category}</span>
              <p className="text-sm font-semibold text-cream">{g.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
