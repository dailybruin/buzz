const mongoose = require('mongoose');

const TWO_DAYS = 172800;

const designNoteSchema = mongoose.Schema({
  section: { type: String },
  placement: { type: String },
  slug: { type: String },
  art: { type: String },
  comments: { type: String },
  date: { type: Date },
  expireAt: {
    type: Date,
    default: function () {
      return new Date(new Date().valueOf() + TWO_DAYS);
    }
  }
}, { timestamps: true });
designNoteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let DesignNote = mongoose.model('DesignNote', designNoteSchema);
module.exports = DesignNote;