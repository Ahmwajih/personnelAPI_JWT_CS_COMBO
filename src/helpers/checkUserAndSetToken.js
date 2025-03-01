"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const jwt = require('jsonwebtoken')
const Personnel = require('../models/personnel.model')
const pwEncrypt = require('../helpers/passwordEncrypt')

module.exports = async function(userData, withRefresh = true) {
    console.log(userData)
    const { username, password } = userData

    
    if (username && password) {
    
        const user = await Personnel.findOne({ username })
    
        if (user && user.password == pwEncrypt(password)) {
    
            if (user.isActive) {
            // Login OK
    
                const accessData = {
                    _id: user._id,
                    departmentId: user.departmentId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isActive: user.isActive,
                    isAdmin: user.isAdmin,
                    isLead: user.isLead,
                }
                const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '10m' })
    
                const refreshData = {
                    username: user.username,
                    password: user.password
                }
                const refreshToken = withRefresh ? jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' }) : null
    
                return {
                    error: false,
                    token: {
                        access: accessToken,
                        refresh: refreshToken
                    }
                }
    
            } else {
    
                // res.errorStatusCode = 401
                // throw new Error('This account is not active.')
                return {
                    error: true,
                    message: 'This account is not active.'
                }
            }
        } else {
    
            // res.errorStatusCode = 401
            // throw new Error('Wrong username or password.')
            return {
                error: true,
                message: 'Wrong username or password.'
            }
        }
    } else {
    
        // res.errorStatusCode = 401
        // throw new Error('Please enter username and password.')
        return {
            error: true,
            message: 'Please enter username and password.'
        }
    }
}