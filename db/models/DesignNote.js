const mongoose = require('mongoose');

// const EXPIRATION = 2;

const designNoteSchema = mongoose.Schema({
  section: { type: String, default: "" },
  placement: { type: String, default: "" },
  slug: { type: String, default: "" },
  art: { type: String, default: "" },
  placed: { type: Boolean, default: false },
  opinionated: { type: Boolean, default: false },
  pullQuote: { type: String, default: "" },
  comments: { type: String, default: "" },
  date: { type: Date, defautl: Date.now },
  // You would think this would be a number
  // but people often approximate or give
  // ranges so
  wordCount: { type: String, default: "" },
  status: { type: String, default: "" },
  link: { type: String, default: "" },
  referText: { type: String, default: "" },
}, { timestamps: true, strict: false });

let DesignNote = mongoose.model('DesignNote', designNoteSchema);
module.exports = DesignNote;
