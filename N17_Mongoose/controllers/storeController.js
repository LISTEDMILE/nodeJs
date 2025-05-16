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
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourites.find().then((favourites) => {
    favourites = favourites.map((fav) => fav.homeId.toString());
    const details = Home.find().then((details) => {
      const favouriteHomes = details.filter((e) =>
        favourites.includes(String(e._id))
      );
      res.render("store/favourite", {
        favouriteHomes: favouriteHomes,
        title: "Favourites",
        active: "favourite",
      });
    });
  });
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = String(req.body._id);
  Favourites.find().then((favourites) => {
      favourites = favourites.map((fav) => fav.homeId.toString());
      if (favourites.includes(homeId)) {
        Favourites.findByIdAndDelete(homeId)
      } else {
        const fav = new Favourites({ homeId: homeId });
        fav.save().catch((err) => {
          console.log("Error adding fav", err);
        });
      }
    })
    .then(() => {
      res.redirect("/store/favourite");
    });
};

exports.getIndex = (req, res, next) => {
  // bhai ab callback to h nhi promise return kar rha to .then wagerah use karenge....
  //model me jake dekho ye fetch All ek array return karega jisme first me hoga data aur second me hoga fields to first wale ko as details nikal liya...
  const details = Home.find().then(([details]) => {
    res.render("store/", {
      details: details,
      title: "Index Page",
      active: "index",
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
      });
    }
  });
};
