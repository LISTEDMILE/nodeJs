const Home = require("../models/firstmodel");
const User = require("../models/user");

exports.homeList = (req, res, next) => {
  //find declared in first.js....
  const details = Home.find().then((details) => {
    const userFavs = req.session.user.favourites || [];
    const detailsWithFavs = details.map((detail) => {
      detail.fav = userFavs.includes(detail._id);
    return detail;
  });
      res.render("store/homeList", {
        details: detailsWithFavs,
        title: "Home List",
        active: "homeList",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    });
};

exports.getBooked = (req, res, next) => {
  const details = Home.find((details) => {
    res.render("store/booked", {
      details: details,
      title: "Bookings",
      active: "booked",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavourites = async (req, res, next) => {

  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
 
      res.render("store/favourite", {
        favouriteHomes: user.favourites,
        title: "Favourites",
        active: "favourite",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      })
    
};

exports.postAddFavourites = async (req, res, next) => {
  const homeId = req.body._id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
    if (user.favourites.includes(homeId)) {
      user.favourites.pull(homeId);
      await user.save();
        res.redirect("/store/favourite");
    }
    else {
      user.favourites.push(homeId);
      await user.save();
        res.redirect("/store/favourite");
    }
    
   
};

exports.getIndex = (req, res, next) => {
  // bhai ab callback to h nhi promise return kar rha to .then wagerah use karenge....
  //model me jake dekho ye fetch All ek array return karega jisme first me hoga data aur second me hoga fields to first wale ko as details nikal liya...
  const details = Home.find().then(([details]) => {
    res.render("store/", {
      details: details,
      title: "Index Page",
      active: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.Hid;
  Home.findById(homeId).then((homes) => {
    if (!homes) {
      console.log("Home not found");
      res.redirect("/store/homeList");
    } else {
      res.render("store/homeDetails", {
        title: "Details",
        active: "homeList",
        home: homes,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
