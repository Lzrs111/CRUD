var http = require("http")
var fs = require("fs")
var url = require("url")
var retrievefromDB = require("./CRUD.js").retrieveFromDB
var index = fs.readFileSync("./build/index.html")
var mongo = require("mongodb").MongoClient



http.createServer((req,res)=>{
    res.writeHead("200",{"content-type": "text/html"})
    var pathname = url.parse(req.url).pathname;

    if(pathname == "/") {
        html = fs.readFileSync("./build/index.html", "utf8");
        res.write(html);
        res.end()
    } else if (pathname == "/working.js") {
        script = fs.readFileSync("./build/working.js", "utf8");
        res.write(script);
        res.end()
    
    } else if (req.method ==="GET" && pathname==="/user1") {
        console.log(pathname)
        retrievefromDB(mongo,pathname,res)
    }

    }).listen("1337")