const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.DEV_PORT;

//middleware
app.use(express.json());
app.use(cors());
app.use ('/videos', videoRoutes);
app.use("/images", express.static("./public/images"));

//comment 
app.listen(PORT, ()=> {
    console.log("server is running at port" + PORT)
});