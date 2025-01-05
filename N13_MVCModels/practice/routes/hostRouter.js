const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get("/addHome",hostController.addHomeGet);
hostRouter.post("/addHome",hostController.addHomePost);
hostRouter.get("/hostHomeList",hostController.hostHomeList);

module.exports = hostRouter;