import React from 'react';
import {connect} from 'react-redux';

import MsgEmpty from '../component/msg-empty';
import RoomHeader from './room-header';

import Message from './message';
import ToolBar from '../component/toolbar';

import { message } from 'antd';

import {sendMessage} from '../socket/index';

import cfg from '../cfg';

import '../css/chat-content.css';


function insertAtCursor(field, value, selectPastedContent) {
    var sel, range;
    if (field.nodeName === 'DIV') {
        field.focus();
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement('div');
                el.innerHTML = value;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if ((sel = document.selection) && sel.type !== 'Control') {
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(value);
            if (selectPastedContent) {
                range = sel.createRange();
                range.setEndPoint('StartToStart', originalRange);
                range.select();
            }
        }
    } else {
        if (document.selection) {
            field.focus();
            sel = document.selection.createRange();
            sel.text = value;
            sel.select();
        }
        else if (field.selectionStart || field.selectionStart === 0) {
            var startPos = field.selectionStart;
            var endPos = field.selectionEnd;
            var restoreTop = field.scrollTop;
            field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
            if (restoreTop > 0) {
                field.scrollTop = restoreTop;
            }
            field.focus();
            field.selectionStart = startPos + value.length;
            field.selectionEnd = startPos + value.length;
        } else {
            field.value += value;
            field.focus();
        }
    }

}

class ChatContent extends React.Component{

    handleSend =()=>{
        if (this.inputArea.innerHTML.length == 0)
            return;


        var reg = new RegExp(`src="${cfg.EmojiUrl}"`,"g");
        // console.log(this.inputArea.innerHTML.replace(reg,'src="#!"'));
        var sendmsg = this.inputArea.innerHTML.replace(reg,'src="#!"');

        if (sendmsg.length > 400){
            message.error("输入的内容过长",2);
            return;
        }
       
        this.inputArea.innerHTML = "";

        this.send(sendmsg,0);
    }

    //0 文本消息  1表示图片消息
    send = (text,type)=>{
        var Msg = {
            text : text,
            s_timestamp : new Date().getTime(),
            roomId : this.props.activeRoomId,
            type : type
        }

        console.log(Msg);
        sendMessage(Msg);
    }

    sendImgMsg = (imgsrc)=>{
        this.send(imgsrc,1);
    }

    handleMemberList(show){
      
    }
    
    handlePaste = (e)=>{
        e.preventDefault();
        var text = '';
        var textRange,sel;

        if(window.clipboardData) {
            // IE
            text = window.clipboardData.getData('text');
        } else {
            // text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        }
        if (document.body.createTextRange) {    
            if (document.selection) {
                textRange = document.selection.createRange();
            } else if (window.getSelection) {
                sel = window.getSelection();
                var range = sel.getRangeAt(0);
                
                // 创建临时元素，使得TextRange可以移动到正确的位置
                var tempEl = document.createElement("span");
                tempEl.innerHTML = "&#FEFF;";
                range.deleteContents();
                range.insertNode(tempEl);
                textRange = document.body.createTextRange();
                textRange.moveToElementText(tempEl);
                tempEl.parentNode.removeChild(tempEl);
            }
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
        } else {
            // Chrome之类浏览器
            document.execCommand("insertText", false, text || '');
        }
    }

    handleKeyDown = (e)=>{
        if (e.keyCode == 13){
            this.handleSend();
            e.preventDefault();
        }
    }

    //该方法已废弃 只针对input和textarea
    insertAtCaret = (inputField, myValue) =>{
        if (document.selection) {
          //For browsers like Internet Explorer
          inputField.focus();
          var sel = document.selection.createRange();
          sel.text = myValue;
          inputField.focus();
        }
        else if (inputField.selectionStart || inputField.selectionStart == '0') {
          //For browsers like Firefox and Webkit based
          var startPos = inputField.selectionStart;
          var endPos = inputField.selectionEnd;
          var scrollTop = inputField.scrollTop;
          inputField.value = inputField.value.substring(0, startPos)+myValue+inputField.value.substring(endPos,inputField.value.length);
          inputField.focus();
          inputField.selectionStart = startPos + myValue.length;
          inputField.selectionEnd = startPos + myValue.length;
          inputField.scrollTop = scrollTop;
        } else {
          inputField.focus();
          inputField.value += myValue;
        }
    }

     

    toUnicode = (code)=> {
        var codes = code.split('-').map(function(value, index) {
          return parseInt(value, 16);
        });
        return String.fromCodePoint.apply(null, codes);
    }

    insertFace = (cls)=>{
        
        insertAtCursor(this.inputArea,`<img class="${cls}" src=${cfg.EmojiUrl}></img>`,false);
        this.inputArea.focus();
    }

    render(){
        return (
            <div className="chat-content">
                <div className="header">
                    <RoomHeader/>
                </div>
                <div className="info">
                    {
                        this.props.activeRoomId ? null : <MsgEmpty type="1" style={{marginTop:"130px"}}/>
                    }
                    {
                        this.props.activeRoomId ?
                         <div className="chat-bd" >
                            <Message/>
                        </div> : null
                    }
                    {
                        this.props.activeRoomId ?
                        <div className="chat-footer">
                            <ToolBar insertFace={this.insertFace} sendImgMsg={this.sendImgMsg}/>
                            <div className="input-box">
                                <div className="input-area">
                                    <div id="edit-area" ref={(el)=>{this.inputArea=el}} 
                                        onKeyDown={this.handleKeyDown}
                                        contentEditable="true"
                                        onPaste={this.handlePaste}>
                                    </div>
                                </div>
                                <div className="send-eara">
                                    <a className="send-btn btn" onClick={this.handleSend}>发送</a>
                                </div>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        activeRoomId : state.getIn(['activeRoom','roomId'])
    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}
ChatContent = connect(mapStateToProps,mapDispatchToProps)(ChatContent)
export default ChatContent