# Our trips · CT ♡ VB

One small site per trip: route map, hotel options with thumbs and picks, food, a drag-and-drop day-by-day with Google Maps links, and a his/hers/mutual packing list. `index.html` at the root lists the trips; each trip lives in its own folder (`albania-2026/`) and shares the styling and logic in `shared/`.

Plain HTML/CSS/JS, no build step. Open `index.html` to use it on one device; follow the two setups below to host it and share picks live.

## Adding a trip

Copy `albania-2026/` to a new folder, replace `data.js`, `hotels.js`, `routes.js`, `activities.js` and the photos, set `slug` in `data.js`, and add an entry to `trips.js`. Each trip gets its own shared board (`rooms/<room>/<slug>`) automatically.

## 1. Put it on GitHub and host it

```bash
cd /Users/maedler/Albania
git remote add origin https://github.com/CharlyMae0811/OurTrips.git   # create the repo on github.com first (empty, no README)
git push -u origin main
```

Hosting options:

- GitHub Pages (Settings → Pages → "Deploy from a branch" → `main` / root). Free only for public repos; a private repo needs GitHub Pro. The site then lives at `https://charlymae0811.github.io/OurTrips/`.
- Keep the repo private and use Netlify or Cloudflare Pages instead: sign in with GitHub, "Import from Git", pick this repo, no build command, publish directory `/`. Free, and every `git push` redeploys in about a minute.

The `source/` folder (original Word doc and PowerPoint) is ignored by git because the .docx is 400 MB, far over GitHub's file limit.

## Password

`config.js` has a `password`. Every device is asked for it once (plus a first name for the votes) and remembers it. It keeps strangers and search engines out; it is not real security, the files are still public. Change the word to log everyone out. Set it to `null` for no gate.

## 2. Share picks live between devices

Without this step every browser keeps its own picks. With it, everyone who opens the link sees the same board and changes appear live.

1. Go to https://console.firebase.google.com, "Add project" (any name, Analytics off).
2. Build → Realtime Database → Create database → pick a European location → start in **locked mode**.
3. Rules tab → replace with the rules below → Publish. This lets anyone who knows the room name read and write only that room.

   ```json
   {
     "rules": {
       "rooms": {
         "$room": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```

4. Project overview → gear → Project settings → "Your apps" → Web (`</>`) → register the app (no hosting) → copy the `firebaseConfig` object.
5. Open `config.js` and paste it as the `firebase` value. The shared board is named after the password (or set `room` explicitly).
6. Commit and push. Open the site: the badge in the top right turns green, "live · shared with everyone on the link".

Each device is asked for a first name the first time it votes, so thumbs show who liked what. Picks, stars, decisions, the dish checklist, the day-by-day plan and the packing list are all shared.

The Firebase config is not secret (it ships in every web app), the rules are what protect the data. On the free Spark plan this uses a rounding error of the quota.

## Editing content

- `data.js`: stops, activities, food places, itinerary days, decisions, practical notes.
- `hotels.js`: the hotel list (generated from the Word table). Each entry has `stop`, `price`, `nights`, `lat`/`lng` (`approx: true` shows the "map pin approximate" badge), `photos`.
- `routes.js`: road geometry for the map (from OSRM).
- Photos: `photos/hotels/<hotel-id>/`, `photos/scenery/`.
