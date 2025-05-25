
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    active: "login",
    title: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/store/homeList")
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  })
}
