const mongoose = require('mongoose');
const User = require('./models/User');
const DesignNote = require('./models/DesignNote');
const InstagramStory = require('./models/InstagramStory');
const Modular = require('./models/Modular');

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
  DesignNote,
  InstagramStory,
  Modular
};