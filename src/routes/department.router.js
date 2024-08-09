"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

// bring in department controller:
const department = require('../controllers/department.controller')
// bring in my isAdmin middleware.
const {isAdmin, isLeadOrAdmin, isActive} = require('../middlewares/authorization')

/* ------------------------------------------------------- */
// '/departments'
router.route('/')
    .get(isActive, department.list)
    .post(isAdmin, department.create)

router.route('/:id')
    .get(isActive, department.read)
    .put(isAdmin, department.update)
    .patch(isAdmin, department.update)
    .delete(isAdmin, department.delete)

// router.get('/:id/personnel', (list all personnel in a department))

/* ------------------------------------------------------- */
module.exports = router