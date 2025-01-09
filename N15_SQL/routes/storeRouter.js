const express = require('express');
const storeController = require('../controllers/storeController');
const storeRouter = express.Router();

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homeList",storeController.homeList);
storeRouter.get("/booked",storeController.getBooked);
storeRouter.get("/favourite",storeController.getFavourites);
// pehle ek nya router create kiya lekin is bar :Hid bhi sath me diya ki req me params aae to wo Hid ke through aa jae fir
// homeList wali file me a tag ke sath href me homeDetails ke sath dynamically detail.id jo ki homeList me tha bhej diya 
//fir router ki wajah se wo getHomeDetails ko call kar diya jisme ab isko access karne ke liye hm req.params.Hid likh skte h...
// ek aur tareeka h post wala normal tareeka values ko transfer karne ka partials me favouriteButton dekho....
storeRouter.get("/homeDetails/:Hid",storeController.getHomeDetails);

storeRouter.post("/favourite",storeController.postAddFavourites);

module.exports = storeRouter;