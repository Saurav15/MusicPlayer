const User = require("../model/userModel");
const io = require("../config/socket");
const errorHandler = require('../helper/errorHandler');
const findUserFromId = require("../helper/findUserFromId");
const checkTimeDifference = require('../helper/checkTimeDifference');
const SongList = require("../model/songModel");

const addVideoTolist = async (req, res) => {
  console.log(req.body);
  

  try {
    // Step1 : Get the user form req.user.user_id 
    const user = await findUserFromId(req.user.user_id);
    const videoAddedbyUser = {
      videoId: req.body.videoId,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userName: user.username,
      downVote: 0,
      downVoteUsers: new Array(),
      addedAt: new Date(),
      addedBy: user._id.toString()
    };

    console.log("Added by: ",videoAddedbyUser.addedby);
    // Step2 : check time difference between current time and last time he added song.
    // If time difference > 10 min Only then allow him to enter the song.
    const timeDifference = checkTimeDifference(user.lastSongAdded);

    if (timeDifference >= process.env.TIME_LIMIT) {
      // Step 3 : Now add the song to the queue and update users lastSongAdded.
      const newSong = new SongList(videoAddedbyUser);
      await newSong.save();

      await User.updateOne(
        { _id: req.user.user_id },
        { $set: { lastSongAdded: new Date() } }
      );
      // -------Sending a socket event to add the video to the list------------------
      io.emit("addElementToQueue",videoAddedbyUser)
      // ------------------------------------------------------
    } 
    else {
      console.log("entered Else");
      //   else tell him to wait unitl his 10 min waiting period is over.
      return res.send(`Wait for ${timeDifference} min until next try:)`);
    }

  } 
  catch (error) {
    errorHandler("addVideoToList [ERROR]: ",error)
    // return res.send("Error: " + error);
  }
};


module.exports = addVideoTolist;
