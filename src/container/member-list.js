import React from 'react';

import '../css/member-list.css';

class MemberList extends React.Component{
    renderlist (){
        var arr = [];
        this.props.list.map((item,index)=>{
            arr.push(
                <div className="member" key={index}>
                    <img src={item.get("avatar")}/>
                    <p className="nickname">{item.get("username")}</p>
                </div>
            )
        })

        return arr;
    }

    render(){
        var imgSrc = "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgeticon?seq=0&username=@2fe3732579d521def7384df2f255f132ba4584286bc1e2812e4c27bc3c195934&chatroomid=@24da3e3e24a8cc728116fa2353493489&skey="
        var cls = 'member-list ' + this.props.className;
        return (
            <div className={cls}>
                <div className="addmember">
                    <i></i>
                </div>
                {this.renderlist()}
            </div>
        )
    }
}

export default MemberList