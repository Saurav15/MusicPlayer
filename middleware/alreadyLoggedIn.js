// This middleware checks if the user ia already logged in and if yes then dont let them access the login and register page instead redirect them to search page

// if token does not exists then continue with the controller
// If token does exists then redirect to the search page
const alreadyLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }else{
      return res.redirect('search');
  }
};

module.exports = alreadyLoggedIn;
