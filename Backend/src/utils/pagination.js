const getPagination = (query) => {
    
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 10;

    if(page < 1){
        page = 1;
    }

    const MAX_LIMIT = 50;

    if(limit > MAX_LIMIT){
        limit = MAX_LIMIT;
    }

    if(limit < 1 || isNaN(limit)){
        limit = 10;
    }

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    };
};

module.exports = {
    getPagination
};


/*
    The 1.0 code for pagination
    let page;
            let limit;
    
            if(req.query.page){
                page = Number(req.query.page);
            }else{
                page = 1;
            }
            if(req.query.limit){
                limit = Number(req.query.limit);
            }else{
                limit = 10;
            }
    
                //Now below is validation for pagination
                if(page < 1){
                    page = 1;
                }
                const MAX_LIMIT = 50;
                if(limit > MAX_LIMIT){
                    limit = MAX_LIMIT;
                }
                if(isNaN(limit)){
                    limit = 10;
                }
    
            
            const skip = (page-1)*limit;
            const tasks = await Task.find({
                user : req.user._id,
            })
            .skip(skip)         //todo now mongo db will Ignore first 5 tasks
            .limit(limit);      //todo Return next 5 tasks
 */