
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    active: "login",
    title: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect("/store/homeList")
}
