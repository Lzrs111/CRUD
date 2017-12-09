
//funkcije za bazu

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    id: String,
    name: String,
    surname: String,
    email: String
})

var connection = mongoose.connect("mongodb://localhost:27017?useMongoClient")
var userModel = connection.model("users",userSchema)

function retrievefromDB(res) {
    userModel.find({},"-_id id name surname email",(err,data)=>{
        if (err) throw err
        data = Object.assign({},data)
        res.end(JSON.stringify(data))
        })
} 

function deletefromDB(pathname,res) {
    var userId = pathname.slice(-1)
    userModel.find({id:userId}).remove((err)=>{
        if (err) throw err
        res.end()
        })
}

function addtoDB(string,res) {
    var userId = ""
    userModel.find({}).sort("-id").exec((err,data)=>{
        if(err) throw err
        if (data.length >0) {
            userId = (Number(data[0]["id"])+1).toString()
        } else {
            userId=0
        }
        var final = Object.assign({"id":userId},JSON.parse(string))
        var user = new userModel(final)
        user.save((err)=>{
            if (err) throw err
            res.end()
            })
    })

}

function editDB(string,res){
    var json = JSON.parse(string)
    console.log(json)
    userModel.update({id: json["id"] }, {$set:json},(err)=>{
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