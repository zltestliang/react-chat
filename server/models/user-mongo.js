var db = require("./db-mongo");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userScheam = mongoose.Schema({
    username : String,
    passward: String,
    email: String,
    avatar: {
        type : String,
        default: 'http://chat-1251480833.cn-southwest.myqcloud.com/avatar/portrait21.png'
    },
    sex: {
        type: Number,
        default:0   //0 保密 1 男 2 女
    },
    utime:{
        type: Number,
        default: Date.now()
    },
    ctime:{
        type: Number,
        default: Date.now()
    },
    online:{
        type: Boolean,
        default: false
    },
    rooms:[{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }],
    vip:{
        type:Number,
        default : 0
    },
    phone:Number
})




userScheam.statics.userfind = function(op){
    return new Promise((resolve,reject)=>{
        this.find(op,function(err,rows){
            if (err){
                reject(err);
            }
            else{
                resolve(rows[0]);
            }
        })
    })
    
}
userScheam.statics.createUser = function(op){

    return new Promise((resolve,reject)=>{
        this.create(op,function(err,result){
            if (err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
    
}

userScheam.statics.updateUser = function(userid,op){
    return new Promise((resolve,reject)=>{
        this.update({_id:userid},op,function(err,result){
            if (err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

userScheam.statics.updateAllUser = function(op){
    return new Promise((resolve,reject)=>{
        this.update({},op,function(err,result){
            if (err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

module.exports = db.model('user',userScheam);