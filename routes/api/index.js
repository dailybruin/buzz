const Router = require("express-promise-router");
const DesignNoteRouter = require("./designNotes");
const ModularRouter = require("./modulars");
const ScheduleRouter = require("./schedule");

const router = new Router();

router.use('/designNotes', DesignNoteRouter);
router.use('/modular', ModularRouter);
router.use('/schedule', ScheduleRouter);

module.exports = router;