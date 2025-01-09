
const Home = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');

exports.homeList = (req,res,next) => {
    //fetchAll declared in first.js....
    const details = Home.fetchAll().then(([details]) => {
        favouriteClass.getFavourites((favourites) => {    
            const detailsWithFav = details.map(detail => {
                console.log(detail);
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
        const details = Home.fetchAll().then(details => {
            const favouriteHomes = details[0].filter((e) => favourites.includes(e.id.toString()));
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
            const details = Home.fetchAll().then((details) => {
                const favouriteHomes = details[0].filter((e) => favourites.includes(e.id.toString()));
                res.render('store/favourite',{favouriteHomes:favouriteHomes,title:"Favourites",active:"favourite"});
            })
        })
            
        
    })
};

exports.getIndex = (req,res,next) => {
    // bhai ab callback to h nhi promise return kar rha to .then wagerah use karenge....
    //model me jake dekho ye fetch All ek array return karega jisme first me hoga data aur second me hoga fields to first wale ko as details nikal liya...
    const details = Home.fetchAll().then(([details]) => {
        res.render('store/',{details:details,title:"Index Page",active:"index"});
    });      
};

exports.getHomeDetails = (req,res,next) => {
    const homeId = req.params.Hid;
    Home.findById(homeId).then(([homes]) => {
        homeFound = homes[0];
        if (!homeFound){
            console.log("Home not found");
            res.redirect('/store/homeList');
        }
        else{
            res.render('store/homeDetails',{title:"Details",home:homeFound});
        }
    })
    
};



