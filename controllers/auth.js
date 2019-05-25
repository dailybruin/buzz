function isAuthenticated(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next()
  }
  res.redirect('/login')
}

module.exports = {
  isAuthenticated
}