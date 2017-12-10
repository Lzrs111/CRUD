var http = require("http")
var fs = require("fs")
var url = require("url")
var retrievefromDB = require("./crud.js").retrievefromDB
var editDB = require("./crud.js").editDB
var addToDB = require("./crud.js").addtoDB
var deletefromDB = require("./crud.js").deletefromDB
var index = fs.readFileSync("./build/index.html")



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
        retrievefromDB(res)
    } else if (req.method==="DELETE") {
        deletefromDB(pathname,res)
    } else if (req.method==="POST" && pathname == "/adduser") {
            var string= ""
            req.on("data",(data)=>{
                string+=data.toString()
                addToDB(string,res)
            })
    } else if (req.method ==="POST" && pathname == "/edituser") {
            var string = ""
            req.on("data",(data)=>{
                string+=data.toString()
                editDB(string,res)
            })
    }

    }).listen("5000")