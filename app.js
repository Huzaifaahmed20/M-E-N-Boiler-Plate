const express = require('express');
const app = express();
const mongoose = require("mongoose");;
const config = require("./server/config")
import registerRoutes from "./routes"
var PORT = "5000"



registerRoutes(app)

mongoose.connect(config.database);
app.listen(PORT, () => {
    console.log("Express is litenining on ", PORT)
})

