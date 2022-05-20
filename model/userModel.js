const mongoose = require("mongoose");

const User = new mongoose.model("User", {
  email: String,
  username: String,
  password: String,
  lastSongAdded: Date,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  }
});

module.exports = User;
