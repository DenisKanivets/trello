const express = require("express");
const router = express.Router();
const Board = require('../models/board');

router.get("/boards", (req, res) => {
    Board.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

module.exports = router;