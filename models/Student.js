// models/Student.js
const db = require("../config/db");

const Student = {
  enroll: (studentId, courseId, callback) => {
    const sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
    db.query(sql, [studentId, courseId], callback);
  },

  getCourses: (studentId, callback) => {
    const sql = `
      SELECT c.* FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.student_id = ?
    `;
    db.query(sql, [studentId], callback);
  }
};

module.exports = Student;
