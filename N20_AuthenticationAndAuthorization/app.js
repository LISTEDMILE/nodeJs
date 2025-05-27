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

// import kiya validation by express-validator se fir see authController me use kiya see syntax uske hisab se validation add kar diya kyoki browser ke validatin change kiye ja skte h user ke through....

// hm ek se jyada middleware use kar skte h bas un sabko as array rakh do.... see authController.js ....

// ab hmne ek ek cheez ko check kiya aur fir finally ek middleware banaya jisme hm checj kar rhe h ki validation me koi error hai ya nahi agar hai to wapis signUp render with old values and if not then we can redirect....


// ab agar password save karna hai user ka to plain text me vulnerable hai to usko hash karna padega using bcryptjs library.. see authController.js
// hmne bcryptjs library ko install kiya hai aur use kiya hai password ko hash karne ke liye aur fir usko database me save karne ke liye.
//bcrypt.hash() matlab kisko hash karna aur kitni bar......

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
