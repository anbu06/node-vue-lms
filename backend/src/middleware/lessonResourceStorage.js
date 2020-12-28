const multer = require('multer')
const { customAlphabet } =  require('nanoid')
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)

const lessonResourceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads/lesson`)
  },
  filename: (req, file, cb) => {
    cb(null, `resource-${nanoid()}-${file.originalname.replace(/[^a-zA-Z\.]/g, '')}`)
  }
})

var upload = multer({ storage: lessonResourceStorage })

module.exports = upload.single('resource')
