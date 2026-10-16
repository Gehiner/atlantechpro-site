// Post-build step for the static export (runs after `vite build --config vite.config.static.ts`).
// Build-time only: nothing here is needed (or uploaded) in production.
//
//   1. Renders the not-found page with the freshly built server bundle -> dist/client/404.html
//      (the prerenderer cannot produce it: it rejects non-200 responses).
//   2. Copies hosting/hostinger/.htaccess -> dist/client/.htaccess.
//   3. Verifies the export: every URL in sitemap.xml has its HTML file, required files exist,
//      and no environment files or source maps are present.
import { copyFile, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const clientDir = path.join(root, "dist", "client");
const serverEntry = path.join(root, "dist", "server", "server.js");

const fail = (message) => {
  console.error(`\n[postbuild-static] ERROR: ${message}`);
  process.exit(1);
};
const exists = (file) =>
  stat(file).then(
    () => true,
    () => false,
  );

async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listFiles(full)));
    else out.push(full);
  }
  return out;
}

if (!(await exists(path.join(clientDir, "index.html")))) {
  fail("dist/client/index.html not found. Run `bun run build:static` (not plain `vite build`).");
}

// 1. 404.html --------------------------------------------------------------------------------
const { default: server } = await import(pathToFileURL(serverEntry).href);
const response = await server.fetch(
  new Request("http://localhost/__pagina-no-encontrada__"),
  {},
  {},
);
let html = await response.text();
if (response.status !== 404)
  fail(`not-found render returned HTTP ${response.status}, expected 404.`);
if (!html.includes("<title>") || !/name="robots"\s+content="noindex"/.test(html)) {
  fail("404 page is missing its <title> or <meta name=robots content=noindex>.");
}
// A static 404 is served for arbitrary URLs, so it must not hydrate a router state that was
// rendered for a different path: drop the scripts, keep markup and CSS.
html = html
  .replace(/<script\b[\s\S]*?<\/script>/g, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "");
await writeFile(path.join(clientDir, "404.html"), html);

// 2. .htaccess ---------------------------------------------------------------------------------
await copyFile(
  path.join(root, "hosting", "hostinger", ".htaccess"),
  path.join(clientDir, ".htaccess"),
);

// 3. Verification --------------------------------------------------------------------------------
const problems = [];
for (const required of ["index.html", "404.html", "sitemap.xml", "robots.txt", ".htaccess"]) {
  if (!(await exists(path.join(clientDir, required)))) problems.push(`missing ${required}`);
}

const sitemap = await readFile(path.join(clientDir, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (locs.length === 0) problems.push("sitemap.xml has no <loc> entries");
for (const pathname of locs) {
  const clean = pathname.replace(/\/+$/, "");
  const file = path.join(clientDir, clean, "index.html");
  if (!(await exists(file)))
    problems.push(`sitemap URL ${pathname} has no ${clean || ""}/index.html`);
}

const files = await listFiles(clientDir);
for (const file of files) {
  const name = path.basename(file);
  if (name === ".env" || name.startsWith(".env."))
    problems.push(`environment file in output: ${name}`);
  if (name.endsWith(".map"))
    problems.push(`source map in output: ${path.relative(clientDir, file)}`);
}

if (problems.length) fail(problems.join("\n  - "));

const htmlCount = files.filter((f) => f.endsWith(".html")).length;
console.log(
  `\n[postbuild-static] OK: ${files.length} files, ${htmlCount} HTML pages, ${locs.length} sitemap URLs verified.`,
);
console.log(
  "[postbuild-static] Upload the CONTENTS of dist/client/ to public_html (see docs/hostinger-static-deploy.md).",
);
process.exit(0);
