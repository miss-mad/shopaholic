const express = require("express");
const routes = require("./routes");
// Import sequelize connection
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database, then turn on the server
// The force: true object serves to drop tables if any exist, then recreates them
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
