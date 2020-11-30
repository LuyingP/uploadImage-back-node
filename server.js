const express=require("express");
const app=express();
const cors=require("cors")
const fileController=require("./controllers/uploadController")
const ejs = require('ejs');
app.set('view engine', 'ejs');
const corsOption={
    origin:"http://localhost:4200"
}

app.use(cors(corsOption));

app.use(express.static('assets/images'));

// app.get('/', (req, res) => res.render('index'));

app.post("/upload",fileController.uploadUnImage);
app.get("/upload/:fileName",fileController.getFile)

app.listen(3030,()=>{
    console.log("server is running at 3030");
})

