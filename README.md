# Oxford Grammar School — Website (static + Studio)

A premium, **CBSE-compliant** school website that hosts for **free** as a static site,
plus a **local-only "Studio"** so you can update content, photos and the CBSE disclosure
without touching code — then republish in one click.

- **Public site:** Next.js 14, exported to plain static HTML (`out/`) → free hosting.
- **Content:** a single `content.json` + media in `public/uploads/`.
- **Studio:** a small local editor (`npm run studio`) that edits `content.json`, uploads
  media, and rebuilds the site. **Never deployed** — runs only on your machine.

---

## Everyday workflow (update → publish)

```bash
cd v3
npm install            # first time only

# 1. Edit content in the Studio
npm run studio         # opens http://localhost:4000
#    → change text, add news/photos/results, upload PDFs, then click
#      "Save changes" and "Rebuild site"

# 2. Publish the updated site
npm run deploy         # builds + deploys to Firebase Hosting
```

That's it. The Studio writes `content.json` + copies media into `public/uploads/`,
the build regenerates `out/`, and deploy pushes it live.

> Prefer Git-based publishing? Connect this repo to **Firebase**, **Cloudflare Pages**
> or **Netlify** and a `git push` auto-builds & deploys — no `npm run deploy` needed.

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run studio` | Local content editor → http://localhost:4000 |
| `npm run build` | Generates the static site into `out/` |
| `npm run preview` | Serves the built `out/` at http://localhost:3000 |
| `npm run dev` | Live dev server while editing **code** |
| `npm run deploy` | Build + deploy to Firebase Hosting |

---

## First-time hosting setup (Firebase — free)

1. Create a free project at <https://console.firebase.google.com> (e.g. `oxford-grammar-school`).
2. Put its **Project ID** into [.firebaserc](.firebaserc) (replace the placeholder).
3. Log in once: `npx firebase-tools login`
4. Deploy: `npm run deploy` → your site is live at `https://<project-id>.web.app`.

Firebase Hosting's free (Spark) plan includes free SSL and a custom domain — plenty for a
school site. (Cloudflare Pages / Netlify work the same way if you prefer.)

### Connect the real domain `oxfordgrammarschool.in`
You need **DNS access** to the domain (it's registered at **Hostinger**, so the school must
get into that Hostinger account — see notes below).

1. Firebase Console → Hosting → **Add custom domain** → `oxfordgrammarschool.in`.
2. Firebase shows you **A records** (and a TXT verification record).
3. In Hostinger's **DNS** panel, add those records — **without deleting any existing
   `MX` (email) records**, or school email will break.
4. Wait for DNS to propagate (minutes–hours). Firebase auto-issues HTTPS. Done.

---

## Enquiry form (no backend)

The admission/contact form is static-friendly:

- **Recommended:** get a free key from <https://web3forms.com> and paste it into the
  Studio → *Site Content → Contact → Web3Forms access key*. Submissions are then emailed
  to you automatically.
- **If left blank:** the form opens the visitor's email app addressed to your school email
  (a `mailto:` fallback) — still works, just less automated.

---

## Why this is CBSE-ready
The **Mandatory Public Disclosure** page (`/disclosure`) publishes everything the CBSE
Affiliation Bylaws require — general info, the documents table (upload the certificate
PDFs in the Studio), last-3-years results, staff and infrastructure. CBSE requires the
information to be **publicly visible**; it does **not** require any login.

---

## Project structure

```
v3/
  content.json            ← all editable content (text, news, results, faculty, docs)
  public/uploads/         ← uploaded photos & PDFs
  public/logo.png         ← school logo (replace with the real one)
  studio/                 ← local-only editor (server.mjs + index.html)
  firebase.json           ← Firebase Hosting config (serves out/)
  src/
    app/(site)/           ← public pages (static, read content.json)
    lib/data.ts           ← reads content.json at build time
    lib/content.ts        ← field labels/defaults used by the Studio
    components/           ← UI (header, footer, forms, gallery…)
  out/                    ← generated static site (deploy this; git-ignored)
```

## Taking over the domain (notes)
`oxfordgrammarschool.in` is registered at **Hostinger** and currently uses parked
nameservers. To go live on it you need either the **Hostinger account** (best) or, at
minimum, **DNS access** to add Firebase's records. Ask the current maintainer for account
access (or an EPP/Auth code to transfer the domain), and confirm any **email (MX) records**
first so they aren't lost.
