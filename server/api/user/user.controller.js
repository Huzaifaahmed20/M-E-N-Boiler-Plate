var User = require("./user.model");
import jwt from "jsonwebtoken";
import config from "../../config"


export function create(req, res) {
    var userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    var newUsers = new User(userObj)
    newUsers.save().then(user => {
        var token = jwt.sign({ _id: user._id }, config.mySecret)

        return res.status(200).json({ token, user })
    })
}