const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter = require('./routes/storeRouter');
const authRouter =require('./routes/authRouter');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const DB_path = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/home?retryWrites=true&w=majority&appName=nodeCluster";



const app = express();

//agar hme apne local se koi file bhejni h to hm direct nhibhej skte only text hi bhej skte h to uske liye hmne enctype multipart/form-data use kiya h see addHome.ejs file usse kya hoga ab data chunks me chla jaega.....
// input type me file , image/* ka matlab image ka koi bhi type ya / ke bad jpg, png, jpeg, gif etc. ho skta h..

// ab us file ko access karne ke liye multer use karte h jo ki ek middleware h jo file ko access karne me help karta h..

// ab hme multer ko configure karna hoga ki hme file kaise store karni h aur uska naam kya rakhna h etc. to uske liye hm multer.diskStorage() use karte h jo ki ek function h jo ki 2 argument leta h destination aur filename.

// destination me hme batana hoga ki file ko kaha store karna h aur filename me hme batana hoga ki file ka naam kya rakhna h..

// ab hme multer ko use karna hoga to uske liye hm multer() function ko call karte h jo ki ek object return karta h jisme hme storage aur fileFilter pass karna hoga..

// ab hme app.use() me multer() ko use karna hoga jo ki ek middleware h jo file ko access karne me help karta h..

// jaise yha app.use(multer(multerOptions).single('photo')); yha single() ka matlab h ki hme sirf ek file bhejni h aur photo us file ka naam h jo ki form me diya h..

// ab hme file ko access karne ke liye req.file ka use karna hoga jo ki multer ne create kiya h..

//isse kya hoga ki file uploaad folder jo ki hmne dicide kiya usme save ho jaega aur to use them is folder ko kuch req ke liye public bhi kar skte h see app.js file me app.use("/uploads/", express.static(path.join(rootDir, 'uploads'))); yha hmne uploads folder ko public kar diya h jisse ki hum us file ko access kar sake..

app.set('view engine','ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: DB_path,
    collection:'sessions'
});
const randomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  randomString(20) + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const multerOptions = {
    storage: storage,
    fileFilter: fileFilter,
};

app.use(express.static(path.join(rootDir, 'public')));
app.use("/uploads/", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads/", express.static(path.join(rootDir, 'uploads')));
app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo'));

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
