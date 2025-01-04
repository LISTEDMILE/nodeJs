const path = require('path');
const rootDir = require('../utils/pathUtils')
const details = [];

exports.LandingPage = (req,res,next) => {
    console.log(req.url,req.method);
    res.render('homeByUtils',{details});
};

exports.addHomeGet = (req,res,next) => {
    res.sendFile(path.join(rootDir,'views','addHome.html'));
};

exports.addHomePost = (req,res,next) => {
    console.log("req.body => ",req.body);
    console.log("houseName => ",req.body.houseName);
    req.body.id=Date.now();
    details.push(req.body);
    console.log(details);
    res.sendFile(path.join(rootDir,'views','addedHome.html'));
};

exports.errorr = (req,res,next) => {
    res.status(404).sendFile(path.join(rootDir,'views','error.html'));
};