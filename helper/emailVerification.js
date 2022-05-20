/*
    Create a function that return a unique token.
    Create a function that actully sends a mail.
*/
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


function getUniqueToken(data) {
  const token = jwt.sign({ data }, process.env.SECRET_TOKEN_FOR_EMAIL);
  return token;
}

async function sendMail(email,token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT,
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  await transporter.verify().then(console.log).catch(console.error);

  // Send Mail
  transporter.sendMail({
    from: '"Pied-Piper" <idfaltu15@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Verify your email.", // Subject line
    text: "Please click on the below link to verify your email address.", // plain text body
    html: "<b>Please click on the below link to verify tour email : </b><a href=" + `${process.env.ORIGIN_URL}/verify/${token}` + "><h2>Verify</h2></a>", // html body
  }).then(info => {
    console.log({info}
    );
  }).catch(console.error);
} 


module.exports = {
    getUniqueToken,
    sendMail
}