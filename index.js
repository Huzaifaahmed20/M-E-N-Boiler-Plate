var express = require("express")
var mongoose = require("mongoose");
var app = express();
var PORT = "9000"
// var config = require('./config/environment');
// import expressConfig from './config/express';
// import registerRoutes from './routes';


// mongoose.connect(config.mongo.uri, config.mongo.options);
// mongoose.connection.on('error', function (err) {
//     console.error(`MongoDB connection error: ${err}`);
//     process.exit(-1);
// });




app.listen(PORT, () => {
    console.log("Express is litenining on ", PORT)
})

