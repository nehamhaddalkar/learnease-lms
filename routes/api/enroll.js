// POST /api/enroll
app.post("/api/enroll", (req, res) => {
  const studentId = req.session?.user?.id; // ✅ use session
  const { courseId } = req.body;           // only courseId from frontend

  if (!studentId) {
    return res.status(401).json({ message: "Login required" });
  }

  // 1️⃣ Check if already enrolled
  const checkQuery = "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?";
  db.query(checkQuery, [studentId, courseId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // 2️⃣ Insert enrollment
    const insertQuery = "INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, NOW())";
    db.query(insertQuery, [studentId, courseId], (err2, result) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ message: "Enrollment failed" });
      }

      res.status(200).json({ message: "Enrolled successfully" });
    });
  });
});