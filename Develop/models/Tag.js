// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection.js");

// Create a new Sequelize model for Tag
class Tag extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the Tag model
Tag.init(
  // Define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // Sets the field option on all attributes to the snake_case version of its name
    underscored: true,
    // Notice the name is lowercase, so we'll reference as lowercase later
    modelName: "tag",
  }
);

// Export Tag model
module.exports = Tag;
