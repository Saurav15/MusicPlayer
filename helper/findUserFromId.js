const User = require("../model/userModel");
const errorHandler = require("./errorHandler");

const findUserFromId = async (id)=>{
    try {
        const userData = await User.findOne({_id: id});
        return userData
    } catch (error) {
        errorHandler("FindUserFromId [ERROR]: ", error);
    }
}

module.exports = findUserFromId;