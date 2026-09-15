/* Activity catalogue for the "build your own itinerary" view, plus the packing list.
   Each activity: id, day (default day 1–10), stop (pin on the home map), name, desc, dur (rough), kind,
   maps (Google Maps link), optional (true = starts in the "more ideas" pool, not in the day plan),
   decision/opt (Day 9 A/B). */
const gm = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const gmll = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

window.ACTIVITIES = [
  /* ---------- Day 1: arrival, Kruja, Radhimë ---------- */
  { id: "land", day: 1, stop: "tia", time: "11:00", name: "Land at Tirana (TIA), pick up the car", desc: "Immigration, bags, rental desk. Get lek from the ATM in the terminal.", dur: "1 h", kind: "logistics", maps: gm("Tirana International Airport Nënë Tereza") },
  { id: "drive-kruja", day: 1, stop: "kruja", name: "Drive to Kruja", desc: "20 min north of the airport, up the hill.", dur: "25 min", kind: "drive", maps: gm("Krujë") },
  { id: "kruja-castle", day: 1, stop: "kruja", name: "Kruja castle & Skanderbeg museum", desc: "Castle on a crag with views over the plain to the sea; the museum inside tells the Skanderbeg story. ~500 lek.", dur: "1–1.5 h", kind: "sight", maps: gm("Kruja Castle") },
  { id: "kruja-bazaar", day: 1, stop: "kruja", name: "Old Ottoman bazaar", desc: "Cobbled lane of wooden shops: kilims, copper, antiques, honey. Trilece and Turkish coffee in a café.", dur: "45 min", kind: "wander", maps: gm("Old Bazaar Kruja") },
  { id: "kruja-lunch", day: 1, stop: "kruja", name: "Terrace lunch at Panorama Kruja", desc: "Under the castle walls. Tavë kosi, qofte, byrek.", dur: "1 h", kind: "food", maps: gm("Bar Restorant Panorama Kruja") },
  { id: "kruja-ethno", day: 1, stop: "kruja", optional: true, name: "National Ethnographic Museum", desc: "Inside the castle, an 18th-century Ottoman house showing how a well-off family lived. Small, charming.", dur: "30 min", kind: "sight", maps: gm("National Ethnographic Museum Kruja") },
  { id: "drive-radhime", day: 1, stop: "radhime", name: "Drive Kruja → Radhimë", desc: "2.5 h down the motorway past Durrës and Fier, then along the bay south of Vlorë.", dur: "2 h 40", kind: "drive", maps: gm("Radhimë") },
  { id: "radhime-swim", day: 1, stop: "radhime", time: "~17:00", name: "First swim of the trip", desc: "Straight in. Radhimë's pebble beaches are free and quiet in late September.", dur: "1 h", kind: "swim", maps: gmll(40.380, 19.484) },
  { id: "radhime-sunset", day: 1, stop: "radhime", name: "Sunset over Vlorë Bay toward Karaburun", desc: "Apéritif on the hotel deck or the beach, sun dropping behind the peninsula.", dur: "45 min", kind: "romance", maps: gmll(40.380, 19.484) },
  { id: "zvernec", day: 1, stop: "radhime", optional: true, name: "Zvërnec monastery & Narta lagoon", desc: "13th-century Byzantine monastery on a pine island reached by a wooden footbridge, 25 min north of Vlorë. Best if we're early.", dur: "1.5 h", kind: "sight", maps: gm("Zvërnec Monastery") },
  { id: "orikum", day: 1, stop: "radhime", optional: true, name: "Orikum & the Marmiroi church", desc: "Tiny 12th-century church in the fields near the ancient city of Oricum, 10 min south.", dur: "45 min", kind: "sight", maps: gm("Marmiroi Church Orikum") },
  { id: "vlore-lungomare", day: 1, stop: "radhime", optional: true, name: "Evening stroll on the Vlorë Lungomare", desc: "The seafront promenade: palm trees, gelato, everyone out walking. 15 min from Radhimë.", dur: "1 h", kind: "wander", maps: gm("Lungomare Vlorë") },

  /* ---------- Day 2: Llogara, Drymades, old Dhërmi ---------- */
  { id: "drive-llogara", day: 2, stop: "llogara", name: "Drive Radhimë → Llogara Pass", desc: "Up through Dukat and the pine forest; the pass is at 1,027 m.", dur: "40 min", kind: "drive", maps: gm("Llogara Pass") },
  { id: "llogara-view", day: 2, stop: "llogara", name: "Llogara viewpoint", desc: "Park at the top, walk to the edge: the whole Riviera unrolls 1,000 m below.", dur: "30 min", kind: "view", maps: gm("Llogara Pass viewpoint") },
  { id: "llogara-lunch", day: 2, stop: "llogara", name: "Spit-roast lamb lunch at the pass", desc: "Restaurant Llogara or Panorama Llogara: lamb, fasule, kos, mountain honey. Ask for gullash.", dur: "1 h", kind: "food", maps: gm("Restaurant Llogara") },
  { id: "llogara-walk", day: 2, stop: "llogara", optional: true, name: "Pine-forest walk to the Cézar viewpoint", desc: "Short flat trail through black pines to a second lookout. Paragliders launch nearby.", dur: "45 min", kind: "hike", maps: gm("Llogara National Park") },
  { id: "drive-dhermi", day: 2, stop: "dhermi", name: "Drive down to Dhërmi", desc: "Hairpins down past Palasë; stop at the lay-bys for photos.", dur: "35 min", kind: "drive", maps: gm("Dhërmi") },
  { id: "drymades", day: 2, stop: "dhermi", name: "Afternoon on Drymades beach", desc: "Walk north past the clubs to the free stretch. White pebbles, clear water, almost nobody in late September.", dur: "3 h", kind: "swim", maps: gm("Drymades Beach") },
  { id: "dhermi-village", day: 2, stop: "dhermi", name: "Evening in old Dhërmi village", desc: "Stone lanes, blue-domed churches, sunset over the sea. Dinner at Taverna Fevan or Panorama.", dur: "3 h", kind: "romance", maps: gm("Dhërmi old village") },
  { id: "dhermi-monastery", day: 2, stop: "dhermi", optional: true, name: "St Mary's monastery above the village", desc: "15-min walk up from old Dhërmi to the whitewashed monastery and its terrace.", dur: "45 min", kind: "sight", maps: gm("Monastery of St. Mary Dhërmi") },
  { id: "palase", day: 2, stop: "dhermi", optional: true, name: "Palasë beach", desc: "Long, wide and emptier than Drymades, right under the pass. Watch the paragliders land.", dur: "2 h", kind: "swim", maps: gm("Palasë Beach") },
  { id: "pirates-cave", day: 2, stop: "dhermi", optional: true, name: "Kayak to the Pirates' Cave", desc: "Rent a kayak on Drymades and paddle 20 min north to the sea cave. Calm mornings only.", dur: "1.5 h", kind: "adventure", maps: gm("Shpella e Pirateve Dhërmi") },

  /* ---------- Day 3: Gjipe, Vuno, Jal ---------- */
  { id: "dhermi-bakery", day: 3, stop: "gjipe", time: "morning", name: "Pack a picnic from the Dhërmi bakery", desc: "Byrek, fruit, lots of water. Nothing to buy at Gjipe.", dur: "20 min", kind: "food", maps: gm("Dhërmi bakery") },
  { id: "gjipe-walk", day: 3, stop: "gjipe", name: "Walk down the canyon to Gjipe beach", desc: "Park at the top (small fee), 25–30 min down a dirt track and through the canyon mouth. Water shoes.", dur: "30 min", kind: "hike", maps: gm("Gjipe Beach") },
  { id: "gjipe-beach", day: 3, stop: "gjipe", name: "Gjipe beach: swim, snorkel, laze", desc: "Wild cove between 100 m cliffs, no clubs, free. The north end has the clearest water for snorkelling.", dur: "3–4 h", kind: "swim", maps: gm("Gjipe Beach") },
  { id: "gjipe-canyon", day: 3, stop: "gjipe", name: "Scramble into Gjipe canyon", desc: "Behind the beach the canyon narrows to a slot with light beams. Go as far as it stays easy.", dur: "45 min", kind: "adventure", maps: gm("Gjipe Canyon") },
  { id: "vuno", day: 3, stop: "gjipe", name: "Coffee in Vuno village", desc: "Half-abandoned stone village above Jal, a café on the square, old men playing dominoes.", dur: "45 min", kind: "wander", maps: gm("Vuno Albania") },
  { id: "jal", day: 3, stop: "gjipe", name: "Late swim at Jal", desc: "Two bays; the north end is free and quieter. Water is glassy in the evening.", dur: "1.5 h", kind: "swim", maps: gm("Jale Beach") },
  { id: "gjipe-kayak", day: 3, stop: "gjipe", optional: true, name: "Kayak Jal → Gjipe instead of walking", desc: "Rent at Jal and paddle 25 min around the headland to arrive at Gjipe from the sea.", dur: "2 h", kind: "adventure", maps: gm("Jale Beach") },
  { id: "aquarium", day: 3, stop: "gjipe", optional: true, name: "Aquarium cove (Akuariumi)", desc: "Tiny rocky inlet between Jal and Himarë with impossibly clear water. Short scramble down.", dur: "1 h", kind: "swim", maps: gm("Aquarium Beach Himarë") },
  { id: "dhermi-sunset-drink", day: 3, stop: "gjipe", optional: true, name: "Sunset drink on a Drymades sundeck", desc: "Most clubs are closing for the season; the ones still open are quiet and happy to see us.", dur: "1 h", kind: "romance", maps: gm("Drymades Beach") },

  /* ---------- Day 4: Himarë & the boat ---------- */
  { id: "drive-himare", day: 4, stop: "himare", name: "Drive Dhërmi → Himarë, check in", desc: "30 min south along the coast road.", dur: "35 min", kind: "drive", maps: gm("Himarë") },
  { id: "boat", day: 4, stop: "himare", name: "Small-group boat along Karaburun", desc: "4–5 h from Himarë harbour: Pigeon Cave, Thunder Cave, the Blue Gem cave, Grama Bay with its ancient inscriptions, a swim stop at St Andrea beach. ~€40–60 pp. Book the day before, morning departure.", dur: "4–5 h", kind: "adventure", maps: gm("Himarë harbour") },
  { id: "himare-castle", day: 4, stop: "himare", name: "Old Himarë village (Fshat) & castle at golden hour", desc: "Drive or walk up to the old village: castle ruins, tiny churches, the whole bay below in evening light.", dur: "1.5 h", kind: "romance", maps: gm("Himarë Castle") },
  { id: "kafe-kastro", day: 4, stop: "himare", name: "Sunset raki at Kafe Kastro", desc: "Coffee or raki on the terrace by the castle ruins.", dur: "45 min", kind: "food", maps: gm("Kafe Kastro Himarë") },
  { id: "himare-dinner", day: 4, stop: "himare", name: "Tavern dinner in Himarë", desc: "Lefteri's (oldest in town), Pirosia for grilled meat, or Odissea on the front.", dur: "2 h", kind: "food", maps: gm("Lefteri's Tavern Himarë") },
  { id: "himare-beach", day: 4, stop: "himare", optional: true, name: "Himarë town beach", desc: "Long, free, right in front of the promenade. Good for an easy hour after the boat.", dur: "1 h", kind: "swim", maps: gm("Himarë Beach") },
  { id: "llamani", day: 4, stop: "himare", optional: true, name: "Llamani beach", desc: "Small pebble cove just north of town, sheltered, few people.", dur: "1.5 h", kind: "swim", maps: gm("Llamani Beach") },
  { id: "gelato", day: 4, stop: "himare", optional: true, name: "Freddo & gelato at Pasticeri Delight", desc: "Post-boat sugar on the Himarë front.", dur: "30 min", kind: "food", maps: gm("Pasticeri Delight Himarë") },

  /* ---------- Day 5: Porto Palermo, Borsh, Qeparo ---------- */
  { id: "porto-palermo", day: 5, stop: "portopalermo", name: "Porto Palermo castle", desc: "Ali Pasha's triangular fortress on a small peninsula, ~200 lek. Walk the walls, then swim in the sheltered bay beside it.", dur: "1.5 h", kind: "sight", maps: gm("Porto Palermo Castle") },
  { id: "porto-palermo-swim", day: 5, stop: "portopalermo", name: "Swim in Porto Palermo bay", desc: "Flat, sheltered, turquoise. The old submarine tunnel is across the bay.", dur: "1 h", kind: "swim", maps: gm("Porto Palermo Bay") },
  { id: "borsh", day: 5, stop: "portopalermo", name: "Borsh beach & taverna lunch", desc: "7 km of pebble beach backed by olive groves, almost empty. Lunch at a beach taverna.", dur: "2.5 h", kind: "swim", maps: gm("Borsh Beach") },
  { id: "bunec", day: 5, stop: "portopalermo", name: "Afternoon at Bunec or Livadhi", desc: "Pick the quieter one. Bunec is a horseshoe cove south of Borsh; Livadhi is north of Himarë.", dur: "2 h", kind: "swim", maps: gm("Bunec Beach") },
  { id: "qeparo-old", day: 5, stop: "qeparo", name: "Old Qeparo at sunset", desc: "Half-abandoned stone village 2 km above the sea, lanes, fig trees, a few restored houses.", dur: "1.5 h", kind: "romance", maps: gm("Qeparo Fshat") },
  { id: "barbarossa", day: 5, stop: "qeparo", name: "Dinner at Barbarossa, Qeparo beach", desc: "Seafood and pizza, the best table in Qeparo.", dur: "2 h", kind: "food", maps: gm("Barbarossa Qeparo") },
  { id: "borsh-castle", day: 5, stop: "portopalermo", optional: true, name: "Borsh castle & waterfall", desc: "Ruined castle and a small mosque above Borsh village; a waterfall in the valley behind. 30 min detour.", dur: "1 h", kind: "sight", maps: gm("Borsh Castle") },
  { id: "submarine", day: 5, stop: "portopalermo", optional: true, name: "Porto Palermo submarine tunnel", desc: "Cold-war submarine base bored into the headland. Sometimes open for a short tour.", dur: "45 min", kind: "sight", maps: gm("Porto Palermo submarine base") },
  { id: "pilur", day: 5, stop: "himare", optional: true, name: "Pilur village viewpoint", desc: "Vertiginous 20-min drive up from Himarë to a village at 800 m; the view down the coast is absurd.", dur: "1.5 h", kind: "view", maps: gm("Pilur Albania") },

  /* ---------- Day 6: Sarandë, Blue Eye, Gjirokastër ---------- */
  { id: "drive-sarande", day: 6, stop: "blueeye", name: "Drive Himarë → Sarandë", desc: "1 h along the coast past Borsh and Lukovë. Skip Ksamil.", dur: "1 h", kind: "drive", maps: gm("Sarandë") },
  { id: "mendra", day: 6, stop: "blueeye", name: "Lakror lunch at Mëndra, Sarandë", desc: "Lakror made fresh in the open kitchen, byrek, fasule, qofte. Cheap and excellent.", dur: "1 h", kind: "food", maps: gm("Mëndra Albanian Cuisine Sarandë") },
  { id: "lekuresi", day: 6, stop: "blueeye", optional: true, name: "Lëkurësi castle above Sarandë", desc: "Ruined castle with a café-restaurant and the view over Sarandë bay to Corfu.", dur: "45 min", kind: "view", maps: gm("Lëkurësi Castle") },
  { id: "drive-blueeye", day: 6, stop: "blueeye", name: "Drive to the Blue Eye, arrive after 16:00", desc: "45 min inland. Late afternoon the tour buses are gone. Small entry + parking fee, cash.", dur: "45 min", kind: "drive", maps: gm("Syri i Kaltër Blue Eye") },
  { id: "blueeye", day: 6, stop: "blueeye", name: "Blue Eye (Syri i Kaltër)", desc: "50 m deep karst spring, electric blue. Look from the platform; swimming in the eye is prohibited.", dur: "1 h", kind: "sight", maps: gm("Syri i Kaltër Blue Eye") },
  { id: "blueeye-dip", day: 6, stop: "blueeye", optional: true, name: "Cold dip in the downstream pools", desc: "A few hundred metres downstream the river pools are tolerated for swimming. Around 12°C. Brave.", dur: "30 min", kind: "swim", maps: gm("Syri i Kaltër Blue Eye") },
  { id: "drive-gjk", day: 6, stop: "gjirokaster", name: "Drive to Gjirokastër", desc: "45 min up the Drino valley.", dur: "45 min", kind: "drive", maps: gm("Gjirokastër") },
  { id: "gjk-bazaar-eve", day: 6, stop: "gjirokaster", name: "Evening stroll through the bazaar", desc: "Lamplit stone streets, slate roofs, the castle looming above. Dinner at Kujtimi (qifqi) or Odaja (romantic).", dur: "2.5 h", kind: "romance", maps: gm("Gjirokastër Old Bazaar") },

  /* ---------- Day 7: Gjirokastër, Vjosa, Bënjë ---------- */
  { id: "gjk-castle", day: 7, stop: "gjirokaster", name: "Gjirokastër castle", desc: "Huge fortress with the clock tower, the captured US spy plane and views down the valley. ~400 lek.", dur: "1.5 h", kind: "sight", maps: gm("Gjirokastër Castle") },
  { id: "zekate", day: 7, stop: "gjirokaster", name: "Zekate house", desc: "Grand Ottoman tower house with painted rooms; the classic Gjirokastër interior.", dur: "45 min", kind: "sight", maps: gm("Zekate House Gjirokastër") },
  { id: "gjk-bazaar", day: 7, stop: "gjirokaster", name: "Bazaar & lunch", desc: "Byrek at a bakery, browse the stone-roofed shops, coffee.", dur: "1.5 h", kind: "wander", maps: gm("Gjirokastër Old Bazaar") },
  { id: "cold-war-tunnel", day: 7, stop: "gjirokaster", optional: true, name: "Cold War tunnel", desc: "Hoxha-era bunker tunnel under the castle, 59 rooms, short guided visit.", dur: "30 min", kind: "sight", maps: gm("Cold War Tunnel Gjirokastër") },
  { id: "skenduli", day: 7, stop: "gjirokaster", optional: true, name: "Skënduli house", desc: "Another tower house, less restored and more lived-in than Zekate; the owner shows you around.", dur: "45 min", kind: "sight", maps: gm("Skenduli House Gjirokastër") },
  { id: "drive-permet", day: 7, stop: "permet", name: "Drive Gjirokastër → Përmet through the Këlcyrë gorge", desc: "1 h along the Vjosa, Europe's last wild river; the gorge section is the best bit of road on the trip.", dur: "1 h", kind: "drive", maps: gm("Këlcyrë Gorge") },
  { id: "permet-town", day: 7, stop: "permet", name: "Përmet: gliko, wine, the river", desc: "Buy a jar of gliko (green walnut or wild fig), taste the local red, walk the riverbank.", dur: "1 h", kind: "wander", maps: gm("Përmet") },
  { id: "benje", day: 7, stop: "permet", time: "sunset", name: "Bënjë thermal springs under Ura e Kadiut", desc: "Seven stone pools at 29–35°C beside the Lengarica river, under an Ottoman bridge. Free, ~200 lek parking, no changing rooms, slippery rocks.", dur: "2 h", kind: "swim", maps: gm("Bënjë Thermal Baths") },
  { id: "lengarica", day: 7, stop: "permet", name: "Walk into the Lengarica canyon", desc: "From the pools, wade or walk upstream into the narrow canyon between soaks.", dur: "1 h", kind: "adventure", maps: gm("Lengarica Canyon") },
  { id: "permet-rafting", day: 7, stop: "permet", optional: true, name: "Vjosa rafting (half day)", desc: "Gentle class II rafting on the Vjosa from Përmet, if we want a morning on the water instead of the castle.", dur: "3 h", kind: "adventure", maps: gm("Përmet rafting") },
  { id: "leusa", day: 7, stop: "permet", optional: true, name: "Leusë church", desc: "Frescoed 18th-century church in a village above Përmet, 15 min up.", dur: "45 min", kind: "sight", maps: gm("Leusë Church Përmet") },
  { id: "sotira-horses", day: 7, stop: "permet", optional: true, name: "Horse ride at Farma Sotira", desc: "If we sleep at the farm: a ride through the fields and river valley before dinner.", dur: "1 h", kind: "adventure", maps: gm("Farma Sotira Leskovik") },
  { id: "sotira-dinner", day: 7, stop: "permet", optional: true, name: "Farm dinner at Farma Sotira", desc: "Their own trout, lamb, garden vegetables, house wine. Book with the cabin.", dur: "2 h", kind: "food", maps: gm("Farma Sotira Leskovik") },

  /* ---------- Day 8: Bënjë again, Berat ---------- */
  { id: "benje-dawn", day: 8, stop: "permet", time: "08:00", optional: true, name: "Dawn return to the springs", desc: "You'll have the pools to yourselves, mist on the river.", dur: "1.5 h", kind: "swim", maps: gm("Bënjë Thermal Baths") },
  { id: "drive-berat", day: 8, stop: "berat", name: "Drive Përmet → Berat", desc: "2.5–3 h via Këlcyrë, Ballsh and the oil fields; the last hour follows the Osum.", dur: "3 h", kind: "drive", maps: gm("Berat") },
  { id: "berat-castle", day: 8, stop: "berat", name: "Berat castle quarter (Kalaja)", desc: "A living citadel: people still live inside the walls. Byzantine churches, the Onufri icon museum, views over both quarters.", dur: "2 h", kind: "sight", maps: gm("Berat Castle") },
  { id: "mangalem", day: 8, stop: "berat", name: "Mangalem & Gorica at golden hour", desc: "Walk the lanes of the 'thousand windows' side, then cross the Gorica footbridge for the classic view back.", dur: "1.5 h", kind: "romance", maps: gm("Gorica Bridge Berat") },
  { id: "berat-dinner", day: 8, stop: "berat", name: "Dinner: Tradita e Beratit tasting menu", desc: "~€28 for two, traditional degustation in a restored Ottoman house. Or book Lili / Amalia.", dur: "2 h", kind: "food", maps: gm("Tradita e Beratit") },
  { id: "cobo", day: 8, stop: "berat", optional: true, name: "Çobo winery tasting", desc: "Family winery 15 min out of town, tasting on the terrace.", dur: "1.5 h", kind: "food", maps: gm("Çobo Winery") },
  { id: "osum-canyon", day: 8, stop: "berat", optional: true, name: "Osum canyon & Bogovë waterfall", desc: "1 h south of Berat, a 13-km canyon with viewpoints from the road and a waterfall walk. Only if we leave Përmet early.", dur: "4 h", kind: "adventure", maps: gm("Osum Canyon") },
  { id: "berat-ethno", day: 8, stop: "berat", optional: true, name: "Ethnographic museum", desc: "In an 18th-century house on the way up to the castle.", dur: "45 min", kind: "sight", maps: gm("Ethnographic Museum Berat") },

  /* ---------- Day 9: Holta or Bovilla, then Tirana ---------- */
  { id: "lili-lunch", day: 9, stop: "berat", optional: true, name: "Lunch at Homemade Food Lili (book 2–3 days ahead)", desc: "Family courtyard in Berat; dishes just arrive. Only fits Option B timing.", dur: "1.5 h", kind: "food", maps: gm("Homemade Food Lili Berat") },
  { id: "drive-holta", day: 9, stop: "holta", decision: "d3", opt: "a", name: "A · Drive Berat → Gramsh → Drizë", desc: "1.5 h; the last stretch is gravel but fine in a normal car.", dur: "1.5 h", kind: "drive", maps: gm("Kanioni i Holtës") },
  { id: "holta", day: 9, stop: "holta", decision: "d3", opt: "a", name: "A · Holta Canyon wade", desc: "3 km of marble canyon, 350 m walls narrowing to 10 m, wading chest-deep in turquoise water. Water shoes, dry bag, a warm layer for after. Skip after heavy rain.", dur: "3 h", kind: "adventure", maps: gm("Holta Canyon Gramsh") },
  { id: "elbasan-llixha", day: 9, stop: "holta", decision: "d3", opt: "a", name: "A · Hot sulphur soak at the Elbasan thermal baths", desc: "Llixhat e Elbasanit: 56°C sulphur springs feeding spa-hotel pools. Day entry at one of the hotels. Tavë kosi for lunch, this is its home town.", dur: "2 h", kind: "swim", maps: gm("Llixhat e Elbasanit") },
  { id: "drive-tirana-a", day: 9, stop: "tirana", decision: "d3", opt: "a", name: "A · Drive Elbasan → Tirana", desc: "1 h over the Krrabë pass or through the tunnel.", dur: "1 h", kind: "drive", maps: gm("Tirana") },
  { id: "drive-tirana-b", day: 9, stop: "bovilla", decision: "d3", opt: "b", name: "B · Drive Berat → Bovilla", desc: "2 h to Tirana then 45 min north on a rough road to the reservoir.", dur: "2 h 45", kind: "drive", maps: gm("Bovilla Lake") },
  { id: "gamti", day: 9, stop: "bovilla", decision: "d3", opt: "b", name: "B · Gamti mountain viewpoint", desc: "Short, steep 30–40 min climb to the ledge over the turquoise reservoir.", dur: "1.5 h", kind: "hike", maps: gm("Gamti Mountain viewpoint Bovilla") },
  { id: "bovilla-lunch", day: 9, stop: "bovilla", decision: "d3", opt: "b", name: "B · Trout lunch at the lake", desc: "Lakeside restaurant, grilled trout, the water below.", dur: "1.5 h", kind: "food", maps: gm("Bovilla Lake restaurant") },
  { id: "sky-club", day: 9, stop: "tirana", time: "17:30", name: "Coffee & cake at Sky Club", desc: "The rotating bar on top of the Sky Tower, one full turn per hour, sunset over the city.", dur: "1 h", kind: "romance", maps: gm("Sky Club Tirana") },
  { id: "tirana-dinner", day: 9, stop: "tirana", name: "Dinner at Mullixhiu or Era", desc: "Mullixhiu: tasting menu of old farm cooking by Grand Park, book ahead. Era in Blloku: fërgesë, tavë kosi, qofte, byrek on one menu.", dur: "2 h", kind: "food", maps: gm("Mullixhiu Tirana") },
  { id: "mugo", day: 9, stop: "tirana", optional: true, name: "Cocktails at Mugo", desc: "After dinner, Blloku.", dur: "1 h", kind: "food", maps: gm("Mugo Tirana") },
  { id: "noje-eve", day: 9, stop: "tirana", name: "Buy Nöje buns for the morning", desc: "Cardamom buns and a coffee bag from Nöje on Rruga e Kosovarëve, in case they're not open at 06:00.", dur: "20 min", kind: "food", maps: gm("Nöje Bakery Tirana") },
  { id: "blloku", day: 9, stop: "tirana", optional: true, name: "Wander Blloku & Skanderbeg Square", desc: "The old party-elite quarter is now the café district; the square is huge and lit at night.", dur: "1 h", kind: "wander", maps: gm("Blloku Tirana") },
  { id: "bunkart", day: 9, stop: "tirana", optional: true, name: "Bunk'Art 2", desc: "Cold-war bunker museum under the ministry buildings by the square. Dark, well done.", dur: "1 h", kind: "sight", maps: gm("Bunk'Art 2") },
  { id: "dajti", day: 9, stop: "tirana", optional: true, name: "Dajti Express cable car", desc: "15-min cable car up Mount Dajti for the view over Tirana. Only if there's time and clear sky.", dur: "2 h", kind: "view", maps: gm("Dajti Ekspres") },

  /* ---------- Day 10: fly ---------- */
  { id: "leave-hotel", day: 10, stop: "tia", time: "06:15–06:45", name: "Leave the hotel", desc: "We want to be at the airport by 07:00, two hours before the flight. From Tirana centre leave by 06:20; from Fushë-Krujë by 06:45.", dur: "30 min", kind: "logistics", maps: gm("Tirana International Airport Nënë Tereza") },
  { id: "airport", day: 10, stop: "tia", time: "07:00", name: "At the airport, return the car", desc: "Car return, bag drop, security. Nöje buns and a coffee at the gate.", dur: "2 h", kind: "logistics", maps: gm("Tirana International Airport Nënë Tereza") },
  { id: "fly", day: 10, stop: "tia", time: "09:00", name: "Fly home ♡", desc: "Salt in the hair, gliko in the bag.", dur: "", kind: "logistics", maps: gm("Tirana International Airport Nënë Tereza") }
];

/* ---------- Packing list (20 kg total between us, so: light) ----------
   list: "hers" (CT), "his" (VB) or "mutual" (one of us brings it; assign on the page). */
window.PACKING = [
  /* hers */
  { id: "p-dresses", list: "hers", name: "3 evening dresses / cute outfits", note: "Old Dhërmi, Gjirokastër, Berat, Tirana dinners", cat: "Clothes" },
  { id: "p-sporty", list: "hers", name: "Sporty sets ×3", note: "Gjipe, Holta, Gamti, canyon walks", cat: "Clothes" },
  { id: "p-bikinis", list: "hers", name: "Bikinis ×3", note: "One always drying", cat: "Clothes" },
  { id: "p-cover", list: "hers", name: "Beach cover-up / sarong", note: "Doubles as a Bënjë towel-skirt", cat: "Clothes" },
  { id: "p-jeans", list: "hers", name: "Light trousers or jeans ×1", cat: "Clothes" },
  { id: "p-tops", list: "hers", name: "Tops ×5", cat: "Clothes" },
  { id: "p-cardigan", list: "hers", name: "Cardigan / light jacket", note: "Llogara is 1,000 m up; October evenings", cat: "Clothes" },
  { id: "p-sandals", list: "hers", name: "Sandals (walkable) + one nicer pair", cat: "Shoes" },
  { id: "p-trainers", list: "hers", name: "Trainers", note: "Gamti, castles, cobbles", cat: "Shoes" },
  { id: "p-watershoes", list: "hers", name: "Water shoes", note: "Holta, Gjipe, Bënjë, every pebble beach", cat: "Shoes" },
  { id: "p-underwear-h", list: "hers", name: "Underwear ×10, socks ×4", cat: "Clothes" },
  { id: "p-sleep-h", list: "hers", name: "Sleepwear", cat: "Clothes" },
  { id: "p-charger", list: "hers", name: "Dual charger", note: "Charges both phones", cat: "Tech" },
  { id: "p-powerbank", list: "hers", name: "Power bank", cat: "Tech" },
  { id: "p-film", list: "hers", name: "Film camera + 3–4 rolls", note: "Golden hour in Berat, the boat", cat: "Cameras" },
  { id: "p-digicam", list: "hers", name: "Little old digital camera + charger/batteries", cat: "Cameras" },
  { id: "p-actioncam", list: "hers", name: "Action cam + mounts + spare battery", note: "Holta, Gjipe canyon, the caves", cat: "Cameras" },
  { id: "p-tripod", list: "hers", name: "Mini tripod", note: "Sunset photos of the two of us", cat: "Cameras" },
  { id: "p-sd", list: "hers", name: "SD cards + card reader", cat: "Cameras" },
  { id: "p-makeup", list: "hers", name: "Make-up (small), hair ties, brush", cat: "Toiletries" },
  { id: "p-skincare", list: "hers", name: "Skincare in travel sizes", cat: "Toiletries" },
  { id: "p-jewellery", list: "hers", name: "A little jewellery for the evenings", cat: "Extras" },
  /* his */
  { id: "p-toothbrush", list: "his", name: "Toothbrush for both of us + toothpaste", note: "VB is in charge of teeth", cat: "Toiletries" },
  { id: "p-shirts", list: "his", name: "Shirts ×2 (linen) for dinners", cat: "Clothes" },
  { id: "p-tshirts", list: "his", name: "T-shirts ×5", cat: "Clothes" },
  { id: "p-shorts", list: "his", name: "Shorts ×2 + swim shorts ×2", cat: "Clothes" },
  { id: "p-trousers", list: "his", name: "Trousers ×1", cat: "Clothes" },
  { id: "p-sport-his", list: "his", name: "Sporty kit ×2", note: "Quick-dry for the canyon", cat: "Clothes" },
  { id: "p-jacket", list: "his", name: "Light jacket / hoodie", cat: "Clothes" },
  { id: "p-underwear-v", list: "his", name: "Underwear ×10, socks ×4", cat: "Clothes" },
  { id: "p-shoes-v", list: "his", name: "Trainers + sandals + water shoes", cat: "Shoes" },
  { id: "p-razor", list: "his", name: "Razor, deodorant", cat: "Toiletries" },
  { id: "p-cap", list: "his", name: "Cap & sunglasses", cat: "Extras" },
  { id: "p-headphones", list: "his", name: "Headphones + phone cable", cat: "Tech" },
  /* mutual: one of us brings it */
  { id: "p-passports", list: "mutual", name: "Passports, driving licence, booking printouts", note: "Licence for the rental", cat: "Documents" },
  { id: "p-cash", list: "mutual", name: "Cash: euros + a card that works abroad", note: "Lek from the airport ATM", cat: "Documents" },
  { id: "p-insurance", list: "mutual", name: "Travel insurance details, EHIC", cat: "Documents" },
  { id: "p-adapter", list: "mutual", name: "EU plug adapter (if needed)", note: "Albania uses type C/F", cat: "Tech" },
  { id: "p-drybag", list: "mutual", name: "Dry bag (10 l)", note: "Holta canyon, the boat", cat: "Adventure" },
  { id: "p-towels", list: "mutual", name: "2 quick-dry towels", note: "Bënjë has no changing rooms", cat: "Adventure" },
  { id: "p-snorkel", list: "mutual", name: "Snorkel mask ×1–2", note: "Gjipe north end, the caves", cat: "Adventure" },
  { id: "p-daypack", list: "mutual", name: "Small daypack", note: "Gjipe walk, castles", cat: "Adventure" },
  { id: "p-picnic", list: "mutual", name: "Folding picnic blanket + reusable bottles", cat: "Adventure" },
  { id: "p-sunscreen", list: "mutual", name: "Sunscreen SPF50 + after-sun", cat: "Toiletries" },
  { id: "p-firstaid", list: "mutual", name: "Mini first-aid: plasters, painkillers, antihistamine, motion-sickness tabs for the boat", cat: "Toiletries" },
  { id: "p-shower", list: "mutual", name: "Shampoo, shower gel (shared, travel size)", cat: "Toiletries" },
  { id: "p-mosquito", list: "mutual", name: "Mosquito repellent", note: "Bënjë and the farm at dusk", cat: "Toiletries" },
  { id: "p-headtorch", list: "mutual", name: "Head torch", note: "Gjipe canyon, walking back from the springs", cat: "Adventure" },
  { id: "p-phoneholder", list: "mutual", name: "Phone holder for the car + aux/USB cable", cat: "Tech" },
  { id: "p-offline", list: "mutual", name: "Offline maps downloaded (Google Maps: Albania)", note: "Signal drops on the Riviera road", cat: "Tech" },
  { id: "p-cards", list: "mutual", name: "A deck of cards", note: "Farm evenings", cat: "Extras" },
  { id: "p-laundry", list: "mutual", name: "Small laundry soap / a few sink-wash sachets", note: "How we survive on 20 kg", cat: "Extras" },
  { id: "p-tote", list: "mutual", name: "Foldable tote bag", note: "Gliko jars, bakery runs", cat: "Extras" }
];
