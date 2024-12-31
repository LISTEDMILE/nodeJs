const express = require('express');

// hostRouter me express se Router matlab route bna liya ..
const hostRouter = express.Router();


hostRouter.get("/host/addHome",(req,res,next) => {
    res.send(`
        <h1>Register your Home Here</h1>
        <form action="/host/addHome" method="POST">
            <input type="text" name="houseName" placeholder="House Name"/>
            <input type="submit"/>
        </form>
    `)
});

hostRouter.post("/host/addHome",(req,res,next) => {
    console.log(req.body);
    res.send(`
        <h1>Home registered successfully</h1>
        <a href="/">Go to Home (Direct Path) </a>
        <br><br><br>
        <a href="/pathUtils">Go to Home (Path Utils) </a>
    `)
});


//last me same jaise export karte the export kar diya....
module.exports = hostRouter;