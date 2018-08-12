var roomModel = require('../models/room-mongo');
var userModel = require('../models/user-mongo');
var onlineUser = require('../onlineUser');
var messageModel = require("../models/message-mongo");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    sendMessage : function *(io,msg){
        if (!ObjectId.isValid(msg.roomId)){
            return;
        }

        var room = yield roomModel.findOne({_id:msg.roomId}).populate({
            path: 'members',
            match: {online:true}
        })

        if (!room){
            return;
        }

        var senderUser = yield userModel.findOne({_id: msg.sender}).select("username avatar sex vip");
        if (senderUser){
            msg.sender = senderUser;
        }

        var newMsg = new messageModel({
            text : msg.text,
            ctime : msg.ctime,
            type : msg.type,
            sender: msg.sender
        });
        yield newMsg.save();

        console.log(newMsg._id);
        console.log(room.message);
        room.message.push(newMsg._id);
        yield room.save();
        

        var users = room.members;
        var len = users.length;
        for(var i = 0; i < len; i++){
            for (var j = 0; j < onlineUser.length; j++){
                if (onlineUser[j].userid == users[i]._id.toString()){
                    io.sockets.sockets[onlineUser[j].sockid].emit('push_msg',msg);
                }
            }
        }



        
    },
    getHistory : function*(op,cb){
        var roomId = op.roomId;
        var p = op.page;
        var count = op.count;

        //校验用户传过来的参数
        if (!roomId || !p || !count){
            if (cb){
                cb({
                    result : false,
                    msg : '缺少参数'
                }) 
            }
        }

        //判断房间id是否有效
        if (!ObjectId.isValid(roomId)){
            if (cb){
                cb({
                    result : false,
                    msg : '无效的房间id'
                }) 
            }
            
            return;
        }

        var room = yield roomModel.findOne({_id:roomId}).populate({
            path : "message",
            skip : (p-1) * count,
            limit : 500,    //先写死吧 有时间在改成count 传参
            populate :{
                path: 'sender',
                select: "avatar username vip"
            }
        });
        if (!room){
            if (cb){
                cb({
                    result : false,
                    msg : '无效的房间id'
                }) 
            }
        }

        cb({
            result : true,
            list : room.message
        });

    }
}