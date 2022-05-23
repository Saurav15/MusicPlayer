// Checks if the user is already logged in if yes then dont show login and register page.

const alreadyLoggedIn = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token){
        next();
    }else{
        return res.redirect('search');
    }
}

module.exports = alreadyLoggedIn