const express = require('express');
const path = require('path');
const rootDir = require("../utils/pathUtils");
const pathUtilsRouter = express.Router();

pathUtilsRouter.get("/",(req,res,next) => {
    console.log(req.url,req.method);
    res.sendFile(path.join(rootDir,'views','homeByUtils.html'));
});

module.exports = pathUtilsRouter;
