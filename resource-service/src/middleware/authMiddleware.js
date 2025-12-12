const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token
 * Expects header: "Authorization: Bearer <token>"
 */
module.exports = (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // 2. Extract token (Remove "Bearer ")
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format." });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user payload to request
    req.user = decoded; // Contains { id, role }

    next(); // Move to the next middleware or controller
  } catch (err) {
    // console.error("Auth Error:", err.message); // Optional: Log specific error
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};