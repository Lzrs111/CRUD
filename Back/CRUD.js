
//funkcije za bazu

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    name: String,
    surname: String,
    email: String
})

var connection = mongoose.connect("mongodb://localhost:27017",{useMongoClient: true})
var userModel = connection.model("users",userSchema)

//ova funkcija vadi sve korisnike iz baze
function retrievefromDB(res) {
    userModel.find({},"-__v",(err,data)=>{
        if (err) throw err
        data = Object.assign({},data)
        res.end(JSON.stringify(data))
        })
} 

//brisanje korisnika
function deletefromDB(pathname,res) {
    var userId = pathname.slice(1)
    userModel.find({_id:userId}).remove((err)=>{
        if (err) throw err
        res.end()
        })
}

// dodavanje korisnika
function addtoDB(string,res) {
    var json = JSON.parse(string)
    var final = new userModel(json)
    final.save((err)=>{
        if (err) throw err
        res.end()
        })
}

//mijenjanje korisnika
function editDB(string,res){
    var json = JSON.parse(string)
    userModel.update({_id: json["_id"]}, {$set:json},(err)=>{
            if (err) throw err
            res.end()
            })
}



module.exports = {
    retrievefromDB,
    deletefromDB,
    addtoDB,
    editDB
}
