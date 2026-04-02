
// // 

// const express = require("express");
// const router = express.Router();
// const db = require("../../config/db");

// // GET all instructors
// router.get("/", (req, res) => {

//     const sql = `
//     SELECT user_id, full_name
//     FROM users
//     WHERE role = 'instructor'
//     `;

//     db.query(sql, (err, result) => {

//         if (err) {
//             console.error("❌ DATABASE ERROR:", err);  // full error in terminal
//             return res.status(500).json({
//                 success: false,
//                 message: "Database error",
//                 error: err.message   // real error in browser
//             });
//         }

//         if (result.length === 0) {
//             return res.json({
//                 success: true,
//                 message: "No instructors found",
//                 data: []
//             });
//         }

//         // success response
//         res.json({
//             success: true,
//             count: result.length,
//             data: result
//         });

//     });

// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const db = require("../../config/db");


// 🔥 1. GET ALL INSTRUCTORS
router.get("/", (req, res) => {

    const sql = `
    SELECT user_id, full_name
    FROM users
    WHERE role = 'instructor'
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.error("❌ DATABASE ERROR:", err);
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.json({
                success: true,
                message: "No instructors found",
                data: []
            });
        }

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    });

});


// 🔥 2. GET COURSES ASSIGNED TO INSTRUCTOR (VERY IMPORTANT)
router.get("/courses/:id", (req, res) => {

    const instructorId = req.params.id;

    const sql = `
    SELECT id, name
    FROM courses
    WHERE instructorId = ?
    `;

    db.query(sql, [instructorId], (err, result) => {

        if (err) {
            console.error("❌ ERROR:", err);
            return res.status(500).json({
                success: false,
                message: "Error fetching courses"
            });
        }

        res.json(result); // 👈 frontend dropdown ke liye simple array

    });

});


module.exports = router;