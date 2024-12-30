const express = require('express');
const bodyParser = require('body-parser');

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
    //bodyParser.urlencoded() bad me use hua h to abhi tak to req.body me kuch nhi hoga to undefined aaega but next wale post (/contact) me poora form ki details aa jaengi.....
    console.log("Handling /contact-us for POST",req.body);
    next();
});

// jo hmne data chunk me bhejge array me karke convert venvert sab karke jo file me write kiya tha uske liya itna bda process na karna pade to express ye feature deta h bodyParser.urlencoded() matlab jo body array thi pehle jab chunk wala method pdha tha ab usme direct hi aa jaega usko access karne ke liye req.body use kar skte h.....
app.use(bodyParser.urlencoded());

app.post("/contact",(req,res,next) => {
    console.log("Handling /contact-us for POST",req.body);
    res.send(`<h1>Thanks for your Data`);
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});