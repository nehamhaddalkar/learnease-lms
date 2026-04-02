// controllers/studentController.js
const db = require("../config/db");

exports.enrollCourse = (req, res) => {
  const { student_id, course_id } = req.body;
  db.query("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)", [student_id, course_id], (err) => {
    if (err) return res.status(500).json({ message: "Error enrolling course" });
    res.json({ message: "Enrolled successfully!" });
  });
};

exports.getEnrolledCourses = (req, res) => {
  const { student_id } = req.params;
  db.query(
    "SELECT c.* FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.student_id = ?",
    [student_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching enrolled courses" });
      res.json(results);
    }
  );
};
