const mongoose = require('mongoose');

const TWO_DAYS = 172800;

const instagramStorySchema = mongoose.Schema({
  image: { type: String },
  caption: { type: String },
  date: { type: Date },
  expireAt: {
    type: Date,
    default: function () {
      return new Date(new Date().valueOf() + TWO_DAYS);
    }
  }
}, { timestamps: true });
instagramStorySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let InstagramStory = mongoose.model('InstagramStory', instagramStorySchema);
module.exports = InstagramStory;