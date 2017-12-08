
//funkcije za bazu

var mongo = require("mongodb")
var http = require("http")

//funkcija koja vadi sve korisnike iz baze
function retrieveFromDB(db,url,res) {
    db.connect("mongodb://localhost:27017",(err,datab)=>{
        datab.collection("users").find({},{_id:0}).toArray((err,info)=>{
            if (err) throw err
            var final = Object.assign({},info)
            res.end(JSON.stringify(final))
            })
        })
}

//funkcija koja briše korisnika iz baze
function deleteFromDB(db,url,res) {
    var userId = url.slice(-1)
    console.log("user id", userId)
    db.connect("mongodb://localhost:27017",(err,datab)=>{
       var collection =  datab.collection("users")        
       collection.remove({id:userId})
       collection.find({},{_id:0}).toArray((err,data)=>{
            if (err) throw err
            var final = Object.assign({},data)
            res.end(JSON.stringify(final))
            })
    })
}

//funkcija koja dodaje u bazu
function addToDB(db,body,res) {
    var json = JSON.parse(body)
    
    db.connect("mongodb://localhost:27017",(err,datab)=>{
       var collection =  datab.collection("users") 
       collection.find({},{_id:0,name:0,surname:0,email:0}).toArray((err,info)=>{
           //s obzirom da se id korisnika ne unosi u front endu, korsniku se dodijeljuje id za jedan veći od trenutnog maksimalnog
           var max = -1
           if (info.length > 0) {
                max = Number(info[info.length-1]["id"])
           }
           max = max+1
           json = Object.assign({"id":max.toString()},json)
           collection.insertOne(json,(err)=>{
               res.end()
               })
           })
    })       
}

function editDB(db,body,res) {
    var json = JSON.parse(body)
    
    db.connect("mongodb://localhost:27017",(err,datab)=>{
       var collection =  datab.collection("users")
       console.log(json)
       console.log(json["id"])
       collection.update({id:json["id"]},json)
       res.end()
    })
}

module.exports ={
    retrieveFromDB,
    deleteFromDB,
    addToDB,
    editDB
}