const uploadFile = require("../middlewares/upload");
const fs = require("fs");

const uploadUnImage = async (req, res) => {

    uploadFile.upload(req, res, (err) => {
        if (err) {
            res.send("****" + err);
        } else {
            if (req.file == undefined) {
                res.send("undefine");
            } else {
                res.json({ imageUrl: `https://uploadimagenode.herokuapp.com/upload/${req.file.filename}` })
                // res.send(req.file)

            }
        }
    });


}

const getFile = (req, res) => {
    if (req.params.fileName) {
        const rs = fs.createReadStream("assets/images/" + req.params.fileName);
        rs.pipe(res);
    }

}



exports.uploadUnImage = uploadUnImage;
exports.getFile = getFile;