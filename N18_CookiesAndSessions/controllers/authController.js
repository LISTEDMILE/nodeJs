
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    active: "login",
    title: "login",
  });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/host/hostHomeList")
}
