const express = require("express");
const router = express.Router();
const Board = require('../models/board');

router.post('/lists/add', (req, res) => {
    console.log(res)
    // Board.findOneAndUpdate()
    //     .then(items => res.json(items))
    //     .catch(err => console.log(err));
});

module.exports = router;