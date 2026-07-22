import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb?: string;
  /** Optional right-hand visual. Without it the hero renders compact. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-soft/50 via-cream to-white pt-[72px]">
      {/* animated warm colour wash */}
      <div className="pointer-events-none absolute -right-40 -top-28 h-96 w-96 animate-blob rounded-full bg-amber/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 animate-blob rounded-full bg-coral/20 blur-3xl" style={{ animationDelay: "4s" }} />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-64 w-64 animate-blob rounded-full bg-leaf/15 blur-3xl" style={{ animationDelay: "8s" }} />

      <div
        className={`container-x relative gap-10 py-8 sm:py-10 ${
          image ? "grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""
        }`}
      >
        <div>
          <Reveal y={12}>
            <nav className="mb-5 flex items-center gap-2 text-xs text-ink/50">
              <Link href="/" className="hover:text-gold">Home</Link>
              <span>/</span>
              <span className="text-ink/80">{crumb ?? eyebrow}</span>
            </nav>
          </Reveal>

          <Reveal y={14} delay={0.06}>
            <p className="eyebrow">{eyebrow}</p>
            <div className="mt-3 h-px w-14 bg-gradient-to-r from-gold to-transparent" />
          </Reveal>

          <Reveal y={18} delay={0.12}>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal y={18} delay={0.18}>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink/60">{subtitle}</p>
            </Reveal>
          )}
        </div>

        {image && (
          <Reveal y={24} delay={0.1} className="relative">
            <div className="absolute -inset-3 -rotate-2 animate-float-slow rounded-[2.2rem] bg-gradient-to-br from-coral/25 via-amber/20 to-leaf/20" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card ring-4 ring-white">
              <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 45vw" priority />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
