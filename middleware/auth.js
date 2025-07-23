exports.ensureAuthenticated = (req, res, next) => {
  //return next();
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to view this page');
  res.redirect('/auth/login');
};
