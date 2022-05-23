const User = require("../model/userModel");
const path = require("path");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });

    // If the user exists
    if (userData) {
      // And his status is Active.
      if (userData.status === "Active") {
        // if user exists check password
        if (userData.password === password) {
          // Sign and send jwt token in a cookie
          createJwtToken(userData, process.env.TOKEN_KEY, res);
          res.redirect("search");
        } else {
          return res.send("Password didnt match.");
        }
      } else {
        return res.send("Please verify your email :)");
      }
    } else {
      return res.send("User didnt exist");
    }
  } catch (error) {
    return res.send(`Unable to login : ${error}`);
  }
};

const createJwtToken = (userData, TOKEN_KEY, res) => {
  const token = jwt.sign({ user_id: userData._id }, TOKEN_KEY, {
    expiresIn: "2h",
  });
  res.cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
  //   Expires in 2h.
};

module.exports = login;
