const express = require("express");
const app = express();
const cors = require("cors")
const schedule = require('node-schedule');
const fs = require('fs')
const fileController = require("./controllers/uploadController")
const PORT=process.env.PORT || 3030
const ejs = require('ejs');
app.set('view engine', 'ejs');

var allowlist = ['https://luyingp.github.io/uploadImage-front-angular/','https://luyingp.github.io',"http://localhost:4200"];
var corsOptions = {
    origin: function (origin, callback) {
   
           if (!origin) {
               return callback(null, true);
           }
   
           if (allowlist.indexOf(origin) === -1) {
   
               var msg = 'The CORS policy for this site does not ' +
                   'allow access from the specified Origin.';
               return callback(new Error(msg), false);
           }
           return callback(null, true);
       }
   };

app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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


app.listen(PORT, () => {
    deleteFile;
    console.log("server is running at ${PORT}");
})

