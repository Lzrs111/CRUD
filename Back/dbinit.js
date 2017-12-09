//stvaranje inicijalne baze podataka 
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

var users = [
    {
        "name": "Mirko",
        "surname": "Mirković",
        "email": "mirko@gmail.com",
    }, 
    {
        "name": "Ana",
        "surname": "Anić",
        "email": "ana.anic@gmail.com"
     },
     {
         "name": "Mario",
         "surname": "Dragović",
         "email": "mario.dragovic@gmail.com"
     },
     {
         "name": "Ivan",
         "surname":"Ivanović",
         "email:": "ivan.ivanovic@gmail.com"
     }
]

for (u in users)  {
    var user = new userModel({
        name: users[u]["name"],
        surname: users[u]["surname"],
        email: users[u]["email"]
    })
    
    user.save((err)=>{
       if (err) throw err
       })
}


userModel.find({},(err,data)=>{
    console.log("data")
    console.log(data)
    })