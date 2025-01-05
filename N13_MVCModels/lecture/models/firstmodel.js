const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');



// data define wagarah ka kam to models ka hota h to first.js ki jagah yha kar diya.

// export hi kar rhe h  ..
module.exports = class Home{
    //constructor ke through object ko handle kar rhe...
    // jo object ke fields h unko () me likho like here houseName and all..
    // constructor kya kar rha ek object create kar rha
    constructor(houseName,description){
        //this.houseName matlab jo Landing page class h usme jo houseName h = houseName matlab jo hm constructor me dal rhe..
        this.houseName = houseName;
        this.description = description;
        this.id = Date.now();

    }

    // ECMA script ka syntax h function ka....
    save() {
        //hmare pas koi local storage like details to yha ab nhi rakhi hmne to details.push kaise hoga to save agar karna hoga to pehle sab firse fetch karenge then details me dalke file me dalenge...
        // isko samajhne ke liye pehle fetchAll wana padho.....
        Home.fetchAll((details) => {
            //jo constructor ne bnaya wo details array me push kar diya....
        details.push(this);
        const dataPath = path.join (rootDir,'data','data.json');
        fs.writeFile(dataPath,JSON.stringify(details), error => {
            
        });
        })
        
    };


    // dekho isme kya hua ki agar error nhi aai to seedha return ya aur kuch jugad se seedha print kra lete but nhi file write me time lagta h to async ki wajah se wo bad me execute hoga jisse dikkat aaegi to hmne kya kiya ki agar error na aae to hm callback Json...something jo bhi data h usee hmne wo function call kar diya jo ki fetchAll ke argument me h to yani first.js me jo fetchAll me function h wo call hoga aur wo kya kar rha h ki jo bhi data yha se return hua usse render kra rha h page to ab pehlefetchAll chal jaega fir jo fs wale se firse function call ho jaega.....
    static fetchAll(callback){
        //yha koi constructor bna nhi rhe only class export karni h to static function use kar skte h....
        
        const dataPath = path.join (rootDir,'data','data.json');
        fs.readFile(dataPath,(err,data) => {
            if(!err){
                //see if the file does not exist or name is wrong then error comes if not to wo usko fetch kar lega...
                callback( JSON.parse(data));
            }
            else{
                callback([]);
            }
        });
        
    }
}
