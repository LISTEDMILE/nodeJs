
const Home = require("../models/firstmodel");
const fs = require("fs");

exports.addHomeGet = (req, res, next) => {
  res.render("host/addHome", {
    active: "addHome",
    title: "Add Home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
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

  const photo = req.file.path;
  if (!req.file) {
    return res.status(400).render("host/addHome", {
      active: "addHome",
      title: "Add Home",
      editing: false,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errorMessage: "Please upload a photo.",
    });
  }
  const home = new Home({
    houseName,
    housePrice:housePrice,
    houseLocation:houseLocation,
    houseOwnerEmail:houseOwnerEmail,
    houseOwnerMobile: houseOwnerMobile,
    photo:photo,
    description:description,
  });
  home.save().then(
    res.render("host/addedHome", { active: "addHomePost", title: "Home Added",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,})
  );
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
    const { houseName, housePrice, houseLocation, houseOwnerEmail, houseOwnerMobile, photo, description, _id } = req.body;
    Home.findById(_id).then((home) => {
        home.houseName = houseName;
        home.housePrice = housePrice;
        home.houseLocation = houseLocation;
        home.houseOwnerEmail = houseOwnerEmail;
      home.houseOwnerMobile = houseOwnerMobile;
      home.description = description;
      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error deleting old photo:", err);
          }
          else {
            console.log("Old photo deleted successfully.");
          }
        })
        home.photo = req.file.path; // Update the photo path if a new file is uploaded
      }
      home.save().catch((err => {
        console.log("error updating");
      })).then(res.redirect("/host/hostHomeList"));
    }).catch(err => {
        console.log("error finding home");
  })
 
  
};

exports.hostHomeList = (req, res, next) => {
  const details = Home.find().then((details) => {
    res.render("host/hostHomeList", {
      active: "hostHomeList",
      title: "Home added by you",
      details: details,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/hostHomeList");
    })
    .catch((error) => {
      console.log("Error deleting home", error);
    });
};
