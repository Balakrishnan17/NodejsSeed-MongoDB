const service = require('./youtube.service')
const moment = require('moment-timezone')
const utility = require('../../utils/utility')
const youtubedl = require('youtube-dl')
const fs = require('fs')

const controller = {

    getVideoList: async (req, res) => {
        try {
            console.log('video list route');
            const query = req.query
            console.log('Request query');
            console.log(query);
            const url = query.url
            console.log('url: ' + url);
            let output = 'youtube.mp4'
            const video =  youtubedl(url,['--format=135'],{})
            video.on('info', function (info) {
                console.log(info);
                console.log('id:', info.id)
                console.log('title:', info.title)
                console.log('url:', info.url)
                console.log('thumbnail:', info.thumbnail)
                console.log('description:', info.description)
                console.log('filename:', info._filename)
                console.log('format id:', info.format_id)
                utility.sucess(res, info.formats)
            })
            // const video = youtubedl(url,
            //     // Optional arguments passed to youtube-dl.
            //     ['--format=18'],
            //     // Additional options can be given for calling `child_process.execFile()`.
            //     { cwd: __dirname })

            // // Will be called when the download starts.
            // video.on('info', function (info) {
            //     console.log('Download started')
            //     console.log(info);
            //     output =  info.title+".mp4"
            //     console.log('filename: ' + info._filename)
            //     console.log('size: ' + info.size)
            // })

            // video.pipe(fs.createWriteStream(output, { flags: 'a' }))

            // // Will be called if download was already completed and there is nothing more to download.
            // video.on('complete', function complete(info) {
            //     'use strict'
            //     console.log('filename: ' + info._filename + ' already downloaded.')
            // })

            // video.on('end', function () {
            //     console.log('finished downloading!')
            //     utility.sucess(res, [])
            // })
        } catch (error) {
            //console.log(error);
            utility.error(res, error)
        }
    }
}

module.exports = controller