import Link from "next/link";
import Image from "next/image";

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
    <section className="relative overflow-hidden bg-cream pt-[72px]">
      {/* subtle warm wash — kept gentle and cohesive */}
      <div className="pointer-events-none absolute -right-40 -top-32 h-96 w-96 rounded-full bg-amber/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 -bottom-24 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />

      <div
        className={`container-x relative gap-10 py-8 sm:py-10 ${
          image ? "grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""
        }`}
      >
        <div>
          <nav className="mb-5 flex items-center gap-2 text-xs text-ink/50">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-ink/80">{crumb ?? eyebrow}</span>
          </nav>

          <p className="eyebrow">{eyebrow}</p>
          <div className="mt-3 h-px w-14 bg-gradient-to-r from-gold to-transparent" />

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl leading-relaxed text-ink/60">{subtitle}</p>}
        </div>

        {image && (
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card ring-4 ring-white">
              <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 45vw" priority />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
