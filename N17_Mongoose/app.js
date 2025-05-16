const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter =require('./routes/storeRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const { default: mongoose } = require('mongoose');

// for ease we use mongoose we import as shown and connect mongoose to given mongoDB path
// than create a schema as in firstmodel.js matlab ek structure pehle se define krdenge fir
// mongoose.model karke export karenge aur usme hoga nam model or schemaka ka
// ab is nam se import karke koi bhi function, find wagerah use kar skte h
// usko agar edit kiya to Schema ka nam.save(); se save ho jaega agar existing h id to edit nhi to add......


// in facourite model we have used type mongoose.Scheema.Types.ObjectId matlab monsoose ke scheema wala type aappas me cordinate krne me aasanin rhegi
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use("/host",hostRouter);
app.use("/store",storeRouter);

app.use(errorr.errorr);


const PORT = 3000;

const DB_path = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/home?retryWrites=true&w=majority&appName=nodeCluster";

mongoose.connect(DB_path).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("error connecting to server", err);
})
