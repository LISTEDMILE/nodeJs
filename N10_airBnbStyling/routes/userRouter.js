const express = require('express');
const path = require('path');

// userRouter me express se Router matlab route bna liya ..
const userRouter = express.Router();


// ab is route ko same jaise app. karke karte h waise hi userRouter se kiya jo bhi karna tha ..
userRouter.get("/",(req,res,next) => {
    console.log(req.url,req.method);

    // abhi tak res.send ke andar html likhte the agar chaho kisi html file ko direct likhna to res.sendFile(path.join(__dirname,path..)); daldo jisme path.join help kar rha h join karne ke liye __dirname matlab current directory fir path as described below..   path import karna padega......
    res.sendFile(path.join(__dirname,'../','views','home.html'));
});

//last me same jaise export karte the export kar diya....
module.exports = userRouter;
