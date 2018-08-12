import cfg from './cfg';

var Bucket = 'chat-1251480833';
var Region = 'ap-chengdu';
var protocol = 'http:';
var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
// 计算签名
var getAuthorization = function (options, callback) {
    // 方法一（适用于前端调试）
    var method = (options.Method || 'get').toLowerCase();
    var key = options.Key || '';
    var pathname = key.indexOf('/') === 0 ? key : '/' + key;
    var url = cfg.uploadServer + '/auth?method=' + method + '&pathname=' + encodeURIComponent(pathname);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
        callback(null, e.target.responseText);
    };
    xhr.onerror = function (e) {
        callback('获取签名出错');
    };
    xhr.send();
};

// 上传文件
var uploadFile = function (file, callback) {
    var fileFormat = file.name.split('.');

    var Key = "uploads/" + Date.now() + '.' + fileFormat[fileFormat.length-1];
    getAuthorization({Method: 'POST', Key: ''}, function (err, auth) {
        var fd = new FormData();
        fd.append('key', Key);
        fd.append('Signature', auth);
        fd.append('success_action_status', '200');
        fd.append('file', file);
        var url = prefix;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 206) {
                callback(null, {url: xhr.getResponseHeader('Location')});
            } else {
                callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
            }
        };
        xhr.onerror = function () {
            callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
        };
        xhr.send(fd);
    });
};

export default uploadFile;
