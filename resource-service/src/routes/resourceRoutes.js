const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const resourceController = require("../controllers/resourceController");

// 1. Create Resource (Admin/Teacher)
router.post("/", auth, resourceController.createResource);

// 2. Get All Resources (Public)
router.get("/", resourceController.getAllResources);

// 3. Get Single Resource (Public)
router.get("/:id", resourceController.getResourceById);

// 4. Update Resource (Owner/Admin)
router.put("/:id", auth, resourceController.updateResource);

// 5. Delete Resource (Owner/Admin)
router.delete("/:id", auth, resourceController.deleteResource);

// 6. NEW: Book a Resource (Student)
router.post("/:id/book", auth, resourceController.bookResource);

module.exports = router;