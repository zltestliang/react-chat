import React from 'react';

import {message} from 'antd';

import cfg from '../cfg';
import uploadFile from '../upload';

import "../css/toolbar.less";

function beforeUpload(file) {
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    return isLt5M;
}

class ToolBar extends React.Component{
    constructor(){
        super();
        this.state = {showFace:false};
    }

    openFace = ()=>{
        this.setState({showFace: !this.state.showFace});
    }

    handleFace = (e)=>{
        this.props.insertFace(e.target.className);
  
        this.setState({showFace: !this.state.showFace});
    }

    // renderQQFaces = ()=>{
    //     var faces = [];
    //     for (var i = 1; i < 92; i++){
    //         var path = require('../images/qq/' + i + '.gif');
    //         faces.push(
    //             <img alt="" className="qqface" src={path} key={i}/>
    //         )
    //     }

    //     return faces;
    // }

    //上传图片
    handleChange = (info)=>{
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
            
        //     this.props.sendImgMsg(info.file.response.url);

        // } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
  
    

        var file = info[0];

        if (!file){
            return;
        }

        if (!beforeUpload(file)){
            return;
        }
        
        var isImage = false;
        if (/image\/\w+/.test(file.type)){
            isImage = true;
        }
        else{
            return;     //暂时不支持上传文件 todo：后续有时间在开发文件上传
        }
        
        uploadFile(file,(err,data)=>{
            if (err){
                message.error(err);
            }
            else{
                this.props.sendImgMsg(data.url);
            }
        })
        
    }
    render(){
        

        return (
            <div className="toolbar">
                <button className="face-icon" onClick={this.openFace}>
                </button>
                
                <i className="upload-icon" >
                    <input type="file" accept="image/" onChange={(e)=>{this.handleChange(e.target.files)}}/>
                </i>
                
                {
                    this.state.showFace ? 
                    <div className="faces">
                        <div className="q-faces" onClick={this.handleFace}>
                            <img alt="" title="微笑" type="qq" src={cfg.EmojiUrl} className="qqface qqface0"></img>
                            <img alt="" title="撇嘴" type="qq" src={cfg.EmojiUrl} className="qqface qqface1"></img> 
                            <img alt="" title="色" type="qq" src={cfg.EmojiUrl} className="qqface qqface2"></img> 
                            <img alt="" title="发呆" type="qq" src={cfg.EmojiUrl} className="qqface qqface3"></img> 
                            <img alt="" title="得意" type="qq" src={cfg.EmojiUrl} className="qqface qqface4"></img> 
                            <img alt="" title="流泪" type="qq" src={cfg.EmojiUrl} className="qqface qqface5"></img> 
                            <img alt="" title="害羞" type="qq" src={cfg.EmojiUrl} className="qqface qqface6"></img> 
                            <img alt="" title="闭嘴" type="qq" src={cfg.EmojiUrl} className="qqface qqface7"></img> 
                            <img alt="" title="睡" type="qq" src={cfg.EmojiUrl} className="qqface qqface8"></img>
                            <img alt="" title="大哭" type="qq" src={cfg.EmojiUrl} className="qqface qqface9"></img>
                            <img alt="" title="尴尬" type="qq" src={cfg.EmojiUrl} className="qqface qqface10"></img>
                            <img alt="" title="发怒" type="qq" src={cfg.EmojiUrl} className="qqface qqface11"></img>
                            <img alt="" title="调皮" type="qq" src={cfg.EmojiUrl} className="qqface qqface12"></img>
                            <img alt="" title="呲牙" type="qq" src={cfg.EmojiUrl} className="qqface qqface13"></img>
                            <img alt="" title="惊讶" type="qq" src={cfg.EmojiUrl} className="qqface qqface14"></img>
                            <img alt="" title="难过" type="qq" src={cfg.EmojiUrl} className="qqface qqface15"></img>
                            <img alt="" title="酷" type="qq" src={cfg.EmojiUrl} className="qqface qqface16"></img>
                            <img alt="" title="冷汗" type="qq" src={cfg.EmojiUrl} className="qqface qqface17"></img>
                            <img alt="" title="抓狂" type="qq" src={cfg.EmojiUrl} className="qqface qqface18"></img>
                            <img alt="" title="吐" type="qq" src={cfg.EmojiUrl} className="qqface qqface19"></img>
                            <img alt="" title="偷笑" type="qq" src={cfg.EmojiUrl} className="qqface qqface20"></img>
                            <img alt="" title="愉快" type="qq" src={cfg.EmojiUrl} className="qqface qqface21"></img>
                            <img alt="" title="白眼" type="qq" src={cfg.EmojiUrl} className="qqface qqface22"></img>
                            <img alt="" title="傲慢" type="qq" src={cfg.EmojiUrl} className="qqface qqface23"></img>
                            <img alt="" title="饥饿" type="qq" src={cfg.EmojiUrl} className="qqface qqface24"></img>
                            <img alt="" title="困" type="qq" src={cfg.EmojiUrl} className="qqface qqface25"></img>
                            <img alt="" title="惊恐" type="qq" src={cfg.EmojiUrl} className="qqface qqface26"></img>
                            <img alt="" title="流汗" type="qq" src={cfg.EmojiUrl} className="qqface qqface27"></img>
                            <img alt="" title="憨笑" type="qq" src={cfg.EmojiUrl} className="qqface qqface28"></img>
                            <img alt="" title="悠闲" type="qq" src={cfg.EmojiUrl} className="qqface qqface29"></img>
                            <img alt="" title="奋斗" type="qq" src={cfg.EmojiUrl} className="qqface qqface30"></img>
                            <img alt="" title="咒骂" type="qq" src={cfg.EmojiUrl} className="qqface qqface31"></img>
                            <img alt="" title="疑问" type="qq" src={cfg.EmojiUrl} className="qqface qqface32"></img>
                            <img alt="" title="嘘" type="qq" src={cfg.EmojiUrl} className="qqface qqface33"></img>
                            <img alt="" title="晕" type="qq" src={cfg.EmojiUrl} className="qqface qqface34"></img>
                            <img alt="" title="疯了" type="qq" src={cfg.EmojiUrl} className="qqface qqface35"></img>
                            <img alt="" title="衰" type="qq" src={cfg.EmojiUrl} className="qqface qqface36"></img>
                            <img alt="" title="骷髅" type="qq" src={cfg.EmojiUrl} className="qqface qqface37"></img>
                            <img alt="" title="敲打" type="qq" src={cfg.EmojiUrl} className="qqface qqface38"></img>
                            <img alt="" title="再见" type="qq" src={cfg.EmojiUrl} className="qqface qqface39"></img>
                            <img alt="" title="擦汗" type="qq" src={cfg.EmojiUrl} className="qqface qqface40"></img>
                            <img alt="" title="抠鼻" type="qq" src={cfg.EmojiUrl} className="qqface qqface41"></img>
                            <img alt="" title="鼓掌" type="qq" src={cfg.EmojiUrl} className="qqface qqface42"></img>
                            <img alt="" title="糗大了" type="qq" src={cfg.EmojiUrl} className="qqface qqface43"></img>
                            <img alt="" title="坏笑" type="qq" src={cfg.EmojiUrl} className="qqface qqface44"></img>
                            <img alt="" title="左哼哼" type="qq" src={cfg.EmojiUrl} className="qqface qqface45"></img>
                            <img alt="" title="右哼哼" type="qq" src={cfg.EmojiUrl} className="qqface qqface46"></img>
                            <img alt="" title="哈欠" type="qq" src={cfg.EmojiUrl} className="qqface qqface47"></img>
                            <img alt="" title="鄙视" type="qq" src={cfg.EmojiUrl} className="qqface qqface48"></img>
                            <img alt="" title="委屈" type="qq" src={cfg.EmojiUrl} className="qqface qqface49"></img>
                            <img alt="" title="快哭了" type="qq" src={cfg.EmojiUrl} className="qqface qqface50"></img>
                            <img alt="" title="阴险" type="qq" src={cfg.EmojiUrl} className="qqface qqface51"></img>
                            <img alt="" title="亲亲" type="qq" src={cfg.EmojiUrl} className="qqface qqface52"></img>
                            <img alt="" title="吓" type="qq" src={cfg.EmojiUrl} className="qqface qqface53"></img>
                            <img alt="" title="可怜" type="qq" src={cfg.EmojiUrl} className="qqface qqface54"></img>
                            <img alt="" title="菜刀" type="qq" src={cfg.EmojiUrl} className="qqface qqface55"></img>
                            <img alt="" title="西瓜" type="qq" src={cfg.EmojiUrl} className="qqface qqface56"></img>
                            <img alt="" title="啤酒" type="qq" src={cfg.EmojiUrl} className="qqface qqface57"></img>
                            <img alt="" title="篮球" type="qq" src={cfg.EmojiUrl} className="qqface qqface58"></img>
                            <img alt="" title="乒乓" type="qq" src={cfg.EmojiUrl} className="qqface qqface59"></img>
                            <img alt="" title="咖啡" type="qq" src={cfg.EmojiUrl} className="qqface qqface60"></img>
                            <img alt="" title="饭" type="qq" src={cfg.EmojiUrl} className="qqface qqface61"></img>
                            <img alt="" title="猪头" type="qq" src={cfg.EmojiUrl} className="qqface qqface62"></img>
                            <img alt="" title="玫瑰" type="qq" src={cfg.EmojiUrl} className="qqface qqface63"></img>
                            <img alt="" title="凋谢" type="qq" src={cfg.EmojiUrl} className="qqface qqface64"></img>
                            <img alt="" title="嘴唇" type="qq" src={cfg.EmojiUrl} className="qqface qqface65"></img>
                            <img alt="" title="爱心" type="qq" src={cfg.EmojiUrl} className="qqface qqface66"></img>
                            <img alt="" title="心碎" type="qq" src={cfg.EmojiUrl} className="qqface qqface67"></img>
                            <img alt="" title="蛋糕" type="qq" src={cfg.EmojiUrl} className="qqface qqface68"></img>
                            <img alt="" title="闪电" type="qq" src={cfg.EmojiUrl} className="qqface qqface69"></img>
                            <img alt="" title="炸弹" type="qq" src={cfg.EmojiUrl} className="qqface qqface70"></img>
                            <img alt="" title="刀" type="qq" src={cfg.EmojiUrl} className="qqface qqface71"></img>
                            <img alt="" title="足球" type="qq" src={cfg.EmojiUrl} className="qqface qqface72"></img>
                            <img alt="" title="瓢虫" type="qq" src={cfg.EmojiUrl} className="qqface qqface73"></img>
                            <img alt="" title="便便" type="qq" src={cfg.EmojiUrl} className="qqface qqface74"></img>
                            <img alt="" title="月亮" type="qq" src={cfg.EmojiUrl} className="qqface qqface75"></img>
                            <img alt="" title="太阳" type="qq" src={cfg.EmojiUrl} className="qqface qqface76"></img>
                            <img alt="" title="礼物" type="qq" src={cfg.EmojiUrl} className="qqface qqface77"></img>
                            <img alt="" title="拥抱" type="qq" src={cfg.EmojiUrl} className="qqface qqface78"></img>
                            <img alt="" title="强" type="qq" src={cfg.EmojiUrl} className="qqface qqface79"></img>
                            <img alt="" title="弱" type="qq" src={cfg.EmojiUrl} className="qqface qqface80"></img>
                            <img alt="" title="握手" type="qq" src={cfg.EmojiUrl} className="qqface qqface81"></img>
                            <img alt="" title="胜利" type="qq" src={cfg.EmojiUrl} className="qqface qqface82"></img>
                            <img alt="" title="抱拳" type="qq" src={cfg.EmojiUrl} className="qqface qqface83"></img>
                            <img alt="" title="勾引" type="qq" src={cfg.EmojiUrl} className="qqface qqface84"></img>
                            <img alt="" title="拳头" type="qq" src={cfg.EmojiUrl} className="qqface qqface85"></img>
                            <img alt="" title="差劲" type="qq" src={cfg.EmojiUrl} className="qqface qqface86"></img>
                            <img alt="" title="爱你" type="qq" src={cfg.EmojiUrl} className="qqface qqface87"></img>
                            <img alt="" title="NO" type="qq" src={cfg.EmojiUrl} className="qqface qqface88"></img>
                            <img alt="" title="OK" type="qq" src={cfg.EmojiUrl} className="qqface qqface89"></img>
                            <img alt="" title="爱情" type="qq" src={cfg.EmojiUrl} className="qqface qqface90"></img>
                            <img alt="" title="飞吻" type="qq" src={cfg.EmojiUrl} className="qqface qqface91"></img>
                            <img alt="" title="跳跳" type="qq" src={cfg.EmojiUrl} className="qqface qqface92"></img>
                            <img alt="" title="发抖" type="qq" src={cfg.EmojiUrl} className="qqface qqface93"></img>
                            <img alt="" title="怄火" type="qq" src={cfg.EmojiUrl} className="qqface qqface94"></img>
                            <img alt="" title="转圈" type="qq" src={cfg.EmojiUrl} className="qqface qqface95"></img>
                            <img alt="" title="磕头" type="qq" src={cfg.EmojiUrl} className="qqface qqface96"></img>
                            <img alt="" title="回头" type="qq" src={cfg.EmojiUrl} className="qqface qqface97"></img>
                            <img alt="" title="跳绳" type="qq" src={cfg.EmojiUrl} className="qqface qqface98"></img>
                            <img alt="" title="投降" type="qq" src={cfg.EmojiUrl} className="qqface qqface99"></img>
                            <img alt="" title="激动" type="qq" src={cfg.EmojiUrl} className="qqface qqface100"></img>
                            <img alt="" title="乱舞" type="qq" src={cfg.EmojiUrl} className="qqface qqface101"></img>
                            <img alt="" title="献吻" type="qq" src={cfg.EmojiUrl} className="qqface qqface102"></img>
                            <img alt="" title="左太极" type="qq" src={cfg.EmojiUrl} className="qqface qqface103"></img>
                            <img alt="" title="右太极" type="qq" src={cfg.EmojiUrl} className="qqface qqface104"></img>
                        </div> 
                    </div> : null
                }
                
            </div>
        )
    }
}

export default ToolBar;

