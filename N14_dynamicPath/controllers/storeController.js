
const Home = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');

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
    favouriteClass.getFavourites((favourites) => {
        Home.fetchAll((details) => {
            
            const favouriteHomes = details.filter((e) => favourites.includes(e.id));
            console.log(details);
            console.log(favourites);
            console.log(favouriteHomes);
            res.render('store/favourite',{favouriteHomes:favouriteHomes,title:"Favourites",active:"favourite"});
        })
    })
        

};

exports.postAddFavourites = (req,res,next) => {
    console.log(req.body);
    favouriteClass.addFavourite(req.body.id,error => {
        if(error) {
            console.log('Error adding favourites')
        }
        favouriteClass.getFavourites((favourites) => {
            Home.fetchAll((details) => {
                const favouriteHomes = details.filter((e) => favourites.includes(e.id));
                res.render('store/favourite',{favouriteHomes:favouriteHomes,title:"Favourites",active:"favourite"});
            })
        })
            
        
    })
};

exports.getIndex = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('store/index',{details:details,title:"Index Page"});
    });
};

exports.getHomeDetails = (req,res,next) => {
    const homeId = req.params.Hid;
    Home.findById(homeId,homeFound => {
        if (!homeFound){
            console.log("Home not found");
            res.redirect('/store/homeList');
        }
        else{
            res.render('store/homeDetails',{title:"Details",home:homeFound});
        }
    })
    
};



