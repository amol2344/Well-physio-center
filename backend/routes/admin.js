// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const { db } = require("../firebaseAdmin");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const VALID_ROLES = ["patient", "admin", "sysadmin"];

// GET /api/admin/users — list all users (admin only)
router.get("/users", verifyToken, requireAdmin, async (req, res) => {
  try {
    const snap = await db.collection("users").get();
    const users = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST /api/admin/set-role — change a user's role (admin only)
// body: { targetUid: string, newRole: "user" | "admin" | "sysadmin" }
router.post("/set-role", verifyToken, requireAdmin, async (req, res) => {
  const { targetUid, newRole } = req.body;

  if (!targetUid || !VALID_ROLES.includes(newRole)) {
    return res.status(400).json({ error: "Invalid targetUid or new Role" });
  }

  // Prevent an admin from accidentally demoting/locking themselves out
  if (targetUid === req.user.uid && newRole !== "admin") {
    return res.status(400).json({ error: "You cannot change your own role" });
  }

  try {
    await db.collection("users").doc(targetUid).update({ role: newRole });
    res.json({ success: true, targetUid, newRole });
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

module.exports = router;