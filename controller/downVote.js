// This file will update the downVote count and add the user who downvoted to the list.
// Also will calculte the total downVote Percentage wrt to total active users.
// If % > 60%. Remove song from the queue.

const errorHandler = require("../helper/errorHandler");
const SongList = require("../model/songModel");

const downVote = (req, res) => {
    const { _id} = req.body
    // Step1 Fing the song that is requested to downvote
    const songData = SongList.findOne({_id: _id});
    console.log(songData);
    // If the user have already downVoted then dont let them downVote.
    let flag = true
    songData.downVoteUsers.map(item=>{
        if(item === req.user.user_id){
            flag = false
        }
    })

    // Step 2 Increment the downvote count add to the song list the id of user who downvoted.
    if(flag){
        songData.downVote = songData.downVote + 1;
        songData.downVoteUsers.push(req.user.user_id);
    }else{
        errorHandler("downVote [MESSAGE]: ","Cannot downvote more then once.");
    }
};

module.exports = downVote;
