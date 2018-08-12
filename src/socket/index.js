import io from 'socket.io-client';
// import Immutable from 'immutable';
import store from '../store';
import cfg from '../cfg';

export const socket = io.connect(cfg.uploadServer);

//新消息推送
socket.on('push_msg',(message)=>{
    store.dispatch({
        type: 'PUSH_MESSAGE',
        data: message
    })
})

socket.on('reconnect_failed',(message)=>{
    console.log(message);
})

//登录
export const login = (username,pwd)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("login",{
            username:username,
            passward:pwd},(info)=>{
            resolve(info);
        })
        
    })
}

//注册
export const register = (userinfo)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("register",userinfo,(res)=>{
            resolve(res);
        })
    })
}
//拉取房间列表
export const getRoomList = (userid)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("pull_room_list",userid,(res)=>{
            resolve(res);
           
        })
    })
}
//发送消息
export const sendMessage = (msg)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("message",msg,(res)=>{
            
        })
    })
}
//获取系统头像
export const getSysAvatar = ()=>{
    return new Promise((resolve,reject)=>{
        socket.emit("get_sys_avatar",(res)=>{
            resolve(res);
        })
    })
}
//更新服务端的用户头像
export const updateUserAvatar = (imgSrc)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("update_user_avatar",imgSrc,(res)=>{
            resolve(res);
        })
    })
}
//创建聊天室
export const createRoom = (members)=>{
    return new Promise((resolve,reject)=>{
        socket.emit("create_room",members,(res)=>{
            resolve(res);
        })
    })
}
//拉去历史消息
export const pullHistory = (id,p,count=20)=>{
    return new Promise((resolve,reject)=>{
        socket.emit('pullmessage',{
            roomId : id,
            page : p,
            count : count
        },(res)=>{
            resolve(res);
        })
    })
}