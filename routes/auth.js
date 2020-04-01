const Router = require("express-promise-router");
const passport = require('passport');

const router = new Router();

const callbackURL = process.env.NODE_ENV === "production" ? "https://buzz.dailybruin.com" : "http://localhost:3000";

/** Authentication */
router.get('/auth/slack', passport.authenticate('slack', {
  scope: ['identity.basic', 'identity.avatar', 'identity.email', 'identity.team']
}));

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
  res.redirect(callbackURL);
});

module.exports = router