const Home = require('../models/firstmodel');

exports.addHomeGet = (req,res,next) => {
    res.render('host/addHome',{active:"addHome",title:"Add Home",editing:false});
};



exports.addHomePost = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description);
    // isko easy way me aise bhi likh skte h.
    // const {houseName,description} = req.body;
    //const home = new Home(houseName,description);
    home.save();
    res.render('host/addedHome',{active:"addHomePost",title:"Home Added"});
};

exports.getEditHome = (req,res,next) => {
    const homeId = req.params.homeId;

    // jo question mark se editing bulaya tha...
    const editing = req.query.editing === 'true';
    Home.findById(homeId).then (home => {
        if(!home){
            console.log("Home not found");
            res.redirect("host/hostHomeList");
        }
        
        res.render('host/addHome',{detail:home[0][0],active:"hostHomeList",title:"Edit Home",editing:editing});
    })
    
};

exports.postEditHome = (req,res,next) => {
    const home = new Home(req.body.houseName,req.body.description,req.body.id);
    console.log(req.body);
    home.save();
    res.redirect('/host/hostHomeList');
};

exports.hostHomeList = (req,res,next) => {
    const details = Home.fetchAll().then((details) => {
        res.render('host/hostHomeList',{active:"hostHomeList",title:"Home added by you",details:details[0]});
    });
};


exports.postDeleteHome = (req,res,next) => {
    const homeId = req.params.homeId;
    Home.deleteById(homeId).then (() => {
        res.redirect('/host/hostHomeList');
    }) 
    .catch(error=>{
        console.log('Error deleting home',error);
    })
        
        
    
};