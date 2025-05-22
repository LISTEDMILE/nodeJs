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


// agar hmne kisi collection me kisi aur collection ke cheeje directly associated save kar rakhi h jaise yha favourites but favourites me h to home ki id hi to agar hm chahte h ki alag se delete na karna pade ya usme koi operation ho to favourites me khud koi operation ho jae to ye use kar skte h see firstModel.js.
// hmne homeSchema.pre matlab homeSchema me jab koi operation ho jo bhi pre() ke andar h to usse pehle  async function see firstmodel.js call karenge jisme parameter denge next matlab function poora hone ke bad next jo bhi tha fir hmne
// this.getQuery()._id matlab jo id pe operation ho rha usme jo _id field h usko access kar rhe..
// fir await me delete.........


// agar hm chahte h ki poora fetch na ho only jitna chahiye utna ho to uske liye see storeController.js yha hmne getFavourites me Favourites.find()kiya jiska matlab favourites ko fetch kar liya fir .populate("homeId") matlab favourites collection me har element me jo homeId h uska type hmne mongoose me mongoose.Schema.Types.ObjectId kar diya matlab jo hmne home list bnai h uski id ka type diya h to jis jisme favourites wali id hogi usko khud fetch karega and only unhe hi karega to ab hme alag se home aur favourites wo bhi poore poore fetch nhi karne honge......

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
