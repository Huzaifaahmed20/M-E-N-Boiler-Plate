import express from "express"
import mongoose from "mongoose"
import config from "./server/config"
import registerRoutes from "./routes"
const app = express();
var PORT = "5000"





registerRoutes(app)

mongoose.connect(config.database);
app.listen(PORT, () => {
    console.log("Express is litenining on ", PORT)
})

