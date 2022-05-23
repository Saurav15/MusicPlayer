const mongoose = require("mongoose");

const SongList = new mongoose.model("SongList", {
    videoId: String,
    thumbnail: String,
    title: String,
    userName: String,
    downVote: Number,
    downVoteUsers: Array,
    addedAt: Date,
    addedBy: String
});

module.exports = SongList;