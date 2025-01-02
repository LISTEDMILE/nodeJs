const express = require('express');
const {testRouter} = require('./routes/testRouter');
const pathUtilsRouter = require('./routes/pathUtilsRouter');
const rootDir = require("./utils/pathUtils");
const path = require('path');

const app = express();

// matlab view engine me ejs kar diya....
app.set('view engine','ejs');
// matlab views ke liye views folder ko dekho...
app.set('views','views');
// <% yha koi bhi js likh skte h in ejs file %>
// <%= yha koi bhi variable likh skte h in ejs file %>......
// how to run it see in pathUtilsRouter.js.....

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use("/test",testRouter);
app.use("/",pathUtilsRouter);

app.use((req,res,next) => {
    res.status(404).send("<h1>Page not found</h1>");
})

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`);
});