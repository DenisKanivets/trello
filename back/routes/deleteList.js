const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/lists/delete/:id', (req, res) => {
  Board.findByIdAndUpdate(req.params.id, { $pull: { lists: req.body } }, {
    new: true,
    useFindAndModify: false,
  })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;