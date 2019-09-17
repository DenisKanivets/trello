const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/get-user/:activeUserId', (req, res) => {
  User.find({ userId: req.params.activeUserId })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;