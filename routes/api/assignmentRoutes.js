
// const express = require("express");
// const router = express.Router();
// const db = require("../../config/db");


// // ✅ CREATE ASSIGNMENT (FIXED)
// router.post("/create", async (req, res) => {
//     const { title, description, due_date, courseId, createdBy } = req.body;

//     try {
//         await db.query(
//             `INSERT INTO assignments (title, description, due_date, course_id, created_by)
//              VALUES (?, ?, ?, ?, ?)`,
//             [title, description, due_date, courseId, createdBy]
//         );

//         res.json({ message: "Assignment Created Successfully ✅" });
//     } catch (err) {
//         console.error("CREATE ERROR:", err);
//         res.status(500).json({ message: "Error creating assignment" });
//     }
// });


// // ✅ INSTRUCTOR ASSIGNMENTS (FIXED)
// router.get("/instructor/:id", async (req, res) => {
//     try {
//         const [rows] = await db.query(
//             `SELECT * 
//              FROM assignments 
//              WHERE created_by = ?
//              ORDER BY assignment_id DESC`,
//             [req.params.id]
//         );

//         res.json(rows);
//     } catch (err) {
//         console.error("INSTRUCTOR ERROR:", err);
//         res.status(500).json({ message: "Error fetching instructor assignments" });
//     }
// });


// // ✅ STUDENT ASSIGNMENTS (ONLY ENROLLED) 🔥 FIXED
// router.get("/student/:id", async (req, res) => {
//     try {
//         const [rows] = await db.query(`
//             SELECT a.*
//             FROM assignments a
//             JOIN enrollments e 
//                 ON a.course_id = e.course_id
//             WHERE e.student_id = ?
//             ORDER BY a.assignment_id DESC
//         `, [req.params.id]);

//         res.json(rows);
//     } catch (err) {
//         console.error("STUDENT ERROR:", err);
//         res.status(500).json({ message: "Error fetching student assignments" });
//     }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const db = require("../../config/db");
// const multer = require("multer");


// // =======================
// // 📦 MULTER CONFIG
// // =======================
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // make sure folder exists
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });


// // =======================
// // ✅ CREATE ASSIGNMENT
// // =======================
// router.post("/create", (req, res) => {

//     const { title, description, due_date, courseId, createdBy } = req.body;

//     db.query(
//         `INSERT INTO assignments (title, description, due_date, course_id, created_by)
//          VALUES (?, ?, ?, ?, ?)`,
//         [title, description, due_date, courseId, createdBy],
//         (err) => {

//             if (err) {
//                 console.error("CREATE ERROR:", err);
//                 return res.status(500).json({ message: "Error creating assignment" });
//             }

//             res.json({ message: "Assignment Created Successfully ✅" });
//         }
//     );
// });


// // =======================
// // ✅ INSTRUCTOR ASSIGNMENTS
// // =======================
// router.get("/instructor/:id", (req, res) => {

//     db.query(
//         `SELECT * FROM assignments 
//          WHERE created_by = ?
//          ORDER BY assignment_id DESC`,
//         [req.params.id],
//         (err, results) => {

//             if (err) {
//                 console.error("INSTRUCTOR ERROR:", err);
//                 return res.status(500).json({ message: "Error fetching instructor assignments" });
//             }

//             res.json(results);
//         }
//     );
// });


// // =======================
// // ✅ STUDENT ASSIGNMENTS (ONLY ENROLLED)
// // =======================
// router.get("/student/:id", (req, res) => {

//     db.query(`
//         SELECT a.*
//         FROM assignments a
//         JOIN enrollments e 
//             ON a.course_id = e.course_id
//         WHERE e.student_id = ?
//         ORDER BY a.assignment_id DESC
//     `, [req.params.id], (err, results) => {

//         if (err) {
//             console.error("STUDENT ERROR:", err);
//             return res.status(500).json({ message: "Error fetching student assignments" });
//         }

//         res.json(results);
//     });
// });


// // =======================
// // 📤 UPLOAD ASSIGNMENT (STUDENT)
// // =======================
// router.post("/upload", upload.single("file"), (req, res) => {

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const { assignment_id, student_id } = req.body;

//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded ❌" });
//     }

//     if (!assignment_id || !student_id) {
//         return res.status(400).json({ message: "Missing data ❌" });
//     }

//     const filePath = req.file.path;

//     const sql = `
//         INSERT INTO submissions (assignment_id, student_id, file_path)
//         VALUES (?, ?, ?)
//     `;

//     db.query(sql, [assignment_id, student_id, filePath], (err) => {
//         if (err) {
//             console.error("UPLOAD DB ERROR:", err);
//             return res.status(500).json({ message: "Upload failed ❌" });
//         }

//         res.json({ message: "Upload successful ✅" });
//     });
// });


// module.exports = router;



const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const multer = require("multer");
const path = require("path");

// =======================
// 📦 Multer Config
// =======================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// =======================
// ✅ CREATE ASSIGNMENT
// =======================
router.post("/create", (req, res) => {
    const { title, description, due_date, courseId, createdBy } = req.body;

    db.query(
        `INSERT INTO assignments (title, description, due_date, course_id, created_by)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, due_date, courseId, createdBy],
        (err) => {
            if (err) {
                console.error("CREATE ERROR:", err);
                return res.status(500).json({ message: "Error creating assignment" });
            }
            res.json({ message: "Assignment Created Successfully ✅" });
        }
    );
});

// =======================
// ✅ INSTRUCTOR ASSIGNMENTS
// =======================
router.get("/instructor/:id", (req, res) => {
    db.query(
        `SELECT * FROM assignments 
         WHERE created_by = ?
         ORDER BY assignment_id DESC`,
        [req.params.id],
        (err, results) => {
            if (err) {
                console.error("INSTRUCTOR ERROR:", err);
                return res.status(500).json({ message: "Error fetching instructor assignments" });
            }
            res.json(results);
        }
    );
});

// =======================
// ✅ STUDENT ASSIGNMENTS (ENROLLED)
// =======================
router.get("/student/:id", (req, res) => {
    db.query(`
        SELECT a.*
        FROM assignments a
        JOIN enrollments e 
            ON a.course_id = e.course_id
        WHERE e.student_id = ?
        ORDER BY a.assignment_id DESC
    `, [req.params.id], (err, results) => {
        if (err) {
            console.error("STUDENT ERROR:", err);
            return res.status(500).json({ message: "Error fetching student assignments" });
        }
        res.json(results);
    });
});

// =======================
// 📥 GET ALL SUBMISSIONS (INSTRUCTOR)
// =======================
router.get("/submissions", (req, res) => {

    const instructorId = req.session?.user?.id;

    if (!instructorId) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const sql = `
        SELECT s.submission_id, s.file_path, s.grade,
               u.full_name AS student_name,
               a.title AS assignment_title,
               c.course_name
        FROM submissions s
        JOIN users u ON s.student_id = u.user_id
        JOIN assignments a ON s.assignment_id = a.assignment_id
        JOIN courses c ON a.course_id = c.course_id
        WHERE a.created_by = ?
        ORDER BY s.submission_id DESC
    `;

    db.query(sql, [instructorId], (err, results) => {
        if (err) {
            console.error("SUBMISSIONS ERROR:", err);
            return res.status(500).json({ message: "Error fetching submissions" });
        }

        res.json(results);
    });

});

// =======================
// 📝 ADD GRADE
// =======================
router.post("/grade/:id", (req, res) => {

    const submissionId = req.params.id;
    const { grade } = req.body;

    const sql = `
        UPDATE submissions
        SET grade = ?
        WHERE submission_id = ?
    `;

    db.query(sql, [grade, submissionId], (err) => {
        if (err) {
            console.error("GRADE ERROR:", err);
            return res.status(500).json({ message: "Error saving grade" });
        }

        res.json({ message: "Grade saved successfully ✅" });
    });

});

// =======================
// 📤 UPLOAD ASSIGNMENT (STUDENT)
// =======================
router.post("/upload", upload.single("file"), (req, res) => {
    const { assignment_id, student_id } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded ❌" });
    if (!assignment_id || !student_id) return res.status(400).json({ message: "Missing data ❌" });

    const filePath = "/uploads/" + req.file.filename;

    const sql = `
        INSERT INTO submissions (assignment_id, student_id, file_path)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [assignment_id, student_id, filePath], (err) => {
        if (err) {
            console.error("UPLOAD DB ERROR:", err);
            return res.status(500).json({ message: "Upload failed ❌" });
        }

        res.json({ message: "Upload successful ✅", filePath });
    });
});

module.exports = router;