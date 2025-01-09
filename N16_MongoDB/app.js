const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter =require('./routes/storeRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const {mongoConnect} = require('./utils/databaseUtil');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use("/host",hostRouter);
app.use("/store",storeRouter);

app.use(errorr.errorr);


const PORT = 3000;
mongoConnect(() => {
    // jab mongo connect ho jae aur client aa jae tab server start karo varna mat karo....
    app.listen(PORT,() => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
})
