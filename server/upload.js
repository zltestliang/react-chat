var COS = require('cos-nodejs-sdk-v5');
var path = require("path");

// 创建实例
var cos = new COS({
    AppId: '1251480833',
    SecretId: 'AKID4UvIXbWIzZXKxR7yzrqncGj5HMJ5uHer',
    SecretKey: 'EIBtWzNcigSAh6NafbN7i9QYWJvOn7qR',
});

function cos_upload(filename,filepath,cb){
    cos.sliceUploadFile({
        Bucket: 'chat',
        Region: 'ap-chengdu',
        Key: 'uploade/' + filename,
        FilePath: filepath
    }, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            cb(data.Location);
            // saveAvatar({
            //     name : filename,
            //     url: 'http://' + data.Location
            // })
            // console.log(filename);
        }
        
    });
}

module.exports = cos_upload