const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");

// Serve admin dashboard page
router.get("/admin-dashboard.html", (req, res) => {
  res.sendFile("admin-dashboard.html", { root: "./views" });
});

// API endpoints
router.get("/api/pending-users", adminController.getPendingUsers);
router.get("/api/all-users", adminController.getAllUsers);
router.post("/api/approve-user", adminController.approveUser);
router.delete("/api/delete-user/:userId", adminController.deleteUser);

module.exports = router;
