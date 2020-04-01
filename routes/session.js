const Router = require("express-promise-router");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;

const { User } = require('../db');
const callbackURL = process.env.NODE_ENV === "production" ? "https://buzz.dailybruin.com" : "http://localhost:3000";

const router = new Router();

const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URL + '/sessions',
	collection: 'session'
});

router.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(new SlackStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${callbackURL}/auth/slack/callback`,
  scope: ['identity.basic', 'identity.avatar', 'identity.email', 'identity.team'],
  team: "T04FG3WDC"
}, async (accessToken, scopes, team, { bot }, profile, done) => {
  // This is the ID that the user has from Slack
  const reqSlackId = profile.user.id;
  await User.findOne({ 'slack.id': reqSlackId }, (err, user) => {
    if (err) {
      done(err);
    }

    if (user) {
      // User already exists!
      done(null, user);
    } else {
      console.log("User " + reqSlackId + " does not exist in Buzz. Creating...");
      // User does not exist
      // Let's create a new one
      let newUser = new User();

      newUser.email = profile.user.email;
      newUser.slack.id = reqSlackId;
      console.log(newUser);

      // This is to be smart about slack names
      // They won't always be set in a certain way
      // So we avoid undefined errors by using empty string
      const name = profile.user.name.split(" ");
      const firstName = name[0];
      const lastName = name.length > 1 ? name[1] : "";

      newUser.firstName = firstName;
      newUser.lastName = lastName;

      // This line actually creates the user we've built up
      // in the database
      newUser.save((err) => {
        if (err) {
          console.log("Could not save user");
          console.log(err);
          throw err;
        }
        done(null, newUser);
      });
    }
  });
  }
));

passport.serializeUser((user, done) => {
  done(null, user['_id']);
});

passport.deserializeUser(async (localId, done) => {
  try {
    done(null, await User.findById(localId));
  } catch (e) {
    done(e, null);
  }
});

module.exports = router