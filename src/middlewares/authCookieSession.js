module.exports = async (req, res, next)=>{
    // bring in personnel model so we can lookup user data from the cookie/session
    const Personnel = require('../models/personnel.model')

    if(req.session?.id){
        const user = await Personnel.findOne({ _id: req.session.id, password: req.session.password})
        // console.log("USERDATA FROM COOKIE")
        // console.log(user)
        req.user = user
        console.log(`isAdmin: ${req.user.isAdmin}`)
        console.log(`isLead: ${req.user.isLead}`)
    }
    next()
}