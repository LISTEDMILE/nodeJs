
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    active: "login",
    title: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  res.cookie("isLoggedIn", true);
  res.redirect("/store/homeList")
}

exports.postLogout = (req, res, next) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/auth/login");
}
