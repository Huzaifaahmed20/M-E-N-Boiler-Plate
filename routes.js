
const morgan = require('morgan');
const bodyParser = require('body-parser');

export default function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'))
    
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Cache-Control, Authorization');
        if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
        } else {
        return next();
        }
    });

    app.use("/api/product", require("./server/api/product"))
    app.use("/api/user", require("./server/api/user"))
    app.use('/api/auth', require('./server/api/auth').default);
}