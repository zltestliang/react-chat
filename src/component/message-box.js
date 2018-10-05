import React from 'react';

import Avatar from './avatar';

import cfg from '../cfg';

import "../css/message-box.css";



class MessageBox extends React.Component{
    render(){
        var time = new Date(this.props.msg.get('ctime')).Format();

        var cls = 'message-box';
        var isMy = this.props.userid == this.props.msg.getIn(['sender','_id']);
        cls +=  isMy ? ' message-box-right' : ' message-box-left';

        var sendcontent = this.props.msg.get('text');

        var html = sendcontent.replace(/src="#!"/g, `src=${cfg.EmojiUrl}`);

        var type = this.props.msg.get('type');
        var vip = this.props.msg.getIn(['sender','vip']) ? this.props.msg.getIn(['sender','vip']): 0;

        var vipClass = 'message-content' + (vip ? ' themem' : '');

        return (
            <div className={cls}>
                <div className="imgarea">
                    <Avatar src={this.props.msg.getIn(['sender','avatar'])}/>
                </div>
                <div className={vipClass}>
                    <div className="message-box-hd">
                        <span className="message-box-nickname">{isMy ? '' : this.props.msg.getIn(['sender','username'])}</span>
                        <span className="message-box-time">{time}</span>
                    </div>
                    <div className="lt">
                        </div>
                        <div className="rt">
                        </div>
                    {
                        type == 0 ? 
                        <div dangerouslySetInnerHTML={{__html:html}}></div> :
                        <div><img src={sendcontent}/></div>
                    }
                    <span className="arrow"></span>
                </div>
            </div>
        )
    }
}

export default MessageBox;