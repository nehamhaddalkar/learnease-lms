// const db = require("../config/db");

// // 📌 Get All Courses
// exports.getCourses = (req, res) => {
//   db.query("SELECT * FROM courses", (err, results) => {
//     if (err) {
//       console.log("DB ERROR:", err);
//       return res.status(500).json({ message: "Error fetching courses" });
//     }
//     res.json(results);
//   });
// };


// // 📌 Create Course ✅ FINAL FIXED
// exports.createCourse = (req, res) => {

//   const { course_name, description, category, duration, instructor_id } = req.body;

//   console.log("BODY:", req.body);  // 🔥 debug

//   db.query(
//     `INSERT INTO courses 
//      (course_name, description, category, duration, instructor_id) 
//      VALUES (?, ?, ?, ?, ?)`,
//     [course_name, description, category, parseInt(duration), parseInt(instructor_id)],
//     (err, result) => {

//       if (err) {
//         console.log("DB ERROR:", err);  // 🔥 actual error
//         return res.status(500).json({
//           message: "Error creating course",
//           error: err.message
//         });
//       }

//       res.json({
//         message: "Course created successfully!"
//       });
//     }
//   );
// };


// // ✅ Enroll Course
// exports.enrollCourse = (req, res) => {

//   const studentId = req.session?.user?.id;
//   const { courseId } = req.body;

//   if (!studentId) {
//     return res.redirect("/login");
//   }

//   const checkQuery = `
//     SELECT * FROM enrollments 
//     WHERE student_id = ? AND course_id = ?
//   `;

//   db.query(checkQuery, [studentId, courseId], (err, result) => {

//     if (err) {
//       console.log("DB ERROR:", err);
//       return res.send("Database Error");
//     }

//     if (result.length > 0) {
//       return res.send("Already Enrolled in this course");
//     }

//     const insertQuery = `
//       INSERT INTO enrollments (student_id, course_id)
//       VALUES (?, ?)
//     `;

//     db.query(insertQuery, [studentId, courseId], (err) => {

//       if (err) {
//         console.log("DB ERROR:", err);
//         return res.send("Database Error");
//       }

//       res.redirect("/student-dashboard.html");
//     });
//   });
// };


// // 📌 Get Lessons by Course
// exports.getLessons = (req, res) => {

//   const courseId = req.params.course_id;

//   db.query(
//     "SELECT * FROM lessons WHERE course_id = ?",
//     [courseId],
//     (err, results) => {

//       if (err) {
//         console.log("DB ERROR:", err);
//         return res.status(500).json({ message: "Error fetching lessons" });
//       }

//       res.json(results);
//     }
//   );
// };


// // 📌 Get Assignments by Course
// exports.getAssignments = (req, res) => {

//   const courseId = req.params.course_id;

//   db.query(
//     "SELECT * FROM assignments WHERE course_id = ?",
//     [courseId],
//     (err, results) => {

//       if (err) {
//         console.log("DB ERROR:", err);
//         return res.status(500).json({ message: "Error fetching assignments" });
//       }

//       res.json(results);
//     }
//   );
// };


// // 📌 Get All Instructors ✅ FIXED
// exports.getInstructors = (req, res) => {

//   const sql = `
//     SELECT user_id, full_name
//     FROM users
//     WHERE role = 'instructor'
//     AND approved = 1
//   `;

//   db.query(sql, (err, results) => {

//     if (err) {
//       console.log("DB ERROR:", err);
//       return res.status(500).json({
//         message: "Error fetching instructors"
//       });
//     }

//     res.json(results);

//   });
// };


// // 📌 Get Courses for Logged-in Instructor
// exports.getInstructorCourses = (req, res) => {

//   const instructorId = req.session?.user?.id;

//   if (!instructorId) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const sql = `
//     SELECT *
//     FROM courses
//     WHERE instructor_id = ?
//   `;

//   db.query(sql, [instructorId], (err, results) => {

//     if (err) {
//       console.log("DB ERROR:", err);
//       return res.status(500).json({
//         message: "Error fetching instructor courses"
//       });
//     }

//     res.json(results);

//   });
// };




// controllers/courseController.js
const db = require("../config/db");

// 📌 Get All Courses
exports.getCourses = (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error fetching courses" });
    }
    res.status(200).json(results);
  });
};

// 📌 Create Course
exports.createCourse = (req, res) => {
  const { course_name, description, category, duration, instructor_id } = req.body;

  if (!course_name || !description || !instructor_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO courses (course_name, description, category, duration, instructor_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [course_name, description, category, parseInt(duration), parseInt(instructor_id)], (err) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error creating course", error: err.message });
    }
    res.status(200).json({ message: "Course created successfully!" });
  });
};

// ✅ Enroll Course
exports.enrollCourse = (req, res) => {
  const studentId = req.session?.user?.id; // from users table
  const { courseId } = req.body;

  if (!studentId) return res.status(401).json({ message: "Login required" });
  if (!courseId) return res.status(400).json({ message: "Course ID required" });

  // Check if already enrolled
  const checkQuery = "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?";
  db.query(checkQuery, [studentId, courseId], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Insert enrollment
    const insertQuery = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
    db.query(insertQuery, [studentId, courseId], (err2) => {
      if (err2) {
        console.log("DB ERROR:", err2);
        return res.status(500).json({ message: "Database Error" });
      }

      res.status(200).json({ message: "Enrolled successfully" });
    });
  });
};

// 📌 Get Enrolled Courses (My Courses page)
exports.getEnrolledCourses = (req, res) => {
  const studentId = req.session?.user?.id;
  if (!studentId) return res.status(401).json({ message: "Login required" });

  const sql = `
    SELECT c.course_id, c.course_name, c.description, c.category, c.duration
    FROM enrollments e
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.status(200).json(results);
  });
};

// 📌 Get Lessons by Course
exports.getLessons = (req, res) => {
  const courseId = req.params.course_id;
  const sql = "SELECT * FROM lessons WHERE course_id = ?";

  db.query(sql, [courseId], (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error fetching lessons" });
    }
    res.status(200).json(results);
  });
};

// 📌 Get Assignments by Course
exports.getAssignments = (req, res) => {
  const courseId = req.params.course_id;
  const sql = "SELECT * FROM assignments WHERE course_id = ?";

  db.query(sql, [courseId], (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error fetching assignments" });
    }
    res.status(200).json(results);
  });
};

// 📌 Get All Instructors
exports.getInstructors = (req, res) => {
  const sql = "SELECT user_id, full_name FROM users WHERE role = 'instructor' AND approved = 1";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error fetching instructors" });
    }
    res.status(200).json(results);
  });
};

// 📌 Get Courses for Logged-in Instructor
exports.getInstructorCourses = (req, res) => {
  const instructorId = req.session?.user?.id;
  if (!instructorId) return res.status(401).json({ message: "Not authorized" });

  const sql = "SELECT * FROM courses WHERE instructor_id = ?";
  db.query(sql, [instructorId], (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "Error fetching instructor courses" });
    }
    res.status(200).json(results);
  });
};