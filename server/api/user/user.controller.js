var User = require("./user.model");
import jwt from "jsonwebtoken";
import config from "../../config"


export function create(req, res) {
    var newUser = new User()
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.setPassword(req.body.password)

    newUser.save().then(user => {
        var token = jwt.sign({ _id: user._id }, config.mySecret)
        return res.status(200).json({ token, user })
    })
}