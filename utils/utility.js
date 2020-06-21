const crypto = require('crypto');
const resizedIV = Buffer.allocUnsafe(16);
const settings = require('../settings');
const environment = require("../config/" + settings.environment);

const responce = {

    sucess(res, data) {
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: data || []
        })
    },

    error(res, data, status_code = 400) {
        res.status(400).send({
            status: 400,
            message: 'Error',
            data: data || []
        })
    },

    verifyToken(req, res, next) {        
        let tokenSignature = req.headers["auth-token"];

        if (tokenSignature) {
            next()
        } else {
            res.status(400).send({
                status: 400,
                message: 'Error',
                data: "User not found."
            });
        }
    },

    getAgeByDateofBirth(dob) {
        const date = new Date();
        const thisYear = date.getFullYear();
        const today =date.valueOf();
        
        const birthDate = new Date(dob);
        const birthYear = birthDate.getFullYear();
    
        let age = thisYear - birthYear;    
        
        const checkYearComplete = birthDate.setFullYear(new Date().getFullYear());
        if (checkYearComplete > today) {
            age--;
        }
        return age;
    },

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },

    encryptKey(encrptionKey) {
        const key = crypto.createHash('sha256').update(environment.ENCRYPTION_KEY).digest();
        const cipher = crypto.createCipheriv("aes-256-ctr", key, resizedIV);
        const encryptedKey = cipher.update(encrptionKey, "binary", "hex");
        return encryptedKey;
    },

    decryptKey(hash) {
        const key = crypto.createHash('sha256').update(environment.ENCRYPTION_KEY).digest();
        const cipher = crypto.createDecipheriv("aes-256-ctr", key, resizedIV);
        const decriptionKey = cipher.update(hash, "hex", "binary");
        return decriptionKey;
    }
}

module.exports = responce