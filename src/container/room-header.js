import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import MemberList from './member-list';
import {Icon} from 'antd';

import "../css/room-header.css";

class RoomHeader extends React.Component{

    constructor(props){
        super(props);
        this.state={showMember:false};
    }

    handleClick(){
        this.setState({showMember:!this.state.showMember});

        if (this.state.arrowStyle === 'down-icon'){
            this.setState({arrowStyle:'up-icon'});
        }
        else {
            this.setState({arrowStyle:'down-icon'});
        }
    }
    
    handleBack = ()=>{
        document.getElementsByClassName("left-box")[0].className = "left-box left-box-show";
    }

    render(){
        var iconStyle = this.state.showMember ? 'down-icon' : 'up-icon';
        var memberStyle = this.state.showMember ? 'member-list-enter': '';

        return (
            <div>
                {
                    this.props.curRoomid ? 
                    <div className="room-header"  onClick={()=>{this.handleClick()}}>
                        {/* <a className="name">{this.props.roomInfo.get("name")}</a> */}
                        <Icon type="arrow-left" style={{cursor:'pointer',position:'absolute',left:'20px',top:'15px',fontSize:'20px'}} onClick={this.handleBack}/>
                        <a className="name">成员列表</a>
                        <span className="count">({this.props.members.size})</span>
                        <i className={iconStyle}></i>
                    </div> : null
                }
                <MemberList className={memberStyle} list={this.props.members}/>
            </div>
        )
    }
}

function mapPropsToState(state){
    var roomid = state.getIn(['activeRoom','roomId']);
    var roomlist = state.get('roomList');
    var members = Immutable.fromJS([]);
    
    var roomInfo = null;
    if (roomid){
        var len = roomlist.size;
        for (var i = 0; i < len; i++){
            if (roomid === roomlist.getIn([i,'room_id'])){
                members = roomlist.getIn([i,'members']);
                roomInfo = Immutable.fromJS({
                    name : roomlist.getIn([i,'name'])
                })

                break;
            }
        }
    }
    // console.log(members.toJS());
    return {
        curRoomid :roomid,
        roomInfo : roomInfo,
        members : members
    }
}

RoomHeader = connect(mapPropsToState)(RoomHeader)

export default RoomHeader;