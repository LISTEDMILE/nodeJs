
exports.errorr = (req,res,next) => {
    res.status(404).json({
        message: "Resource not found",
        error: "The requested resource could not be found on this server."
    });
};