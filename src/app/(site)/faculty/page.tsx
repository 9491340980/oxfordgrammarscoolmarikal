"use client";

import Image from "next/image";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

export default function FacultyPage() {
  const { faculty, content: c } = useSite();

  return (
    <>
      <DocTitle text="Faculty" />
      <PageHero
        eyebrow="Our People"
        title="Teachers who know every child by name."
        subtitle={`${c["disc.totalTeachers"]} mentors and coaches, a teacher–student ratio of ${c["disc.ratio"]}, and a shared belief in every child.`}
      />

      <section className="section bg-cream">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <article className="card group h-full overflow-hidden text-center">
                <div className="relative aspect-square overflow-hidden">
                  {f.photoUrl ? (
                    <Image src={f.photoUrl} alt={f.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                  ) : (
                    <div className="grid h-full place-items-center bg-ink-950 text-3xl text-gold-light">
                      {f.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink">{f.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gold">{f.designation}</p>
                  <p className="mt-2 text-xs text-ink/50">{f.qualification}{f.subject && ` · ${f.subject}`}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
