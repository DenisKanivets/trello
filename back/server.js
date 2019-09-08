const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/keys").mongoURI;
const app = express();

const addBoard = require("./routes/addBoard");
const allBoards = require("./routes/allBoards");
const deleteBoard = require("./routes/deleteBoard");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../front/public")));

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use('/', addBoard);
app.use('/', allBoards);
app.use('/', deleteBoard);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front/public/index.html"));
});


const port = process.env.PORT || 9000;
let server = app.listen(port, () =>
    console.log(`We are living on port ${port}`)
);
module.exports = server;
