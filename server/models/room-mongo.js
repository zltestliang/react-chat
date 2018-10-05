var mongoose = require("mongoose");
var db = require("./db-mongo");
var Schema = mongoose.Schema;

var roomScheam = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    avatar:{
        type:String,
        default: 'http://chat-1251480833.cn-southwest.myqcloud.com/avatar/logo.svg'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    admins:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    utime: {
        type: Number,
        default: Date.now()
    },
    ctime:{
        type: Number,
        default: Date.now()
    },
    message:[
        {
            type: Schema.Types.ObjectId,
            ref: 'message'
        }
    ]
        
})



roomScheam.statics.findRoom = function(op,cb){
    return new Promise((resolve,reject)=>{
        this.find(op,(err,result)=>{
            if (err){
                reject(err)
            }
            else{
                resolve(result[0]);
            }
        })
    })
}

roomScheam.statics.updateRoom = function(room_id,op){
    return new Promise((resolve,reject)=>{

        roomModel.update({room_id:room_id},op,(err,result)=>{
            if (err){
                reject(err)
            }
            else{
                resolve(result);
            }
        })
    })
}


module.exports = db.model("room",roomScheam);
