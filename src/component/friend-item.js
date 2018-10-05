import React from 'react';
import Avatar from './avatar';

import '../css/friend-item.css';
import cfg from '../cfg';

class FriendItem extends React.Component{
    render(){
        var cls = "friend-item " ;
        cls += this.props.activeRoomId == this.props.roomId ? 
        ' friend-item-active' : '';


        var time = '';
        var html = '';
        if (this.props.lastmsg){
            var type = this.props.lastmsg.get("type");
            html = this.props.lastmsg.get("text");
            html = type == 0 ? html.replace(/src="#!"/g, `src=${cfg.EmojiUrl}`) : '图片';

            time = new Date(this.props.lastmsg.get('ctime')).Format();
        }
        

        return (
            <div className={cls} onClick={()=>{this.props.clickItem(this.props.roomId)}}>
                <span style={{float:'right',color:'#6b6f7c'}}>{time}</span>
                <div className="hd">
                    <Avatar src={this.props.avatar}/>
                </div>
                <div className="bd">
                    <div className="nick">
                        <span>{this.props.nickname}</span>
                    </div>
                    <p className="msg" dangerouslySetInnerHTML={{__html:html}}></p>
                </div>
                
            </div>
        )
    }
}

export default FriendItem