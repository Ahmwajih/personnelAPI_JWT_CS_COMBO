const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    // make sure we have a token in the authorization header:
    const auth = req.headers?.authorization || null //auth is either going to be a token or null
    // get the access token
    const accessToken = auth?auth.split(' ')[1] : null // remove "Bearer " from the string
    // This leaves me with ONLY the token string.

    req.isLogin = false

    // verify the token:
    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user)=>{
        if(err){
            req.user = null
            console.log("No JWT auth")
        } else {
            req.isLogin = true
            req.user = user
            console.log("JWT AUTH SUCCESSFUL")
        }
    })
    next()
}