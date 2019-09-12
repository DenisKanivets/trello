const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/drag-and-drop/:id', (req, res) => {
  Board.findByIdAndUpdate(req.params.id, { $set: { lists: req.body } }, { new: true, useFindAndModify: false })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;