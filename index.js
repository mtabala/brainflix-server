const express = require("express");
const app = express();
const PORT = 9090;
const videoRoutes = require("./routes/videos");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use ('/videos', videoRoutes);

//comment 
app.listen(PORT, ()=> {
    console.log(`server is running at port ${PORT}`)
});