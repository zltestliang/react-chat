
var roomModel = require('../models/room-mongo');

var userModel = require('../models/user-mongo');

module.exports = {
    pullRoomList : function*(userid,cb){
        let user = yield userModel.findOne({_id:userid}).populate({
            path: 'rooms',
            populate: {
                path: 'members',
                select:'avatar username'
            },
        });
        if (!user){
            cb({result:false,msg:'没有查询到用户信息'});
            return;
        }

        let rooms = [];
        
        for(let i = 0; i < user.rooms.length; i++){

            var obj = {
                room_id : user.rooms[i]._id,
                name :  user.rooms[i].name,
                avatar :  user.rooms[i].avatar,
                creator:  user.rooms[i].creator,
                utime :  user.rooms[i].utime,
                ctime :  user.rooms[i].ctime,
                members : user.rooms[i].members
            }

            rooms.push(obj);
        }
        cb({result:true,data:rooms});
    }
}