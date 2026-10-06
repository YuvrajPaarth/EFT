const http = require("http");
const fs = require("fs"); 
const server = http.createServer((req, res)=>{
    // res.end("I am node js server (;");
    fs.readFile("student_result.html", (err, data)=>{
        res.end(data);
    });
});
server.listen(3000); //server port address
console.log("http://localhost:3000");