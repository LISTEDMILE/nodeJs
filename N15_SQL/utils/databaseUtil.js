// abhi tak local file se kam kar rhe the but ab sql use kiya h
//pehle user me (sql ke sqlWorkBench) me ek database schema create kiya home nam se
// fir mysql version 2 import kiya
// fir taki bar bar open close na karna pade connection ek pool create kiya
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"getSQL@1234",
    database:"home"
});

// export kar diya pool.....
module.exports = pool.promise();