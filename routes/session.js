const Router = require("express-promise-router");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const { User } = require('../db');
const callbackURL = process.env.NODE_ENV === "production" ? "https://swoosh.dailybruin.com" : "http://localhost:3000";

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
  callbackURL: callbackURL
}, async (accessToken, refreshToken, profile, done) => {
  // This means it will only work for DB people
  // TODO: Open Source: Support predefined Slack orgs
  if (profile.team.domain !== "dailybruin") {
    done(new Error("Unsupported team."));
  }

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
      // User does not exist
      // Let's create a new one
      let newUser = new User();

      newUser.email = profile.user.email;
      newUser.slack.id = reqSlackId;

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