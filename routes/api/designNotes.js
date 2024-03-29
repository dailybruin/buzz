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
  const { section, placement, slug, wordCount, art, artStatus, comments, status, link, referText } = req.body;
  const { year, month, day } = req.params;
  const date = new Date(`${year}-${month}-${day}`);
  const query = { placement, slug, section, wordCount, art, artStatus, comments, status, link, referText, date };

  await DesignNote.create(query, (err, note) => {
    if (err) {
      handleError(res);
    }
    res.json(note);
  })
});

router.patch('/', async (req, res) => {
  const { id, placement, slug, section, wordCount, art, artStatus, comments, status, date, link, referText } = req.body;
  // TODO this is so bad
  const query = {};
  placement && (query.placement = placement);
  slug && (query.slug = slug);
  wordCount && (query.wordCount = wordCount);
  art && (query.art = art);
  artStatus && (query.artStatus = artStatus);
  comments && (query.comments = comments);
  status && (query.status = status);
  link && (query.link = link);
  referText && (query.referText = referText);

  let entry = await DesignNote.findByIdAndUpdate(id, query);
  res.json(entry);
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
