const isAdmin = (req, res, next)=>{
    if(req?.user?.isAdmin){
        next()
    } else {
        throw new Error("ACCESS DENIED.  USER IS NOT AN ADMIN...")
    }
}

const isLeadOrAdmin = (req, res, next)=>{
    if(req?.user?.isAdmin || req?.user?.isLead){
        next()
    } else {
        throw new Error("ACCESS DENIED. USER IS NOT ADMIN OR LEAD")
    }
}

const isActive = (req, res, next)=>{
    if(req?.user?.isActive){
        next()
    }else{
        throw new Error("Employee is not active...")
    }
}

module.exports = {
    isAdmin,
    isLeadOrAdmin,
    isActive
}