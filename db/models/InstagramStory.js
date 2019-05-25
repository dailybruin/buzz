const mongoose = require('mongoose');

const EXPIRATION = 2;

const instagramStorySchema = mongoose.Schema({
  image: { type: String },
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
}, { timestamps: true });
instagramStorySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let InstagramStory = mongoose.model('InstagramStory', instagramStorySchema);
module.exports = InstagramStory;