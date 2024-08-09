const router = require('express').Router()
// bring in controller
const {login} = require('../controllers/auth.controller')

router.all('/', (req, res)=>{
    res.send({
        message: 'Please use auth/login or auth/logout'
    })
})

router.post('/login', login)

router.all('/logout', (req, res)=>{
    res.send({
        message: "LOGOUT"
    })
})

module.exports = router