// var express = require("express");
import { Router } from "express"
var controller = require("./product.controller");
var router = Router();


router.post("/", controller.create)
router.get("/products", controller.getAllProducts)

module.exports = router

