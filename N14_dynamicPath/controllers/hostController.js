const Home = require('../models/firstmodel');

exports.addHomeGet = (req,res,next) => {
    res.render('host/addHome',{active:"addHome",title:"Add Home",editing:false});
};

exports.getEditHome = (req,res,next) => {
    const homeId = req.params.homeId;

    // jo question mark se editing bulaya tha...
    const editing = req.query.editing === 'true';
console.log(editing);
    Home.findById(homeId,home => {
        console.log(home);
        if(!home){
            console.log("Home not found");
            res.redirect("host/hostHomeList");
        }
        res.render('host/addHome',{detail:home,active:"hostHomeList",title:"Edit Home",editing:editing});
    })
    
};

exports.addHomePost = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description);
    // isko easy way me aise bhi likh skte h.
    // const {houseName,description} = req.body;
    //const home = new Home(houseName,description);
    home.save();
    res.render('host/addedHome',{active:"addHomePost",title:"Home Added"});
};

exports.postEditHome = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description);
    home.id=req.body.id;
    console.log(home);
    home.save();
    res.redirect('/host/hostHomeList');
};

exports.hostHomeList = (req,res,next) => {
    const details = Home.fetchAll((details) => {
        res.render('host/hostHomeList',{active:"hostHomeList",title:"Home added by you",details});
    });
};


exports.postDeleteHome = (req,res,next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    Home.deleteById(homeId,error => {
        if(error) {
            console.log("Error while deleting",error);
        }
        res.redirect('/host/hostHomeList');
    })
};