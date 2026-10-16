// Smoke test for the static export, local or deployed — `bun run verify:static [baseUrl]`.
//   bun run preview:static            (terminal 1)
//   bun run verify:static             (terminal 2, default http://127.0.0.1:4173)
//   bun run verify:static https://atlantechpro.com   (after publishing)
// Every URL listed in sitemap.xml must open directly (HTTP 200, no redirect) and carry its own
// canonical; unknown URLs must answer HTTP 404 with the noindex 404 page.
const base = (process.argv[2] ?? process.env.BASE_URL ?? "http://127.0.0.1:4173").replace(
  /\/+$/,
  "",
);
let failures = 0;

const get = (pathname, init = {}) => fetch(base + pathname, { redirect: "manual", ...init });
const report = (ok, label, detail = "") => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};
const isHtml = (res) => (res.headers.get("content-type") ?? "").includes("text/html");

console.log(`Verifying ${base}\n`);

// sitemap.xml ---------------------------------------------------------------------------------
const sitemapRes = await get("/sitemap.xml");
const sitemap = await sitemapRes.text();
report(
  sitemapRes.status === 200 && (sitemapRes.headers.get("content-type") ?? "").includes("xml"),
  "/sitemap.xml",
  `HTTP ${sitemapRes.status}, ${sitemapRes.headers.get("content-type")}`,
);
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
report(locs.length > 0, "sitemap lists URLs", `${locs.length} <loc> entries`);

// every sitemap URL opens directly and carries its own canonical --------------------------------
for (const loc of locs) {
  const pathname = new URL(loc).pathname;
  const res = await get(pathname);
  const body = await res.text();
  const canonical = body.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/)?.[1];
  report(
    res.status === 200 && isHtml(res) && canonical === loc,
    `GET ${pathname}`,
    `HTTP ${res.status}${res.headers.get("location") ? ` -> ${res.headers.get("location")}` : ""}, canonical ${canonical === loc ? "matches" : `is ${canonical}`}`,
  );
  if (pathname !== "/") {
    const slash = await get(`${pathname}/`);
    report(slash.status === 200 && isHtml(slash), `GET ${pathname}/`, `HTTP ${slash.status}`);
  }
}

// robots + static files -------------------------------------------------------------------------
const robots = await get("/robots.txt");
const robotsBody = await robots.text();
report(
  robots.status === 200 && /Sitemap:\s*https?:\/\//.test(robotsBody),
  "/robots.txt",
  `HTTP ${robots.status}`,
);

const home = await (await get("/")).text();
const assets = [
  ...new Set(
    [...home.matchAll(/(?:src|href)="(\/(?:assets\/[^"]+|favicon\.png|og-image\.jpg))"/g)].map(
      (m) => m[1],
    ),
  ),
];
report(assets.length > 0, "home references static assets", `${assets.length} found`);
for (const asset of assets) {
  const res = await get(asset);
  await res.arrayBuffer();
  report(
    res.status === 200,
    `GET ${asset}`,
    `HTTP ${res.status}, ${res.headers.get("content-type")}`,
  );
}

// 404 handling ----------------------------------------------------------------------------------
for (const missing of [
  "/no-existe",
  "/blog/no-existe",
  "/assets/no-existe.js",
  "/soluciones/no-existe",
]) {
  const res = await get(missing);
  const body = await res.text();
  report(
    res.status === 404 &&
      isHtml(res) &&
      /name="robots"\s+content="noindex"/.test(body) &&
      body.includes("<title>"),
    `GET ${missing}`,
    `HTTP ${res.status}, noindex page ${/noindex/.test(body) ? "served" : "NOT served"}`,
  );
}
const hidden = await get("/.htaccess");
report(
  hidden.status === 403 || hidden.status === 404,
  "GET /.htaccess is not exposed",
  `HTTP ${hidden.status}`,
);

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
