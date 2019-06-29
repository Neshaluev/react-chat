var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg) )
        io.emit('chat message', msg)
    })
});
  
http.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});