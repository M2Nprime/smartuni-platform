const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define(
  "Booking",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Logical FK: References the User defined in Auth Service (extracted from Token)
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // FK: References the local Resource model
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "confirmed",
      validate: {
        isIn: [["confirmed", "cancelled", "pending"]], // Validation check
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Booking;