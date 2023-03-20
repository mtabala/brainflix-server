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

// Function to write videos
function writeVideos(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json", stringifiedData);
  }

//post video 
videosRouter.post("/", (req, res) => {
    const videos = readVideos();

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        channel: "Masha Masha",
        image: "http://localhost:9090/images/Upload-video-preview.jpg",
        views: "10,934",
        likes: "3,793",
        duration: "4:20",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [
            {
                id: uuidv4(),
                comment: "Wow it works! How exciting",
                name: "Masha Tabala",
                timestamp: Date.now(),
            },
            {
                id: uuidv4(),
                comment: "Giiiiirrrll! You made it work!!!",
                name: "Masha Tabala",
                timestamp: Date.now(),
            },
            {
                id: uuidv4(),
                comment: "OMG IT IS WORKING",
                name: "Masha Tabala",
                timestamp: Date.now(),
            },
        ],
    }
    videos.push(newVideo);
    writeVideos(videos);

    res.status(201).send();
})

module.exports = videosRouter;