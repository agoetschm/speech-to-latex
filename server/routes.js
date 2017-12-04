const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get("/speech-to-text", (req, res) => {
  res.send('convert to text');
});

module.exports = router;
