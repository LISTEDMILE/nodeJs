const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const testRouter = express.Router();


testRouter.get("/addHome",(req,res,next) => {

    res.sendFile(path.join(rootDir,'views','addHome.html'));
});

const details = [];

testRouter.post("/addHome",(req,res,next) => {
    console.log("req.body => ",req.body);
    console.log("houseName => ",req.body.houseName);
    req.body.id=Date.now();
    details.push(req.body);
    console.log(details);
    res.sendFile(path.join(rootDir,'views','addedHome.html'));
});

// another method of export we read....
exports.testRouter = testRouter;
exports.details = details;