var mongoose=require("mongoose")
function dbase()
{
    mongoose.connect("mongodb://0.0.0.0:27017/jobcraft_updated").then(()=>{
        console.log("connected successfully")
    }).catch(err=>{
        console.log(err)
    })
}
module.exports=dbase