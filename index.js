const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
var PORT = "5000"

const config = require("./server/config")


mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));



app.use("/api/product",require("./server/api/products"))


app.listen(PORT, () => {
    console.log("Express is litenining on ", PORT)
})

