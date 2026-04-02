/*const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // your controller

// Get all users
router.get('/users', userController.getAllUsers);

// Get pending users
router.get('/users/pending', userController.getPendingUsers);

// Approve user
router.post('/users/approve', userController.approveUser);

// Delete user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;

router.post('/set-role', (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  const newRole = role.toLowerCase();

  const sql = "UPDATE users SET role = ? WHERE id = ?";
  db.query(sql, [newRole, userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    res.json({ message: "Role updated successfully" });
  });
});*/


//corrected code but for adding the jwt need to change it
const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");

// Get all users
router.get("/users", adminController.getAllUsers);

// Get pending users
router.get("/pending-users", adminController.getPendingUsers);

// Approve user
router.post("/approve-user", adminController.approveUser);

// Delete user
router.delete("/delete-user/:userId", adminController.deleteUser);

module.exports = router;

