const User = require("../model/userModel");
const path = require("path");
const { getUniqueToken, sendMail } = require("../helper/emailVerification");

// Handling post request
const registration = async (req, res) => {
  // First check if token already exists then redirect to search.
  if (req.user) {
    res.redirect("search");
  }

  const { email, username, password, repeat_password } = req.body;

  // First find if the user already exists
  User.findOne({ email: email }, async (err, user) => {
    // If user exists return the login file without adding user to db
    console.log(user);
    if (user) {
      res.send("User Already exists!");
      // res.sendFile(path.join(__dirname,'../public/login.html'))
    } else {
      // Else Add the user to the db if both the passwords match
      if (password === repeat_password) {
        const newUser = new User({
          username: username,
          email: email,
          password: password,
          lastSongAdded: null,
          confirmationCode: null,
        });

        try {
          await newUser.save();

          // Create a token and send it in mail for verification
          const emailToken = getUniqueToken(newUser.email);
          // Send the mail to confirm emailId.
          sendMail(newUser.email, emailToken);
        } catch (error) {
          throw "Unable to enter user data to DB!";
        }

        // res.sendFile(path.join(__dirname,'../public/login.html'))
        res.render("login");
      } else {
        throw "Password didn't match!";
      }
    }
  });
};

module.exports = registration;
