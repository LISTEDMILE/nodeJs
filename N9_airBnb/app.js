const express = require('express');
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const testRouter = require('./routes/testRouter');

const app = express();

//yha ab body parsing ko import karne ki bhi jarurat nhi..
// iska matlab .use se kiya to matlab jab bhi koi req aaeggi usko req.body me mal dega.....
app.use(express.urlencoded());

// is bar hmne kya kiya ki sare routes pages ko alag files me bna liya usko require se import kar liya them app.use ke andar usko rakha to wo same hi kam karega but alag file me hoga to handling aasan hogi....
app.use(userRouter);
app.use(hostRouter);
// ("/test",testRouter) isko testRoter.js me jake padho....
app.use("/test",testRouter);

app.use((req,res,next) => {
    //hmne path nhi dala parameter me matlab agar koi res nhi aaya pehle middlewares me to koi bhi path ho ye run karega aur status(404) jo kiya h isse  hoga kya ki user ko to dikhega ki Page not found jaise hmne likha h but console me networks me dikhaega ki ye kya condition h jaise is bar hmne 404 dala matlab hm bta rhe h ki bhle hi user ke liye sahi se chal gya aur normally page not found dikh rha but actual me usse koi page nhi mile to jo exception ke liye hmne handle kiya tha wo page chla h....
    res.status(404).send("<h1>Page not found</h1>");
})

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`);
});