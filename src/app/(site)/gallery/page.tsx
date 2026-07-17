"use client";

import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import DocTitle from "@/components/DocTitle";

export default function GalleryPage() {
  const { gallery: images } = useSite();
  return (
    <>
      <DocTitle text="Gallery" />
      <PageHero
        eyebrow="Gallery"
        title="Life at Oxford Grammar School."
        subtitle="Classrooms, labs, fields and celebrations — a glimpse of everyday joy on campus."
      />
      <section className="section bg-cream">
        <div className="container-x">
          {images.length ? (
            <GalleryGrid images={images} />
          ) : (
            <p className="text-ink/60">Photos coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
