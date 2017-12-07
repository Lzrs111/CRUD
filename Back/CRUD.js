//funkcije za bazu

var mongo = require("mongodb")
var http = require("http")

function retrieveFromDB(db,url,res) {
    var userId = url.slice(-1)
    db.connect("mongodb://localhost:27017",(err,datab)=>{
        datab.collection("users").findOne({id:userId},(err,info)=>{
            console.log(typeof(info.name))
            res.end(info.name)
            })
        })
}


module.exports ={
    retrieveFromDB
}