const express = require('express');
const path = require('path');
// isse kya hua just ki rootDir me wo path aa gya jisme utils folder h ab .. ya aur kuch se wapis nhi jana hogga working dir se jaise abhi tak karte the ab hm is path se start karenge
const rootDir = require("../utils/pathUtils");


const pathUtilsRouter = express.Router();


pathUtilsRouter.get("/",(req,res,next) => {
    console.log(req.url,req.method);

   // jaise (userRouter) wale me yha (__dirname) use kiya tha fir .. se wapis gye fir views tak pohoch pae but ab seedha rootDir se start karke views tak pohoch jaenge....
   res.sendFile(path.join(rootDir,'views','homeByUtils.html'));
});

module.exports = pathUtilsRouter;
