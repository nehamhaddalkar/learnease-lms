
const db = require("../config/db");
const multer = require("multer");


// =======================
// 📦 MULTER CONFIG
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// =======================
// ✅ ADD ASSIGNMENT
// =======================
exports.addAssignment = (req, res) => {

  const { title, description, due_date, courseId, createdBy } = req.body;

  const sql = `
    INSERT INTO assignments (course_id, title, description, due_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [courseId, title, description, due_date, createdBy], (err) => {
    if (err) {
      console.log("ADD ERROR:", err);
      return res.status(500).json({ message: "Error adding assignment" });
    }

    res.json({ message: "Assignment added successfully! ✅" });
  });
};


// =======================
// ✅ GET INSTRUCTOR ASSIGNMENTS
// =======================
exports.getInstructorAssignments = (req, res) => {

  const instructorId = req.params.id;

  const sql = `
    SELECT * FROM assignments
    WHERE created_by = ?
    ORDER BY assignment_id DESC
  `;

  db.query(sql, [instructorId], (err, results) => {
    if (err) {
      console.log("INSTRUCTOR ERROR:", err);
      return res.status(500).json({ message: "Error fetching assignments" });
    }

    res.json(results);
  });
};

// =======================
// 📥 GET ALL SUBMISSIONS (INSTRUCTOR)
// =======================
exports.getAllSubmissions = (req, res) => {

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
      console.log("SUBMISSIONS ERROR:", err);
      return res.status(500).json({ message: "Error fetching submissions" });
    }

    res.json(results);
  });

};

// =======================
// 📝 ADD GRADE
// =======================
exports.addGrade = (req, res) => {

  const submissionId = req.params.id;
  const { grade } = req.body;

  const sql = `
    UPDATE submissions
    SET grade = ?
    WHERE submission_id = ?
  `;

  db.query(sql, [grade, submissionId], (err) => {
    if (err) {
      console.log("GRADE ERROR:", err);
      return res.status(500).json({ message: "Error saving grade" });
    }

    res.json({ message: "Grade saved ✅" });
  });

};

// =======================
// ✅ GET STUDENT ASSIGNMENTS
// =======================
exports.getStudentAssignments = (req, res) => {

  const studentId = req.params.id;

  const sql = `
    SELECT a.*
    FROM assignments a
    JOIN enrollments e 
      ON a.course_id = e.course_id
    WHERE e.student_id = ?
    ORDER BY a.assignment_id DESC
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.log("STUDENT ERROR:", err);
      return res.status(500).json({ message: "Error fetching assignments" });
    }

    res.json(results);
  });
};


// =======================
// 📤 UPLOAD ASSIGNMENT (FINAL)
// =======================
exports.uploadAssignment = [
  upload.single("file"),
  (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { assignment_id, student_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File not received ❌" });
    }

    if (!assignment_id || !student_id) {
      return res.status(400).json({ message: "Missing data ❌" });
    }

    //const filePath = req.file.path;
    const filePath = "/uploads/" + req.file.filename;

    const sql = `
      INSERT INTO submissions (assignment_id, student_id, file_path)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [assignment_id, student_id, filePath], (err) => {
      if (err) {
        console.log("UPLOAD ERROR:", err);
        return res.status(500).json({ message: "Upload failed ❌" });
      }

      res.json({ message: "Upload successful ✅" });
    });
  }
];