const express = require('express')
const router = express.Router()
const verifyToken = require('../../utils/utility').verifyToken;
const utility = require('../../utils/utility')

const controller = require('./auth.controller')

router.get('/verify/user/authentication', verifyToken, (req, res) => {
    const userData = {
        id: 1,
        email: "email",
        first_name:"bala",
        last_name: "krishnan",
        user_type: "admin",
        token: "token_adcacas_test",
    }
    setTimeout((result) => {
        utility.sucess(res, userData)
    }, 3000)
});

router.get('/login/user/:username/:password', controller.getUser)

router.post('/create/user', controller.createUser)

router.get('/testing/route', controller.testing);

router.get('/encrypt/password/:key', verifyToken, controller.encryptPassword);

module.exports = router