const Router = require("express-promise-router");
const { Modular, ModularCategory } = require("../../db");

const router = new Router();

const handleError = (res) => {
  res.json({ "message": "bad" });
}

router.get('/:category/:year-:month-:day', async (req, res) => {
  const { category, year, month, day } = req.params;

  let date;
  try {
    date = new Date(`${year}-${month}-${day}`).toISOString();
  }
  catch (e) {
    handleError(res);
  }

  let modulars = await ModularCategory.findOne({ "category": category });
  let entries = modulars ? modulars.entries.filter(x => x.date.toISOString() == date) : [];
  res.json(entries);
});


router.post('/:category/:year-:month-:day', async (req, res) => {
  const { category, year, month, day } = req.params;
  const { fields } = req.body;

  let date;
  try {
    date = new Date(`${year}-${month}-${day}`);
  }
  catch (e) {
    handleError(res);
  }

  // Overwrite the date if provided
  // Otherwise just assign
  Object.assign(fields, { date });

  let newModular;
  try {
    newModular = await Modular.create(fields);
  }
  catch (e) {
    handleError(res);
  }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await ModularCategory.findOneAndUpdate({ "category": category }, { $push: { entries: [newModular] } }, options);
  res.json(newModular);
});

router.get('/', async (req, res) => {
  let modulars = await Modular.find({});
  res.json(modulars);
});

module.exports = router