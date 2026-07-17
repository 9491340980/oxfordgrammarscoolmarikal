"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, CONTENT_DOC } from "@/lib/firebase";
import { CONTENT_FIELDS } from "@/lib/content";
import raw from "../../../content.json";
import type { Content } from "@/lib/content-helpers";

const FALLBACK = raw as Content;

const SECTIONS: [keyof Content | "settings", string][] = [
  ["settings", "Site Content"],
  ["gallery", "Gallery"],
  ["news", "News & Events"],
  ["results", "Board Results"],
  ["faculty", "Faculty"],
  ["disclosureDocs", "CBSE Documents"],
];

type FieldT = "text" | "area" | "num" | "check" | "date" | "select" | "img" | "file";
const ARRAY_FIELDS: Record<string, [string, string, FieldT?, string[]?][]> = {
  gallery: [["title", "Title"], ["category", "Category"], ["url", "Image", "img"], ["sort", "Order", "num"]],
  news: [["title", "Title"], ["slug", "Slug (URL)"], ["category", "Category", "select", ["Announcement", "Event", "Achievement", "Circular"]],
    ["date", "Date", "date"], ["published", "Published", "check"], ["excerpt", "Excerpt", "area"], ["coverUrl", "Cover image", "img"], ["body", "Body", "area"]],
  results: [["year", "Year"], ["classLevel", "Class", "select", ["X", "XII"]], ["appeared", "Appeared", "num"], ["passed", "Passed", "num"], ["topperName", "Topper name"], ["topperScore", "Topper score"]],
  faculty: [["name", "Name"], ["designation", "Designation"], ["qualification", "Qualification"], ["subject", "Subject"], ["photoUrl", "Photo", "img"], ["sort", "Order", "num"]],
  disclosureDocs: [["label", "Document label"], ["fileUrl", "File (PDF/image)", "file"], ["note", "Note"], ["sort", "Order", "num"]],
};
const uid = () => "x" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export default function AdminPage() {
  const [phase, setPhase] = useState<"loading" | "login" | "editor">("loading");
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState<Content>(FALLBACK);
  const [tab, setTab] = useState<string>("settings");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) return setPhase("login");
      try {
        const cSnap = await getDoc(doc(db, CONTENT_DOC.collection, CONTENT_DOC.id));
        setContent((cSnap.exists() ? cSnap.data() : FALLBACK) as Content);
      } catch {
        /* keep fallback content */
      }
      setPhase("editor");
    });
  }, []);

  function flash(t: string) { setToast(t); setTimeout(() => setToast(""), 2500); }

  async function login(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    try { await signInWithEmailAndPassword(auth, email.trim(), pw); }
    catch { setErr("Invalid email or password."); }
    finally { setBusy(false); }
  }

  async function save() {
    setBusy(true);
    const c = { ...content };
    (c.results || []).forEach((r) => { r.passPercent = r.appeared ? Math.round((r.passed / r.appeared) * 1000) / 10 : 0; });
    try { await setDoc(doc(db, CONTENT_DOC.collection, CONTENT_DOC.id), c); flash("✓ Saved & published live"); }
    catch { flash("Save failed — check your access / connection"); }
    finally { setBusy(false); }
  }

  async function uploadImage(file: File): Promise<string> {
    const key = content.settings["media.imgbbKey"];
    if (!key) throw new Error("No ImgBB key set (Site Content → Contact). Paste an image URL instead.");
    const b64 = await new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.readAsDataURL(file); });
    const fd = new FormData(); fd.append("image", b64);
    const r = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: fd });
    const j = await r.json();
    if (!j?.data?.url) throw new Error("Upload failed");
    return j.data.url as string;
  }

  // ---------- screens ----------
  if (phase === "loading") return <Centered>Loading…</Centered>;

  if (phase === "login")
    return (
      <Centered>
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
          <div className="mb-5 flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
            <div><div className="font-display text-lg font-semibold text-ink">Oxford Grammar School</div><div className="text-xs uppercase tracking-widest text-gold">Admin</div></div>
          </div>
          <label className="field-label">Email</label>
          <input className="field mb-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label className="field-label">Password</label>
          <input className="field" type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
          <button disabled={busy} className="btn-ink mt-5 w-full">{busy ? "Signing in…" : "Sign in"}</button>
          <a href="/" className="mt-4 block text-center text-sm text-ink/50 hover:text-gold">← Back to website</a>
        </form>
      </Centered>
    );

  // ---------- editor ----------
  return (
    <div className="min-h-screen bg-cream-dark">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink/10 bg-ink-950 px-5 py-3 text-cream">
        <Image src="/logo.png" alt="" width={34} height={34} className="h-9 w-9 rounded-full bg-white object-contain" />
        <div><div className="text-sm font-semibold">Oxford Grammar School</div><div className="text-[10px] uppercase tracking-widest text-gold">{user?.email}</div></div>
        <div className="ml-auto flex items-center gap-2">
          <a href="/" target="_blank" className="rounded-lg border border-white/20 px-3 py-2 text-xs hover:bg-white/10">View site ↗</a>
          <button onClick={save} disabled={busy} className="rounded-lg bg-gold px-4 py-2 text-xs font-semibold text-ink-950">{busy ? "Saving…" : "Save & publish"}</button>
          <button onClick={() => signOut(auth)} className="rounded-lg border border-white/20 px-3 py-2 text-xs hover:bg-white/10">Sign out</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 sm:flex-row sm:p-6">
        <nav className="flex gap-1 overflow-x-auto sm:w-48 sm:flex-col">
          {SECTIONS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm ${tab === id ? "bg-ink text-cream font-semibold" : "text-ink/70 hover:bg-white"}`}>
              {label}{id !== "settings" && <span className="ml-1 text-xs opacity-60">({(content[id as keyof Content] as unknown[])?.length ?? 0})</span>}
            </button>
          ))}
        </nav>

        <main className="flex-1">
          {tab === "settings"
            ? <Settings content={content} setContent={setContent} />
            : <ArrayEditor sec={tab} content={content} setContent={setContent} uploadImage={uploadImage} flash={flash} />}
        </main>
      </div>

      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-ink-950 px-5 py-3 text-sm text-cream shadow-soft">{toast}</div>}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-cream-dark p-6">{children}</div>;
}

function Settings({ content, setContent }: { content: Content; setContent: (c: Content) => void }) {
  const groups = Array.from(new Set(CONTENT_FIELDS.map((f) => f.group)));
  const set = (k: string, v: string) => setContent({ ...content, settings: { ...content.settings, [k]: v } });
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <section key={g} className="card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">{g}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {CONTENT_FIELDS.filter((f) => f.group === g).map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="field-label">{f.label}</label>
                {f.type === "textarea"
                  ? <textarea className="field" rows={3} value={content.settings[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                  : <input className="field" value={content.settings[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />}
                {f.hint && <p className="mt-1 text-xs text-ink/40">{f.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ArrayEditor({ sec, content, setContent, uploadImage, flash }: {
  sec: string; content: Content; setContent: (c: Content) => void;
  uploadImage: (f: File) => Promise<string>; flash: (t: string) => void;
}) {
  const list = (content[sec as keyof Content] as unknown as Record<string, unknown>[]) || [];
  const update = (next: Record<string, unknown>[]) => setContent({ ...content, [sec]: next } as Content);
  const fields = ARRAY_FIELDS[sec];

  function blank() {
    const o: Record<string, unknown> = {};
    fields.forEach(([k, , t]) => { o[k] = t === "num" ? 0 : t === "check" ? true : ""; });
    if (sec === "gallery" || sec === "results") o.id = uid();
    if (sec === "news") { o.id = uid(); o.published = true; o.date = new Date().toISOString(); o.category = "Announcement"; }
    if ("sort" in o) o.sort = list.length;
    return o;
  }

  return (
    <div className="space-y-4">
      {list.map((item, idx) => (
        <div key={idx} className="card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([k, label, type, opts]) => {
              const full = type === "area" || type === "img" || type === "file";
              const val = item[k];
              return (
                <div key={k} className={full ? "sm:col-span-2" : ""}>
                  <label className="field-label">{label}</label>
                  {type === "area" ? <textarea className="field" rows={4} value={(val as string) ?? ""} onChange={(e) => { item[k] = e.target.value; update([...list]); }} />
                    : type === "check" ? <input type="checkbox" className="h-5 w-5 accent-gold" checked={!!val} onChange={(e) => { item[k] = e.target.checked; update([...list]); }} />
                    : type === "num" ? <input type="number" className="field" value={(val as number) ?? 0} onChange={(e) => { item[k] = Number(e.target.value); update([...list]); }} />
                    : type === "date" ? <input type="date" className="field" value={((val as string) || "").slice(0, 10)} onChange={(e) => { item[k] = new Date(e.target.value).toISOString(); update([...list]); }} />
                    : type === "select" ? <select className="field" value={(val as string) || ""} onChange={(e) => { item[k] = e.target.value; update([...list]); }}>{opts!.map((o) => <option key={o}>{o}</option>)}</select>
                    : (type === "img" || type === "file") ? (
                      <div className="flex gap-3">
                        {type === "img" && (val as string) && <Image src={val as string} alt="" width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />}
                        <div className="flex-1">
                          <input className="field" placeholder="URL, or upload below" value={(val as string) ?? ""} onChange={(e) => { item[k] = e.target.value; update([...list]); }} />
                          <input type="file" accept={type === "file" ? "application/pdf,image/*" : "image/*"} className="mt-1 text-xs"
                            onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { item[k] = await uploadImage(f); update([...list]); flash("Uploaded"); } catch (err) { flash(err instanceof Error ? err.message : "Upload failed"); } }} />
                        </div>
                      </div>
                    ) : <input className="field" value={(val as string) ?? ""} onChange={(e) => { item[k] = e.target.value; update([...list]); }} />}
                </div>
              );
            })}
          </div>
          <button onClick={() => update(list.filter((_, i) => i !== idx))} className="mt-3 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button>
        </div>
      ))}
      <button onClick={() => update([...list, blank()])} className="rounded-xl border border-dashed border-ink/30 px-4 py-3 text-sm font-medium text-ink/70 hover:bg-white">+ Add</button>
      <p className="text-xs text-ink/40">Tip: click <b>Save &amp; publish</b> (top right) to push changes live.</p>
    </div>
  );
}
