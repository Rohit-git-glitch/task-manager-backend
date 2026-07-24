const successResponse = (res , statusCode , message , data = null) =>{
    return res.status(statusCode).json({
        success : true,
        message,
        data : null, //! These are default parameter if no data is provided it will become null
    });
};

const errorResponse = (res , statusCode , message , errorCode = null) =>{
    return res.status(statusCode).json({
        success : false,
        message,
        errorCode : null,
    });
};

module.exports = {
    successResponse,
    errorResponse,
}