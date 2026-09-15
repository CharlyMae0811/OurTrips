/* Albania road trip, 25 Sep – 4 Oct 2026. All content data lives here. */
window.TRIP = {
  title: "Albania",
  dates: "25 September – 4 October 2026",
  nights: 9,

  /* ---------- Landing-page stops (clickable pins on the road-trip map) ---------- */
  stops: [
    {
      id: "tia", name: "Tirana Airport", kind: "start", lat: 41.4147, lng: 19.7206, day: "Day 1 · Fri 25 Sep",
      photo: "photos/scenery/turquoise-coast.jpg",
      blurb: "Land 11:00, keys to the car by noon. The whole loop starts and ends here.",
      activities: ["Pick up the rental car", "Grab lek from an ATM before leaving the terminal"]
    },
    {
      id: "kruja", name: "Kruja", kind: "stop", lat: 41.509, lng: 19.793, day: "Day 1 · lunch stop",
      photo: "photos/scenery/kruja.jpg",
      blurb: "Twenty minutes from the airport: a castle on a crag, the Skanderbeg museum and an old Ottoman bazaar that smells of coffee and wool.",
      activities: ["Kruja castle & Skanderbeg museum", "Wander the cobbled bazaar (textiles, copper, antiques)", "Terrace lunch under the castle at Panorama Kruja", "Turkish coffee and trilece in a bazaar café"]
    },
    {
      id: "radhime", name: "Radhimë / Vlorë", kind: "night", lat: 40.38, lng: 19.484, day: "Night 1 · Fri 25 Sep", hotelStop: 1,
      photo: "photos/scenery/radhime-beach-2.jpg",
      blurb: "A quiet strip of coast ten minutes south of Vlorë. Free beaches, and the sun sets straight over the bay toward the Karaburun peninsula.",
      activities: ["First swim of the trip (~17:00)", "Sunset over Vlorë Bay toward Karaburun", "Apéritif on the hotel deck", "Seafood dinner at Te Lilo or Nika"]
    },
    {
      id: "llogara", name: "Llogara Pass", kind: "stop", lat: 40.2065, lng: 19.588, day: "Day 2 · Sat 26 Sep",
      photo: "photos/scenery/llogara-pass.jpg",
      blurb: "1,000 m up through pine forest, then the road tips over the edge and the whole Riviera unrolls below you.",
      activities: ["Viewpoint stop at the top", "Short pine-forest walk (Cézar viewpoint)", "Spit-roast lamb lunch at a pass taverna", "Watch the paragliders launch"]
    },
    {
      id: "dhermi", name: "Dhërmi", kind: "night", lat: 40.152, lng: 19.639, day: "Nights 2–3 · 26–27 Sep", hotelStop: 2,
      photo: "photos/scenery/dhermi-village.jpg",
      blurb: "An old stone village on the hill with blue-domed churches, and below it Drymades beach. Walk north past the clubs and the sand is free and empty.",
      activities: ["Afternoon on the free north end of Drymades", "Evening in old Dhërmi village, dinner with a view", "St Mary's monastery above the village", "Sunset drinks, then Taverna Fevan"]
    },
    {
      id: "gjipe", name: "Gjipe Beach", kind: "stop", lat: 40.1205, lng: 19.6635, day: "Day 3 · Sun 27 Sep",
      photo: "photos/scenery/gjipe-trail.jpg",
      blurb: "Park at the top, walk 25–30 minutes down through the canyon and arrive at a wild cove with no clubs and no fees. Bring everything, there's nothing to buy.",
      activities: ["Canyon walk down to the beach", "Swim & snorkel at the clear north end", "Scramble into the slot canyon behind the beach", "Late afternoon: Vuno village and a swim at Jal"]
    },
    {
      id: "himare", name: "Himarë", kind: "night", lat: 40.101, lng: 19.745, day: "Nights 4–5 · 28–29 Sep", hotelStop: 3,
      photo: "photos/scenery/Himare.jpg",
      blurb: "The Riviera's most relaxed base: a long public beach, a harbour full of small boats, and an old village with castle ruins up the hill for sunset.",
      activities: ["Boat day: Pigeon Cave, Thunder Cave, Blue Gem, Grama Bay, St Andrea beach (4–5 h)", "Old Himarë village (Fshat): castle ruins at golden hour", "Sunset raki at Kafe Kastro", "Tavern dinner at Lefteri's"]
    },
    {
      id: "portopalermo", name: "Porto Palermo", kind: "stop", lat: 40.0617, lng: 19.792, day: "Day 5 · Tue 29 Sep",
      photo: "photos/scenery/porto-palermo-drone.jpg",
      blurb: "Ali Pasha's triangular fortress on a tiny peninsula, with a sheltered bay on either side for swimming. About 200 lek to go inside.",
      activities: ["Walk the castle walls", "Swim in the sheltered bay", "Drive on to Borsh: 7 km of near-empty pebble beach and a taverna lunch", "Bunec or Livadhi in the afternoon"]
    },
    {
      id: "qeparo", name: "Old Qeparo", kind: "stop", lat: 40.0625, lng: 19.817, day: "Day 5 · evening",
      photo: "photos/scenery/wiki-qeparo.jpg",
      blurb: "A half-abandoned stone village 2 km above the sea. Lanes, fig trees, a few restored houses and the whole Ionian below.",
      activities: ["Stroll the upper village lanes at sunset", "Seafood at Barbarossa on Qeparo beach", "Citrus and honey stalls along the Borsh road"]
    },
    {
      id: "blueeye", name: "Blue Eye (Syri i Kaltër)", kind: "stop", lat: 39.9245, lng: 20.192, day: "Day 6 · Wed 30 Sep",
      photo: "photos/scenery/blue-eye-2.jpg",
      blurb: "A 50 m deep karst spring, electric blue. Arrive after 16:00 when the tour buses have gone. Look, don't swim; the downstream pools are the tolerated (freezing) dip.",
      activities: ["Lakror lunch at Mëndra in Sarandë on the way (skip Ksamil)", "Forest path to the spring", "Cold dip in the downstream pools", "45 min on to Gjirokastër"]
    },
    {
      id: "gjirokaster", name: "Gjirokastër", kind: "night", lat: 40.0755, lng: 20.1395, day: "Night 6 · Wed 30 Sep", hotelStop: 4,
      photo: "photos/scenery/wiki-gjirokaster.jpg",
      blurb: "UNESCO stone city of slate roofs and a huge castle. Lamplit bazaar streets at night, qifqi rice balls and slow-cooked lamb.",
      activities: ["Evening stroll through the bazaar", "Gjirokastër castle & valley views", "Zekate house (Ottoman tower house)", "Kujtimi for qifqi, or Odaja for the romantic dinner"]
    },
    {
      id: "permet", name: "Përmet & Bënjë", kind: "night", lat: 40.2385, lng: 20.4425, day: "Night 7 · Thu 1 Oct", hotelStop: 5,
      photo: "photos/scenery/benje-lengarica.jpg",
      blurb: "Through the Këlcyrë gorge along the wild Vjosa to the Bënjë thermal springs: seven warm pools under an Ottoman bridge, free to enter. Sunset soak.",
      activities: ["Drive the Vjosa gorge from Gjirokastër (1 h)", "Bënjë thermal pools (29–35°C) under Ura e Kadiut", "Walk into Lengarica canyon between soaks", "Gliko and local wine in Përmet", "Optional dawn return to the springs next morning"]
    },
    {
      id: "berat", name: "Berat", kind: "night", lat: 40.706, lng: 19.944, day: "Night 8 · Fri 2 Oct", hotelStop: 6,
      photo: "photos/scenery/berat-houses.jpg",
      blurb: "The city of a thousand windows. Ottoman houses stacked up the hill, a living castle quarter, and the Gorica footbridge for the classic view at golden hour.",
      activities: ["Castle quarter & Onufri icon museum", "Mangalem and Gorica at golden hour", "Cross the Gorica footbridge", "Çobo winery tasting, 15 min out of town", "Tradita e Beratit tasting dinner"]
    },
    {
      id: "holta", name: "Holta Canyon (Option A)", kind: "option", lat: 40.842, lng: 20.127, day: "Day 9 · Sat 3 Oct",
      photo: "photos/scenery/holta-2.jpg",
      blurb: "Decision 3, option A: wade 3 km through a marble canyon with 350 m walls in cold turquoise water, then a hot sulphur soak at the Elbasan thermal baths on the way to Tirana.",
      activities: ["Berat → Gramsh → Drizë (1.5 h, last stretch gravel)", "Canyon wade, water shoes + dry bag", "Elbasan thermal baths (Llixhat) for a hot soak", "Tavë kosi lunch in its home town"]
    },
    {
      id: "bovilla", name: "Bovilla Lake (Option B)", kind: "option", lat: 41.449, lng: 19.892, day: "Day 9 · Sat 3 Oct",
      photo: "photos/scenery/Bovilla.jpg",
      blurb: "Decision 3, option B: the easy day. Berat to Tirana, then 45 min north to the Gamti viewpoint over a turquoise reservoir and a trout lunch by the lake.",
      activities: ["Short, steep hike to the Gamti viewpoint", "Trout lunch at a lake restaurant", "Afternoon free for Nöje and Blloku"]
    },
    {
      id: "tirana", name: "Tirana", kind: "night", lat: 41.3275, lng: 19.8187, day: "Night 9 · Sat 3 Oct", hotelStop: 7,
      photo: "photos/scenery/Tirana.jpg",
      blurb: "One evening in the capital: coffee and cake in the rotating Sky Club at sunset, dinner at Mullixhiu or Era, cardamom buns from Nöje for the flight.",
      activities: ["Sky Club coffee & cake ~17:30", "Dinner at Mullixhiu (book) or Era in Blloku", "Cocktails at Mugo", "Nöje buns for the morning", "Leave hotel 06:45 for the 09:00 flight"]
    }
  ],

  /* ---------- Hotel stops (group headers for the Hotels tab) ---------- */
  hotelStops: [
    { stop: 1, name: "Radhimë / Vlorë", nights: 1, dates: "Fri 25 Sep", center: [40.42, 19.487], zoom: 12,
      note: "Arrival night. We get in around 17:00 and leave by 10:00, so this is the night where a splurge buys the least. Saving here pays for a nicer room in Himarë.",
      landmarks: [
        { name: "Radhimë beach", lat: 40.380, lng: 19.484, icon: "🏖" },
        { name: "Vlorë Lungomare", lat: 40.450, lng: 19.490, icon: "🌴" },
        { name: "Llogara Pass (next morning)", lat: 40.2065, lng: 19.588, icon: "⛰" }
      ] },
    { stop: 2, name: "Dhërmi", nights: 2, dates: "Sat 26 – Mon 28 Sep", center: [40.148, 19.628], zoom: 14,
      note: "Two nights if we go with Decision 1 option A. Old village up the hill for evenings, Drymades below, Gjipe 15 min away.",
      landmarks: [
        { name: "Drymades beach (free north end)", lat: 40.157, lng: 19.612, icon: "🏖" },
        { name: "Old Dhërmi village", lat: 40.152, lng: 19.639, icon: "🏘" },
        { name: "Gjipe trailhead", lat: 40.127, lng: 19.665, icon: "🥾" },
        { name: "Jal beach", lat: 40.107, lng: 19.703, icon: "🏖" }
      ] },
    { stop: 3, name: "Himarë", nights: 2, dates: "Mon 28 – Wed 30 Sep", center: [40.095, 19.76], zoom: 13,
      note: "Boat day and Porto Palermo day. Himarë's public beach is free and right in town.",
      landmarks: [
        { name: "Himarë beach & harbour", lat: 40.101, lng: 19.745, icon: "🏖" },
        { name: "Old Himarë village (castle)", lat: 40.1055, lng: 19.752, icon: "🏰" },
        { name: "Livadhi beach", lat: 40.116, lng: 19.735, icon: "🏖" },
        { name: "Porto Palermo castle", lat: 40.0617, lng: 19.792, icon: "🏰" },
        { name: "Old Qeparo", lat: 40.0625, lng: 19.817, icon: "🏘" }
      ] },
    { stop: 4, name: "Gjirokastër", nights: 1, dates: "Wed 30 Sep", center: [40.0755, 20.138], zoom: 15,
      note: "Everything is walkable in the old town, but it is steep. Kerculla is the one that needs the car (and has the pool).",
      landmarks: [
        { name: "Gjirokastër castle", lat: 40.0705, lng: 20.140, icon: "🏰" },
        { name: "Old bazaar", lat: 40.0755, lng: 20.1395, icon: "🛍" },
        { name: "Blue Eye", lat: 39.9245, lng: 20.192, icon: "💧" }
      ] },
    { stop: 5, name: "Përmet / Bënjë", nights: 1, dates: "Thu 1 Oct", center: [40.2, 20.5], zoom: 10,
      note: "Both options are in Leskovik, 45 min south of the springs. Farma Sotira has the horses and the dinner; Melesin has the raki.",
      landmarks: [
        { name: "Bënjë thermal springs", lat: 40.2385, lng: 20.4425, icon: "♨" },
        { name: "Përmet town", lat: 40.234, lng: 20.351, icon: "🏘" },
        { name: "Berat (next day)", lat: 40.706, lng: 19.944, icon: "🚗" }
      ] },
    { stop: 6, name: "Berat", nights: 1, dates: "Fri 2 Oct", center: [40.705, 19.95], zoom: 14,
      note: "Gorica side gives you the view of Mangalem's windows; Mangalem side puts you in them.",
      landmarks: [
        { name: "Berat castle", lat: 40.7085, lng: 19.941, icon: "🏰" },
        { name: "Gorica bridge", lat: 40.704, lng: 19.946, icon: "🌉" },
        { name: "Homemade Food Lili", lat: 40.7075, lng: 19.944, icon: "🍽" }
      ] },
    { stop: 7, name: "Tirana / airport area", nights: 1, dates: "Sat 3 Oct", center: [41.38, 19.7], zoom: 10,
      note: "Decision 2: city evening in Tirana (30 min to the airport) or something sleepier out near Durrës / Fushë-Krujë. We leave the hotel at 06:45.",
      landmarks: [
        { name: "Tirana airport (TIA)", lat: 41.4147, lng: 19.7206, icon: "✈" },
        { name: "Skanderbeg Square", lat: 41.3275, lng: 19.8187, icon: "🏛" },
        { name: "Blloku (Era, Sky Club)", lat: 41.3195, lng: 19.8165, icon: "🍸" },
        { name: "Kruja castle", lat: 41.511, lng: 19.7935, icon: "🏰" }
      ] }
  ],

  /* ---------- Food options, grouped by stop/place ---------- */
  foodGroups: [
    { id: "kruja", name: "Kruja", when: "Day 1 lunch", items: [
      { id: "panorama-kruja", name: "Bar Restorant Panorama Kruja", band: "€€", meal: "Lunch", desc: "Terrace under the castle. Tavë kosi, qofte, fasule, byrek.", dish: "Tavë kosi" },
      { id: "kruja-cafe", name: "Bazaar café", band: "€", meal: "Coffee", desc: "Turkish coffee and a slice of trilece in the old bazaar.", dish: "Trilece" }
    ]},
    { id: "vlore", name: "Radhimë / Vlorë", when: "Day 1 dinner", items: [
      { id: "te-lilo", name: "Taverna Te Lilo", band: "€", meal: "Dinner", desc: "Local favourite: seafood and pasta at Albanian prices." },
      { id: "nika", name: "Restaurant Nika", band: "€–€€", meal: "Dinner", desc: "Octopus carpaccio, tuna, great value." },
      { id: "djepi", name: "Taverna Djepi", band: "€€", meal: "Dinner", desc: "Cosy, family-run, toward Orikum." },
      { id: "tre-forchette", name: "Tre Forchette", band: "€€€", meal: "Dinner", desc: "Vlorë's polished seafood and steak place. The dressed-up option." }
    ]},
    { id: "llogara", name: "Llogara Pass", when: "Day 2 lunch", items: [
      { id: "llogara-lamb", name: "Restaurant Llogara / Panorama Llogara", band: "€€", meal: "Lunch", desc: "Spit-roast lamb, fasule, kos, mountain honey. Ask if there's gullash.", dish: "Lamb, gullash" }
    ]},
    { id: "dhermi", name: "Dhërmi", when: "Days 2–3", items: [
      { id: "fevan", name: "Taverna Fevan", band: "€€", meal: "Dinner", desc: "Fish tavern in the old village with 'hidden gem' reviews. The dinner pick." },
      { id: "panorama-dhermi", name: "Panorama Dhërmi", band: "€€", meal: "Dinner / breakfast", desc: "Covered terrace on the road up to the old village. Sunset dinner or a slow breakfast." },
      { id: "royal-blue", name: "Royal Blue", band: "€€–€€€", meal: "Dinner", desc: "Top-rated, seafood and pasta, more polished." },
      { id: "luciano", name: "Luciano", band: "€€", meal: "Dinner", desc: "Old-school family fish restaurant." },
      { id: "dhermi-bakery", name: "Dhërmi bakery (for Gjipe)", band: "€", meal: "Picnic", desc: "Pack byrek and water for the Gjipe day. Nothing to buy down at the beach.", dish: "Byrek" }
    ]},
    { id: "himare", name: "Himarë & Qeparo", when: "Days 4–5", items: [
      { id: "lefteris", name: "Lefteri's Tavern", band: "€", meal: "Dinner", desc: "The oldest tavern in Himarë (1998). Moussaka, grilled fish, qofte.", dish: "Qofte" },
      { id: "pirosia", name: "Taverna Pirosia", band: "€", meal: "Dinner", desc: "Grilled meat, qofte, skewers, salads." },
      { id: "odissea", name: "Restaurant Odissea", band: "€€", meal: "Dinner", desc: "Seafood linguine, risotto, pizza on the Himarë front." },
      { id: "barbarossa", name: "Barbarossa", band: "€€", meal: "Dinner", desc: "On Qeparo beach. Seafood and pizza, the best in Qeparo." },
      { id: "kafe-kastro", name: "Kafe Kastro", band: "€", meal: "Sunset drink", desc: "Coffee or raki at sunset by the castle ruins in old Himarë." },
      { id: "delight", name: "Pasticeri Delight", band: "€", meal: "Sweet", desc: "Gelato, freddo cappuccino, cheesecake." },
      { id: "souvlaki", name: "I Love Souvlaki", band: "€", meal: "Beach lunch", desc: "Best gyros for a beach-day lunch." }
    ]},
    { id: "sarande", name: "Sarandë (in transit)", when: "Day 6 lunch", items: [
      { id: "mendra", name: "Mëndra Albanian Cuisine", band: "€", meal: "Lunch", desc: "Lakror made fresh in the open kitchen, byrek, fasule, qofte.", dish: "Lakror" }
    ]},
    { id: "gjirokaster", name: "Gjirokastër", when: "Day 6 dinner / Day 7 breakfast", items: [
      { id: "kujtimi", name: "Kujtimi", band: "€", meal: "Dinner / lunch", desc: "Cult, tiny, cheap. Qifqi, fried trout, fasule, qofte, gullash usually on.", dish: "Qifqi, gullash" },
      { id: "kuka", name: "Taverna Kuka", band: "€€", meal: "Dinner", desc: "Terrace above the bazaar. Tavë kosi, roast lamb, fërgesë.", dish: "Tavë kosi, fërgesë" },
      { id: "odaja", name: "Odaja", band: "€€", meal: "Dinner", desc: "Restored Ottoman room, slow-cooked dishes. The most romantic table in town." },
      { id: "gjk-bakery", name: "Bazaar bakery", band: "€", meal: "Breakfast", desc: "Byrek for breakfast before the castle.", dish: "Byrek" }
    ]},
    { id: "permet", name: "Përmet & Leskovik", when: "Day 7", items: [
      { id: "sotira-dinner", name: "Farma Sotira dinner", band: "€€", meal: "Dinner", desc: "Trout from their own pond, lamb, garden vegetables, house wine. Book with the cabin.", dish: "Fasule, trout" },
      { id: "antigonea", name: "Antigonea", band: "€–€€", meal: "Lunch / dinner", desc: "Traditional Përmet cooking in town: tavë Përmeti, fasule." },
      { id: "gliko", name: "Gliko shop", band: "€", meal: "Souvenir", desc: "Buy a jar. Green-walnut is the Slow Food Presidium one, wild fig is rarer. Served on a spoon with coffee.", dish: "Gliko" },
      { id: "permet-wine", name: "Local red by the carafe", band: "€", meal: "Drink", desc: "At any taverna in Përmet." }
    ]},
    { id: "berat", name: "Berat", when: "Day 8 dinner / Day 9 lunch", items: [
      { id: "tradita-dinner", name: "Tradita e Beratit", band: "€€", meal: "Dinner", desc: "~€28 set menu for two. Fixed traditional degustation. Obvious if we sleep there.", dish: "Fërgesë, petulla" },
      { id: "lili", name: "Homemade Food Lili", band: "€", meal: "Lunch / dinner", desc: "Family courtyard, dishes arrive without ordering. Book 2–3 days ahead." },
      { id: "amalia", name: "Amalia Homemade Food", band: "€", meal: "Lunch / dinner", desc: "Same format as Lili, easier to get into." },
      { id: "piccolo", name: "Piccolo Grande Amore", band: "€", meal: "Coffee", desc: "Riverside view, coffee or a light plate." }
    ]},
    { id: "day9", name: "Day 9 lunch (depends on Decision 3)", when: "Day 9", items: [
      { id: "elbasan-tave", name: "Elbasan llixha restaurant", band: "€", meal: "Lunch (Option A)", desc: "Elbasan is the home of tavë kosi. Order it at any restaurant near the thermal baths.", dish: "Tavë kosi" },
      { id: "bovilla-trout", name: "Bovilla lakeside restaurant", band: "€–€€", meal: "Lunch (Option B)", desc: "Trout lunch over the turquoise reservoir." }
    ]},
    { id: "tirana", name: "Tirana", when: "Day 9 evening / Day 10 morning", items: [
      { id: "sky-club", name: "Sky Club", band: "€", meal: "Coffee & cake", desc: "The rotating bar. Coffee and cake at sunset around 17:30." , dish: "Cake with a view" },
      { id: "mullixhiu", name: "Mullixhiu", band: "€€–€€€", meal: "Dinner", desc: "Tasting menu built on old Albanian farm cooking, near Grand Park. The one Tirana reservation to make." },
      { id: "era", name: "Era (Blloku)", band: "€€", meal: "Dinner", desc: "Fërgesë, tavë kosi, qofte, byrek all on one menu.", dish: "Fërgesë, tavë kosi" },
      { id: "oda", name: "Oda", band: "€", meal: "Dinner", desc: "Traditional dishes in a courtyard house." },
      { id: "met-kodra", name: "Met Kodra", band: "€", meal: "Snack", desc: "Grilled qofte only, tiny, cash.", dish: "Qofte" },
      { id: "mugo", name: "Mugo", band: "€€", meal: "Cocktails", desc: "Cocktails after dinner." },
      { id: "noje", name: "Nöje Bakery", band: "€", meal: "Breakfast / buns", desc: "Cardamom buns and specialty coffee (2025 city award). Check Sunday opening for the last morning; otherwise buy the evening before.", dish: "Cardamom buns" }
    ]}
  ],

  /* ---------- Dish bucket list ---------- */
  dishes: [
    ["Tavë kosi (lamb baked in yoghurt)", "Elbasan (its home), Era, Taverna Kuka, Kruja Panorama"],
    ["Fërgesë (peppers, tomato, cottage cheese)", "Era, Oda, Taverna Kuka, Berat set menu"],
    ["Gullash (slow beef stew)", "Kujtimi, Llogara Pass, Lefteri's (ask)"],
    ["Fasule (bean stew)", "Kujtimi, Antigonea, Farma Sotira"],
    ["Qofte", "Met Kodra, Kujtimi, Pirosia, Lefteri's"],
    ["Byrek / lakror", "Mëndra (Sarandë), bazaar bakeries in Berat & Gjirokastër"],
    ["Qifqi (rice balls)", "Kujtimi, Gjirokastër"],
    ["Gliko (fruit preserve)", "Përmet, buy a jar"],
    ["Trilece", "Kruja bazaar café"],
    ["Petulla (fried dough)", "Tradita e Beratit breakfast"],
    ["Cardamom buns & specialty coffee", "Nöje, Tirana"],
    ["Cake with a view", "Sky Club, Tirana"]
  ],

  /* ---------- Decisions ---------- */
  decisions: [
    { id: "d1", title: "Riviera pacing", q: "Two bases or one?",
      a: { label: "Two bases", text: "2 nights Dhërmi + 2 nights Himarë. Old Dhërmi village evenings, Gjipe on the doorstep, then a different bay further south. One extra check-in." },
      b: { label: "One base", text: "4 nights in Himarë. Unpack once, everything within 30–40 min. Dhërmi and Gjipe become a day trip; no sunset evenings in old Dhërmi." } },
    { id: "d2", title: "The last night (3 Oct)", q: "City or quiet?",
      a: { label: "Tirana city", text: "Nöje, Sky Club, Mullixhiu or Era all walkable. 30 min to the airport." },
      b: { label: "Near the airport", text: "Something sleepy in Fushë-Krujë or Durrës. 10–35 min to the airport, but a Tirana dinner means a drive back. (Bregu Village Spa is sold out.)" } },
    { id: "d3", title: "Day 9 activity (3 Oct)", q: "Canyon or lake?",
      a: { label: "Holta Canyon + Elbasan springs", text: "1.5 h from Berat, ~3 h wading a marble canyon in cold turquoise water, then a hot sulphur soak at Elbasan on the way to Tirana. Spectacular, adventurous, tiring, weather-dependent." },
      b: { label: "Bovilla + Gamti", text: "Berat to Tirana (2 h), then 45 min north to the Gamti viewpoint and a trout lunch by the lake. Easy, scenic, afternoon free for Nöje and Blloku." } }
  ],

  /* ---------- Day by day ---------- */
  days: [
    { n: 1, date: "Fri 25 Sep", title: "Arrive, Kruja, the Vlorë coast", hotelStop: 1, foodGroups: ["kruja", "vlore"], photo: "photos/scenery/kruja.jpg",
      plan: [["11:00", "Land at Tirana (TIA), car by 12:00"], ["Lunch", "Kruja: castle, Skanderbeg museum, Ottoman bazaar, terrace lunch"], ["~17:00", "Arrive Radhimë (2.5 h), first swim"], ["Sunset", "Over Vlorë Bay toward Karaburun, apéritif on the deck"]],
      mood: "Arrival day. Go slow, salt in your hair by dusk." },
    { n: 2, date: "Sat 26 Sep", title: "Llogara Pass & Dhërmi", hotelStop: 2, foodGroups: ["llogara", "dhermi"], photo: "photos/scenery/llogara-pass.jpg",
      plan: [["Morning", "Llogara Pass viewpoint (1,000 m), the whole Riviera below"], ["Lunch", "Spit-roast lamb at a pass taverna"], ["Afternoon", "Drymades: walk north past the clubs to the free stretch"], ["Evening", "Old Dhërmi village, dinner with a view"]],
      mood: "The big reveal: the sea unrolls beneath you on the way down." },
    { n: 3, date: "Sun 27 Sep", title: "Gjipe", hotelStop: 2, foodGroups: ["dhermi"], photo: "photos/scenery/gjipe-trail.jpg",
      plan: [["Morning", "Gjipe: park at the top, 25–30 min walk down through the canyon"], ["Midday", "Free, wild, no clubs. Swim, snorkel, laze"], ["Walk", "Into the slot canyon behind the beach"], ["Late", "Vuno village, then a swim at Jal"]],
      mood: "Barefoot wild-beach day, our own hidden cove. Pack food, water, shade, water shoes." },
    { n: 4, date: "Mon 28 Sep", title: "Boat day & Himarë", hotelStop: 3, foodGroups: ["himare"], photo: "photos/scenery/wiki-grama.jpg",
      plan: [["Move", "30 min south to Himarë, settle in"], ["Boat", "4–5 h along Karaburun: Pigeon Cave, Thunder Cave, Blue Gem, Grama Bay, St Andrea beach. Small group ~€40–60 pp, private ~€200–350"], ["Evening", "Old Himarë village: castle ruins, sunset, tavern dinner"]],
      mood: "A day on the water, caves glowing blue. Weather fallback: swap with Day 5." },
    { n: 5, date: "Tue 29 Sep", title: "Porto Palermo, Borsh & Qeparo", hotelStop: 3, foodGroups: ["himare"], photo: "photos/scenery/porto-palermo-drone.jpg",
      plan: [["Morning", "Porto Palermo castle (~200 lek), swim in the sheltered bay"], ["Lunch", "Borsh: 7 km of near-empty pebble beach, taverna lunch"], ["Afternoon", "Bunec or Livadhi, whichever is quieter"], ["Evening", "Old Qeparo stone village at sunset"]],
      mood: "Empty pebble bays and a stone village all to ourselves." },
    { n: 6, date: "Wed 30 Sep", title: "Blue Eye & Gjirokastër", hotelStop: 4, foodGroups: ["sarande", "gjirokaster"], photo: "photos/scenery/blue-eye-2.jpg",
      plan: [["Late AM", "Leave the coast via Sarandë, lakror at Mëndra. Skip Ksamil"], ["After 16:00", "Syri i Kaltër once the buses are gone (~50–100 lek + parking)"], ["Walk", "Forest path to the spring, cold dip in the downstream pools"], ["Evening", "45 min to Gjirokastër, dinner in the bazaar"]],
      mood: "Electric-blue spring, then lamplit stone streets." },
    { n: 7, date: "Thu 1 Oct", title: "Gjirokastër, Përmet & Bënjë", hotelStop: 5, foodGroups: ["gjirokaster", "permet"], photo: "photos/scenery/benje-lengarica.jpg",
      plan: [["Morning", "Gjirokastër castle, Zekate house, the bazaar, lunch"], ["Midday", "1 h to Përmet through the Këlcyrë gorge along the Vjosa"], ["Sunset", "Bënjë thermal springs under Ura e Kadiut: 7 pools at 29–35°C, free, ~200 lek parking"], ["Between soaks", "Walk into the Lengarica canyon"]],
      mood: "Warm mineral pools at sunset, the most romantic soak of the trip. Towel and sandals, slippery rocks." },
    { n: 8, date: "Fri 2 Oct", title: "Bënjë again & Berat", hotelStop: 6, foodGroups: ["berat"], photo: "photos/scenery/berat-houses.jpg",
      plan: [["08:00", "Optional dawn return to the springs, you'll have them alone"], ["Midday", "2.5–3 h to Berat"], ["Golden hour", "Castle quarter, Mangalem & Gorica, the Gorica bridge"], ["Evening", "Wine on a terrace over the river; Çobo winery optional"]],
      mood: "The city of a thousand windows, gold at sunset." },
    { n: 9, date: "Sat 3 Oct", title: "Canyon or lake, then Tirana", hotelStop: 7, foodGroups: ["day9", "tirana"], decision: "d3", photo: "photos/scenery/Gamti.jpg",
      plan: [["Option A", "Berat → Drizë (1.5 h), Holta Canyon wade, Elbasan hot soak, Tirana (1 h)"], ["Option B", "Berat → Tirana (2 h), Bovilla lake & Gamti viewpoint, trout lunch"], ["17:30", "Sky Club coffee & cake"], ["Evening", "Dinner at Mullixhiu or Era, Nöje for cardamom buns"]],
      mood: "Last full day. Pick your adventure, then a pretty Tirana evening." },
    { n: 10, date: "Sun 4 Oct", title: "Fly home", hotelStop: null, foodGroups: [], photo: "photos/scenery/llogara-pass.jpg",
      plan: [["06:45", "Leave the hotel"], ["09:00", "Depart TIA"]],
      mood: "The one early alarm of the whole trip." }
  ],

  practical: [
    ["Cash", "Lek for parking, small tavernas, Bënjë, Blue Eye, Met Kodra."],
    ["Gear", "Water shoes for Holta, Gjipe, Bënjë and every pebble beach. Dry bag for Holta."],
    ["Book ahead", "Homemade Food Lili (2–3 days), Mullixhiu, Farma Sotira dinner, the boat."],
    ["Weather", "Small rain risk in early October. Sensitive days: the boat (Day 4) and Holta (Day 9). Fallbacks: swap boat to Day 5, swap Holta for Bovilla."],
    ["Roads", "Llogara is winding but good. Holta's last stretch is gravel, fine in a normal car."],
    ["Skip", "Ksamil, Sarandë beaches, the Dhërmi strip clubs, Vlorë city beach."],
    ["Budget", "Boat €80–120 small group or €200–350 private. Entries and parking under €20 total. Fuel ~€120–150 for the loop."]
  ]
};
