const express = require("express");
const videosRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require ("fs");

//function to read videos
function readVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

//get videos
videosRouter.get("/", (req, res) => {
     const videos = readVideos();
     const videosData = videos.map ((video) => {
        return {
        title: video.title,
        channel: video.channel,
        image: video.image,
        id: video.id
        }
     })
    res.status(200).json(videosData);
});

//get selected video by id
videosRouter.get ("/:videoId", (req,res)=> {
    const videos = readVideos();
    const video = videos.find((video) => video.id === req.params.videoId);
    res.status(200).json(video);
})

// videosRouter.post ("/upload", (req,res) => {
//     const videos = readVideos();

//     const newVideo = {
//         title: req.body.title,
//         description:req.body.description,
//         channel:"By Masha",
//         id: uuidv4(),
//         timestamp: Date.now(),
//     }
// })

//post video 
videosRouter.post("/", (req, res) => {
    const videos = readVideos();

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        channel: "By Masha Masha",
        // image: "",
        views: 0,
        likes: 0,
        timestamp: Date.now(),
        comments: [
            {
                comment: "Wow it works! How exciting",
                name: "Masha Tabala",
                timestamp: Date.now(),
            },
        ],
    }
    console.log(newVideo);
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).send(videos);
})

module.exports = videosRouter;