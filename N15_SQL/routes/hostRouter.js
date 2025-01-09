const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get("/addHome",hostController.addHomeGet);
hostRouter.post("/addHome",hostController.addHomePost);
hostRouter.get("/hostHomeList",hostController.hostHomeList);

// wo editing true var edit button wala yha nhi denge wo path ka part nhi h
hostRouter.get("/editHome/:homeId",hostController.getEditHome);
hostRouter.post("/editHome",hostController.postEditHome);

hostRouter.post("/deleteHome/:homeId",hostController.postDeleteHome);

module.exports = hostRouter;