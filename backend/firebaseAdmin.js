const { initializeApp, cert, getApps, getApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT is missing");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(serviceAccount),
    });

const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };