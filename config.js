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
  firebase: {
    apiKey: "AIzaSyAroakI1ZCu8YZXmgfi0xAusRuviHt7yUE",
    authDomain: "ourtripsctvb.firebaseapp.com",
    databaseURL: "https://ourtripsctvb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ourtripsctvb",
    storageBucket: "ourtripsctvb.firebasestorage.app",
    messagingSenderId: "416305156672",
    appId: "1:416305156672:web:74d3e7702bc730fc0285a5"
  },
  /* Shared-board name. Leave null to reuse the password. */
  room: null
};
