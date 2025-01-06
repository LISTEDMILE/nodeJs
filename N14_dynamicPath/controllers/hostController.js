const Home = require('../models/firstmodel');

exports.addHomeGet = (req,res,next) => {
    res.render('host/addHome',{active:"addHome",title:"Add Home"});
};

exports.addHomePost = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description);
    // isko easy way me aise bhi likh skte h.
    // const {houseName,description} = req.body;
    //const home = new Home(houseName,description);
    home.save();
    res.render('host/addedHome',{active:"addHomePost",title:"Home Added"});
};

exports.hostHomeList = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('host/hostHomeList',{active:"hostHomeList",title:"Home added by you",details});
    });
};

