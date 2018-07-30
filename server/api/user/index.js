import { Router } from "express"
var controller = require("./user.controller");
var router = Router();


router.post("/register", controller.create)

module.exports = router

