const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter = require('./routes/storeRouter');
const authRouter =require('./routes/authRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose');
const DB_path = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/home?retryWrites=true&w=majority&appName=nodeCluster";

// ab hmne kya kiya hai ki hmne is bar cheeze cookie me store karne ke bajaye session me store kiya hai
// ab as cookie sirf session id store hoti hai actual login info hmare server pe hoti hai
// hmne MongoDBStore se Object - session import kiya aur ek nya store collection banaya ape mongoDB me 
// aur ek middleware banaya jo session ko handle karega app.use(session({...})) jisme store me wo data store hoga jo hmne session me store kiya hai
// ab hmne session me isLoggedIn ko true ya false set kiya hai aur isLoggedIn ko req object me add kiya hai   

const app = express();


app.set('view engine','ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: DB_path,
    collection:'sessions'
})

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());


app.use(session({
    secret: "NodeJs",
    resave: false,
    saveUninitialized: false,
    store: store,
}));


app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
    }
    
);
app.use("/auth",authRouter);
app.use("/host", (req, res, next) => {
    if (req.isLoggedIn) {
        next();
    }
    else {
        res.redirect("/auth/login");
    }
} );
app.use("/host", hostRouter);
app.use("/store", storeRouter);


app.use(errorr.errorr);


const PORT = 3000;



mongoose.connect(DB_path).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("error connecting to server", err);
})
