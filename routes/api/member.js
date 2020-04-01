const Router = require("express-promise-router");
const { Member } = require("../../db");
const { lookupByEmail, getDMID, sendMessageTo } = require("./utils");
const router = new Router();

const handleError = (res) => {
  res.json({ "message": "bad" });
}

router.get('/', async (req, res) => {
  let staff = await Member.find({});

  if (staff) {
    res.json(staff);
  } else {
    res.json([]);
  }
});

router.get('/multimedia', async (req, res) => {
  let staff = await Member.find({ multimedia: true });

  if (staff) {
    res.json(staff);
  } else {
    res.json([]);
  }
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  let member = await Member.findOne({ slug });
  res.json(member);
});

router.post('/', async (req, res) => {
  const { slug, firstName, lastName, position, twitter, multimedia, initials } = req.body;

  const query = { slug, firstName, lastName, position, twitter, multimedia, initials };

  await Member.create(query, (err, member) => {
    if (err) {
      handleError(res);
    }
    res.json(member);
  })
});

router.post('/:id/sting', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let member = await Member.findById(id);
  if (member) {
    console.log("member found");
    console.log(member);
    const slug = member.slug;
    const memberID = await lookupByEmail(slug);
    if (memberID) {
      console.log("member ID found");
      console.log(memberID);
      const DMID = await getDMID(memberID);
      if (DMID) {
        console.log("DMID found");
        console.log(DMID);
        const retval = await sendMessageTo(DMID, text);
        if (retval) {
          console.log("Success!");
          console.log(retval);
          res.json([]);
        } else {
          console.log("Failure!");
          console.log(retval);
          res.json({ message: "Message failed." });
        }
      } else {
        console.log("No DMID found");
        console.log(DMID);
        res.json({ message: "No DMID found." });
      }
    } else {
      console.log("No member ID found");
      console.log(memberID);
      res.json({ message: "No member ID found." });
    }
  } else {
    console.log("No member found");
    console.log(member);
    res.json({ message: "No member found." });
  }
});

router.patch('/:slug', async (req, res) => {
  const { slug } = req.params;
  const query = req.body;

  let member = await Member.findOneAndUpdate({slug}, { $set: query });
  res.json(member);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  let member = await Member.findByIdAndRemove(id);
  if (member) {
    res.json(member);
  } else {
    res.json([]);
  }
});

module.exports = router