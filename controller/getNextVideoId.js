const errorHandler = require("../helper/errorHandler");
const SongList = require("../model/songModel");


const getNextVideoId = async(req,res)=>{
    // First store the very first song in the queue in a variable.
    // Remove that song from the array.
    // Send that song that is stored in the variable.

    try {
        const allSongs = await SongList.find();
        console.log("All songs: ", allSongs)
        if(allSongs.length > 0){
            let currIndex = 0;
            
            // Check if video id of the song that we are going to return is availabe.
            // if not then remove it from the list and move to next song
            while(allSongs[currIndex].videoId === undefined){
                await SongList.deleteOne({_id: allSongs[currIndex]._id});
                currIndex = currIndex + 1;
            }

            const nextSongVideoId = {
                videoId: allSongs[currIndex].videoId
            }
            console.log(nextSongVideoId)
            await SongList.deleteOne({_id: allSongs[currIndex]._id});
            res.send(nextSongVideoId)
        }else{
            return res.send("");
        }
    } catch (error) {
        errorHandler("getNextVideoId [ERROR]: ",error)
    }


}

module.exports = getNextVideoId;