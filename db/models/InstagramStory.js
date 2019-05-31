const mongoose = require('mongoose');

const EXPIRATION = 7;

const instagramStorySchema = mongoose.Schema({
  figma: { type: String },
  caption: { type: String },
  date: { type: Date },
  expireAt: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setDate(now.getDate() + EXPIRATION)
      return now;
    }
  }
}, { timestamps: true, strict: false });
instagramStorySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let InstagramStory = mongoose.model('InstagramStory', instagramStorySchema);
module.exports = InstagramStory;