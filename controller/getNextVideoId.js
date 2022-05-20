const songList = require("../songListArray");

const getNextVideoId = (req,res)=>{
    // First store the very first song in the queue in a variable.
    // Remove that song from the array.
    // Send that song that is stored in the variable.
    const songAtZeroIndex = songList[0].videoId;
    const dataToObj = {videoId: songAtZeroIndex}
    songList.splice(0,1);
    res.send(dataToObj)
}

module.exports = getNextVideoId;