const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/lists/rename/:id', (req, res) => {
  Board.findOneAndUpdate({
    _id: req.params.id,
    'lists._id': req.body._id,
  }, { $set: { 'lists.$.listTitle': req.body.listTitle } }, {
    new: true,
    useFindAndModify: false,
  })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;