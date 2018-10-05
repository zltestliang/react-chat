import Immutable from 'immutable';

let defaultState = Immutable.fromJS({isOpen:false});

function userSet(state=defaultState, action){
    switch (action.type) {
        case 'OPEN-USER-INFO':
            return state.set('isOpen',action.data);
        default:
            return state;
    }
}

export default userSet;