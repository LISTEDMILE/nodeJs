
const mongoose = require('mongoose');

module.exports = class favouriteClass{
    constructor(homeId){
        this.homeId = homeId;
    }

    save() {
        const db = getDB();
        return db.collection('favourites').insertOne(this);
    }

    static deleteFavourite(homeId){
        const db = getDB();
        return db.collection('favourites').deleteOne({homeId:homeId.toString()});
    }
    
    static getFavourites(){
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }
}

