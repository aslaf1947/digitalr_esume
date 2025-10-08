var express=require("express")
var cors=require("cors")
var bodyParser=require("body-parser")
var  app=express()
var formRouter=require("./routes/applicant.rotes")
var database=require("./config/config")
const fileUpload = require('express-fileupload');
// app.use(session({
//     secret:'keyboard cat',
//     resave:false,
//     saveUninitialized:true
// }))
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(express.static('assets'))
app.use(express.static('upload'))
app.use(fileUpload());
database()
app.use("/demo",formRouter)
app.listen(5000)