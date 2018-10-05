import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import LeftHeader from '../container/left-header';
import SearchBox from '../container/search-box';
import ChatRoom from '../container/chat-room';
import UserSet from '../container/user-set';

import cfg from '../cfg';
import ChatContent from '../container/chat-content';

import userinfo  from '../user';


Date.prototype.Format = function(){
  var o = new Date();
  var now = {
      year : o.getFullYear(),
      month : o.getMonth()+1,
      day : o.getDate()
  }

  if (now.year == this.getFullYear() && now.month == this.getMonth()+1 && now.day == this.getDate()){
      return (this.getHours() + ':' + (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()));
  }
  else if (now.year == this.getFullYear() && now.month == this.getMonth()+1 && now.day == this.getDate()+1){
      return ("昨天 " + this.getHours() + ':' + (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()));
  }
  else{
      return (this.getFullYear() + '-' + (this.getMonth()+1) + "-" +  this.getDate());
  }

}

var Bucket = 'chat';
var Region = 'ap-chengdu';

class Index extends Component {
    
    render() {
  
      return (
            <div className="chatApp">
              <div className="left-box left-box-show">
                <LeftHeader/>
                <SearchBox/>
                <ChatRoom/>
                <UserSet/>
              </div>
              <div className="right-box">
                <ChatContent/>
              </div>
            </div>
      );
    }
}

export default Index;