const Router = require("express-promise-router");
const DesignNoteRouter = require("./designNotes");
const ModularRouter = require("./modulars");
const ScheduleRouter = require("./schedule");
const StoryRouter = require("./story");

const router = new Router();

router.use('/designNotes', DesignNoteRouter);
router.use('/modular', ModularRouter);
router.use('/schedule', ScheduleRouter);
router.use('/story', StoryRouter);

router.get('/isAdmin', async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);
  res.json({
    "isAdmin": isAdmin
  })
});;

module.exports = router;