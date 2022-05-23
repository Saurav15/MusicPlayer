// This function will go through all the entries and check if the lastSeenData is less then 10 min from now. If so count ++.

const User = require("../model/userModel");
const checkTimeDifference = require("./checkTimeDifference");
const errorHandler = require("./errorHandler");

// Var to count the active users:

const countCurrentActiveUser = async(req,res)=>{
    let activeUsers = 0
    try {
        const allUser = await User.find();
        allUser.map(item=>{
            const timeDiff = checkTimeDifference(item.lastSeen);
            // Logic to check active users
            if(timeDiff < process.env.TIME_DIFFERENCE_FOR_ACTIVE_USER){
                activeUsers = activeUsers + 1;
            }
        })
        return activeUsers;
    } catch (error) {   
        errorHandler("countCurrentActiveUser [ERROR] : ",error);
    }

}

module.exports = countCurrentActiveUser;
