const multer = require('multer')
const uploadConfig = require('../../config/upload')

module.exports = (multer(uploadConfig))