import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-[72px] text-cream">
      {/* layered decorative glows + fine grid */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-300/5 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at top right, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black, transparent 70%)",
        }}
      />

      <div className="container-x relative py-14 sm:py-20">
        <nav className="mb-6 flex items-center gap-2 text-xs text-cream/50">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <span className="text-cream/80">{crumb ?? eyebrow}</span>
        </nav>

        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-3 h-px w-14 bg-gradient-to-r from-gold to-transparent" />

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/60">{subtitle}</p>}
      </div>

      {/* smooth transition into the page below */}
      <div className="h-10 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
