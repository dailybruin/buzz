const mongoose = require('mongoose');

const TWO_DAYS = 172800;

const modularSchema = mongoose.Schema({
  category: { type: String, required: true },
  entries: [mongoose.Schema.Types.Mixed],
  date: { type: Date },
  expireAt: {
    type: Date,
    default: function () {
      return new Date(new Date().valueOf() + TWO_DAYS);
    }
  }
}, { timestamps: true, strict: false });
modularSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

let Modular = mongoose.model('Modular', modularSchema);
module.exports = Modular;