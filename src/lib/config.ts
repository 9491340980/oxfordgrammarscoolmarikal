// ─────────────────────────────────────────────────────────────
// Where the public site reads its content from at runtime.
//
//   "local"  → always render from the content.json baked into the build.
//              No database calls, no flicker, fastest possible load. (Recommended)
//
//   "server" → ALSO live-sync from Firestore, so staff edits in /admin appear
//              on the site instantly without a rebuild (costs 1 DB read per visit).
//
// To switch, change the default below, or set an env var at build time:
//   NEXT_PUBLIC_CONTENT_SOURCE=server   (e.g. in .env.local)
//
// Editing flow while on "local": staff edit in /admin (saves to DB) → run
//   `npm run sync-from-db`  → `npm run build` → deploy.  The one command pulls
// the DB changes into content.json so they ship with the static build.
// ─────────────────────────────────────────────────────────────

export type ContentSource = "local" | "server";

export const CONTENT_SOURCE: ContentSource =
  (process.env.NEXT_PUBLIC_CONTENT_SOURCE as ContentSource) === "server"
    ? "server"
    : "local";
