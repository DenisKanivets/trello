const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.get('/all-boards/:activeUserId', (req, res) => {
  Board.find({ userId: req.params.activeUserId })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;