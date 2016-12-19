var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器  

var users = [];

app.use("/", express.static(__dirname + '/client'));
server.listen(3000);

//socket部分  
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件  
    socket.on('foo', function(data) {
        //将消息输出到控制台  
        console.log(data);
    });

    // 用户登录
    socket.on("login", function(nickname) {
        if(users.indexOf(nickname)!=-1){
            socket.emit("nickExisted");
        }else{
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit("loginSuccess");
            socket.broadcast.emit("system",nickname,users.length,"login");
        }
        console.log(nickname);
    });

    socket.on("disconnect",function(){
        users.splice(socket.userIndex,1);
        socket.broadcast.emit("system",socket.nickname,users.length,"logout");
    });

    socket.on("postMsg",function(msg){
        socket.broadcast.emit("newMsg",socket.nickname,msg);
    });
});