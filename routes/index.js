const path = require("path");
const Router = require("express-promise-router");
const { isAuthenticated } = require("../controllers/auth");

const router = new Router();

/** Our custom pages */
// Login page
router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/login.html"))
});

// main route
router.get('*', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
});

module.exports = router