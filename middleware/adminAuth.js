const errorHandler = require("../helper/errorHandler");
const findUserFromId = require("../helper/findUserFromId");
const User = require("../model/userModel");

const adminAuth = async (req,res,next)=>{
    try {
        const user = await findUserFromId(req.user.user_id);
        if(user.email === "admin@gmail.com"){
            next();
        }else{
            return res.send("Not authorized to enter this URL :|")
        }
    } catch (error) {
        errorHandler("adminAuth [ERROR]: ",error);
    }
}

module.exports = adminAuth