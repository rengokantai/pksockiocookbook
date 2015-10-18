/**
 * Created by Hernan Y.Ke on 2015/10/18.
 */
var io = require('socket.io')(5000),
    sockets =[];

io.on('connection',function(socket){
    sockets.push(socket);
    socket.on('message', function (message) {
        for(var i =0;i<sockets.length;i++){
            sockets[i].send(message);
        }
    });
    socket.on('disconnect',function(){
        console.log("dicspnnect");
    })
})

