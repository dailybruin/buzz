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
  const { section, placement, slug, wordCount, art, comments, status, link, referText, placed, opinionated, pullQuote } = req.body;  const { year, month, day } = req.params;
  const date = new Date(`${year}-${month}-${day}`);
  const query = { placement, slug, section, wordCount, art, comments, status, link, referText, placed, opinionated, pullQuote, date };
  await DesignNote.create(query, (err, note) => {
    if (err) {
      handleError(res);
    }
    res.json(note);
  })
});

router.patch('/', async (req, res) => {
  const { id, placement, slug, section, wordCount, art, comments, status, date, link, referText, placed, opinionated, pullQuote } = req.body;
  // TODO this is so bad
  const query = {};
  placement && (query.placement = placement);
  slug && (query.slug = slug);
  wordCount && (query.wordCount = wordCount);
  art && (query.art = art);
  comments && (query.comments = comments);
  status && (query.status = status);
  link && (query.link = link);
  referText && (query.referText = referText);
  placed !== undefined && (query.placed = placed);
  opinionated !== undefined && (query.opinionated = opinionated);
  pullQuote && (query.pullQuote = pullQuote);

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
