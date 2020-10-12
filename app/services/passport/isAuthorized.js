function isAuthorized(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(401);
  }
}

module.exports = {
  isAuthorized,
};