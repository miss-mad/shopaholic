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

// define models' columns
// npm run start (runs server.js)
// change force: true to force: false below (in server.js)
// npm run seed (runs index.js in seeds folder)
// npm run start (runs server.js)
  // now that force: is set to false, it will not drop the tables we just seeded with npm run seed
  // no need to run npm run seed again unless data in the seeds file changes; there is a force: true in the seeds/index.js file as well to drop data and then recreate it
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
