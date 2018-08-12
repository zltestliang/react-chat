var roomModel = require('../models/room-mongo');

var userModel = require('../models/user-mongo');

var onlineUser = require("../onlineUser");

var cfg = require('../../sysconfig/mongo-config');

module.exports = {
    checkUser : function *(username,passward,cb,socket){
        var fd_user = yield userModel.findOne({username:username,passward:passward});
        if (!fd_user){
            cb({result:false,msg:'用户名密码错误'});
            return;
        }

        var isLogin = false;
        var len = onlineUser.length;
        for (var i = 0; i < len; i++){
            if (onlineUser[i].userid == fd_user._id.toString()){
                isLogin = true;
                break;
            }
        }

        if (isLogin){
            cb({result:false,msg:'该用户已登录'});
        }
        else{
            onlineUser.push({
                userid: fd_user._id.toString(),
                sockid: socket.id,
                username: fd_user.username
            })

            this.onLine(fd_user._id.toString());

            console.log('当前在线人数: '+ onlineUser.length);
            cb({result:true,msg:'登录成功',data:{username:fd_user.username,avatar:fd_user.avatar,userid:fd_user._id}});
        }
    },
    registerUser : function *(info,cb){
        let user = yield userModel.findOne({username:info.username});
        
        if (user){
            cb({result:false,msg:'用户名已存在'});
        }
        else{
            let room = yield roomModel.findRoom({name: cfg.INIT_ROOM})
            var new_user = yield userModel.createUser({
                username: info.username,
                passward: info.passward,
                email: info.email,
                phone: info.phone,
                rooms: [room._id]
            });

            if (new_user){
                room.members.push(new_user._id);
                yield room.save();
                cb({result:true,msg:'注册成功'});                
            }
            else{
                cb({result:false,msg:new_user});
                
            }
        }
    },
    onLine: function(userid){
        userModel.updateUser(userid,{online:true});
    },
    offLine: function(userid){
        userModel.updateUser(userid,{online:false});
    },
    updateUser: function*(userid,imgsrc,cb){
        var result = yield userModel.updateUser({_id:userid},{avatar:imgsrc});
        if (result){
            cb({
                result:true,
            })
        }
        else{
            cb({
                result:false,
            });
        }
    },
    findUser: function (userid,success,fail) {
        userModel.findOne({_id:userid},(err,result)=>{
            if (err){
                fail();
            }
            else{
                success();
            }
        })

        
    }
}
