const Router = require("express-promise-router");
const { DesignNote } = require("../db");

const router = new Router();

router.get('/designNotes/:year-:month-:day', async (req, res) => {
  let date;
  try {
    date = new Date(`${req.params.year}-${req.params.month}-${req.params.day}`);
  }
  catch (e) {
    res.json({});
  }
  let notes = await DesignNote.find({ date: date });
  res.json(notes);
});

router.post('/designNotes', async (req, res) => {
  const { section, placement, slug } = req.body;
  const { year, month, day } = req.body.date;

  console.log(`${year}/${month}/${day}`);
  const date = new Date(`${year}-${month}-${day}`);
  await DesignNote.create({placement, slug, section, date}, (err, note) => {
    if (err) {
      res.json({"message": "bad"})
    }

    res.json(note);
  })
})

module.exports = router