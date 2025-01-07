const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

module.exports = class Home{
    constructor(houseName,description){
        this.houseName = houseName;
        this.description = description;
        
    }

    save() {
        Home.fetchAll((details) => {
            if(this.id){// edit home wala
                details = details.map(home => home.id === this.id ? this:home);
            }
            else{// add home wala
                this.id = JSON.stringify(Date.now());
                details.push(this);
            }
            const dataPath = path.join (rootDir,'data','data.json');
            fs.writeFile(dataPath,JSON.stringify(details), error => {}); 
        })
        
    };

    static fetchAll(callback){
        const dataPath = path.join (rootDir,'data','data.json');
        fs.readFile(dataPath,(err,data) => {
            if(!err){
                callback( JSON.parse(data));
            }
            else{
                callback([]);
            }
        });  
    }

    static findById(homeId,callback){
        this.fetchAll(home => {
            const homeFound = home.find(home => home.id === homeId);
            

        })
    }

    static deleteById(homeId,callback){
        this.fetchAll(homes => {
            homes = homes.filter(home => home.id!==homeId);
            const dataPath = path.join (rootDir,'data','data.json');
            fs.writeFile(dataPath,JSON.stringify(homes),callback)
            
        })
    }
}
