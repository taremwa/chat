var express = require('express');



//App setup
var app = express();
//var server = app.listen(5000, function(){
    //console.log('lesteninig on port 5000')
//});

//static files
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
//socket setup
//var io = socket(server)(http);
io.emit('some event', {for: 'everyone'});
io.on('connection', function(socket){
    console.log('socket connection',socket.id);//unique id
    
    //sendout to connected clients on the socket
    socket.on('chat', function(data){
        console.log(data)
        io.emit('chat',data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });
});
http.listen(5000, function(){
    console.log('listening on *:3000');
});