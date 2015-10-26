/**
 * Created by Hernan Y.Ke on 2015/10/25.
 */
var express = require('express'),
app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    fs = require('fs'),
    path = require('path'),
    server,io;

app.use(express.static(__dirname));


app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
})

server = http.Server(app);
server.listen(5000);




console.log('Listen 5000');

io = socketIO(server);

io.on('connection',function(socket){
    socket.on('upload-image',function(message){
        var writer = fs.createWriteStream(path.resolve(__dirname, './tmp/'+message.name),{
            encoding:'base64'
        });
        writer.write(message.data);
        writer.end();

        writer.on('finish',function(){
            socket.emit('image-uploaded',{
                name:'/tmp/'+message.name
            })
        })
    })
})