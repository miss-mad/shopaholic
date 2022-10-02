// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection.js");

// Create a new Sequelize model for category
class Category extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the Category model
Category.init(
  // define columns
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourseblves
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    // Notice the name is lowercase, so we'll reference as lowercase later
    modelName: "category",
  }
);

// Export Category model
module.exports = Category;
