const favouriteClass = require("../models/favouriteModel");
const Home = require("../models/firstmodel");

exports.addHomeGet = (req, res, next) => {
  res.render("host/addHome", {
    active: "addHome",
    title: "Add Home",
    editing: false,
  });
};

exports.addHomePost = (req, res, next) => {
  const {
    houseName,
    housePrice,
    houseLocation,
    houseOwnerEmail,
    houseOwnerMobile,
    description,
  } = req.body;
  const home = new Home({
    houseName,
    housePrice:housePrice,
    houseLocation:houseLocation,
    houseOwnerEmail:houseOwnerEmail,
    houseOwnerMobile:houseOwnerMobile,
    description:description,
  });
  home.save();
  res.render("host/addedHome", { active: "addHomePost", title: "Home Added" });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;

  // jo question mark se editing bulaya tha...
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("host/hostHomeList");
    }

    res.render("host/addHome", {
      detail: home,
      active: "hostHomeList",
      title: "Edit Home",
      editing: editing,
    });
  });
};

exports.postEditHome = (req, res, next) => {
    const { houseName, housePrice, houseLocation, houseOwnerEmail, houseOwnerMobile, description, _id } = req.body;
    Home.findById(_id).then((home) => {
        home.houseName = houseName;
        home.housePrice = housePrice;
        home.houseLocation = houseLocation;
        home.houseOwnerEmail = houseOwnerEmail;
        home.houseOwnerMobile = houseOwnerMobile;
        home.description = description;
        home.save().catch((err => {
            console.log("error updating");
        }))
    }).catch(err => {
        console.log("error finding home");
  })
 
  res.redirect("/host/hostHomeList");
};

exports.hostHomeList = (req, res, next) => {
  const details = Home.find().then((details) => {
    res.render("host/hostHomeList", {
      active: "hostHomeList",
      title: "Home added by you",
      details: details,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then((homeId) => {
      favouriteClass.getFavourites().then((favourites) => {
        favourites = favourites.map((fav) => fav.homeId);
        if (favourites.includes(homeId)) {
          favouriteClass.deleteFavourite(homeId);
        }
      });
    })
    .then(() => {
      res.redirect("/host/hostHomeList");
    })
    .catch((error) => {
      console.log("Error deleting home", error);
    });
};
