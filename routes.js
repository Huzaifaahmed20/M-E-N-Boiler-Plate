
const morgan = require('morgan');
const bodyParser = require('body-parser');

export default function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));


    app.use("/api/product", require("./server/api/product"))
    app.use("/api/user", require("./server/api/user"))
    app.use('/api/auth', require('./server/api/auth').default);
}