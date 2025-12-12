const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Resource = sequelize.define(
  "Resource",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, // Ensure the value is a valid URL format
      },
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Logical FK: References the User defined in Auth Service (who created this resource)
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["video", "pdf", "slide", "lab"]], // Restrict to valid resource types
      },
    },
    // --- Booking System Fields ---
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20, // Default class capacity
    },
    bookedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Initially 0 bookings
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

module.exports = Resource;