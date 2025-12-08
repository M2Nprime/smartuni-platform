const Resource = require("../models/Resource");
const Booking = require("../models/Booking"); // Import the new Booking model

// --------------------- CREATE RESOURCE ---------------------
exports.createResource = async (req, res) => {
    try {
        const { title, description, fileUrl, type, capacity } = req.body;

        if (!title || !fileUrl || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const resource = await Resource.create({
            title,
            description,
            fileUrl,
            type,
            capacity: capacity || 20, // Default to 20 if not sent
            uploadedBy: req.user.id
        });

        res.status(201).json({ message: "Resource created", resource });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------- BOOK A RESOURCE (NEW Logic) ---------------------
exports.bookResource = async (req, res) => {
    try {
        const { id } = req.params; // Resource ID from URL
        const userId = req.user.id; // User ID from Token

        // 1. Find the resource
        const resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // 2. Check Capacity
        if (resource.bookedCount >= resource.capacity) {
            return res.status(400).json({ message: "Class is full!" });
        }

        // 3. Check for Duplicate Booking
        const existingBooking = await Booking.findOne({ where: { userId, resourceId: id } });
        if (existingBooking) {
            return res.status(400).json({ message: "You have already booked this resource" });
        }

        // 4. Create Booking
        await Booking.create({
            userId,
            resourceId: id
        });

        // 5. Update Resource Counter
        resource.bookedCount += 1;
        await resource.save();

        res.json({ message: "Booking successful!", bookedCount: resource.bookedCount });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------- GET ALL RESOURCES ---------------------
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.json(resources);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------- GET RESOURCE BY ID ---------------------
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------- UPDATE RESOURCE ---------------------
exports.updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        if (resource.uploadedBy !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not allowed" });
        }

        const { title, description, fileUrl, type, capacity } = req.body;
        
        resource.title = title || resource.title;
        resource.description = description || resource.description;
        resource.fileUrl = fileUrl || resource.fileUrl;
        resource.type = type || resource.type;
        if(capacity) resource.capacity = capacity;

        await resource.save();
        res.json({ message: "Resource updated", resource });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------- DELETE RESOURCE ---------------------
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        if (resource.uploadedBy !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not allowed" });
        }

        await resource.destroy();
        res.json({ message: "Resource deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};