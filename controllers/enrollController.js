const db = require("../config/db");

// ✅ Enroll course
exports.enrollCourse = (req, res) => {
  const studentId = req.body.student_id; // frontend se bhejenge
  const courseId = req.body.course_id;

  if(!studentId) return res.status(400).json({ message: "Student ID missing" });
  if(!courseId) return res.status(400).json({ message: "Course ID missing" });

  // Check if already enrolled
  const checkQuery = "SELECT * FROM enrollments WHERE student_id=? AND course_id=?";
  db.query(checkQuery, [studentId, courseId], (err, result) => {
    if(err) return res.status(500).json({ message: "DB Error", error: err });

    if(result.length > 0){
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Insert enrollment
    const insertQuery = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
    db.query(insertQuery, [studentId, courseId], (err2) => {
      if(err2) return res.status(500).json({ message: "DB Error", error: err2 });

      return res.status(200).json({ message: "Enrolled successfully" });
    });
  });
};