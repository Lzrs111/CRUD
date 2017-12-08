
//funkcije za bazu

var mongo = require("mongodb")
var http = require("http")

function retrieveFromDB(db,url,res) {
    db.connect("mongodb://localhost:27017",(err,datab)=>{
        datab.collection("users").find({},{_id:0}).toArray((err,info)=>{
            if (err) throw err
            var final = Object.assign({},info)
            res.end(JSON.stringify(final))
            })
        })
}

function deleteFromDB(db,url,res) {
    var userId = url.slice(-1)
    console.log("user id", userId)
    db.connect("mongodb://localhost:27017",(err,datab)=>{
       var collection =  datab.collection("users")        
       collection.remove({id:userId})
       collection.find({}).toArray((err,info)=>{
            console.log("User deleted")
            console.log(info)
            res.end()
            })           
    })


}


module.exports ={
    retrieveFromDB,
    deleteFromDB
}