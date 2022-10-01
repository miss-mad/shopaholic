const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

// Create a new Sequelize model for category
class Category extends Model {}

// Use the init() method that extends the Model
Category.init(
  // define columns
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourseblves
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

// Export category Model
module.exports = Category;
