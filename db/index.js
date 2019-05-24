const mongoose = require('mongoose');
const User = require('./models/User');
const DesignNote = require('./models/DesignNote');

mongoose.connect(process.env.MONGO_URL);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose default connection open to ' + process.env.MONGO_URL);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  // eslint-disable-next-line no-console
  console.log('Mongoose default connection error: ' + err);
});

module.exports = {
  User,
  DesignNote
};