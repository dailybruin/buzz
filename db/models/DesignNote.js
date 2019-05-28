const mongoose = require('mongoose');

const EXPIRATION = 2;

const designNoteSchema = mongoose.Schema({
  section: { type: String },
  placement: { type: String },
  slug: { type: String },
  art: { type: String },
  comments: { type: String },
  date: { type: Date },
  wordCount: { type: Number },
  expireAt: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setDate(now.getDate() + EXPIRATION)
      return now;
    }
  }
}, { timestamps: true });
designNoteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let DesignNote = mongoose.model('DesignNote', designNoteSchema);
module.exports = DesignNote;