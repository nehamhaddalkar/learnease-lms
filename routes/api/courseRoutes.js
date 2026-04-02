
// const express = require("express");
// const router = express.Router();
// const db = require("../../config/db");
// const courseController = require("../../controllers/courseController");
// const authMiddleware = require("../../middleware/authMiddleware");

// // 📌 Get all courses
// router.get(
//   "/",
//   authMiddleware(["student", "admin", "instructor"]),
//   courseController.getCourses
// );

// // 📌 Admin Add Course Page
// router.get(
//   "/admin/add",
//   authMiddleware(["admin"]),
//   (req, res) => {

//     const sql = `
//       SELECT user_id, full_name
//       FROM users
//       WHERE role = 'instructor'
//       AND approved = 1
//     `;

//     db.query(sql, (err, instructors) => {
//       if (err) return res.status(500).send("Database Error");

//       res.render("admin-add-course", { instructors });
//     });
//   }
// );

// // 📌 Create Course (FIXED 🔥)
// router.post(
//   "/",
//   //authMiddleware(["admin"]),
//   courseController.createCourse
// );

// // 📌 Instructor Courses
// router.get(
//   "/instructor",
//   authMiddleware(["instructor"]),
//   courseController.getInstructorCourses
// );

// // 📌 Enroll Course
// router.post(
//   "/enroll",
//   authMiddleware(["student"]),
//   courseController.enrollCourse
// );

// // 📌 Lessons
// router.get(
//   "/:course_id/lessons",
//   authMiddleware(["student", "instructor", "admin"]),
//   courseController.getLessons
// );

// // 📌 Assignments
// router.get(
//   "/:course_id/assignments",
//   authMiddleware(["student", "instructor", "admin"]),
//   courseController.getAssignments
// );

// module.exports = router;



//corrected 1.55am
// const express = require("express");
// const router = express.Router();
// const db = require("../../config/db");
// const courseController = require("../../controllers/courseController");
// const authMiddleware = require("../../middleware/authMiddleware");

// // 📌 Get all courses
// router.get(
//   "/",
//   authMiddleware(["student", "admin", "instructor"]),
//   courseController.getCourses
// );

// // 📌 Admin Add Course Page
// router.get(
//   "/admin/add",
//   authMiddleware(["admin"]),
//   (req, res) => {

//     const sql = `
//       SELECT user_id, full_name
//       FROM users
//       WHERE role = 'instructor'
//       AND approved = 1
//     `;

//     db.query(sql, (err, instructors) => {
//       if (err) return res.status(500).send("Database Error");

//       res.render("admin-add-course", { instructors });
//     });
//   }
// );

// // 📌 Create Course
// router.post(
//   "/",
//   //authMiddleware(["admin"]),
//   courseController.createCourse
// );

// // 📌 Instructor Courses
// router.get(
//   "/instructor",
//   authMiddleware(["instructor"]),
//   courseController.getInstructorCourses
// );

// // 📌 Enroll Course
// router.post(
//   "/enroll",
//   authMiddleware(["student"]),
//   courseController.enrollCourse
// );

// // ✅🔥 ADD ONLY THIS (IMPORTANT)
// router.get(
//   "/enrolled",
//   authMiddleware(["student"]),
//   courseController.getEnrolledCourses
// );

// // 📌 Lessons
// router.get(
//   "/:course_id/lessons",
//   authMiddleware(["student", "instructor", "admin"]),
//   courseController.getLessons
// );

// // 📌 Assignments
// router.get(
//   "/:course_id/assignments",
//   authMiddleware(["student", "instructor", "admin"]),
//   courseController.getAssignments
// );

// module.exports = router;

console.log("COURSE ROUTES FILE LOADED 🚀");

const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const courseController = require("../../controllers/courseController");
const authMiddleware = require("../../middleware/authMiddleware");

// 📌 Get all courses
router.get(
  "/",
  authMiddleware(["student", "admin", "instructor"]),
  courseController.getCourses
);

// 📌 Admin Add Course Page
router.get(
  "/admin/add",
  authMiddleware(["admin"]),
  (req, res) => {

    const sql = `
      SELECT user_id, full_name
      FROM users
      WHERE role = 'instructor'
      AND approved = 1
    `;

    db.query(sql, (err, instructors) => {
      if (err) return res.status(500).send("Database Error");

      res.render("admin-add-course", { instructors });
    });
  }
);

// 📌 Create Course
router.post(
  "/",
  // authMiddleware(["admin"]),
  courseController.createCourse
);

// 📌 Instructor Courses
router.get(
  "/instructor",
  authMiddleware(["instructor"]),
  courseController.getInstructorCourses
);

// 📌 Enroll Course
router.post(
  "/enroll",
  authMiddleware(["student"]),
  courseController.enrollCourse
);

// ✅🔥 IMPORTANT: ENROLLED ROUTE (UPPER)
router.get(
  "/enrolled",
  authMiddleware(["student"]),
  courseController.getEnrolledCourses
);

// 📌 Lessons (DYNAMIC ROUTES ALWAYS LAST)
router.get(
  "/:course_id/lessons",
  authMiddleware(["student", "instructor", "admin"]),
  courseController.getLessons
);

// 📌 Assignments (DYNAMIC ROUTES LAST)
router.get(
  "/:course_id/assignments",
  authMiddleware(["student", "instructor", "admin"]),
  courseController.getAssignments
);

module.exports = router;