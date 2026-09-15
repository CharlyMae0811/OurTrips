# Albania, 25 Sep – 4 Oct 2026

A little site for planning our road trip: route map, hotel options with thumbs and picks, food, and the day-by-day that follows whatever we choose.

It is plain HTML/CSS/JS, no build step. Open `index.html` to use it on one device; follow the two setups below to host it and share picks live.

## 1. Put it on GitHub and host it

```bash
cd /Users/maedler/Albania
git remote add origin git@github.com:YOUR-USER/albania-trip.git   # create the repo on github.com first (empty, no README)
git push -u origin main
```

Hosting options:

- GitHub Pages (Settings → Pages → "Deploy from a branch" → `main` / root). Free only for public repos; a private repo needs GitHub Pro. The site then lives at `https://YOUR-USER.github.io/albania-trip/`.
- Keep the repo private and use Netlify or Cloudflare Pages instead: sign in with GitHub, "Import from Git", pick this repo, no build command, publish directory `/`. Free, and every `git push` redeploys in about a minute.

The `source/` folder (original Word doc and PowerPoint) is ignored by git because the .docx is 400 MB, far over GitHub's file limit.

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
5. Open `config.js`, paste it as the `firebase` value, and change `room` to any long random string (it acts as the password: only people who have the site link can vote).
6. Commit and push. Open the site: the badge in the top right turns green, "live · shared with everyone on the link".

Each device is asked for a first name the first time it votes, so thumbs show who liked what. Picks, stars, decisions and the dish checklist are shared.

The Firebase config is not secret (it ships in every web app), the rules are what protect the data. On the free Spark plan this uses a rounding error of the quota.

## Editing content

- `data.js`: stops, activities, food places, itinerary days, decisions, practical notes.
- `hotels.js`: the hotel list (generated from the Word table). Each entry has `stop`, `price`, `nights`, `lat`/`lng` (`approx: true` shows the "map pin approximate" badge), `photos`.
- `routes.js`: road geometry for the map (from OSRM).
- Photos: `photos/hotels/<hotel-id>/`, `photos/scenery/`.
