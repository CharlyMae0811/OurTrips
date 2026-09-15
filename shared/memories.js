/* Memories: photos and little videos taken along the way.
   Full-size files live on the phone (IndexedDB). A small thumbnail + where/when goes to the shared board,
   so both phones see every memory on the map. */
window.Mem = (function () {
  "use strict";
  const slug = (window.TRIP && window.TRIP.slug) || "trip";
  const DB = "ourtrips-memories", STORE = "files";
  let dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function put(key, val) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction(STORE, "readwrite"); t.objectStore(STORE).put(val, key); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
  async function get(key) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction(STORE, "readonly"); const q = t.objectStore(STORE).get(key); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
  async function del(key) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction(STORE, "readwrite"); t.objectStore(STORE).delete(key); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
  async function keys() { const d = await db(); return new Promise((res, rej) => { const t = d.transaction(STORE, "readonly"); const q = t.objectStore(STORE).getAllKeys(); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }

  /* ---- local index of memories (metadata), mirrored to the shared board when live ---- */
  const IDX = `memories-${slug}`;
  let index = {}; try { index = JSON.parse(localStorage.getItem(IDX) || "{}"); } catch (e) { index = {}; }
  let remote = {};
  const listeners = [];
  function saveIndex() { localStorage.setItem(IDX, JSON.stringify(index)); }
  function all() {
    // remote entries win for metadata (they include everyone's), local ones fill in when offline
    const m = Object.assign({}, index, remote);
    return Object.values(m).filter(Boolean).sort((a, b) => (a.ts || 0) - (b.ts || 0));
  }
  function onChange(fn) { listeners.push(fn); }
  function emit() { listeners.forEach((f) => { try { f(); } catch (e) { console.error(e); } }); }
  function setRemote(obj) { remote = obj || {}; emit(); }

  /* ---- image helpers ---- */
  function loadImage(blob) {
    return new Promise((res, rej) => { const url = URL.createObjectURL(blob); const im = new Image(); im.onload = () => { URL.revokeObjectURL(url); res(im); }; im.onerror = () => { URL.revokeObjectURL(url); rej(new Error("not an image")); }; im.src = url; });
  }
  function drawScaled(source, w, h, max) {
    const s = Math.min(1, max / Math.max(w, h)); const cw = Math.round(w * s), ch = Math.round(h * s);
    const c = document.createElement("canvas"); c.width = cw; c.height = ch; c.getContext("2d").drawImage(source, 0, 0, cw, ch); return c;
  }
  const toBlob = (c, q) => new Promise((res) => c.toBlob(res, "image/jpeg", q));
  async function photoVersions(file) {
    const im = await loadImage(file);
    const big = await toBlob(drawScaled(im, im.naturalWidth, im.naturalHeight, 1800), 0.85);
    const thumb = drawScaled(im, im.naturalWidth, im.naturalHeight, 560).toDataURL("image/jpeg", 0.62);
    return { big, thumb, w: im.naturalWidth, h: im.naturalHeight };
  }
  function videoThumb(file) {
    return new Promise((res) => {
      const v = document.createElement("video"); v.muted = true; v.playsInline = true; v.preload = "metadata";
      const url = URL.createObjectURL(file); let done = false;
      const finish = (thumb) => { if (done) return; done = true; URL.revokeObjectURL(url); res(thumb); };
      v.onloadeddata = () => { try { v.currentTime = Math.min(0.5, (v.duration || 1) / 3); } catch (e) { finish(null); } };
      v.onseeked = () => { try { finish(drawScaled(v, v.videoWidth, v.videoHeight, 560).toDataURL("image/jpeg", 0.62)); } catch (e) { finish(null); } };
      v.onerror = () => finish(null); setTimeout(() => finish(null), 4000); v.src = url;
    });
  }

  /* ---- EXIF GPS (JPEG only), so photos taken with the camera app keep their real spot ---- */
  async function exifGps(file) {
    try {
      const buf = new DataView(await file.slice(0, 256 * 1024).arrayBuffer());
      if (buf.getUint16(0) !== 0xffd8) return null;
      let off = 2;
      while (off < buf.byteLength - 4) {
        const marker = buf.getUint16(off); const len = buf.getUint16(off + 2);
        if (marker === 0xffe1 && buf.getUint32(off + 4) === 0x45786966) { // "Exif"
          const t = off + 10; const le = buf.getUint16(t) === 0x4949;
          const u16 = (p) => buf.getUint16(p, le), u32 = (p) => buf.getUint32(p, le);
          const ifd0 = t + u32(t + 4); const n = u16(ifd0); let gpsIfd = null;
          for (let i = 0; i < n; i++) { const e = ifd0 + 2 + i * 12; if (u16(e) === 0x8825) gpsIfd = t + u32(e + 8); }
          if (!gpsIfd) return null;
          const gn = u16(gpsIfd); const tags = {};
          for (let i = 0; i < gn; i++) {
            const e = gpsIfd + 2 + i * 12; const tag = u16(e), type = u16(e + 2), cnt = u32(e + 4);
            if (type === 2) tags[tag] = String.fromCharCode(buf.getUint8(cnt > 4 ? t + u32(e + 8) : e + 8));
            if (type === 5 && cnt === 3) { const p = t + u32(e + 8); tags[tag] = [0, 1, 2].map((k) => u32(p + k * 8) / (u32(p + k * 8 + 4) || 1)); }
          }
          if (!tags[2] || !tags[4]) return null;
          const dms = (a) => a[0] + a[1] / 60 + a[2] / 3600;
          const lat = dms(tags[2]) * (tags[1] === "S" ? -1 : 1), lng = dms(tags[4]) * (tags[3] === "W" ? -1 : 1);
          return isFinite(lat) && isFinite(lng) && (lat || lng) ? { lat, lng, src: "photo" } : null;
        }
        if ((marker & 0xff00) !== 0xff00) break;
        off += 2 + len;
      }
    } catch (e) { /* ignore */ }
    return null;
  }
  function herePosition() {
    return new Promise((res) => {
      if (!navigator.geolocation) return res(null);
      navigator.geolocation.getCurrentPosition((p) => res({ lat: p.coords.latitude, lng: p.coords.longitude, src: "phone" }), () => res(null), { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 });
    });
  }

  /* ---- add a memory ---- */
  async function add(file, meta) {
    // meta: { day, actId, actName, kind: scenery|selfie|video, by, fallback: {lat,lng} }
    const id = "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const isVideo = file.type.startsWith("video/") || meta.kind === "video";
    let thumb = null, big = null;
    if (isVideo) { thumb = await videoThumb(file); big = file; }
    else { const v = await photoVersions(file); thumb = v.thumb; big = v.big; }
    const [gps, here] = await Promise.all([isVideo ? null : exifGps(file), herePosition()]);
    const where = gps || here || (meta.fallback ? { ...meta.fallback, src: "plan" } : null);
    await put(id, big);
    const entry = { id, day: meta.day, actId: meta.actId, actName: meta.actName, kind: isVideo ? "video" : meta.kind, by: meta.by || "", ts: Date.now(),
      lat: where ? +where.lat.toFixed(6) : null, lng: where ? +where.lng.toFixed(6) : null, src: where ? where.src : null, thumb: thumb || null, mime: file.type, size: file.size, device: deviceName() };
    index[id] = entry; saveIndex();
    if (window.Sync && window.Sync.ready && window.Sync.writeMem) window.Sync.writeMem(id, entry);
    emit();
    return entry;
  }
  async function remove(id) {
    delete index[id]; saveIndex(); await del(id).catch(() => {});
    if (window.Sync && window.Sync.ready && window.Sync.writeMem) window.Sync.writeMem(id, null);
    emit();
  }
  async function localUrl(id) { const b = await get(id); return b ? URL.createObjectURL(b) : null; }
  async function hasLocal(id) { const ks = await keys(); return ks.includes(id); }
  function deviceName() { const k = "ourtrips-device"; let d = localStorage.getItem(k); if (!d) { d = (localStorage.getItem("ourtrips-me") || "phone") + "-" + Math.random().toString(36).slice(2, 6); localStorage.setItem(k, d); } return d; }

  return { all, add, remove, localUrl, hasLocal, onChange, setRemote, deviceName };
})();
