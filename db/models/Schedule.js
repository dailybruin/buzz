const mongoose = require('mongoose');

/*
  SCHEDULE ENTRY SCHEMA
  - start/end - Number - Since Mongoose only has the native Date type, we will
  use the Number type to represent these values by converting their start shift
  to a four digit number using military time. If a designer starts at 2:45 PM
  this will be stored as 1445 in the db.
*/
const scheduleEntrySchema = mongoose.Schema({
  day: Number,
  start: Number,
  end: Number,
  person: String,
  shift: String
}, { timestamps: true, strict: false });
let ScheduleEntry = mongoose.model('ScheduleEntry', scheduleEntrySchema);

const scheduleSchema = mongoose.Schema({
  section: { type: String, required: true, unique: true },
  entries: [scheduleEntrySchema]
}, { timestamps: true, strict: false });
let Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {
  Schedule,
  ScheduleEntry
}