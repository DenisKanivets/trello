const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.get('/active-board/:id', (req, res) => {
  Board.findOne({ _id: req.params.id })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;