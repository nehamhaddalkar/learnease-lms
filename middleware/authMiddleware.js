// module.exports = (roles = []) => {
//   return (req, res, next) => {

//     if (!req.session.user) {
//       return res.status(401).json({
//         message: "Unauthorized. Please login first."
//       });
//     }

//     if (roles.length && !roles.includes(req.session.user.role)) {
//       return res.status(403).json({
//         message: "Access denied. Insufficient role."
//       });
//     }

//     next();
//   };
// };



module.exports = (roles = []) => {
  return (req, res, next) => {

    // ❌ no session
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "Unauthorized. Please login first."
      });
    }

    // 🔥 role check (case-insensitive fix)
    const userRole = req.session.user.role?.toLowerCase();

    if (roles.length && !roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied. Insufficient role."
      });
    }

    next();
  };
};