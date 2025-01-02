const express = require('express');
const path = require('path');
const rootDir = require("../utils/pathUtils"); 
const details = require('./testRouter');
const pathUtilsRouter = express.Router();

pathUtilsRouter.get("/",(req,res,next) => {
    console.log(req.url,req.method);
    res.render('homeByUtils',details);
});

module.exports = pathUtilsRouter;
