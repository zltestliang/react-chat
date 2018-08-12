import Immutable from 'immutable';

let defaultStae = Immutable.fromJS({});

function userInfo(state=defaultStae, action){
    switch (action.type) {
        case 'SET_USER_INFO':
            console.log(action);
            return Immutable.fromJS(action.data);
        case 'UPDATE_USER_AVATAR':
            return state.set("avatar",action.src);
        default:
            return state;
    }
}

export default userInfo