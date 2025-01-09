const db = require("../utils/databaseUtil");

module.exports = class Home{
    constructor(houseName,description,id){
        this.houseName = houseName;
        this.description = description; 
        this.id = id;
    }

    save() {
       


        if(this.id){ // for update as id was present...
            return db.execute(
                'UPDATE homes SET houseName=?, description=? WHERE id=?' , [this.houseName,this.description,this.id]
            );
        }
        else{
       return db.execute(

         // syntax to insert...
        // agar string h to '' me dena hoga warna waise hi

        /* aise hi kar skte h par isme problem h ki input me agar hm query bhejenge to execute ho jaegi to hack ho skta h to uske liye fir ? wala syntax lgaenge....

        `INSERT INTO homes (houseName,description) VALUES ('${this.houseName}','${this.description}')`
      

       */
        
            'INSERT INTO homes (houseName,description) VALUES (?, ?)', [this.houseName, this.description]
       

       );
    }
    };

    static fetchAll(){
        // db.execute ka matlab h is query ko execute karo 
        // SELECT * FROM homes ka matlab sare arrays from homes import kardo...
      return db.execute('SELECT * FROM homes');
    }

    static findById(homeId){
        // if we want any particular one
        //  remember here == is not used only = is comparing...
       return db.execute('SELECT * FROM homes WHERE id=?',[homeId]);
    }

    static deleteById(homeId,callback){
        // for delete syntax...
        return db.execute('DELETE FROM homes WHERE id=?',[homeId]);
    }
}
