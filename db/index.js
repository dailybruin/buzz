const mongoose = require('mongoose');
const User = require('./models/User');
const Member = require('./models/Member');
const DesignNote = require('./models/DesignNote');
const InstagramStory = require('./models/InstagramStory');
const { Modular, ModularCategory } = require('./models/Modular');
const { Schedule, ScheduleEntry } = require('./models/Schedule');

mongoose.connect(process.env.MONGO_URL);

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + process.env.MONGO_URL);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
});

module.exports = {
  User,
  Member,
  DesignNote,
  InstagramStory,
  Modular,
  ModularCategory,
  Schedule,
  ScheduleEntry
};