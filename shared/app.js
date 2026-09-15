/* Albania trip planner. Vanilla JS, state in localStorage. */
(function () {
  "use strict";
  const T = window.TRIP, HOTELS = window.HOTELS, ROUTES = window.ROUTES;
  const KEY = "albania-trip-v1";

  /* ---------------- state ----------------
     Shared keys are synced to everyone (via sync.js, if configured); the rest stays on this device.
     votes: { itemId: { personName: 1 | -1 } }                                                  */
  const SHARED = ["votes", "hotelPick", "foodPick", "decisions", "dishes", "perNight"];
  const defaults = { votes: {}, hotelPick: {}, foodPick: {}, decisions: {}, dishes: {}, perNight: false, hideDown: false };
  let state = load();
  function load() {
    try {
      const s = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || "{}"));
      // migrate old single-number votes to the per-person shape
      Object.keys(s.votes || {}).forEach((k) => { if (typeof s.votes[k] === "number") s.votes[k] = s.votes[k] ? { "someone": s.votes[k] } : null; if (!s.votes[k]) delete s.votes[k]; });
      return s;
    } catch (e) { return { ...defaults }; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  /* set a nested value (path = ["votes", id, name]) locally and, when live, on the shared board */
  function setPath(path, value) {
    let o = state;
    for (let i = 0; i < path.length - 1; i++) { if (!o[path[i]] || typeof o[path[i]] !== "object") o[path[i]] = {}; o = o[path[i]]; }
    if (value === null || value === undefined || value === false) delete o[path[path.length - 1]]; else o[path[path.length - 1]] = value;
    save();
    if (SHARED.includes(path[0]) && window.Sync && window.Sync.ready) window.Sync.write(path, value === false ? null : value);
  }

  /* who is voting on this device */
  const ME_KEY = "albania-trip-me";
  let me = localStorage.getItem(ME_KEY) || "";
  function askName(force) {
    if (me && !force) return me;
    const n = prompt("Who's voting on this device? (first name)", me || "");
    if (n && n.trim()) { me = n.trim().replace(/[.#$\[\]\/]/g, "").slice(0, 24); localStorage.setItem(ME_KEY, me); renderWho(); rerenderAll(); }
    return me;
  }
  function renderWho() {
    const el = $("#who"); if (!el) return;
    el.innerHTML = me ? `<span class="who-name">♡ ${esc(me)}</span> <button class="who-change" type="button">change</button>` : `<button class="who-change" type="button">who's voting?</button>`;
    $(".who-change", el).onclick = () => askName(true);
  }
  function voteInfo(id) {
    const v = state.votes[id] || {};
    const ups = Object.keys(v).filter((n) => v[n] > 0), downs = Object.keys(v).filter((n) => v[n] < 0);
    return { mine: me ? v[me] || 0 : 0, ups, downs, anyDown: downs.length > 0 };
  }
  function setVote(id, v) {
    if (!askName()) return;
    const cur = voteInfo(id).mine;
    setPath(["votes", id, me], cur === v ? null : v);
  }
  const voteButtons = (id) => {
    const vi = voteInfo(id);
    const names = (arr) => arr.map(esc).join(", ");
    return `
      <button class="vote ${vi.mine > 0 ? "on-up" : ""}" data-v="1" aria-label="Thumbs up" title="${names(vi.ups)}">👍${vi.ups.length ? `<small>${vi.ups.length}</small>` : ""}</button>
      <button class="vote ${vi.mine < 0 ? "on-down" : ""}" data-v="-1" aria-label="Thumbs down" title="${names(vi.downs)}">👎${vi.downs.length ? `<small>${vi.downs.length}</small>` : ""}</button>`;
  };
  const voteChips = (id) => {
    const vi = voteInfo(id);
    if (!vi.ups.length && !vi.downs.length) return "";
    return `<div class="vchips">${vi.ups.map((n) => `<span class="vchip up">👍 ${esc(n)}</span>`).join("")}${vi.downs.map((n) => `<span class="vchip down">👎 ${esc(n)}</span>`).join("")}</div>`;
  };

  /* called by sync.js whenever the shared board changes somewhere in the world */
  window.App = {
    applyRemote(remote) {
      remote = remote || {};
      SHARED.forEach((k) => { state[k] = remote[k] !== undefined ? remote[k] : (k === "perNight" ? false : {}); });
      save(); rerenderAll();
    },
    localShared() { const o = {}; SHARED.forEach((k) => (o[k] = state[k])); return o; },
    setLive(on, msg) {
      const el = $("#live"); if (!el) return;
      el.className = "live " + (on ? "on" : "off"); el.textContent = on ? "live · shared with everyone on the link" : (msg || "this device only");
    }
  };
  function rerenderAll() {
    renderDecisions();
    T.hotelStops.forEach((hs) => { renderCards(hs.stop); updateMarkers(hs.stop); });
    renderSummary(); renderFood();
    $("#price-per-night").checked = !!state.perNight;
    if (!$("#tab-itinerary").hidden) renderItinerary();
  }

  /* ---------------- helpers ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hotelById = Object.fromEntries(HOTELS.map((h) => [h.id, h]));
  const foodById = {};
  T.foodGroups.forEach((g) => g.items.forEach((i) => (foodById[i.id] = { ...i, group: g })));

  function km(a, b) {
    const R = 6371, toR = (d) => (d * Math.PI) / 180;
    const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  const fmtDist = (d) => (d < 1 ? `${Math.round(d * 100) * 10} m` : `${d.toFixed(d < 10 ? 1 : 0)} km`);
  const euro = (n) => `€${Math.round(n)}`;

  /* total price for the stay at this hotel (respecting the per-night toggle for 2-night stops) */
  function stayTotal(h) {
    if (h.nights > 1 && state.perNight) return h.price * h.nights;
    return h.price;
  }
  const perNight = (h) => stayTotal(h) / h.nights;

  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  /* ---------------- tabs ---------------- */
  const maps = {}; // id -> leaflet map
  function showTab() {
    const hash = (location.hash || "#home").slice(1).split("/")[0];
    const tab = ["home", "hotels", "food", "itinerary"].includes(hash) ? hash : "home";
    $$(".tab").forEach((el) => (el.hidden = el.id !== `tab-${tab}`));
    $$(".tabs a").forEach((a) => a.classList.toggle("active", a.dataset.tab === tab));
    if (tab === "home") initHomeMap();
    if (tab === "hotels") initHotelMaps();
    Object.values(maps).forEach((m) => setTimeout(() => m.invalidateSize(), 50));
    if (tab === "itinerary") renderItinerary();
    window.scrollTo({ top: 0 });
    const sub = (location.hash || "").split("/")[1];
    if (sub) setTimeout(() => { const el = document.getElementById(sub); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
  }
  window.addEventListener("hashchange", showTab);

  function tiles(map) {
    // Esri tiles: no API key, no referer requirement (OSM's public tiles block file:// pages)
    const topo = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri, HERE, Garmin, OpenStreetMap contributors", maxZoom: 18
    }).addTo(map);
    const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics", maxZoom: 18
    });
    const labels = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18 });
    const satGroup = L.layerGroup([sat, labels]);
    L.control.layers({ "Map": topo, "Satellite": satGroup }, null, { position: "topright" }).addTo(map);
  }

  /* ---------------- HOME ---------------- */
  function initHomeMap() {
    if (maps.home) return;
    const map = L.map("map-home", { scrollWheelZoom: false, zoomSnap: 0.25 });
    maps.home = map; tiles(map);
    L.polyline(ROUTES.main, { color: "#1f5f7a", weight: 4, opacity: 0.85 }).addTo(map);
    L.polyline(ROUTES.holta, { color: "#c9a24f", weight: 3, dashArray: "6 8", opacity: 0.9 }).addTo(map);
    L.polyline(ROUTES.bovilla, { color: "#c9a24f", weight: 3, dashArray: "6 8", opacity: 0.9 }).addTo(map);
    T.stops.forEach((s) => {
      const icon = L.divIcon({ className: "", html: `<div class="pin pin-${s.kind}"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] });
      const m = L.marker([s.lat, s.lng], { icon }).addTo(map);
      m.bindTooltip(s.name, { permanent: s.kind === "night", direction: "right", offset: [10, 0], className: "pin-label" });
      m.on("click", () => openStop(s.id));
    });
    map.fitBounds(L.latLngBounds(T.stops.map((s) => [s.lat, s.lng])).pad(0.04));
  }

  function openStop(id) {
    const s = T.stops.find((x) => x.id === id); if (!s) return;
    const panel = $("#stop-panel");
    const hs = s.hotelStop ? T.hotelStops.find((x) => x.stop === s.hotelStop) : null;
    const pick = s.hotelStop && state.hotelPick[s.hotelStop] ? hotelById[state.hotelPick[s.hotelStop]] : null;
    panel.innerHTML = `
      <button class="sp-close" aria-label="Close">×</button>
      <img src="${s.photo}" alt="${esc(s.name)}" />
      <div class="sp-body">
        <div class="sp-day">${esc(s.day)}</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.blurb)}</p>
        <ul>${s.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        <div class="sp-links">
          ${hs ? `<a href="#hotels/stop-${hs.stop}">Hotels here ${pick ? "· " + esc(pick.name) : ""}</a>` : ""}
          ${s.kind !== "start" ? `<a href="#itinerary">Day by day</a>` : ""}
        </div>
      </div>`;
    panel.hidden = false;
    $(".sp-close", panel).onclick = () => (panel.hidden = true);
    if (maps.home) maps.home.panTo([s.lat, s.lng], { animate: true });
    if (window.innerWidth <= 1000) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderDecisions() {
    $("#decisions").innerHTML = T.decisions.map((d) => `
      <div class="decision">
        <h3>${esc(d.title)}</h3>
        <div class="q">${esc(d.q)}</div>
        ${["a", "b"].map((k) => `
          <div class="opt ${state.decisions[d.id] === k ? "chosen" : ""}" data-d="${d.id}" data-k="${k}" role="button" tabindex="0">
            <b data-letter="${k.toUpperCase()}">${esc(d[k].label)}</b><span>${esc(d[k].text)}</span>
          </div>`).join("")}
      </div>`).join("");
    $$("#decisions .opt").forEach((el) => {
      const act = () => { const { d, k } = el.dataset; setPath(["decisions", d], state.decisions[d] === k ? null : k); renderDecisions(); if (!$("#tab-itinerary").hidden) renderItinerary(); };
      el.onclick = act; el.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } };
    });
  }

  function renderStopsGrid() {
    $("#stops-grid").innerHTML = T.stops.filter((s) => s.kind !== "start").map((s) => `
      <div class="stop-card" data-id="${s.id}" role="button" tabindex="0">
        <img src="${s.photo}" alt="${esc(s.name)}" loading="lazy" />
        <div class="sc-text"><small>${esc(s.day)}</small><b>${esc(s.name)}</b></div>
      </div>`).join("");
    $$(".stop-card").forEach((el) => {
      const act = () => { openStop(el.dataset.id); $("#map-home").scrollIntoView({ behavior: "smooth", block: "start" }); };
      el.onclick = act; el.onkeydown = (e) => { if (e.key === "Enter") act(); };
    });
  }

  /* ---------------- HOTELS ---------------- */
  const photoIdx = {};
  const hotelMarkers = {}; // stop -> [{id, marker}]

  function renderHotelStops() {
    $("#hotel-stops").innerHTML = T.hotelStops.map((hs) => `
      <section class="hstop" id="stop-${hs.stop}">
        <div class="wrap">
          <div class="hstop-head">
            <h2>${esc(hs.name)}</h2>
            <div class="meta"><b>${hs.nights} night${hs.nights > 1 ? "s" : ""}</b> · ${esc(hs.dates)} · ${HOTELS.filter((h) => h.stop === hs.stop).length} options</div>
          </div>
          <p class="hstop-note">${esc(hs.note)}</p>
          <div class="hstop-layout">
            <div id="map-stop-${hs.stop}" class="map map-small" aria-label="Map of hotels in ${esc(hs.name)}"></div>
            <div class="hcards" id="cards-${hs.stop}"></div>
          </div>
        </div>
      </section>`).join("");
    T.hotelStops.forEach((hs) => renderCards(hs.stop));
    renderSummary();
  }

  function hotelPhotoSrc(h) {
    const i = photoIdx[h.id] || 0;
    return h.photos[i] || "photos/scenery/turquoise-coast.jpg";
  }

  function renderCards(stop) {
    const hs = T.hotelStops.find((x) => x.stop === stop);
    const list = HOTELS.filter((h) => h.stop === stop).sort((a, b) => (state.hotelPick[stop] === a.id ? -1 : state.hotelPick[stop] === b.id ? 1 : 0));
    const box = $(`#cards-${stop}`);
    box.innerHTML = list.map((h) => {
      const vi = voteInfo(h.id), picked = state.hotelPick[stop] === h.id;
      if (state.hideDown && vi.mine < 0 && !picked) return "";
      const dists = hs.landmarks.map((l) => `<span title="straight line">${l.icon} ${esc(l.name)} · ${fmtDist(km(h, l))}</span>`).join("");
      const total = stayTotal(h);
      return `
      <article class="hcard ${picked ? "picked" : ""} ${vi.mine < 0 ? "down" : ""}" data-id="${h.id}">
        ${picked ? `<div class="crown">♡ OUR PICK</div>` : ""}
        <div class="hphotos">
          <img src="${hotelPhotoSrc(h)}" alt="${esc(h.name)}" loading="lazy" data-lb="${h.id}" />
          ${h.photos.length > 1 ? `<button class="pnav pprev" data-dir="-1" aria-label="Previous photo">‹</button><button class="pnav pnext" data-dir="1" aria-label="Next photo">›</button><div class="pcount">${(photoIdx[h.id] || 0) + 1}/${h.photos.length}</div>` : ""}
          ${h.approx ? `<div class="approx">map pin approximate</div>` : ""}
        </div>
        <div class="hbody">
          <div class="hname">
            <h3><a href="${esc(h.url)}" target="_blank" rel="noopener">${esc(h.name)}</a></h3>
            <div class="hprice"><b>${euro(total)}</b><small>${h.nights > 1 ? `${h.nights} nights · ${euro(perNight(h))}/night` : "1 night"}</small></div>
          </div>
          <div class="harea">${esc(h.area)}${h.rating ? ` · <span class="hrating ${h.airbnb ? "airbnb" : ""}"><b>${esc(h.rating)}</b>${h.reviews ? `<span>${esc(h.reviews)}</span>` : ""}</span>` : ""}</div>
          <dl class="hfacts">
            <dt>Beach</dt><dd>${esc(h.beach || "—")}</dd>
            <dt>Extras</dt><dd>${esc(h.extras || "—")}</dd>
          </dl>
          <div class="hnotes">${esc(h.notes)}</div>
          <div class="hdist">${dists}</div>
          ${voteChips(h.id)}
        </div>
        <div class="hactions">
          ${voteButtons(h.id)}
          <a class="hlink" href="${esc(h.url)}" target="_blank" rel="noopener">${h.airbnb ? "Airbnb" : "Booking"} ↗</a>
          <button class="pick ${picked ? "on" : ""}">${picked ? "Picked ♡" : "Pick this one"}</button>
        </div>
      </article>`;
    }).join("") || `<p class="lede">Everything here got a thumbs-down. Untick "hide" to see them again.</p>`;

    $$(".hcard", box).forEach((card) => {
      const id = card.dataset.id, h = hotelById[id];
      $$(".vote", card).forEach((b) => (b.onclick = () => { setVote(id, +b.dataset.v); renderCards(stop); updateMarkers(stop); }));
      $(".pick", card).onclick = () => {
        setPath(["hotelPick", stop], state.hotelPick[stop] === id ? null : id); renderCards(stop); updateMarkers(stop); renderSummary();
        if (state.hotelPick[stop]) toast(`${h.name} it is ♡`);
      };
      $$(".pnav", card).forEach((b) => (b.onclick = (e) => {
        e.stopPropagation(); const n = h.photos.length; photoIdx[id] = ((photoIdx[id] || 0) + (+b.dataset.dir) + n) % n;
        $("img", card).src = hotelPhotoSrc(h); $(".pcount", card).textContent = `${photoIdx[id] + 1}/${n}`;
      }));
      $("img", card).onclick = () => openLightbox(h.photos, photoIdx[id] || 0, h.name);
    });
  }

  function initHotelMaps() {
    T.hotelStops.forEach((hs) => {
      const id = `stop${hs.stop}`; if (maps[id]) return;
      const map = L.map(`map-stop-${hs.stop}`, { scrollWheelZoom: false, zoomSnap: 0.5 }); maps[id] = map; tiles(map);
      hs.landmarks.forEach((l) => {
        L.marker([l.lat, l.lng], { icon: L.divIcon({ className: "", html: `<div class="lpin">${l.icon}</div>`, iconSize: [24, 24], iconAnchor: [12, 12] }), zIndexOffset: -100 })
          .addTo(map).bindTooltip(l.name, { direction: "top", offset: [0, -10] });
      });
      hotelMarkers[hs.stop] = [];
      HOTELS.filter((h) => h.stop === hs.stop).forEach((h, i) => {
        const m = L.marker([h.lat, h.lng]).addTo(map);
        m.on("click", () => { const c = $(`.hcard[data-id="${h.id}"]`); if (c) { c.scrollIntoView({ behavior: "smooth", block: "center" }); c.style.boxShadow = "0 0 0 4px #c96b6b"; setTimeout(() => (c.style.boxShadow = ""), 1200); } });
        hotelMarkers[hs.stop].push({ id: h.id, marker: m, n: i + 1 });
      });
      updateMarkers(hs.stop);
      const pts = HOTELS.filter((h) => h.stop === hs.stop).map((h) => [h.lat, h.lng]);
      map.fitBounds(L.latLngBounds(pts).pad(0.25), { maxZoom: 15 });
    });
  }

  function updateMarkers(stop) {
    (hotelMarkers[stop] || []).forEach(({ id, marker, n }) => {
      const h = hotelById[id], picked = state.hotelPick[stop] === id, vi = voteInfo(id);
      marker.setIcon(L.divIcon({ className: "", html: `<div class="hpin ${picked ? "picked" : ""} ${vi.mine < 0 ? "down" : ""}"><span>${picked ? "♡" : n}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30] }));
      marker.setZIndexOffset(picked ? 1000 : 0);
      marker.unbindTooltip().bindTooltip(`<b>${esc(h.name)}</b><br>${euro(stayTotal(h))} · ${esc(h.area)}`, { direction: "top", offset: [0, -28] });
    });
  }

  function renderSummary() {
    let total = 0, count = 0;
    const chips = T.hotelStops.map((hs) => {
      const id = state.hotelPick[hs.stop], h = id && hotelById[id];
      if (h) { total += stayTotal(h); count++; }
      return `<a class="sum-chip ${h ? "done" : ""}" href="#hotels/stop-${hs.stop}">${esc(hs.name.split(" /")[0])}: ${h ? esc(h.name) + " " + euro(stayTotal(h)) : "—"}</a>`;
    }).join("");
    $("#hotel-summary").innerHTML = chips + `<div class="sum-total">${euro(total)}<small>${count}/7 stops picked · ${T.nights} nights</small></div>`;
  }

  function picksText() {
    const lines = ["Albania 25 Sep – 4 Oct 2026, our picks", ""];
    T.decisions.forEach((d) => { const k = state.decisions[d.id]; lines.push(`${d.title}: ${k ? d[k].label : "undecided"}`); });
    lines.push("", "Hotels:");
    let total = 0;
    T.hotelStops.forEach((hs) => { const h = hotelById[state.hotelPick[hs.stop]]; if (h) total += stayTotal(h); lines.push(`- ${hs.name} (${hs.nights}n): ${h ? `${h.name}, ${euro(stayTotal(h))}, ${h.url}` : "not picked"}`); });
    lines.push(`Hotel total: ${euro(total)}`, "", "Food we starred:");
    Object.keys(state.foodPick).filter((k) => state.foodPick[k]).forEach((k) => { const f = foodById[k]; if (f) lines.push(`- ${f.group.name}: ${f.name} (${f.band})`); });
    return lines.join("\n");
  }

  /* ---------------- FOOD ---------------- */
  function renderFood() {
    $("#food-groups").innerHTML = T.foodGroups.map((g) => `
      <section class="fgroup" id="food-${g.id}">
        <div class="when">${esc(g.when)}</div>
        <h2>${esc(g.name)}</h2>
        <div class="fcards">${g.items.map((f) => {
          const vi = voteInfo(f.id), picked = !!state.foodPick[f.id];
          return `
          <article class="fcard ${picked ? "picked" : ""} ${vi.mine < 0 ? "down" : ""}" data-id="${f.id}">
            <div class="ftop"><h3>${esc(f.name)}</h3><span class="band">${esc(f.band)}</span></div>
            <div class="fmeal">${esc(f.meal)}</div>
            <div class="fdesc">${esc(f.desc)}</div>
            ${f.dish ? `<div class="fdish">Bucket list: ${esc(f.dish)}</div>` : ""}
            ${voteChips(f.id)}
            <div class="factions">
              ${voteButtons(f.id)}
              <button class="pick ${picked ? "on" : ""}">${picked ? "Starred ★" : "Star it ☆"}</button>
            </div>
          </article>`; }).join("")}</div>
      </section>`).join("");
    $$(".fcard").forEach((card) => {
      const id = card.dataset.id;
      $$(".vote", card).forEach((b) => (b.onclick = () => { setVote(id, +b.dataset.v); renderFood(); }));
      $(".pick", card).onclick = () => { setPath(["foodPick", id], !state.foodPick[id]); renderFood(); };
    });
    $("#dishes").innerHTML = T.dishes.map((d, i) => `
      <li class="${state.dishes[i] ? "done" : ""}"><label><input type="checkbox" data-i="${i}" ${state.dishes[i] ? "checked" : ""} /><div><b>${esc(d[0])}</b><small>${esc(d[1])}</small></div></label></li>`).join("");
    $$("#dishes input").forEach((c) => (c.onchange = () => { setPath(["dishes", c.dataset.i], c.checked); renderFood(); }));
  }

  /* ---------------- ITINERARY ---------------- */
  function renderItinerary() {
    const d1b = state.decisions.d1 === "b";
    $("#days").innerHTML = T.days.map((d) => {
      // hotel winner
      let hotelStop = d.hotelStop, hotelNote = "";
      if (d1b && hotelStop === 2) { hotelStop = 3; hotelNote = "Decision 1 = one base, so we sleep in Himarë tonight."; }
      const h = hotelStop && state.hotelPick[hotelStop] ? hotelById[state.hotelPick[hotelStop]] : null;
      const hs = hotelStop ? T.hotelStops.find((x) => x.stop === hotelStop) : null;
      const hotelHtml = hotelStop ? `
        <div class="winner ${h ? "set" : ""}">
          <span class="wl">Sleep · ${esc(hs.name)}</span>
          ${h ? `<img class="wimg" src="${hotelPhotoSrc(h)}" alt="" /><b>${esc(h.name)}</b><small>${esc(h.area)} · ${euro(stayTotal(h))}${h.nights > 1 ? ` for ${h.nights} nights` : ""}</small>` : `<b>Not picked yet</b><small>Crown one in <a href="#hotels/stop-${hotelStop}">Where we sleep</a>.</small>`}
          ${hotelNote ? `<small>${esc(hotelNote)}</small>` : ""}
        </div>` : `<div class="winner"><span class="wl">Sleep</span><b>On the plane home</b></div>`;
      // food winners
      const picks = d.foodGroups.flatMap((gid) => (T.foodGroups.find((g) => g.id === gid) || { items: [] }).items.filter((f) => state.foodPick[f.id]).map((f) => foodById[f.id]));
      const foodHtml = `
        <div class="winner ${picks.length ? "set" : ""}">
          <span class="wl">Eat</span>
          ${picks.length ? `<ul>${picks.map((f) => `<li><b style="font-size:1rem">${esc(f.name)}</b> <span class="band" style="font-size:.75rem">${esc(f.band)}</span><small>${esc(f.meal)} · ${esc(f.group.name)}</small></li>`).join("")}</ul>` :
            d.foodGroups.length ? `<b>Nothing starred yet</b><small>Star places in <a href="#food">Where we eat</a>.</small>` : `<b>Airport coffee</b><small>Nöje buns from the night before, if we're organised.</small>`}
        </div>`;
      // plan rows (dim the unchosen Day 9 option)
      const dec = d.decision ? state.decisions[d.decision] : null;
      const plan = d.plan.map(([k, v]) => {
        let dim = "";
        if (dec && /^Option [AB]$/.test(k)) dim = k.endsWith(dec.toUpperCase()) ? "" : "dim";
        return `<dt class="${dim}">${esc(k)}</dt><dd class="${dim}">${esc(v)}</dd>`;
      }).join("");
      return `
      <article class="day" id="day-${d.n}">
        <div class="day-photo"><img src="${d.photo}" alt="" loading="lazy" /><div class="dnum">Day ${d.n}</div></div>
        <div class="day-body">
          <div class="date">${esc(d.date)}</div>
          <h2>${esc(d.title)}</h2>
          <div class="mood">${esc(d.mood)}</div>
          <dl class="plan">${plan}</dl>
          <div class="winners">${hotelHtml}${foodHtml}</div>
        </div>
      </article>`;
    }).join("");
    $("#practical").innerHTML = T.practical.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
  }

  /* ---------------- lightbox ---------------- */
  let lb = { photos: [], i: 0, cap: "" };
  function openLightbox(photos, i, cap) {
    lb = { photos, i, cap }; showLb(); $("#lightbox").hidden = false;
  }
  function showLb() { $("#lb-img").src = lb.photos[lb.i]; $("#lb-caption").textContent = `${lb.cap} · ${lb.i + 1}/${lb.photos.length}`; }
  $(".lb-close").onclick = () => ($("#lightbox").hidden = true);
  $(".lb-prev").onclick = () => { lb.i = (lb.i - 1 + lb.photos.length) % lb.photos.length; showLb(); };
  $(".lb-next").onclick = () => { lb.i = (lb.i + 1) % lb.photos.length; showLb(); };
  $("#lightbox").onclick = (e) => { if (e.target.id === "lightbox") $("#lightbox").hidden = true; };
  document.addEventListener("keydown", (e) => {
    if ($("#lightbox").hidden) return;
    if (e.key === "Escape") $("#lightbox").hidden = true;
    if (e.key === "ArrowLeft") $(".lb-prev").click();
    if (e.key === "ArrowRight") $(".lb-next").click();
  });

  /* ---------------- controls ---------------- */
  $("#hide-down").checked = state.hideDown;
  $("#hide-down").onchange = (e) => { state.hideDown = e.target.checked; save(); T.hotelStops.forEach((hs) => renderCards(hs.stop)); };
  $("#price-per-night").checked = !!state.perNight;
  $("#price-per-night").onchange = (e) => { setPath(["perNight"], e.target.checked); T.hotelStops.forEach((hs) => { renderCards(hs.stop); updateMarkers(hs.stop); }); renderSummary(); };
  $("#copy-picks").onclick = async () => {
    try { await navigator.clipboard.writeText(picksText()); toast("Copied. Paste it to me ♡"); } catch (e) { prompt("Copy this:", picksText()); }
  };
  $("#reset-all").onclick = () => {
    if (!confirm("Clear all thumbs, picks and decisions, for everyone on the shared board?")) return;
    ["votes", "hotelPick", "foodPick", "decisions", "dishes"].forEach((k) => setPath([k], null)); setPath(["perNight"], null);
    state = { ...defaults, votes: {}, hotelPick: {}, foodPick: {}, decisions: {}, dishes: {} }; save();
    Object.keys(maps).forEach((k) => { maps[k].remove(); delete maps[k]; });
    Object.keys(hotelMarkers).forEach((k) => delete hotelMarkers[k]);
    $("#hide-down").checked = false; $("#price-per-night").checked = false;
    boot();
  };

  /* ---------------- boot ---------------- */
  function boot() {
    renderWho(); renderDecisions(); renderStopsGrid(); renderHotelStops(); renderFood(); renderItinerary();
    T.hotelStops.forEach((hs) => updateMarkers(hs.stop));
    showTab();
  }
  boot();
})();
