const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/cards/add/:id/:listId', (req, res) => {
  Board.findOneAndUpdate({
    _id: req.params.id,
    'lists._id': req.params.listId,
  }, { $push: { 'lists.$.cards': req.body } }, {
    new: true,
    useFindAndModify: false,
  })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;