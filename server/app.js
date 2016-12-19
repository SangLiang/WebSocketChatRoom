var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/",function(req,res){
    res.send("<h1>欢迎来到我的聊天室</h1>")
});

http.listen(3000,function(){
    console.log("listen on 3000");
});

var onlineUsers = {};

var onlineCount = 0;

io.on("connection",function(){
    console.log("a user connected");

    socket.on("login",function(obj){
        socket.name= obj.userid;

        if(!onlineUsers.hasOwnProperty(obj.userid)){
            onlineUsers[obj.userid] = obj.username;
            onlineCount ++;
        }
        io.emit("login",{onlineUsers:onlineUsers,onlineCount:onlineCount,user:obj});
        console.log(obj.username+"加入到了聊天室");
    });

})