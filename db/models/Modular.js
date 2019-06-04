const mongoose = require('mongoose');

const EXPIRATION = 2;

const modularSchema = mongoose.Schema({
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
modularSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let Modular = mongoose.model('Modular', modularSchema);

const modularCategorySchema = mongoose.Schema({
  category: { type: String, required: true },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Modular"
  }]
}, { timestamps: true, strict: false });

let ModularCategory = mongoose.model('ModularCategory', modularCategorySchema);

module.exports = {
  Modular,
  ModularCategory
}