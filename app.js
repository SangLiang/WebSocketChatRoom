var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器  

app.use("/", express.static(__dirname + '/client'));
server.listen(3000);

//socket部分  
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件  
    socket.on('foo', function(data) {
        //将消息输出到控制台  
        console.log(data);
    })
});

