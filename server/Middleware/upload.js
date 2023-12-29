const multer = require('multer')

// exports.upload = multer().none()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'PJ-' + file.originalname)
    }
  })
  
  exports.upload = multer({ storage: storage }).single('file')