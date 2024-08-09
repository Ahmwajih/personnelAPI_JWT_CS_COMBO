"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

// bring in personnel controller
const personnel = require('../controllers/personnel.controller')
/* ------------------------------------------------------- */

const { isAdmin, isLeadOrAdmin, isActive } = require('../middlewares/authorization')

router.post('/login', personnel.login)
router.all('/logout', personnel.logout)

router.route('/')
    .get(isActive, personnel.list)
    .post(isAdmin, personnel.create)

router.route('/:id')
    .get(isActive, personnel.read)
    .put(isLeadOrAdmin, personnel.update)
    .patch(isLeadOrAdmin, personnel.update)
    .delete(isAdmin, personnel.delete)

/* ------------------------------------------------------- */
module.exports = router