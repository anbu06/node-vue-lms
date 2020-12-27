const multer = require('multer')
const path = require("path")
const { customAlphabet } =  require('nanoid')
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg')
    cb(null, true)
  else cb(null, false)
}

const courseThumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads/course`)
  },
  filename: (req, file, cb) => {
    cb(null, `thumbnail-${nanoid()}-${file.originalname.replace(/[^a-zA-Z\.]/g, '')}`)
  }
})

var upload = multer({ storage: courseThumbnailStorage, fileFilter })

module.exports = upload.single('thumbnail')
