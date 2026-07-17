"use client";

import { useState } from "react";

/**
 * Static-friendly enquiry form (no backend).
 * - If `accessKey` (a free Web3Forms key) is set, submissions are emailed via web3forms.com.
 * - Otherwise it falls back to opening the visitor's email app addressed to `toEmail`.
 */
export default function EnquiryForm({
  dark = false,
  accessKey = "",
  toEmail = "",
}: {
  dark?: boolean;
  accessKey?: string;
  toEmail?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // No Web3Forms key configured → fall back to a mailto: link.
    if (!accessKey) {
      const subject = encodeURIComponent("Admission enquiry — website");
      const body = encodeURIComponent(
        `Name: ${data.name || ""}\nPhone: ${data.phone || ""}\nEmail: ${data.email || ""}\nGrade: ${data.grade || ""}\n\n${data.message || ""}`
      );
      window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      setStatus("done");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New admission enquiry — Oxford Grammar School",
          from_name: data.name,
          ...data,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={`rounded-2xl border p-6 text-center ${dark ? "border-white/20 bg-white/5 text-cream" : "border-gold/30 bg-gold-soft/40 text-ink"}`}>
        <p className="text-lg font-semibold">✓ Thank you!</p>
        <p className="mt-1 text-sm opacity-80">Our admissions team will get back to you within one working day.</p>
      </div>
    );
  }

  const inputClass = dark
    ? "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream placeholder-cream/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
    : "field";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <input name="name" required placeholder="Parent / guardian name" className={inputClass} />
      <input name="phone" required placeholder="Phone number" className={inputClass} />
      <input name="email" type="email" placeholder="Email (optional)" className={inputClass} />
      <select name="grade" className={inputClass} defaultValue="">
        <option value="" disabled>Grade of interest</option>
        <option>Nursery–KG</option>
        <option>Grade 1–5</option>
        <option>Grade 6–8</option>
        <option>Grade 9–10</option>
      </select>
      <textarea name="message" rows={3} placeholder="Anything you'd like to tell us? (optional)" className={`${inputClass} sm:col-span-2`} />
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="btn-gold w-full disabled:opacity-60">
          {status === "loading" ? "Sending…" : "Send Enquiry →"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-400">Something went wrong. Please try again or call us.</p>
        )}
      </div>
    </form>
  );
}
