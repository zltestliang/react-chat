var express = require("express");
var co = require("co");
var app = express();
// var cos_upload = require('./upload');
// var multer = require('multer');
// var ObjectId = require('mongoose').Types.ObjectId;
var getAuth = require("./auth");

// var storage = multer.diskStorage({

//     destination: process.cwd() + '/uploads',
//     filename: function (req, file, cb) {
//         var fileFormat =(file.originalname).split(".");
//         var index = file.originalname.lastIndexOf('.');
//         var filename = index > 0 ? file.originalname.substring(0,index) : file.originalname;
//         cb(null, filename + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// });
// var upload = multer({ storage: storage });



var server = require('http').Server(app);
var io = require('socket.io')(server);

var Init = require('./controllers/init');
var userController = require('./controllers/user');
var roomController = require('./controllers/room');
var messageController = require('./controllers/message');
var avatarController = require('./controllers/avatar');

var onlineUser = require("./onlineUser");

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("X-Powered-By",' 3.2.1')
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(express.static(__dirname + "/../build"));
// app.use(express.static(__dirname));
server.listen(8000);


app.get('/', function (req, res) {
    res.sendfile(__dirname + "/../" + "build/index.html");
      // res.sendfile(__dirname + "/test.html");
  });

app.get('/chat', function (req, res) {
    res.redirect(302, '/');  
});

app.get("/auth",function(req,res){
    getAuth(req,res);
})
// app.post("/uploadimg", upload.single('imgfile'),function(req, res, next) {
//     var userid = req.body.userid;
//     if (ObjectId.isValid(userid)){
//         userController.findUser(userid,
//             ()=>{
//                 if (req.file){
//                     console.log(req.file.filename,req.file.path);
//                     cos_upload(req.file.filename,req.file.path,(fileUrl)=>{
//                         res.send({
//                             result : true,
//                             msg : '文件上传成功',
//                             url : "http://" +  fileUrl
//                         });
//                     });
//                 }
//             },
//             ()=>{
//                 res.send({
//                     result : true,
//                     msg : '文件上传失败',
//                 });
//             }
//         );  
//     }
//     else{
//         res.send({
//             result : false,
//             msg : '文件上传失败'
//         });
//     }
    
// })

//初始化数据库
co(Init.initdb());

io.on('connection', function (socket) {
    //登录
    /*
    输入参数:username:必传
            passward:必传
    */
    socket.on('login', (info,cb)=> {
        console.log("用户登录:",info);

        // console.log(io.sockets.sockets);

        if (!info.username || !info.passward){
            cb({result:false,msg:'用户名密码不能为空'})
        }

        co(userController.checkUser(info.username,info.passward,cb,socket));
    });

    //登出
    socket.on('loginOut', ()=> {
        console.log("用户登出:");

        var len = onlineUser.length;
        for (var i = 0; i < len; i++){
            if (onlineUser[i].userid === socket.id){
                userController.offLine(onlineUser[i].userid);
                onlineUser.splice(i,1);
                break;
            }
        }

        console.log('当前在线人数: '+ onlineUser.length);
    });
    //注册
    /*
    输入参数:username:必传
            passward:必传
            email：可选
            avatar：可选
            phone:可选
    */
    socket.on('register', (info,cb)=> {
        console.log("用户注册:" , info);
        if (!info.username){
            cb({result:false,msg:'未获取到用户名'});
            return;
        }

        if (!info.passward){
            cb({result:false,msg:'未获取到密码'});
            return;
        }

        co(userController.registerUser(info,cb));
    });

    //拉去房间列表
    //userid 必传
    socket.on("pull_room_list",(userid,cb)=>{
        if (!userid){
            cb({result:false,msg:'用户id不能为空'});
        }

        co(roomController.pullRoomList(userid,cb));
        
    })

    socket.on("message",(msg,cb)=>{
        // cb(msg);
        // io.emit('push_msg',msg);
        
        var len = onlineUser.length;
        for (var i = 0; i < len; i++){
            if (onlineUser[i].sockid === socket.id){
                msg.sender = onlineUser[i].userid;
                break;
            }
        }
        
        msg.ctime = new Date().getTime();
        co(messageController.sendMessage(io,msg));
    })

    //拉去历史消息
    socket.on("pullmessage",(op,cb)=>{
        console.log(op);
        co(messageController.getHistory(op,cb));
    })

    //获取系统头像
    socket.on("get_sys_avatar",(cb)=>{
        co(avatarController.getSysAvatars(cb));
    })

    //更新用户头像
    socket.on("update_user_avatar",(imgSrc,cb)=>{
        var len = onlineUser.length;
        var userid = '';
        for (var i = 0; i < len; i++){
            if (onlineUser[i].sockid === socket.id){
                userid = onlineUser[i].userid;
                break;
            }
        }

        co(userController.updateUser(userid,imgSrc,cb));

    })

    socket.on('reconnect success', (info,cb)=> {
        console.log("用户重连:",info);

        if (info.userid && info.username){
            onlineUser.push({
                userid: info.userid,
                sockid: socket.id,
                username: info.username
            })

            userController.onLine(info.userid);
        }
        
    });


    socket.on("disconnect",function(){
        var len = onlineUser.length;
        for (var i = 0; i < len; i++){
            if (onlineUser[i].sockid === socket.id){
                userController.offLine(onlineUser[i].userid);
                onlineUser.splice(i,1);
                break;
            }
        }

        console.log('当前在线人数: '+ onlineUser.length);
    })

});

