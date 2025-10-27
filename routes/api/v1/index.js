const express = require('express');
const router = express.Router();

router.use('/joke', require('./joke'));

module.exports = router;
