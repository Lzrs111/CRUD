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
        "id": "0",
        "name": "Mirko",
        "surname": "Mirković",
        "email": "mirko@gmail.com",
    }, 
    {
        "id": "1",
        "name": "Ana",
        "surname": "Anić",
        "email": "ana.anic@gmail.com"
     },
     {
        "id": "2",
         "name": "Mario",
         "surname": "Dragović",
         "email": "mario.dragovic@gmail.com"
     },
     {
        "id": "3",
         "name": "Ivan",
         "surname":"Ivanović",
         "email:": "ivan.ivanovic@gmail.com"
     }
]

for (u in users)  {
    var user = new userModel({
        id: users[u]["id"],
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