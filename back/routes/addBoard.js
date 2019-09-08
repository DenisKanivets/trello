const express = require("express");
const router = express.Router();
const Board = require('../models/board');

router.post('/boards/add', (req, res) => {
    const newBoard = {};
    newBoard.boardId = req.body.newItem.id;
    newBoard.boardTitle = req.body.newItem.title;
    newBoard.boardDescription = req.body.newItem.description;
    const dbBoardObj = new Board(newBoard);
    dbBoardObj.save()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

module.exports = router;