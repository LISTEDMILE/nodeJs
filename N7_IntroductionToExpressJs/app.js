// these are the core modules...
// yha waise iski jarurat h nhi kyoki express se kar rhe h..
//    const http = require('http');


//these are the external modules..
const express = require('express');
// content type wagerah header ye sab express khud dekh leta h.....


//middleware are the steps kya kya kis sequence me hota h isme teen parameters honge req res and next jo bolega next middleware pe jao..
const app = express();

// .use used to use this middleware....
// isme ek parameter h path jo ki agar na likho to default (/) hota h....
// agar / h to uske aage run nhi honge agar hm (/) port pe run kare but agar hm (/this) aise run karenge to (/) wala bhi chlega aur (/this wala bhi)....
// get and post bhi use kar skte jab path aur method dono compare karne ho but ab use ki tarah sare nhi chlenge only wo chlega jo exactly match karega jaise (/this) h to (/this) wala hi chlega (/) wala nhi....
app.use("/",(req,res,next) => {
    console.log("first middleware");
    // next() is used to call next middleware...
    // .send ke bad next() use nhi kar skte...
    next();
});

app.use("/this",(req,res,next) => {
    console.log("second middleware");

    // res.send is same as res.write but it automatically ends the req res cycle....
    res.send("<h1>welcome to first middleware</h1>");
});


// iski bhi jarurat nhi direct app.listen kar skte h...
//    const server = http.createServer(app);


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
});