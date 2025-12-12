const express = require("express");
const router = express.Router();

// Import Middleware & Controllers
const auth = require("../middleware/authMiddleware");
const resourceController = require("../controllers/resourceController");

// Route: POST /
// Desc: Create a new resource (Admin/Teacher only)
router.post("/", auth, resourceController.createResource);

// Route: GET /
// Desc: Get all available resources (Public)
router.get("/", resourceController.getAllResources);

// Route: GET /:id
// Desc: Get a single resource by ID (Public)
router.get("/:id", resourceController.getResourceById);

// Route: PUT /:id
// Desc: Update a resource (Owner/Admin only)
router.put("/:id", auth, resourceController.updateResource);

// Route: DELETE /:id
// Desc: Delete a resource (Owner/Admin only)
router.delete("/:id", auth, resourceController.deleteResource);

// Route: POST /:id/book
// Desc: Book a resource (Students)
router.post("/:id/book", auth, resourceController.bookResource);

module.exports = router;