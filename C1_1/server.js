/**
 * Created by Hernan Y.Ke on 2015/10/18.
 */
var http = require('http'),
    socketIO = require('socket.io'),
    fs = require('fs'),
    server,
    io;


server = http.createServer(function(req,res){
    fs.readFile(__dirname +'/index.html',function(err,data){
        res.writeHead(200);
        res.end(data);
    });
});

server.listen(5000);
io=socketIO(server);

io.on('connection',function(socket){
    socket.emit('server-greeting',{
        greeting:'greeting from server.'
    });
    socket.on('client-greeting',function(message){
        console.log(message);
    })
})