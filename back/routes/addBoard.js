const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const uniqueRandom = require('unique-random');
const uniqueId = uniqueRandom(100000, 999999);

router.post('/boards/add', (req, res) => {
  const newBoard = {
    userId: req.body.userId,
    boardId: req.body.id,
    boardTitle: req.body.title,
    boardDescription: req.body.description,
    lists: [
      {
        listTitle: 'To Do',
        listId: uniqueId(),
        cards: [],
      },
      {
        listTitle: 'In Process',
        listId: uniqueId(),
        cards: [],
      },
      {
        listTitle: 'Testing',
        listId: uniqueId(),
        cards: [],
      },
      {
        listTitle: 'Done',
        listId: uniqueId(),
        cards: [],
      },
    ],
  };
  const dbBoardObj = new Board(newBoard);
  dbBoardObj.save()
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;