const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter = require('./routes/storeRouter');
const authRouter =require('./routes/authRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const { default: mongoose } = require('mongoose');


// hm abhi tak sirf ek user ke hisab se code kar rhe the but ab mumltiple users aaenge toh
// pehle to hm ye dekhenge ki konsi info kis ko kitni dikhani hai
// toh hmne cookies ka use kiya hai jisse user ko pata chalega ki wo login hai ya nahi
// aur uske hisab se hi wo login page ya store page dekh payega
// jaise hmne yha postLogin me ek cookie set kiya hai isLoggedIn ka see authController.js to ab cookie set hone ka matlab hai ki ab jitni bhi request aayegi usme isLoggedIn true hoga cookie ka matlab hi hai ki jitni bhi req aae wo apne hi pc me store hote h aur jab bhi koi bhi req aae wo bhi aate h
// fir hmne ek middleware banaya hai jo har request ke liye chalega aur wo check karega ki cookie me isLoggedIn true hai ya nahi agar true hai toh req.isLoggedIn true ho jayega warna false ho jayega
// matlab jab bhi req aayegi is middleware ke through pta chalega ki user login hai ya nahi
// ab hmne yha host ke liye ek aur middleware banaya hai jo check karega ki agar user login hai toh hi host page dekh payega warna wo auth/login page pe redirect ho jayega see app.js
// fir hm req aate hi check kar lenge ki login h to kya kare nhi h to kya kare like here in navigation bar hmne login ya logout show karna hai ye decide kiya kuch button agar login nhi h to nhi dikhna chahiye ye decide kara..........


// but there are problems these can be intersepted or changes by the user in his browser and more so we use sessions shown in next folder.......


const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());
app.use((req, res, next) => {
    req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;
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

const DB_path = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/home?retryWrites=true&w=majority&appName=nodeCluster";

mongoose.connect(DB_path).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("error connecting to server", err);
})
