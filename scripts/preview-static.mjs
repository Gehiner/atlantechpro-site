// Local preview of the static export (dist/client) — `bun run preview:static`.
// It mimics hosting/hostinger/.htaccess: clean URLs without redirects, 404.html with HTTP 404.
// Development tool only; production is plain files on the hosting.
import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "dist", "client");
const port = Number(process.env.PORT ?? process.argv[2] ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const isFile = async (file) => (await stat(file).catch(() => null))?.isFile() ?? false;

async function resolveFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  // Hidden files (.htaccess, .env, ...) are never served.
  if (decoded.split("/").some((segment) => segment.startsWith("."))) return null;
  const target = path.join(root, path.normalize(decoded));
  if (target !== root && !target.startsWith(root + path.sep)) return null;
  if (await isFile(target)) return target;
  const index = path.join(target, "index.html");
  return (await isFile(index)) ? index : null;
}

function send(res, status, file, method) {
  res.writeHead(status, {
    "content-type": types[path.extname(file)] ?? "application/octet-stream",
    "cache-control": "no-cache",
  });
  if (method === "HEAD") return res.end();
  createReadStream(file).pipe(res);
}

if (!(await isFile(path.join(root, "index.html")))) {
  console.error("dist/client/index.html not found. Run `bun run build:static` first.");
  process.exit(1);
}

http
  .createServer(async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { allow: "GET, HEAD" }).end();
      return;
    }
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const file = await resolveFile(pathname);
    if (file) return send(res, 200, file, req.method);
    send(res, 404, path.join(root, "404.html"), req.method);
  })
  .listen(port, host, () => {
    console.log(`Static preview of dist/client: http://${host}:${port}/`);
  });
