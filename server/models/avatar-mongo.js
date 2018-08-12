var db = require("./db-mongo");
var mongoose = require("mongoose");

var avatarScheam = mongoose.Schema({
    name : String,
    url : String,
    type : Number
})

// module.exports.saveAvatar = function(op){
//     avatar.find(op,function(err,result){
//         if (err){
//             console.log(err);
//         }
//         else{
//             if (result && result.length > 0){
//                 console.log('该数据已存在');
//             }
//             else{
                
//                 avatar.create(op,function(err,result){
//                     if (err){
//                         console.log(err);
//                     }
//                     else{
//                         // console.log(result)
//                     }
//                 })
//             }
//         }
//     })

    
// }

module.exports = db.model('avatar',avatarScheam);

