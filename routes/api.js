const Router = require("express-promise-router");
const { DesignNote, Modular } = require("../db");

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

router.post('/designNotes', async (req, res) => {
  const { section, placement, slug } = req.body;
  const { year, month, day } = req.body.date;

  const date = new Date(`${year}-${month}-${day}`);
  await DesignNote.create({placement, slug, section, date}, (err, note) => {
    if (err) {
      handleError(res);
    }

    res.json(note);
  })
});

router.get('/modular/:category?', async (req, res) => {
  const { category } = req.params;
  console.log(category);
  let modulars;
  if (category) {
    modulars = await Modular.findOne({"category": category});
    if (modulars) {
      modulars = modulars.entries;
    }
  } else {
    modulars = await Modular.find({});
  }
  res.json(modulars);
});

router.post('/modular/:category?', async (req, res) => {
  const { category } = req.params;
  const { fields } = req.body;
  console.log("Post modular")
  console.log(category);
  console.log(fields);

  if (fields == null) {
    handleError(res);
  }

  const query = { "category": category };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const modular = await Modular.findOneAndUpdate(query, { $push: { entries: [fields] } }, options);
  res.json(modular);
});

module.exports = router