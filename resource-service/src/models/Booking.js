const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // Stores the ID of the student (from Auth Token)
    },
    resourceId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // Stores the ID of the resource being booked
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "confirmed" 
        // Can be 'confirmed' or 'cancelled'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = Booking;