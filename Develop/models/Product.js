// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Use the init() method that extends the Model to set up fields and rules for the Product model
Product.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Manually define the primary key
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // Different types of validations
      isDecimal: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      isNumeric: true,
    },
    // Foreign Key reference
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
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
    modelName: "product",
  }
);

// Export Product model
module.exports = Product;
