const Router = require("express-promise-router");
const { Schedule, ScheduleEntry } = require("../../db");

const router = new Router();

const handleError = (res) => {
  res.json({ "message": "bad" });
}

router.get('/:section', async (req, res) => {
  const { section } = req.params;

  let schedule = await Schedule.find({ section: section });
  let entries = schedule ? schedule.entries : [];
  res.json(entries);
});

router.post('/:section', async (req, res) => {
  const { person, day, start, end, shift } = req.body;
  const { section } = req.params;

  let newEntry;
  try {
    newEntry = await ScheduleEntry.create({ person, day, start, end, shift });
  }
  catch (e) {
    handleError(res);
  }
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await Schedule.findOneAndUpdate({ "section": section }, { $push: { entries: [newEntry] } }, options);
  res.json(newEntry);
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;

  let entry = await ScheduleEntry.findByIdAndRemove(id);
  if (entry) {
    res.json(entry);
  } else {
    res.json([]);
  }
});

module.exports = router