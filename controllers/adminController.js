// ===================== Get all users =====================
/*exports.getAllUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role, approved FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(results);
  });
};

// ===================== Get pending users =====================
exports.getPendingUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role FROM users WHERE approved = 0";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching pending users" });
    res.json(results);
  });
};

// ===================== Approve user =====================
exports.approveUser = (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  const sql = "UPDATE users SET role = ?, approved = 1 WHERE user_id = ?";
  db.query(sql, [role, userId], (err) => {
    if (err) return res.status(500).json({ message: "Error approving user" });
    res.json({ message: "✅ User approved successfully!" });
  });
};

// ===================== Delete user =====================
exports.deleteUser = (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting user" });
    res.json({ message: "✅ User deleted successfully!" });
  });
};*/



// const db = require("../config/db");

// // ===================== Get all users =====================
// exports.getAllUsers = (req, res) => {
//   const sql = "SELECT user_id, full_name, email, role, approved FROM users";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ message: "Error fetching users" });
//     res.json(results);
//   });
// };

// // ===================== Get pending users =====================
// exports.getPendingUsers = (req, res) => {
//   const sql = "SELECT user_id, full_name, email, role FROM users WHERE approved = 0";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ message: "Error fetching pending users" });
//     res.json(results);
//   });
// };

// // ===================== Approve user =====================
// exports.approveUser = (req, res) => {
//   let { userId, role } = req.body;

//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required" });
//   }

//   // If role is not provided → keep it empty (admin can set later)
//   if (!role || role.trim() === "") {
//     role = null; // ✅ stays empty in DB until admin decides
//   }

//   const sql = "UPDATE users SET role = ?, approved = 1 WHERE user_id = ?";
//   db.query(sql, [role, userId], (err) => {
//     if (err) return res.status(500).json({ message: "Error approving user" });
//     console.log(`User ${userId} approved with role: ${role || "EMPTY"}`);
//     res.json({ message: "✅ User approved successfully!" });
//   });
// };

// // ===================== Delete user =====================
// exports.deleteUser = (req, res) => {
//   const { userId } = req.params;
//   if (!userId) return res.status(400).json({ message: "User ID is required" });

//   const sql = "DELETE FROM users WHERE user_id = ?";
//   db.query(sql, [userId], (err) => {
//     if (err) return res.status(500).json({ message: "Error deleting user" });
//     res.json({ message: "✅ User deleted successfully!" });
//   });
// };





/*const db = require("../config/db");

// ===================== Get all users =====================
exports.getAllUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role, approved FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(results);
  });
};

// ===================== Get pending users =====================
exports.getPendingUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role FROM users WHERE approved = 0";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching pending users" });
    res.json(results);
  });
};

const db = require("../config/db");

// ===================== Get all users =====================
exports.getAllUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role, approved FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(results);
  });
};

// ===================== Get pending users =====================
exports.getPendingUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role FROM users WHERE approved = 0";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching pending users" });
    res.json(results);
  });
};

// ===================== Approve user =====================
exports.approveUser = (req, res) => {
  let { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  role = role.toLowerCase(); // enforce lowercase

  // DB update
  const sql = "UPDATE users SET role = ?, approved = 1 WHERE user_id = ?";
  db.query(sql, [role, userId], (err) => {
    if (err) {
      console.error("❌ Error approving user:", err);
      return res.status(500).json({ message: "Database error while approving user" });
    }
    console.log(`✅ User ${userId} approved with role: ${role}`);
    res.json({ message: `✅ User approved successfully as ${role}!` });
  });
};

// ===================== Delete user =====================
exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User ID is required" });

  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting user" });
    res.json({ message: "✅ User deleted successfully!" });
  });
};*/



const db = require("../config/db");

// ===================== Get all users =====================
exports.getAllUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email, role, approved FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users" });
    }

    res.json(results);
  });
};


// ===================== Get pending users =====================
exports.getPendingUsers = (req, res) => {
  const sql = "SELECT user_id, full_name, email FROM users WHERE approved = 0";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching pending users" });
    }

    res.json(results);
  });
};


// ===================== Approve user =====================
exports.approveUser = (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({
      message: "User ID and role are required"
    });
  }

  const sql = "UPDATE users SET role = ?, approved = 1 WHERE user_id = ?";

  db.query(sql, [role, userId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error approving user" });
    }

    res.json({ message: "✅ User approved successfully!" });
  });
};


// ===================== Delete user =====================
exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const sql = "DELETE FROM users WHERE user_id = ?";

  db.query(sql, [userId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }

    res.json({ message: "✅ User deleted successfully!" });
  });
};