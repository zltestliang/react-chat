import React from 'react';

import '../css/msg-empty.css';

class MsgEmpty extends React.Component{
    renderMsg(){
        if (this.props.type === '1'){
            return (
                <div>
                    <i className="icon"></i>
                    <p>未选择聊天</p>
                </div>
            )
        }
        else{
            return <p>暂时没有新消息</p>
        }

    }

    render(){
        var style = this.props.style;

        return(
            <div className="msg-empty" style={style}>
            {
                this.renderMsg()
            }
            </div>
        )
    }
}

export default MsgEmpty;