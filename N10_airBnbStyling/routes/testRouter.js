const express = require('express');

const testRouter = express.Router();


testRouter.get("/addHome",(req,res,next) => {

    //just same as hostRouter but here what we are trying is ki pehle app.use ke and (hostRouter) dala tha fir url andar jakar match ho rhi thi..
    //but is bar hmne kya kiya ki app.use ke andar("/test",testRouter) karke kiya iska matlab ab (/test) wali req hi testRouter wale file me compare honge hi (/test....)ke aage kya h fir match honge (/test) nhi h to chahe fir /addHome aa jae is file me check nhi honge......
    res.send(`
        <h1>This is the addHome page in the testRouter</h1>
        <form action="/host/addHome" method="POST">
            <input type="text" name="houseName" placeholder="House Name"/>
            <input type="submit"/>
        </form>
    `)
});

testRouter.post("/addHome",(req,res,next) => {
    console.log(req.body);
    res.send(`
        <h1>This is the addHome page in the testRouter</h1>
        <a href="/">Go to Home (Direct Path) </a>
        <br><br><br>
        <a href="/pathUtils">Go to Home (Path Utils) </a>
    `)
});


//last me same jaise export karte the export kar diya....
module.exports = testRouter;