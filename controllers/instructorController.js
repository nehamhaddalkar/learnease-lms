// controllers/instructorController.js
const db = require("../config/db");

exports.getInstructorCourses = (req, res) => {
  const { instructor_id } = req.params;
  db.query("SELECT * FROM courses WHERE instructor_id = ?", [instructor_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching instructor courses" });
    res.json(results);
  });
};
