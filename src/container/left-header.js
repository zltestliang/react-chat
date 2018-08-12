import React from 'react';
import {connect} from 'react-redux';
import Avatar from '../component/avatar';

import {Menu, Dropdown,Modal,Input,message,Icon} from 'antd';

import {socket} from '../socket';

import '../css/left-header.css';

class LeftHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            createVisible:false
        };
    }

    showCreateRoomModel = ()=>{
        this.setState({
            createVisible:true
        })
    }

    createRoomOk = ()=>{
        this.setState({
            createVisible:false
        })

        var roomName = this.roomInput.input.value;
        this.roomInput.input.value = "";
        console.log(roomName);
        message.info("该功能还在开发中");

    }

    CancelCreateRoom = ()=>{
        this.setState({
            createVisible:false
        })

        this.roomInput.input.value="";
    }

    openUserSet = ()=>{
        this.props.openUserSet();
    }

    quit = ()=>{
        window.location.href="/";
    }

    Myinfo = ()=>{
        Modal.info({
            title: '',
            content: (
              <div>
                <p><Icon type="phone" /> 18672290739</p>
                <p><Icon type="wechat" /> zl18672290739</p>
                <p><Icon type="github" /></p>
              </div>
            ),
            onOk() {},
          });
    }

    menu = (
        <Menu>
          <Menu.Item key="0">
            <a onClick={this.showCreateRoomModel}>创建群组</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1" >
            <a onClick={this.openUserSet}>用户资料</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">
            <a onClick={this.quit}>退出</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a onClick={this.Myinfo}>联系我</a>
          </Menu.Item>
        </Menu>
      );

    componentWillMount() {
        var user = this.props.userinfo.get("username");
        if (!user)
        {
            window.location.href="/";
        }

        socket.on('reconnect',(message)=>{
            socket.emit("reconnect success",{
                username:this.props.userinfo.get('username'),
                userid: this.props.userinfo.get('userid')})
        })
    }
    
    render(){
        return(
            <div className="left-header g-flex">
                <div className="hd">
                    <Avatar handleClick={this.props.openUserSet} src={this.props.userinfo.get('avatar')}/>
                </div>
                <div className="bd">{this.props.userinfo.get('username')}</div>
                {/* <div className="ft">
                    <i className="opt"></i>
                </div> */}
                <Dropdown overlay={this.menu} trigger={['click']}>
                    <a className="ant-dropdown-link ft" href="#">
                        <i className="opt"></i> 
                    </a>
                </Dropdown>
                <Modal
                    title="创建房间"
                    visible={this.state.createVisible}
                    onOk={this.createRoomOk}
                    onCancel={this.CancelCreateRoom}
                    >
                    <Input ref={(el)=>{this.roomInput = el}}/>
                    </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo : state.get('userInfo')
    }
}

function mapDispatchToProps(dispatch){
    return {
        openUserSet : ()=> {
            dispatch({
                type : 'OPEN-USER-INFO',
                data : true,
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeftHeader);