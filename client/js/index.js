$(function() {
    var chatroom = new ChatRoom();
    chatroom.init();
});

function ChatRoom() {
    this.socket = null;
}

ChatRoom.prototype = {
    init: function() {
        var self = this;
        self.socket = io.connect();
        this.socket.on("connect", function() {
            $("#info").text("获取服务器成功");
            $("#nickWrapper").show();
        });

        // 注册按钮点击
        $("#loginBtn").click(function() {
            var nickName = $("#nicknameInput").val();

            if (nickName.trim().length != 0) {
                self.socket.emit("login", nickName);
                console.log(nickName);
            } else {
                $("#nicknameInput").focus();
            }

        });

        //  角色名重复
        self.socket.on("nickExisted", function() {
            $("#info").text("对不起您的用户名被占用了");
            console.log();
        });

        // 注册成功
        self.socket.on("loginSuccess", function() {
            $("#info").text("昵称注册成功");
            $("#loginWrapper").hide();
        });

        // 系统事件
        self.socket.on("system", function(nickName, userCount, type) {
            var msg = nickName + (type == "login" ? " joined" : " left");
            var content = "<p>" + msg + "</p>";
            self._displayNewMsg("system", msg)
            
            if (userCount > 1) {
                $("#status").text(userCount + "users online");
            }
        });

        self.socket.on("newMsg",function(user,msg){
            self._displayNewMsg(user,msg);
        });

        // 发送消息
        $("#sendBtn").click(function() {
            var msg = $("#messageInput").val();
            if (msg != "") {
                  self.socket.emit("postMsg",msg);
                  self._displayNewMsg('me', msg);
            }else{
                $("#messageInput").focus();
            }
        });
    },

    _displayNewMsg: function(user, msg, color) {
        var date = new Date().toTimeString().substr(0, 8);
        var message = "<p>" + user + "<span class='time-span'>(" + date + "):</span>" + msg + "</p>";
        $("#historyMsg").append(message);
    }
};