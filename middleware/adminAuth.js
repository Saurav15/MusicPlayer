const User = require("../model/userModel");

const adminAuth = async (req,res,next)=>{
    try {
        const user = await User.findOne({_id: req.user.user_id});
        if(user.email === "admin@gmail.com"){
            next();
        }else{
            return res.send("Not authorized to enter this URL :|")
        }
    } catch (error) {
        res.return("Error in adminAuth: " + error);
    }
}

module.exports = adminAuth