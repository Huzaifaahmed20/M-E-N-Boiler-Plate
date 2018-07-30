const mongoose = require("mongoose");
var crypto = require("crypto")
const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: String

});

user.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
}
user.methods.validPassword = function (password) {
    this.password = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === password;
};

module.exports = mongoose.model("User", user)