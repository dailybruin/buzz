const mongoose = require('mongoose');

const designNoteSchema = mongoose.Schema({
  section: { type: String },
  placement: { type: String },
  slug: { type: String },
  art: { type: String },
  comments: { type: String },
  date: { type: Date }
}, { timestamps: true });

let DesignNote = mongoose.model('DesignNote', designNoteSchema);

module.exports = DesignNote;