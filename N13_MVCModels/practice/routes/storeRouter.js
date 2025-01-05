const express = require('express');
const storeController = require('../controllers/storeController');
const storeRouter = express.Router();

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homeList",storeController.homeList);
storeRouter.get("/booked",storeController.getBooked);
storeRouter.get("/favourite",storeController.getFavourites);


module.exports = storeRouter;