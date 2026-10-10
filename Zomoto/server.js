
//API Routes or Gateways
const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        fs.readFile("home.html",(err,data)=>{
            res.end(data);
        });
    }else if(req.url === "/order"){
        fs.readFile("order.html",(err,data)=>{
            res.end(data);
        });
    }else if(req.url === "/cart"){
        fs.readFile("cart.html",(err,data)=>{
            res.end(data);
        });
    }else{
        res.end("Page not found!!")
    }

        // url = unified resource locator
        // Double == Only value
        // Triple === Data type and value
});

server.listen(3000);
console.log("http://localhost:3000");