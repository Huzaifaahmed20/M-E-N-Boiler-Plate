
const morgan = require('morgan');
const bodyParser = require('body-parser');

export default function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));


    app.use("/api/product", require("./server/api/products"))

}