const service = require('./auth.service')
const moment = require('moment-timezone')
const utility = require('../../utils/utility')

module.exports = {

    getUser: async (req, res) => {
        try {
           const userData = {
                id: 1,
                email: req.params.email,
                first_name:"bala",
                last_name: "krishnan",
                user_type: "admin",
                token: "token_adcacas_test",
            }
            setTimeout(() => {
                utility.sucess(res, userData)
            }, 3000)
        } catch (error) {
            console.log(error);
            utility.error(res, error)
        }
    },

    createUser: async (req, res) => {
        try {
            const userData = req.body;
            userData.date_of_birth = moment().utc(userData.date_of_birth).format("DD-MM-YYYY");
            const save = await service.saveUser(userData)
            utility.sucess(res, save)
        } catch (error) {
            utility.error(res, error)
        }
    },

    encryptPassword: async (req, res) => {
        try {
            const key = req.params.key;
            const encryptedKey = utility.encryptKey(key);
            const decriptionKey = utility.decryptKey(encryptedKey);
            utility.sucess(res, decriptionKey)
        } catch (error) {
            console.log(error);
            utility.error(res, error)
        }
    },

    testing: async (req, res) => {
        try {
            utility.sucess(res, {})
        } catch (error) {
            console.log(error);
            utility.error(res, error)
        }
    }
}