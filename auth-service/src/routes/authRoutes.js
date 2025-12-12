const express = require("express");
const router = express.Router();

// Import Controller
const { register, login } = require("../controllers/authController");

// Route: POST /register
// Description: Register a new user (Admin or Student)
router.post("/register", register);

// Route: POST /login
// Description: Authenticate user and return JWT token
router.post("/login", login);

module.exports = router;