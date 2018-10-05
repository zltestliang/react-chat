import React from 'react';
import {connect} from 'react-redux';

import MessageBox from '../component/message-box';

import "../css/message.css";

class Message extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }

    componentWillMount() {
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
    }
    
    componentDidMount() {
        setTimeout(()=> {
            this.scrollToBottom();
            if (this.messageArea){
                this.messageArea.style.opacity = 1;
            }
        }, 300);
        

    }
    
    //滚动到底部
    scrollToBottom = ()=>{
        if (this.messageArea){
           
            this.messageArea.scrollTop = this.messageArea.scrollHeight;
            console.log(this.messageArea.scrollTop);
        }
    }

    render(){
        if (this.props.list && this.props.list.size > 0){
            return (
                <div className="message" ref={(el)=>{ this.messageArea = el}}>
                {
                    this.props.list.map((item,index)=>{
                        return (<MessageBox key={index} msg={item} userid={this.props.userid}/>)
                    })
                }
                </div>
            )
        }
        else{
            return (
                <div className="message">
                    {/* <MessageBox/> */}
                </div>
            )
        }
        
    }
}

function mapStateToProps(state) {
    var roomId = state.getIn(['activeRoom','roomId']);
    return {
        activeRoomId : roomId,
        list : state.get('message').get(roomId),
        userid : state.getIn(['userInfo','userid']),
    }
}

export default connect(mapStateToProps)(Message);