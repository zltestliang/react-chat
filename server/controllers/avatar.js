var avatarModel =  require('../models/avatar-mongo');


module.exports = {
    getSysAvatars : function*(cb){
        var avatars = yield avatarModel.find({type:0},['url']);
        if (avatars){
            cb({
                result : true,
                avatars : avatars
            });
        }
        else{
            cb({
                result : false,
                msg : '查询数据库失败'
            })
        }
    }
}