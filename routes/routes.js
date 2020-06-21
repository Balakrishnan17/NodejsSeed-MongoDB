const auth = require('../modules/auth/auth.router')
const youtube = require('../modules/youtube/youtube.router')

var routers = []

routers.push(auth)
routers.push(youtube)

module.exports = routers