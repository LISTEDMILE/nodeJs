const express = require('express');
const first = require('../controllers/first');
const testRouter = express.Router();


// MVC is about differentiating file on the basis of their working.
// here rather than as we did till now routing and logic in same file we can also use controllers as below.....
// pehle controllers folder me koi js file bnai usme ek function export kiya us function wali file ko pehle import karenge yha fir neeche jo.get("/", .. yha handler de denge jo export hua h..);  .
//isse kya hua ki router to ab bhi yhi h par router me jo ho rha h wo hmne logic separate file can be multiple me likh diya.....
// make sure if some variable is used also remember that.....
// ab ya to ek ek fn import karke yha seedha nam likhdo ya fir poore file ke fn ko ek object jaise yha first me import karo then first.fn type se use karlo....
testRouter.get("/",first.LandingPage);
testRouter.get("/addHome",first.addHomeGet);
testRouter.post("/addHome",first.addHomePost);

// testRouter.post("/edit",(req,res,next) => {
//     console.log(req.body);
// });

testRouter.use(first.errorr);


exports.testRouter = testRouter;