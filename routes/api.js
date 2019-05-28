const Router = require("express-promise-router");
const { DesignNote, Modular, ModularCategory } = require("../db");

const router = new Router();

const handleError = (res) => {
  res.json({"message": "bad"});
}

router.get('/designNotes/:year-:month-:day', async (req, res) => {
  let date;
  try {
    date = new Date(`${req.params.year}-${req.params.month}-${req.params.day}`);
  }
  catch (e) {
    handleError(res);
  }
  let notes = await DesignNote.find({ date: date });
  res.json(notes);
});

router.post('/designNotes/:year-:month-:day', async (req, res) => {
  const { section, placement, slug, wordCount, art, comments } = req.body;
  const { year, month, day } = req.params;

  const date = new Date(`${year}-${month}-${day}`);
  await DesignNote.create({ placement, slug, section, wordCount, art, comments, date,}, (err, note) => {
    if (err) {
      handleError(res);
    }

    res.json(note);
  })
});

router.get('/modular/:category/:year-:month-:day', async (req, res) => {
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


router.post('/modular/:category/:year-:month-:day', async (req, res) => {
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
  await ModularCategory.findOneAndUpdate({ "category": category }, { $push: { entries: [newModular] }}, options);
  res.json(newModular);
});

router.get('/modular', async (req, res) => {
  let modulars = await Modular.find({});
  res.json(modulars);
});

module.exports = router