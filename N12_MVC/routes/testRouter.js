const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const testRouter = express.Router();

const details = [];


testRouter.get("/",(req,res,next) => {
    console.log(req.url,req.method);
    res.render('homeByUtils',{details});
});


testRouter.get("/addHome",(req,res,next) => {

    res.sendFile(path.join(rootDir,'views','addHome.html'));
});



testRouter.post("/addHome",(req,res,next) => {
    console.log("req.body => ",req.body);
    console.log("houseName => ",req.body.houseName);
    req.body.id=Date.now();
    details.push(req.body);
    console.log(details);
    res.sendFile(path.join(rootDir,'views','addedHome.html'));
});

// testRouter.post("/edit",(req,res,next) => {
//     console.log(req.body);
// });

testRouter.use((req,res,next) => {
    res.status(404).sendFile(path.join(rootDir,'views','error.html'));
});


exports.testRouter = testRouter;