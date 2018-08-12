import React from 'react';
import {connect} from 'react-redux';
import FriendItem from '../component/friend-item';
import Immutable from 'immutable';
import store from '../store';

import {
    getRoomList,
    pullHistory
} from '../socket';

import '../css/chat-list.css';

class ChatRoom extends React.Component{

    componentWillMount() {
        var userid = this.props.userinfo.get("userid");
        if (userid){
            getRoomList(userid).then((res)=>{
                console.log(res);
                if (res.result){
                    store.dispatch({
                        type : 'SET_ROOM_LIST',
                        data : res.data
                    })

                    var msg = {};
                    for (var i = 0; i < res.data.length; i++){
                        msg[res.data[i].room_id] = [];
                    }
                    store.dispatch({
                        type : 'INIT_MESSAGE',
                        data : msg
                    })

                    for (var i = 0; i < res.data.length; i++){
                        
                        let id = res.data[i].room_id;
                        pullHistory(id,1).then((response)=>{
                            console.log(response);
                            if (response.result){
                                store.dispatch({
                                    type : 'PULL_MESSAGE',
                                    data : {
                                        roomId : id,
                                        history : response.list
                                    }
                                })
                            }
                            else{
                                console.log(res);
                            }
                        });
                    }
                }
            });
        }
        
    }
    
    renderList(){
        let arr = [];
        this.props.roomList.map((value, index, array)=>{
            var tempRoomId = value.get("room_id");
            var list = this.props.messagelist.get(tempRoomId);
            var count = 0;
            if (Immutable.List.isList(list))
                count = list.size;


            arr.push( 
            <FriendItem key={index}
                activeRoomId={this.props.activeRoomId}
                roomId={tempRoomId}
                avatar={value.get("avatar")} 
                nickname={value.get("name")}
                lastmsg={count > 0 ? list.get(count-1) : ''}
                clickItem = {this.props.setActiveRoom}
            />)

            return value;
        })

        return arr;
        // for(let item in this.props.roomList){
        //     arr.push(
        //         <FriendItem key={item} roomInfo={item}/>
        //     )
        // }
    }

    render(){
        return (
            <div className="chat-list">
            {
                this.renderList()
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        roomList : state.get("roomList"),
        userinfo : state.get('userInfo'),
        activeRoomId : state.getIn(['activeRoom','roomId']),
        messagelist : state.get('message')
    }
}
function mapDispathToProps(dispatch){
    return {
        setActiveRoom : function(roomid){
            document.getElementsByClassName("left-box")[0].className = 'left-box left-box-hd';
            dispatch({
                type : 'SET_ACTIVE_ROOM',
                data : roomid
            })
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps)(ChatRoom)