const songList = require('../songListArray');

const getAllQueuedSongs = (req,res)=>{
    return res.json(songList)
}

module.exports = getAllQueuedSongs;