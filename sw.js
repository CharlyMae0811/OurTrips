/* Service worker: keeps the app usable on a beach with no signal.
   Same-origin files and map tiles are cached as you use them; Firebase and fonts go straight to the network. */
const VERSION = "v5";
const CACHE = `ourtrips-${VERSION}`;
const SHELL = [
  "./", "./index.html", "./trips.js", "./config.js", "./manifest.webmanifest",
  "./shared/styles.css", "./shared/app.js", "./shared/sync.js", "./shared/gate.js", "./shared/memories.js", "./shared/pwa.js",
  "./shared/vendor/leaflet/leaflet.js", "./shared/vendor/leaflet/leaflet.css",
  "./albania-2026/index.html", "./albania-2026/data.js", "./albania-2026/hotels.js", "./albania-2026/routes.js", "./albania-2026/activities.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.allSettled(SHELL.map((u) => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("ourtrips-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const isTile = (u) => /arcgisonline\.com\/ArcGIS\/rest\/services\/.*\/tile\//.test(u.href);
const isFirebase = (u) => /firebase|googleapis\.com\/identitytoolkit|gstatic\.com\/firebasejs/.test(u.href);

self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (isFirebase(url)) return; // live data: never cache
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !isTile(url) && !/fonts\.(googleapis|gstatic)\.com/.test(url.host)) return;
  // stale-while-revalidate: answer from cache, refresh in the background
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const cached = await c.match(req, { ignoreSearch: sameOrigin && !url.pathname.endsWith(".js") });
    const network = fetch(req).then((res) => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => null);
    if (cached) { network.catch(() => {}); return cached; }
    const res = await network;
    if (res) return res;
    if (req.mode === "navigate") return c.match("./index.html");
    return new Response("", { status: 504, statusText: "offline" });
  }));
});
