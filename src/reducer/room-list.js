import Immutable from 'immutable';

let defaultState = Immutable.fromJS({});

// defaultState = defaultState.merge(Immutable.fromJS({'roomlist' : [
//     {
//         avatar:'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq=654327510&username=@@1f530f13d8e23a3fba7aaadd02321f4e6bb8d04308a0ed1a7b1c6cefde5189f5&skey=',
//         nickname:'rect开发群',
//         lastmsg : 'hello world'
//     },
//     {
//         avatar:'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq=654327510&username=@@1f530f13d8e23a3fba7aaadd02321f4e6bb8d04308a0ed1a7b1c6cefde5189f5&skey=',
//         nickname:'rect开发群',
//         lastmsg : 'hello world'
//     },
//     {
//         avatar:'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq=654327510&username=@@1f530f13d8e23a3fba7aaadd02321f4e6bb8d04308a0ed1a7b1c6cefde5189f5&skey=',
//         nickname:'rect开发群',
//         lastmsg : 'hello world'
//     }
// ]}))

export default function roomList(state=defaultState,action){
    switch(action.type){
        case 'SET_ROOM_LIST':{
            return Immutable.fromJS(action.data);
        }
        default :
            return state;
    }
}

