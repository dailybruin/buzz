const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  slug: { type: String, required: [true, "can't be blank"], unique: true },
  firstName: { type: String, required: [true, "can't be blank"] },
  lastName: { type: String, required: [true, "can't be blank"] },
  twitter: { type: String },
  position: { type: String },
  multimedia: { type: Boolean, default: false },
  initials: { type: String }
}, { strict: false });

let Member = mongoose.model('Member', memberSchema);

module.exports = Member;