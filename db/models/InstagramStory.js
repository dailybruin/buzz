const mongoose = require('mongoose');

const EXPIRATION = 7;

const instagramStorySchema = mongoose.Schema({
  figma: { type: String },
  caption: { type: String },
  date: { type: Date },
}, { timestamps: true, strict: false });
let InstagramStory = mongoose.model('InstagramStory', instagramStorySchema);
module.exports = InstagramStory;
