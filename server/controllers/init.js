var userModel = require('../models/user-mongo');

var roomModel = require('../models/room-mongo');
var cfg = require('../../sysconfig/mongo-config');


module.exports = {
    initdb : function*(){

        var user = yield userModel.userfind({username:'zltestliang'});
        var room = yield roomModel.findRoom({name: cfg.INIT_ROOM});

        userModel.updateAllUser({online:false});;//设置所有用户默认为未登录

        if (user && room){
            console.log('房间已经创建过了');
            return;
        }

        let createUserResult = yield userModel.createUser({username:'zltestliang',
                                                passward:'19491986',
                                                sex:1,
                                                vip:1});

        if (createUserResult){
            var new_Room = new roomModel({
                name : cfg.INIT_ROOM,
                creator : createUserResult._id,
                members : [createUserResult._id]
            });
            
            createUserResult.rooms.push(new_Room._id);
            createUserResult.save();
            new_Room.save();
        }
    
    }
    

}