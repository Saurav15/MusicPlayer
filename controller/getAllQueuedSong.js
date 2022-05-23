const errorHandler = require("../helper/errorHandler");
const SongList = require("../model/songModel");

const getAllQueuedSongs = async (req,res)=>{
    try {
        const getAllSongs = await SongList.find();
        return res.json(getAllSongs)
    } catch (error) {
        errorHandler("getAllQueuedSongs [ERROR] : ", error);
    }
}

module.exports = getAllQueuedSongs;