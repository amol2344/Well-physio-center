// backend/firebaseAdmin.js
const admin = require("firebase-admin");

// Option A: local file (dev only, never commit this file)
// const serviceAccount = require("./serviceAccountKey.json");

// Option B: env var (recommended for production / Vercel/Render backend hosting)
// Store the ENTIRE JSON key content as one env var: FIREBASE_SERVICE_ACCOUNT
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };