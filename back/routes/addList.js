const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/lists/add/:id', (req, res) => {
  const newList = {
    listId: req.body.id,
    listTitle: req.body.title,
    cards: [],
  };
  Board.findByIdAndUpdate(req.params.id, { $push: { lists: newList } }, { new: true, useFindAndModify: false })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;