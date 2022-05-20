const User = require("../model/userModel");
const songList = require("../songListArray");
const io = require("../config/socket");
const errorHandler = require('../helper/errorHandler');

const addVideoTolist = async (req, res) => {
  console.log(req.body);
  const videoAddedbyUser = {
    videoId: req.body.videoId,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    userName: null
  };

  try {
    // Step1 : Get the user form req.user.user_id
    throw new Error("Hello");
    const user = await User.findOne({ _id: req.user.user_id });
    videoAddedbyUser.userName = user.username;


    // Step2 : check time difference between current time and last time he added song.
    // If time difference > 10 min Only then allow him to enter the song.
    const timeDifference = checkTimeDifference(user.lastSongAdded);

    if (timeDifference >= 0) {
      console.log("Entered IF");
      // Step 3 : Now add the song to the queue and update users lastSongAdded.
      songList.push(videoAddedbyUser);
      await User.updateOne(
        { _id: req.user.user_id },
        { $set: { lastSongAdded: new Date() } }
      );
      console.log("Song Added");
      console.log(songList);
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
    errorHandler(error)
    // return res.send("Error: " + error);
  }
};

const checkTimeDifference = (songAddedTime) => {
  let dateOne = songAddedTime;
  let dateTwo = new Date();

  let msDifference = dateTwo - dateOne;
  let minutes = Math.floor(msDifference / 1000 / 60);
  console.log("Minutes between two dates =", minutes);
  return minutes;
};

module.exports = addVideoTolist;
