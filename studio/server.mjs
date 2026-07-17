// Oxford Grammar School — local Super-Admin "Studio".
// Runs ONLY on your machine. Edits content.json + uploads media into
// public/uploads, and can rebuild the static site. Nothing here is deployed.
//
//   npm run studio   ->   http://localhost:4000
import express from "express";
import multer from "multer";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content.json");
const UPLOADS = join(ROOT, "public", "uploads");
if (!existsSync(UPLOADS)) mkdirSync(UPLOADS, { recursive: true });

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use("/uploads", express.static(UPLOADS));
app.use("/logo.png", express.static(join(ROOT, "public", "logo.png")));

const storage = multer.diskStorage({
  destination: UPLOADS,
  filename: (_req, file, cb) => {
    const ext = (file.originalname.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 12 * 1024 * 1024 } });

app.get("/api/content", (_req, res) => {
  res.json(JSON.parse(readFileSync(CONTENT, "utf8")));
});

app.post("/api/content", (req, res) => {
  writeFileSync(CONTENT, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.post("/api/build", (_req, res) => {
  exec("npm run build", { cwd: ROOT, shell: true, maxBuffer: 1024 * 1024 * 20 }, (err, stdout, stderr) => {
    res.json({ ok: !err, log: (stdout + "\n" + stderr).slice(-4000) });
  });
});

app.get("/", (_req, res) => res.sendFile(join(__dirname, "index.html")));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`\n  ✦ Oxford Grammar School — Studio running`);
  console.log(`  ✦ Open  http://localhost:${PORT}\n`);
});
