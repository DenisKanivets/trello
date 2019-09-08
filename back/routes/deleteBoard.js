const express = require("express");
const router = express.Router();
const Board = require('../models/board');

router.post("/boards/delete/:id", (req, res) => {
    Board.deleteOne({boardId: req.params.id})
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

module.exports = router;