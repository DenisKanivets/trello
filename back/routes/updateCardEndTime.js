const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/cards/end-time/:id/:listId/:cardId', (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { 'lists.$[listId].cards.$[cardId].cardEndTime': req.body.payload } },
    {
      arrayFilters: [{ 'listId._id': req.params.listId }, { 'cardId._id': req.params.cardId }],
      multi: true,
      new: true,
      useFindAndModify: false,
    })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;