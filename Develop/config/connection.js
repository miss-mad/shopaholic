// dotenv allows sensitive info like passwords to be kept safe
require("dotenv").config();
// Import and require the npm package Sequelize
const Sequelize = require("sequelize");

// Create a sequelize connection object with dotenv variables
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Export sequelize connection to be used elsewhere
module.exports = sequelize;
