const express = require('express');
const router = express.Router();
const path = require('path');

// Login / Signup
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
});
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/signup.html'));
});

// Dashboards
router.get('/student-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/student_dashboard.html'));
});
router.get('/instructor-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/instructor_dashboard.html'));
});
router.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/admin_dashboard.html'));
});

// Courses
router.get('/course-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/course_details.html'));
});

module.exports = router;
