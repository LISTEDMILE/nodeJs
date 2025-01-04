const express = require('express');
const {testRouter} = require('./routes/testRouter');
const rootDir = require("./utils/pathUtils");
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded());

app.use("/",testRouter);

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`);
});