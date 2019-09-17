const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/keys').mongoURI;
const app = express();

const addBoard = require('./routes/addBoard');
const allBoards = require('./routes/allBoards');
const deleteBoard = require('./routes/deleteBoard');
const activeBoard = require('./routes/activeBoard');
const addList = require('./routes/addList');
const deleteList = require('./routes/deleteList');
const renameList = require('./routes/renameList');
const dragAndDrop = require('./routes/dragAndDrop');
const addCard = require('./routes/addCard');
const deleteCard = require('./routes/deleteCard');
const updateCardDescription = require('./routes/updateCardDescription');
const updateCardEndTime = require('./routes/updateCardEndTime');
const updateCardStatus = require('./routes/updateCardStatus');
const newUser = require('./routes/newUser');
const getUser = require('./routes/getUser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../front/public')));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/', addBoard);
app.use('/', allBoards);
app.use('/', deleteBoard);
app.use('/', activeBoard);
app.use('/', addList);
app.use('/', deleteList);
app.use('/', renameList);
app.use('/', dragAndDrop);
app.use('/', addCard);
app.use('/', deleteCard);
app.use('/', updateCardDescription);
app.use('/', updateCardEndTime);
app.use('/', updateCardStatus);
app.use('/', newUser);
app.use('/', getUser);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/public/index.html'));
});


const port = process.env.PORT || 9000;
let server = app.listen(port, () =>
  console.log(`We are living on port ${port}`),
);
module.exports = server;
