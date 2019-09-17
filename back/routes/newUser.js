const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/new-user', (req, res) => {
  const newUser = {
    userId: req.body.userId,
    name: req.body.name,
    image: req.body.image,
    type: req.body.type,
  };
  const dbUserObj = new User(newUser);
  dbUserObj.save()
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;