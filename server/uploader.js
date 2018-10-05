var COS = require('cos-nodejs-sdk-v5');
var {saveAvatar} = require("./models/avatar-mongo");
var path = require("path");

// 创建实例
var cos = new COS({
    AppId: '1251480833',
    SecretId: 'AKID4UvIXbWIzZXKxR7yzrqncGj5HMJ5uHer',
    SecretKey: 'EIBtWzNcigSAh6NafbN7i9QYWJvOn7qR',
});
// 分片上传

// for(var i = 20; i < 21; i++){
//     let filename = 'portrait' + (i+1) + ".png";

//     // console.log(filename);
//     upload(filename);
// }

upload("logo.svg");
function upload(filename){
    cos.sliceUploadFile({
        Bucket: 'chat',
        Region: 'ap-chengdu',
        Key: 'avatar/' + filename,
        FilePath: __dirname + "/.." +  '/portrait/' + filename
    }, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            saveAvatar({
                name : filename,
                url: 'http://' + data.Location
            })
            console.log(filename);
        }
        
    });
}
