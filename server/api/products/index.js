var express = require("express");
var rroter = express.Router();
var controller = require("./product.controller");


router.post("/",controller.create)
