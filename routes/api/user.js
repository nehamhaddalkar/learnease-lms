// routes/api/user.js
const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const db = require("../../config/db");

// ----------------- Admin Routes -----------------
router.get("/", adminController.getAllUsers);
router.delete("/:userId", adminController.deleteUser);

// ----------------- Logged-in User Profile -----------------
// Simple session middleware
function authMiddleware(req,res,next){
    if(!req.session || !req.session.user) return res.status(401).json({error:"Not logged in"});
    next();
}

// GET profile
router.get("/profile", authMiddleware, (req,res)=>{
    const userId = req.session.user.user_id;

    const sql = "SELECT user_id, full_name, email, role, photo FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, result)=>{
        if(err) return res.status(500).json({error:"Database error"});
        if(result.length === 0) return res.status(404).json({error:"User not found"});
        const user = result[0];
        res.json({
            name: user.full_name,
            email: user.email,
            role: user.role,
            photo: user.photo || null
        });
    });
});

// PUT profile (update)
router.put("/profile", authMiddleware, (req,res)=>{
    const userId = req.session.user.user_id;
    const {name, email, role} = req.body;

    const sql = "UPDATE users SET full_name=?, email=?, role=? WHERE user_id=?";
    db.query(sql, [name, email, role, userId], (err)=>{
        if(err) return res.status(500).json({error:"Database error"});
        res.json({message:"Profile updated successfully"});
    });
});

module.exports = router;