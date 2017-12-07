//test baze 


var mongo = require("mongodb").MongoClient


mongo.connect("mongodb://localhost:27017",(err,db)=>{
    if (err) throw err

    console.log(db.collection("users").find().toArray((err,users)=>{
        console.log(users)
        db.close()
        }))
    })