
const Home = require('../models/firstmodel');


exports.homeList = (req,res,next) => {
    //fetchAll declared in first.js....
    const details = Home.fetchAll((details) => {
        res.render('store/homeList',{details:details,title:"Home List",active:"homeList"});
    });
    
};

exports.getBooked = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('store/booked',{details:details,title:"Bookings",active:"booked"});
    });
};

exports.getFavourites = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('store/favourite',{details:details,title:"Favourites",active:"favourite"});
    });
};

exports.getIndex = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('store/index',{details:details,title:"Index Page"});
    });
};

