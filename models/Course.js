// models/Course.js
const db = require("../config/db");

const Course = {
  create: (courseData, callback) => {
    const sql = "INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)";
    db.query(sql, [courseData.title, courseData.description, courseData.instructor_id], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, callback);
  }
};

module.exports = Course;
