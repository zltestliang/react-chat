var mongoose = require("mongoose");
var db = require("./db-mongo");
var Schema = mongoose.Schema;

var msgSheam = new  mongoose.Schema({
    text: String,
    ctime: Number,
    type: String,
    sender:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }
})


module.exports = db.model("message",msgSheam)


