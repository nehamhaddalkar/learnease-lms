//corrected code for student enroll i want to change it
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const session = require('express-session');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'secretKey',
//     resave: false,
//     saveUninitialized: true
// }));

// // Static Files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));

// // Routes
// const authRoutes = require('./routes/api/authRoutes');
// const adminRoutes = require('./routes/pages/adminRoutes');
// const courseRoutes = require('./routes/api/courseRoutes');
// const assignmentRoutes = require('./routes/api/assignmentRoutes'); // ✅ NEW
// const instructorRoutes = require('./routes/api/instructorRoutes');
// //const enrollRoutes = require('./routes/api/enrollRoutes');


// app.use('/api/auth', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/api/course', courseRoutes);
// app.use('/api/assignments', assignmentRoutes); // ✅ NEW
// app.use('/api/instructors', instructorRoutes);

// // Home route
// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: './views' });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });





const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ SESSION FIXED (🔥 IMPORTANT)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false,   // 🔥 FIXED
    cookie: {
        httpOnly: true
    }
}));

// ✅ Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use("/uploads", express.static("uploads"));

// ✅ Routes
const authRoutes = require('./routes/api/authRoutes');
const adminRoutes = require('./routes/pages/adminRoutes');
const courseRoutes = require('./routes/api/courseRoutes');
const assignmentRoutes = require('./routes/api/assignmentRoutes');
const instructorRoutes = require('./routes/api/instructorRoutes');

const progressRoutes = require("./routes/api/progress");

app.use("/api/progress", progressRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/instructors', instructorRoutes);


// ✅ Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ✅ DEBUG ROUTE (optional but useful)
app.get('/check-session', (req, res) => {
    res.json(req.session);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});