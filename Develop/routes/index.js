const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Catch-all for the router if no above routes are matched - gives a plain html page with a simple message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export router
module.exports = router;