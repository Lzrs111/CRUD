//stvaranje inicijalne baze podataka 

var mongo = require("mongodb").MongoClient

mongo.connect("mongodb://localhost:27017",(err,db)=>{
    if (err) throw err

    db.createCollection("users",{strict: true},(err,collection)=>{
        if (err) throw err

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

        collection.insertMany(users,(err,users)=>{
            if (err) throw err
            console.log("Ubačeno " + Object.keys(users).length + " korisnika")
            db.close()
        })

        })


    })