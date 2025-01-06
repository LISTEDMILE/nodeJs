const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const favouriteDataPath = path.join(rootDir,"data","favourite.json");
module.exports = class favouriteClass{
    static addFavourite(homeId,callback){
        favouriteClass.getFavourites((favourites) => {
            if(favourites.includes(homeId)){
                favourites = favourites.filter(e => e!=homeId);
                console.log('removed',homeId);
            }
            else{
                favourites.push(homeId);
                console.log('added',homeId);
                console.log(favourites);
            }
            fs.writeFile(favouriteDataPath,JSON.stringify(favourites),callback);
        });
    }
    
    static getFavourites(callback){
        fs.readFile(favouriteDataPath,(err,data) => {
            callback(!err ? JSON.parse(data) : []);
            
        });           
    }
}
