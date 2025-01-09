const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter =require('./routes/storeRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');


/* ye test ke liye likha tha ki kaise db se interact kare

const db = require("./utils/databaseUtil");


db.execute('SELECT * FROM homes').then(result => {
    console.log('Getting from DB',result);
    // result me yha do array aaenge ek data ka aur ek fields ka
    // isko aise bhi likh skte h .then([row,fields] => {
    //console.log('Getting from DB',row,fields);
    // yha row me data h fields me fields.....
})
.catch(error => {
    console.log('Error while reading records',error);
})

*/

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use("/host",hostRouter);
app.use("/store",storeRouter);

app.use(errorr.errorr);


const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`);
});