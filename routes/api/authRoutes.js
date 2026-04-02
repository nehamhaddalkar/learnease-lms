// routes/api/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const assignmentController = require("../../controllers/assignmentController");

// router.post("/add-assignment", assignmentController.addAssignment);
// router.get("/:course_id", assignmentController.getAssignments);

// module.exports = router;