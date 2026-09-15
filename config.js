/* Live-sharing setup.
   1. Create a free Firebase project (console.firebase.google.com) and add a Realtime Database.
   2. Project settings → "Your apps" → Web app → copy the firebaseConfig object into `firebase` below.
   3. Database → Rules → paste the rules from README.md and publish.
   4. Give `room` any long random string. Anyone who has the site link can vote, so keep the link between you two.
   Leave `firebase: null` and the site simply works per device, without sharing. */
window.SYNC_CONFIG = {
  /* Password for the whole site (keeps strangers out; not real security). Changing it logs every device out.
     Set to null to make the site open. */
  password: "gjipe",
  firebase: null,
  /* firebase: {
    apiKey: "…",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "…",
    appId: "…"
  }, */
  /* Shared-board name. Leave null to reuse the password. */
  room: null
};
