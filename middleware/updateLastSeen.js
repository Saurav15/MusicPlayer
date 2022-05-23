// This file marks user active as they hit any endpoint inside the application. Given they are logged in.
// We actully dont mark user active .. what we do is update a timestamp in the user profile.

const errorHandler = require("../helper/errorHandler");
const findUserFromId = require("../helper/findUserFromId");

const updateLastSeen = async (req, res,next) => {
  if (req.user) {
    // Get user
    try {
        // Update date 
        const userData = await findUserFromId(req.user.user_id);
        userData.lastSeen = new Date();
        await userData.save(userData)

    } catch (error) {
        errorHandler("updateLastSeen [ERROR] : ",error)
    }
  }
  next()
};

module.exports = updateLastSeen;
