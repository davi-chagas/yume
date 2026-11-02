const multer = require('multer');

const directory = 'public/assets/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, directory)
    },

    filename: (req, file, cb) => {
        const extensionFile = file.originalname.split('.'[1]);

        const new_name_file = require('crypto')
        .randomBytes(64)
        .toString('hex');

        cb(null, `${new_name_file}.${extensionFile}`)
    }
})

module.exports = multer({storage});