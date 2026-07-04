// backend/middleware/auth.js
const { auth, db } = require("../firebaseAdmin");

// Verifies the Firebase ID token sent from the frontend and attaches
// the decoded user (uid, email) to req.user
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // { uid, email, ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Must run AFTER verifyToken. Confirms the caller's Firestore role is "admin".
async function requireAdmin(req, res, next) {
  try {
    const snap = await db.collection("users").doc(req.user.uid).get();
    if (!snap.exists || snap.data().role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify role" });
  }
}

module.exports = { verifyToken, requireAdmin };