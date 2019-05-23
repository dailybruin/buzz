const Router = require("express-promise-router");
const passport = require('passport');

const router = new Router();

/** Authentication */
router.get('/auth/slack', passport.authenticate('slack'));

// OAuth callback url
router.get('/auth/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.save(() => {
      res.redirect('/')
    })
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

module.exports = router