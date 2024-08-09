"use strict"

const jwt = require('jsonwebtoken')
const Personnel = require('../models/personnel.model')
// bring in pwEncrypt...
const pwEncrypt = require('../helpers/passwordEncrypt')
// bring in the checkUserAndSetToken function:
const checkUserAndSetToken = require('../helpers/checkUserAndSetToken')

module.exports = {
    login: async (req, res)=>{
        const checkUser = await checkUserAndSetToken(req.body)
        if(checkUser.error){
            res.errorStatusCode = 401
            throw new Error(checkUser.message)
        } else {
            res.send(checkUser)
        }
    }
}