const express = require('express');
const errorr = require('./controllers/errorrController');
const rootDir = require("./utils/pathUtils");
const path = require('path');
const { default: mongoose } = require('mongoose');
const DB_path = "mongodb+srv://Iam:heyUsingMongo@nodecluster.b7cjq.mongodb.net/todo?retryWrites=true&w=majority&appName=nodeCluster";
const cors = require('cors');

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.use(express.json());
app.use(cors());

app.use("/api/todo", require('./routes/todoItemsRouter'));
app.use(errorr.errorr);


const PORT = 3000;

// ab kya karenge server pe ejs use karne ke bajae react use karenge isse kya hoga ki humara frontend aur backend dono alag alag rahenge,
// jo bhi ui wagerah h wo client side pe render hoga aur backend sirf data provide karega, isse humara code modular ho jayega aur maintain karna asan ho jayega.
//ab iske liye express.json() use karenge jo ki json data ko parse karega aur humein use karne dega, isse humara code clean aur readable rahega.
// cors() use karenge taaki humare frontend se backend ko access kar sakein, isse humara code secure rahega aur kisi bhi cross-origin request ko allow karega.


//hmne ek alag folder bnaya itemsServices.js jisme humne server se items ko add, delete aur get karne ke liye functions bnaye hain, isse humara code modular ho jayega aur maintain karna asan ho jayega. jitna bhi backend aur frontend me links hoge wo sab yhi handle honge ab hm kya karenge ki apne react app se functions ko call karenge jo is file me h wo basically server se interact karenge.. 
// how see itemsServices.js file in todoFrontend/src/services/itemsServices.js......


mongoose.connect(DB_path).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("error connecting to server", err);
})
