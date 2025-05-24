const Home = require("../models/firstmodel");
const Favourites = require("../models/favouriteModel");

exports.homeList = (req, res, next) => {
  //find declared in first.js....
  const details = Home.find().then((details) => {
    Favourites.find().then((favourites) => {
      const detailsWithFav = details.map((detail) => {
        if (favourites.includes(detail._id)) {
          detail.fav = true;
        } else {
          detail.fav = false;
        }
        return detail;
      });
      res.render("store/homeList", {
        details: detailsWithFav,
        title: "Home List",
        active: "homeList",
        isLoggedIn: req.isLoggedIn
      });
    });
  });
};

exports.getBooked = (req, res, next) => {
  const details = Home.find((details) => {
    res.render("store/booked", {
      details: details,
      title: "Bookings",
      active: "booked",
      isLoggedIn: req.isLoggedIn
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourites.find()
    .populate('homeId')
    .then((favourites) => {
      console.log(favourites);
      const favouriteHomes = favourites.map((fav) => fav.homeId);
      res.render("store/favourite", {
        favouriteHomes: favouriteHomes,
        title: "Favourites",
        active: "favourite",
        isLoggedIn: req.isLoggedIn
      })
      });
    
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body._id;
  Favourites.findOne({homeId:homeId}).then((favourites) => {
    if (favourites) {
      Favourites.deleteOne({ homeId: homeId }) .then(() => {
        res.redirect("/store/favourite");
      }).catch(err => {
        console.log("error deleting home", err);
      })
    }
    else {
      const fav = new Favourites({ homeId: homeId });
      fav.save() .then(() => {
        res.redirect("/store/favourite");
      }).catch((err) => {
        console.log("Error adding fav", err);
      });
    }
    })
   
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
        isLoggedIn: req.isLoggedIn
      });
    }
  });
};
