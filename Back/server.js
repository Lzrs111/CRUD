var http = require("http")
var fs = require("fs")
var url = require("url")
var retrievefromDB = require("./CRUD.js").retrieveFromDB
var editDB = require("./CRUD.js").editDB
var addToDB = require("./CRUD.js").addToDB
var deletefromDB = require("./CRUD.js").deleteFromDB
var index = fs.readFileSync("./build/index.html")
var mongo = require("mongodb").MongoClient



http.createServer((req,res)=>{
    var pathname = url.parse(req.url).pathname;

    if(pathname == "/") {
        html = fs.readFileSync("./build/index.html", "utf8");
        res.write(html);
        res.end()
    } else if (pathname == "/working.js") {
        script = fs.readFileSync("./build/working.js", "utf8");
        res.write(script);
        res.end()
    
    } else if (req.method ==="GET" && pathname==="/users") {
        retrievefromDB(mongo,pathname,res)
    } else if (req.method==="DELETE") {
        deletefromDB(mongo,pathname,res)
    } else if (req.method==="POST" && pathname == "/adduser") {
            var string= ""
            req.on("data",(data)=>{
                string+=data.toString()
                addToDB(mongo,string,res)
            })
    } else if (req.method ==="POST" && pathname == "/edituser") {
            var string = ""
            req.on("data",(data)=>{
                string+=data.toString()
                editDB(mongo,string,res)
            })
    }

    }).listen("1337")