const admin = require("firebase-admin");

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT is missing");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app =
  admin.getApps().length > 0
    ? admin.getApp()
    : admin.initializeApp({
        credential: admin.cert(serviceAccount),
      });

const db = admin.firestore(app);
const auth = admin.auth(app);

module.exports = { admin, db, auth };