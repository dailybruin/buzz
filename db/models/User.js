const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "can't be blank"], unique: true },
  firstName: { type: String },
  lastName: { type: String },
  slack: {
    id: { type: String, required: [true, "can't be blank"], unique: true }
  }
}, { timestamps: true, strict: false });

let User = mongoose.model('User', userSchema);

module.exports = User;