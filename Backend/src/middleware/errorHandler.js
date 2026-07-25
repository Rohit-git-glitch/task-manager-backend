const {errorResponse} = require("../utils/response");
const errorHandler = (err,req,res,next)=>{
    console.log(err);

    return errorResponse(
    res,
    500,
    "Server Error",
    "INTERNAL_SERVER_ERROR"
);
};

module.exports = errorHandler;