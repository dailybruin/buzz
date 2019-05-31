const Router = require("express-promise-router");
const { InstagramStory } = require("../../db");

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
  let stories = await InstagramStory.find({ date: date }); 
  res.json(stories ? stories : []);
});

router.post('/:year-:month-:day', async (req, res) => {
  const { figma } = req.body;
  const { year, month, day } = req.params;

  const date = new Date(`${year}-${month}-${day}`);

  const query = { figma, date };

  await InstagramStory.create(query, (err, story) => {
    if (err) {
      handleError(res);
    }

    res.json(story);
  })
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;

  let story = await InstagramStory.findByIdAndRemove(id);
  if (story) {
    res.json(story);
  } else {
    res.json([]);
  }
});

module.exports = router