var mongoose = require("mongoose");
var config = require("../../sysconfig/mongo-config");

mongoose.Promise = global.Promise;
var db = mongoose.createConnection(`mongodb://${config.server}:${config.port}/${config.database}`);

module.exports = db;

