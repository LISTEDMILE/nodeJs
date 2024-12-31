const express = require('express');
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const testRouter = require('./routes/testRouter');
const pathUtilsRouter = require('./routes/pathUtilsRouter');
const rootDir = require("./utils/pathUtils");
const path = require('path');

const app = express();

// agar hme koi file ka access chahiye jaise ki css file to agar direct de de to user fir direct read kar skta h use to ek public folder use hota h ki bhai is folder ko publically access dedo to css wagerah wha se link kar skte h uske liye ye middleware lagana padega....
app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use(userRouter);
app.use(hostRouter);
app.use("/test",testRouter);
app.use("/pathUtils",pathUtilsRouter);

app.use((req,res,next) => {
    res.status(404).send("<h1>Page not found</h1>");
})

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`);
});