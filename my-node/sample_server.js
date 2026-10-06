const http = require("http"); 
const server = http.createServer((req, res)=>{
    res.end("I am 6000 port address (;")
});
server.listen(6000); //server port address
console.log("http://localhost:6000");