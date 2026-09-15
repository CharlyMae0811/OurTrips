/* Live sharing via Firebase Realtime Database.
   Does nothing unless config.js defines window.SYNC_CONFIG (see README.md). */
(async function () {
  const cfg = window.SYNC_CONFIG;
  const App = window.App;
  const room = cfg && (cfg.room || cfg.password);
  if (!cfg || !cfg.firebase || !cfg.firebase.databaseURL || !room) {
    App && App.setLive(false, "this device only · set up config.js to share live");
    return;
  }
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const { getDatabase, ref, onValue, update, set, get, goOnline } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
    const app = initializeApp(cfg.firebase);
    const db = getDatabase(app);
    const slug = (window.TRIP && window.TRIP.slug) || "trip";
    const root = ref(db, `rooms/${String(room).replace(/[.#$\[\]\/]/g, "_")}/${slug}`);

    // first contact: if the shared board is empty but this device has picks, seed the board with them
    const snap = await get(root);
    if (!snap.exists()) {
      const local = App.localShared();
      const hasSomething = Object.values(local).some((v) => v && typeof v === "object" ? Object.keys(v).length : v);
      if (hasSomething) await set(root, local);
    }

    window.Sync = {
      ready: true,
      write(path, value) {
        // path like ["votes", "duka-hotel", "Charlotte"] -> multi-path update, so two people never overwrite each other
        const key = path.map((p) => String(p).replace(/[.#$\[\]\/]/g, "_")).join("/");
        return update(root, { [key]: value === undefined ? null : value }).catch((e) => { console.error(e); App.setLive(false, "offline · changes saved on this device"); });
      }
    };
    onValue(root, (s) => { App.applyRemote(s.val()); App.setLive(true); }, (err) => { console.error(err); App.setLive(false, "could not connect · check the database rules"); });
    goOnline(db);
  } catch (e) {
    console.error("sync failed", e);
    App && App.setLive(false, "offline · this device only");
  }
})();
