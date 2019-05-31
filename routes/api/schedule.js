const Router = require("express-promise-router");
const { Schedule, ScheduleEntry } = require("../../db");

const router = new Router();

const handleError = (res) => {
  res.json({ "message": "bad" });
}

router.get('/:section/all', async (req, res) => {
  const { section } = req.params;
  let schedule = await Schedule.find({ section: section });
  res.json(schedule);
});

router.get('/:section', async (req, res) => {
  const { section } = req.params;
  let schedule = await Schedule.findOne({ section: section });
  let entries = schedule ? schedule.entries : [];
  res.json(entries);
});

router.post('/', async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);

  if (!isAdmin) {
    res.json([]);
    return;
  }
  
  const { section, entries } = req.body;

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const sched = await Schedule.findOneAndUpdate({ "section": section }, { "$set": { "entries": entries } }, options);
  res.json(sched);
});

router.patch('/', async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);

  if (!isAdmin) {
    res.json([]);
    return;
  }

  const { section, id, newValue } = req.body;
  let entry = await Schedule.findOneAndUpdate({"section": section, "entries._id": id}, { "$set": { "entries.$.person": newValue }});
  res.json(entry);
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