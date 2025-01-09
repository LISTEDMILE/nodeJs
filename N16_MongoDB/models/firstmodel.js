const {getDB} = require('../utils/databaseUtil');
const {ObjectId} = require('mongodb');

module.exports = class Home{
    constructor(houseName,housePrice,houseLocation,houseOwnerEmail,houseOwnerMobile,description,_id){
        this.houseName = houseName;
        this.housePrice = housePrice;
        this.houseLocation = houseLocation;
        this.houseOwnerEmail = houseOwnerEmail;
        this.houseOwnerMobile = houseOwnerMobile;
        this.description = description;
        
        if(_id){
            this._id = _id;
        }
    }

    save() {
        // db me wo database dalo jo databse utils se export kiya....
        const db = getDB();
        if(this._id){// update
            const updateFields = {houseNane:this.houseName,housePrice:this.housePrice,houseLocation:this.houseLocation,houseOwnerEmail:this.houseOwnerEmail,houseOwnerMobile:this.houseOwnerMobile,description:this.description};
            return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:updateFields})
        }
        else{
            // to insert 
            return db.collection('homes').insertOne(this);
        }
    };

    static fetchAll(){
        const db = getDB();
        //to find particular rercord
        //.find() gives curser .toArray() gives array
        return db.collection('homes').find().toArray();
    }

    static findById(homeId){
        const db = getDB();
        // mongo me khud se id de deta h _id karke....
        // .next() se agle objext par chla jaega....
        // new object wala isliye use kiya kyuki hm string serach kar rhe but mongo to kisi aur form me bhej rha h atlas me jake check karo...
        return db.collection('homes').find({_id:new ObjectId(String(homeId))}).next();
    }

    static deleteById(homeId,callback){
        const db = getDB();
        return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId))});
    }
}
