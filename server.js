const express = require("express");
const app = express();
const cors = require("cors")
const schedule = require('node-schedule');
const fs = require('fs')
const fileController = require("./controllers/uploadController")
const ejs = require('ejs');
app.set('view engine', 'ejs');
const corsOption = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOption));

app.use(express.static('assets/images'));
// app.use(express.static('views'));
// app.get('/', (req, res) => res.render('index'));

app.post("/upload", fileController.uploadUnImage);
app.get("/upload/:fileName", fileController.getFile)

// const rule = new schedule.RecurrenceRule();
// rule.hour = 16;
// rule.minute = 36;
var deleteFile = schedule.scheduleJob('0 0 * * *', function () {

    const path = './assets/images'

    try {
        fs.rmdir(path, { recursive: true },()=>{
            console.log("delete ok")
        })
    } catch (err) {
        console.log(err);
    }

});


app.listen(3030, () => {
    deleteFile;
    console.log("server is running at 3030");
})

