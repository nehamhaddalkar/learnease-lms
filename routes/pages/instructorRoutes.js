// routes/pages/instructorRoutes.js
const express = require("express");
const router = express.Router();
const instructorController = require("../../controllers/instructorController");

router.get("/:instructor_id/courses", instructorController.getInstructorCourses);

module.exports = router;
