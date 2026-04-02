exports.getEnrolledCourses = (req, res) => {
  const studentId = req.session?.user?.id;
  console.log("SESSION STUDENT ID:", studentId);

  const sql = `
    SELECT c.course_id, c.course_name, c.description
    FROM enrollments e
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    console.log("ENROLLED COURSES RESULT:", results); // 🔥 Debug
    if (err) return res.status(500).json({ message: "Database Error" });
    res.json(results);
  });
};