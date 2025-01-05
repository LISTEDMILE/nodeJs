
exports.errorr = (req,res,next) => {
    res.status(404).render('errorr/errorr',{title:"Error"});
};