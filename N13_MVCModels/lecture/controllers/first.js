const path = require('path');
const rootDir = require('../utils/pathUtils');
const Home = require('../models/firstmodel');


exports.LandingPage = (req,res,next) => {
    //fetchAll declared in first.js....
    const details = Home.fetchAll((details) => {
        res.render('homeByUtils',{details});
    });
    
};

exports.addHomeGet = (req,res,next) => {
    res.sendFile(path.join(rootDir,'views','addHome.html'));
};

exports.addHomePost = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description);
    // isko easy way me aise bhi likh skte h.
    // const {houseName,description} = req.body;
    //const home = new Home(houseName,description);
    home.save();
    res.sendFile(path.join(rootDir,'views','addedHome.html'));
};

exports.errorr = (req,res,next) => {
    res.status(404).sendFile(path.join(rootDir,'views','error.html'));
};