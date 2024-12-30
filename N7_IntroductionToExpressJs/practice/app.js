//these are the external modules..
const express = require('express');
// content type wagerah header ye sab express khud dekh leta h.....

const app = express();

app.use("/",(req,res,next) => {
    console.log("first Dummy Middleware");
    next();
});

app.use("/",(req,res,next) => {
    console.log("second Dummy Middleware");
    next();
});

// app.use("/",(req,res,next) => {
//     console.log("Third Middleware");
//     res.send("<h1>Third Middleware</h1>");
// });

app.get("/",(req,res,next) => {
    console.log("Handling / for GET");
    res.send("<h1>Third Middleware</h1>");
});

app.get("/contact",(req,res,next) => {
    console.log("Handling /contact-us for GET");
    res.send(`
        <h1>Give Details</h1>
        <form action="/contact" method="POST">
            <input placeholder="name" name="name" type="text"/>
            <input placeholder="email" name="email" type="email"/>
            <input value="submit" type="submit"/>
        </form>
    `);
});

app.post("/contact",(req,res,next) => {
    console.log("Handling /contact-us for POST");
    res.send(`<h1>Thanks for your Data`);
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});