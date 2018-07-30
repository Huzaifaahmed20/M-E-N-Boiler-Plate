const mongoose = require("mongoose");

const product = new mongoose.Schema({
    title: String,
    description: String

});

module.exports = mongoose.model("Product", product)