const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // 👈 adjust if your DB path different

// Contact Form Route
router.post('/', (req, res) => {

    const { name, email, message } = req.body;

    const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }
        res.send("Message Sent Successfully!");
    });

});

module.exports = router;