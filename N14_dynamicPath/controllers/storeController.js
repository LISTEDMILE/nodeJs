
const Home = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');

exports.homeList = (req,res,next) => {
    //fetchAll declared in first.js....
    const details = Home.fetchAll((details) => {
        favouriteClass.getFavourites((favourites) => {    
            const detailsWithFav = details.map(detail => {
                if(favourites.includes(detail.id)){
                    detail.fav=true;
                }
                else{
                    detail.fav=false;
                }
                return detail;
            })
            res.render('store/homeList',{details:detailsWithFav,title:"Home List",active:"homeList"});
        })
        
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
            res.render('store/favourite',{favouriteHomes:favouriteHomes,title:"Favourites",active:"favourite"});
        })
    })
        

};

exports.postAddFavourites = (req,res,next) => {
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



