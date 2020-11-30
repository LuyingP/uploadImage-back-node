const multer=require("multer");
const fileExtension = require('file-extension')

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/images/')
    },
    filename:function (req, file, cb) {
        cb(null, file.originalname)
      }
})


const upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
}).single("image");

exports.upload=upload;