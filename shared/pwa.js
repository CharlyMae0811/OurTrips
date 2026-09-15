/* Register the service worker (only over http/https, browsers refuse it for file://) and offer an install hint. */
(function () {
  if (!("serviceWorker" in navigator) || !/^https?:/.test(location.protocol)) return;
  // sw.js sits at the site root; this script is loaded from either the root page or a trip page one level down
  const swUrl = new URL(document.querySelector('link[rel="manifest"]').getAttribute("href"), location.href).href.replace(/manifest\.webmanifest$/, "sw.js");
  navigator.serviceWorker.register(swUrl).then((reg) => {
    // when a new version has installed, offer a one-tap refresh
    const offer = () => {
      if (document.querySelector(".update-toast")) return;
      const t = document.createElement("button"); t.className = "update-toast"; t.textContent = "Updated · tap to refresh ♡";
      t.onclick = () => location.reload(); document.body.appendChild(t);
    };
    if (reg.waiting) offer();
    reg.addEventListener("updatefound", () => { const nw = reg.installing; nw && nw.addEventListener("statechange", () => { if (nw.state === "installed" && navigator.serviceWorker.controller) offer(); }); });
    setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000); // check hourly while open
  }).catch((e) => console.warn("sw", e));

  // one-time "add to home screen" hint on phones
  const seen = localStorage.getItem("ourtrips-install-hint");
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (seen || standalone || !/iPhone|iPad|Android/i.test(navigator.userAgent)) return;
  const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
  const el = document.createElement("div");
  el.className = "install-hint";
  el.innerHTML = `<span>${isIOS ? "Add this to your home screen: tap <b>Share</b> then <b>Add to Home Screen</b>. It becomes a little app." : "Make this a little app: browser menu ⋮ → <b>Install app</b> (or <b>Add to Home screen</b> on older phones)."}</span><button aria-label="Dismiss">×</button>`;
  el.querySelector("button").onclick = () => { el.remove(); localStorage.setItem("ourtrips-install-hint", "1"); };
  document.body.appendChild(el);
})();
