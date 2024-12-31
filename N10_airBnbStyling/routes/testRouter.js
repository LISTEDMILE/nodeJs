const express = require('express');

const testRouter = express.Router();


testRouter.get("/addHome",(req,res,next) => {

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