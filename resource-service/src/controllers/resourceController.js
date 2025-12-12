const Resource = require("../models/Resource");
const Booking = require("../models/Booking");

/**
 * @desc    Create a new resource (Course, Lab, Video)
 * @route   POST /resources
 * @access  Private (Admin/Teacher)
 */
exports.createResource = async (req, res) => {
  try {
    
    if (req.user.role !== 'admin' && req.user.role !== 'professor') {
        return res.status(403).json({ message: "Access denied. Only professors or admins can create resources." });
    }

    const { title, description, fileUrl, type, capacity } = req.body;

    // Validate required fields
    if (!title || !fileUrl || !type) {
      return res.status(400).json({ message: "Title, fileUrl, and type are required" });
    }

    // Create Resource in DB
    const resource = await Resource.create({
      title,
      description,
      fileUrl,
      type,
      capacity: capacity || 20, // Default capacity
      uploadedBy: req.user.id, // Extracted from JWT token
    });

    res.status(201).json({
      message: "Resource created successfully",
      resource,
    });
  } catch (err) {
    console.error("Create Resource Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Book a resource for a student
 * @route   POST /resources/:id/book
 * @access  Private (Student)
 */
exports.bookResource = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Step 1: Find the resource
    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Step 2: Check Capacity
    if (resource.bookedCount >= resource.capacity) {
      return res.status(400).json({ message: "Class is full!" });
    }

    // Step 3: Check for Duplicate Booking
    const existingBooking = await Booking.findOne({
      where: { userId, resourceId: id },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this resource" });
    }

    // Step 4: Create Booking Record
    await Booking.create({
      userId,
      resourceId: id,
    });

    // Step 5: Update Resource Counter (Atomic increment is better in production)
    resource.bookedCount += 1;
    await resource.save();

    res.status(200).json({
      message: "Booking successful!",
      bookedCount: resource.bookedCount,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error during booking" });
  }
};

/**
 * @desc    Get all resources
 * @route   GET /resources
 * @access  Public
 */
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.status(200).json(resources);
  } catch (err) {
    console.error("Get All Resources Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get single resource by ID
 * @route   GET /resources/:id
 * @access  Public
 */
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (err) {
    console.error("Get Resource Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update resource details
 * @route   PUT /resources/:id
 * @access  Private (Owner/Admin)
 */
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Check Ownership or Admin Role
    if (resource.uploadedBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. You are not the owner." });
    }

    const { title, description, fileUrl, type, capacity } = req.body;

    // Update fields if provided
    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.fileUrl = fileUrl || resource.fileUrl;
    resource.type = type || resource.type;
    if (capacity) resource.capacity = capacity;

    await resource.save();
    res.status(200).json({ message: "Resource updated successfully", resource });
  } catch (err) {
    console.error("Update Resource Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete a resource
 * @route   DELETE /resources/:id
 * @access  Private (Owner/Admin)
 */
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Check Ownership or Admin Role
    if (resource.uploadedBy !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. You are not the owner." });
    }

    await resource.destroy();
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("Delete Resource Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};