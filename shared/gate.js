/* Simple password gate. Not real security (the files are still public), just keeps strangers and
   search engines out. Set `password` in config.js; changing it logs every device out. */
(function () {
  const cfg = window.SYNC_CONFIG || {};
  const pw = cfg.password;
  if (!pw) return; // no password configured: site is open
  const AUTH = "ourtrips-auth", ME = "ourtrips-me";
  if (localStorage.getItem(AUTH) === pw) return;

  document.documentElement.classList.add("locked");
  const us = window.US || { her: { initials: "CT" }, him: { initials: "VB" } };
  const el = document.createElement("div");
  el.className = "gate";
  el.innerHTML = `
    <form class="gate-card" autocomplete="off">
      <div class="gate-mono">${us.her.initials}<span>♡</span>${us.him.initials}</div>
      <p class="gate-sub">Our trips. Just for the two of us.</p>
      <label>Password<input type="password" name="pw" autocomplete="current-password" autofocus required /></label>
      <label>Your first name<input type="text" name="me" autocomplete="given-name" maxlength="24" placeholder="so we know who voted" value="${(localStorage.getItem(ME) || "").replace(/"/g, "")}" /></label>
      <button type="submit" class="btn btn-primary">Come in ♡</button>
      <div class="gate-err" hidden>That's not it. Try again?</div>
    </form>`;
  const mount = () => {
    document.body.appendChild(el);
    const form = el.querySelector("form");
    form.onsubmit = (e) => {
      e.preventDefault();
      const v = form.pw.value.trim();
      if (v !== pw) { el.querySelector(".gate-err").hidden = false; form.pw.value = ""; form.pw.focus(); el.classList.add("shake"); setTimeout(() => el.classList.remove("shake"), 500); return; }
      localStorage.setItem(AUTH, pw);
      const name = form.me.value.trim().replace(/[.#$\[\]\/]/g, "").slice(0, 24);
      if (name) localStorage.setItem(ME, name);
      el.classList.add("open");
      setTimeout(() => { el.remove(); document.documentElement.classList.remove("locked"); location.reload(); }, 450);
    };
  };
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
})();
