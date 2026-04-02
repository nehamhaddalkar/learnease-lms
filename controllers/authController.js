// /*exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [email], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length === 0) return res.status(401).json({ message: "User not found" });

//     const user = results[0];
//     const validPass = bcrypt.compareSync(password, user.password);
//     if (!validPass) return res.status(401).json({ message: "Invalid credentials" });

//     if (!user.approved) 
//         return res.status(403).json({ message: "Your account is pending admin approval." });

//     // ✅ Allow login even if role is null
//     const role = user.role || 'user'; 

//     res.json({
//       message: "Login successful!",
//       role: role,
//       username: user.username,
//       full_name: user.full_name,
//       email: user.email
//     });
//   });
// };*/

// //authController.js

// const bcrypt = require("bcryptjs");
// const db = require("../config/db");


// // ================= REGISTER =================
// exports.register = (req, res) => {
//   const { full_name, username, email, password, contact_no } = req.body;

//   if (!full_name || !username || !email || !password) {
//     return res.status(400).json({
//       message: "All fields are required"
//     });
//   }

//   if (contact_no && contact_no.length !== 10) {
//     return res.status(400).json({
//       message: "Contact number must be 10 digits"
//     });
//   }

//   const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

//   db.query(checkQuery, [email, username], (err, result) => {

//     if (err) {
//       return res.status(500).json({
//         message: "Database error"
//       });
//     }

//     if (result.length > 0) {
//       return res.status(400).json({
//         message: "Username or Email already exists"
//       });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const contactValue = contact_no || null;

//     const insertQuery = `
//       INSERT INTO users 
//       (full_name, username, email, password, contact_no, role, approved) 
//       VALUES (?, ?, ?, ?, ?, 'student', 0)
//     `;

//     db.query(
//       insertQuery,
//       [full_name, username, email, hashedPassword, contactValue],
//       (err, result) => {

//         if (err) {
//           return res.status(500).json({
//             message: "Database error"
//           });
//         }

//         res.status(201).json({
//           message: "Registration successful! Wait for admin approval.",
//           userId: result.insertId
//         });
//       }
//     );
//   });
// };



// // ================= LOGIN =================
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       message: "Email and password are required"
//     });
//   }

//   const sql = "SELECT * FROM users WHERE email = ?";

//   db.query(sql, [email], (err, results) => {

//     if (err) {
//       return res.status(500).json({
//         message: "Database error"
//       });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     const user = results[0];

//     const validPass = bcrypt.compareSync(password, user.password);

//     if (!validPass) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     if (!user.approved) {
//       return res.status(403).json({
//         message: "Your account is pending admin approval."
//       });
//     }

//     const role = user.role || "student";

//     req.session.user = {
//       id: user.user_id,
//       role,
//       username: user.username,
//       email: user.email
//     };

//     let redirectURL = "/student-dashboard.html";

//     if (role === "admin") redirectURL = "/admin-dashboard.html";
//     else if (role === "instructor") redirectURL = "/instructor-dashboard.html";

//     res.status(200).json({
//       message: "Login successful!",
//       role,
//       username: user.username,
//       full_name: user.full_name,
//       email: user.email,
//       redirect: redirectURL
//     });

//   });
// };




// const bcrypt = require("bcryptjs");
// const db = require("../config/db");

// // ================= REGISTER =================
// exports.register = (req, res) => {
//   const { full_name, username, email, password, contact_no, role } = req.body;

//   // Validate fields
//   if (!full_name || !username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Hash password
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   // Default role = student
//   const userRole = role || "student";

//   const sql = `
//     INSERT INTO users 
//     (full_name, username, email, password, contact_no, role, approved) 
//     VALUES (?, ?, ?, ?, ?, ?, 0)
//   `;

//   db.query(
//     sql,
//     [full_name, username, email, hashedPassword, contact_no, userRole],
//     (err, result) => {
//       if (err) {
//         console.error("❌ Register error:", err);
//         return res.status(500).json({
//           message: "Database error",
//           error: err.sqlMessage
//         });
//       }

//       res.status(201).json({
//         message: "Registration successful! Wait for admin approval.",
//         userId: result.insertId
//       });
//     }
//   );
// };

// // ================= LOGIN =================
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       message: "Email and password are required"
//     });
//   }

//   const sql = "SELECT * FROM users WHERE email = ?";

//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error("❌ Login DB error:", err);
//       return res.status(500).json({
//         message: "Database error",
//         error: err.sqlMessage
//       });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     const user = results[0];

//     // Check password
//     const validPass = bcrypt.compareSync(password, user.password);

//     if (!validPass) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     // Check admin approval
//     if (!user.approved) {
//       return res.status(403).json({
//         message: "Your account is pending admin approval."
//       });
//     }

//     const role = user.role || "student";

//     // Store session
//     req.session.user = {
//       id: user.user_id,
//       role,
//       username: user.username,
//       email: user.email
//     };

//     // Role based redirect
//     let redirectURL = "/login.html";

//     if (role === "admin") redirectURL = "/admin-dashboard.html";
//     else if (role === "student") redirectURL = "/student-dashboard.html";
//     else if (role === "instructor") redirectURL = "/instructor-dashboard.html";

//     res.status(200).json({
//       message: "Login successful!",
//       role,
//       username: user.username,
//       full_name: user.full_name,
//       email: user.email,
//       redirect: redirectURL
//     });
//   });
// };


//corrected code but i want to add JWT for role thats why i commentout this code
const bcrypt = require("bcryptjs");
const db = require("../config/db");


// ================= REGISTER =================
exports.register = (req, res) => {
  const { full_name, username, email, password, contact_no } = req.body;

  if (!full_name || !username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (contact_no && contact_no.length !== 10) {
    return res.status(400).json({
      message: "Contact number must be 10 digits"
    });
  }

  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(checkQuery, [email, username], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Username or Email already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const contactValue = contact_no || null;

    // Default role = student, approved = 0
    const insertQuery = `
      INSERT INTO users 
      (full_name, username, email, password, contact_no, role, approved) 
      VALUES (?, ?, ?, ?, ?, 'student', 0)
    `;

    db.query(
      insertQuery,
      [full_name, username, email, hashedPassword, contactValue],
      (err, result) => {

        if (err) {
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
          message: "Registration successful! Wait for admin approval.",
          userId: result.insertId
        });
      }
    );
  });
};



// ================= LOGIN =================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 Important: approval check
    if (user.approved !== 1) {
      return res.status(403).json({
        message: "Your account is pending admin approval."
      });
    }

    // 🔥 No fallback student default
    const role = user.role;

    if (!role) {
      return res.status(500).json({
        message: "Role not assigned. Contact admin."
      });
    }

    // Save session
    req.session.user = {
      id: user.user_id,
      role: role,
      username: user.username,
      email: user.email
    };

    // Redirect based on role
    let redirectURL = "";

    if (role === "admin") {
      redirectURL = "/admin-dashboard.html";
    } 
    else if (role === "instructor") {
      redirectURL = "/instructor-dashboard.html";
    } 
    else if (role === "student") {
      redirectURL = "/student-dashboard.html";
    } 
    else {
      return res.status(403).json({
        message: "Invalid role assigned."
      });
    }

    res.status(200).json({
      message: "Login successful!",
      role: role,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      redirect: redirectURL
    });

  });
};



//jwt code that currently i dont want

// const db = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/config");

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const { full_name, email, password, role } = req.body;

//     // Role validation (sirf student & instructor allowed)
//     if (!["student", "instructor"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role selected" });
//     }

//     // Check if email already exists
//     const checkUser = "SELECT * FROM users WHERE email = ?";
//     db.query(checkUser, [email], async (err, result) => {
//       if (err) return res.status(500).json({ message: err.message });

//       if (result.length > 0) {
//         return res.status(400).json({ message: "Email already registered" });
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const sql =
//         "INSERT INTO users (full_name, email, password, role, approved) VALUES (?, ?, ?, ?, ?)";

//       // student auto approved = 1
//       // instructor needs approval = 0
//       const approved = role === "student" ? 1 : 0;

//       db.query(
//         sql,
//         [full_name, email, hashedPassword, role, approved],
//         (err, result) => {
//           if (err) return res.status(500).json({ message: err.message });

//           res.status(201).json({
//             message:
//               role === "instructor"
//                 ? "Registered successfully. Wait for admin approval."
//                 : "Registered successfully",
//           });
//         }
//       );
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= LOGIN =================
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: err.message });

//     if (results.length === 0) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const user = results[0];

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Check approval (only for instructor)
//     if (user.role === "instructor" && user.approved === 0) {
//       return res
//         .status(403)
//         .json({ message: "Wait for admin approval" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       {
//         id: user.user_id,
//         role: user.role,
//         email: user.email,
//       },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       role: user.role,
//     });
//   });
// };