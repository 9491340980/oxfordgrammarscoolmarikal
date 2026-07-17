"use client";

import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import DocTitle from "@/components/DocTitle";

export default function ContactPage() {
  const { content: c } = useSite();
  return (
    <>
      <DocTitle text="Contact" />
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        subtitle="Questions about admissions, a campus visit, or anything else — reach out and we'll respond quickly."
      />

      <section className="section bg-cream">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-6">
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Visit us</h3>
              <p className="mt-2 text-ink/70">{c["contact.address"]}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Call us</h3>
              <p className="mt-2"><a href={`tel:${c["contact.phone"]}`} className="text-ink/70 hover:text-gold">{c["contact.phone"]}</a></p>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Email us</h3>
              <p className="mt-2"><a href={`mailto:${c["contact.email"]}`} className="text-ink/70 hover:text-gold">{c["contact.email"]}</a></p>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Follow us</h3>
              <div className="mt-2 flex gap-4 text-sm">
                <a href={c["social.instagram"]} className="text-ink/70 hover:text-gold">Instagram</a>
                <a href={c["social.facebook"]} className="text-ink/70 hover:text-gold">Facebook</a>
                <a href={c["social.youtube"]} className="text-ink/70 hover:text-gold">YouTube</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-7">
              <h3 className="font-display text-2xl font-semibold text-ink">Send us a message</h3>
              <p className="mt-1 text-sm text-ink/60">Fill in the form and we&apos;ll get back to you shortly.</p>
              <div className="mt-6">
                <EnquiryForm accessKey={c["forms.accessKey"]} toEmail={c["contact.email"]} />
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10">
              <iframe
                src={c["contact.mapUrl"]}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School location map"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
