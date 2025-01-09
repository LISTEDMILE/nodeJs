const mongo  = require('mongodb');

// mongo ka client mongoClient me save kar liya...
const mongoClient = mongo.MongoClient;

//connnect karne ke liye apne cluster me connect click karo us link ko yha use kar skte h....
const mongoUrl = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/?retryWrites=true&w=majority&appName=nodeCluster";

let _db;

const mongoConnect = (callback) => {
    //mongoClient se connect kar diya yha...
    mongoClient.connect(mongoUrl).then(client => {
        callback();
        _db = client.db('home');
    })
    .catch(err => {
        console.log('Error while connecting to MongoDB',err);
    })
}

const getDB = () => {
    if(!_db){
       throw new Error("Mongo not connected"); 
    }
    return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;