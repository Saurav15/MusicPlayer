const path = require('path')

const getProfile = (req,res)=>{
    // res.sendFile(path.join(__dirname,'../public/userProfile.html'));
    res.render('userProfile');
}

module.exports = getProfile;