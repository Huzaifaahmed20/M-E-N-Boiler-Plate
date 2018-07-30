
var Product = require("./product.model")



export function create(req, res) {
    var productObj = {
        title: req.body.title,
        description: req.body.description
    }

    var newProduct = new Product(productObj);
    newProduct.save().then(product => {
        return res.json(product)
    }).catch(err => {
        return res.json(err)
    })

}