// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// Import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the ProductTag model
ProductTag.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    // Foreign Key reference
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    // Foreign Key reference
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
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
    modelName: "product_tag",
  }
);

// Export ProductTag model
module.exports = ProductTag;
