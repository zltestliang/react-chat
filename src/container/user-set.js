import React from 'react';
import {connect} from 'react-redux';

import uploadFile from '../upload';

import {Icon,message,Upload,Button} from 'antd';

import {getSysAvatar,updateUserAvatar} from '../socket';
import cfg from '../cfg';
import '../css/user-set.css'


var uploadUrl = cfg.uploadServer + '/uploadimg';

function beforeUpload(file) {

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }

class UserSet extends React.Component{
    constructor(){
        super();
        this.state = {
            sysAvatar :[],
            selectAvatar : ''
        }
    }
    

    componentDidMount() {
        getSysAvatar().then((res)=>{
            this.setState({sysAvatar : res.avatars});
        })
    }
    
    //用户返回当前页面时，判断头像是否修改过
    handleBack = ()=>{
        if (this.state.selectAvatar && this.state.selectAvatar != this.props.userinfo.get("avatar")){
            updateUserAvatar(this.state.selectAvatar).then((res)=>{
                if (res.result){
                    this.props.updateUserAvatar(this.state.selectAvatar);
                }
                else{
                    message.error("修改用户头像失败");
                }
                
            });
        }

        this.props.back();
    }

    handleSysAvatar = (e)=>{
        this.setState({selectAvatar: e.target.src})
    }

    handleChange = (info)=>{
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);

        //     this.setState({selectAvatar: info.file.response.url});
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
            return;
        }
        
        uploadFile(file,(err,data)=>{
            if (err){
                message.error(err);
            }
            else{
                this.setState({selectAvatar: data.url});
            }
        })
        
    }

    render(){
        var cls = this.props.open ? ' user-set-enter' : '';

        return (
            <div className={"user-set" + cls}>
                <div className="header">
                    <Icon type="arrow-left" style={{cursor:'pointer'}} onClick={this.handleBack}/>
                    <span>用户设置</span>
                </div>
                <div className="avatar">
                    <div className="hf">
                        <div className="avatar-img">
                            <h4>当前头像</h4>
                            <img alt="" src={this.state.selectAvatar ? 
                                this.state.selectAvatar
                            : this.props.userinfo.get("avatar")}/>
                        </div>
                    </div>
                    <div className="hf">
                        <div className="avatar-uploader">
                            {/* <h4>上传头像</h4> */}
                            <Button>
                                <Icon type="upload">
                                </Icon>
                                上传头像
                                <input type="file" accept="image/*" onChange={(e)=>{this.handleChange(e.target.files)}}/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="default-avatar" onClick={this.handleSysAvatar}>
                {
                    this.state.sysAvatar.map((item,index)=>{
                        return (
                            <div className="sysAvatar" key={index}>
                                <img src={item.url} alt="" className={this.state.selectAvatar == item.url ? 'active' :null}/>
                            </div>
                        )
                    })
                }
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo : state.get('userInfo'),
        open : state.getIn(['userSet','isOpen'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        back : ()=>{
            dispatch({
                type : 'OPEN-USER-INFO',
                data : false
            })
        },
        updateUserAvatar : (imgSrc)=>{
            dispatch({
                type : 'UPDATE_USER_AVATAR',
                src : imgSrc
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSet);