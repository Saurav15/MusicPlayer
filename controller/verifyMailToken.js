const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const path = require('path')


const verifyMailToken = async (req, res) => {
  const tokenFromUrl = req.params.id;
  const jwtResult = verifyJWT(tokenFromUrl, process.env.SECRET_TOKEN_FOR_EMAIL);
  if (jwtResult.success) {
    try {
      const userData = await User.findOne({ email: jwtResult.email });
      userData.status = "Active";
      await userData.save();
      // res.sendFile(path.join(__dirname,'../public/emailVerified.html'))
      res.render('emailVerified');
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send(jwtResult.msg);
  }
};

const verifyJWT = (token, SECRET_TOKEN_FOR_EMAIL) => {
  try {
    const data = jwt.verify(token, SECRET_TOKEN_FOR_EMAIL);
    return { email: data.data, success: true };
  } catch (error) {
    return { msg: error.message, success: false };
  }
};
module.exports = verifyMailToken;
