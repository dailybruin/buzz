const Router = require("express-promise-router");
const { DesignNote } = require("../../db");

const router = new Router();

const handleError = (res) => {
  res.json({ "message": "bad" });
}

router.get('/:year-:month-:day', async (req, res) => {
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

router.post('/:year-:month-:day', async (req, res) => {
  const { section, placement, slug, wordCount, art, comments } = req.body;
  const { year, month, day } = req.params;

  const date = new Date(`${year}-${month}-${day}`);
  await DesignNote.create({ placement, slug, section, wordCount, art, comments, date, }, (err, note) => {
    if (err) {
      handleError(res);
    }

    res.json(note);
  })
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;

  let note = await DesignNote.findByIdAndRemove(id);
  if (note) {
    res.json(note);
  } else {
    res.json([]);
  }
});

module.exports = router